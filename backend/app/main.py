from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import psycopg2
import numpy as np
import joblib
import requests
from datetime import datetime
from pathlib import Path
from dotenv import load_dotenv
import os
from fastapi.middleware.cors import CORSMiddleware
# Load environment variables
BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / ".env")


# ===============================
# DATABASE CONFIG
# ===============================
DB_CONFIG = {
    "host": os.getenv("DB_HOST"),
    "database": os.getenv("DB_DATABASE"),
    "user": os.getenv("DB_USER"),
    "password": os.getenv("DB_PASSWORD"),
    "port": 5432
}
OPENWEATHER_API_KEY = os.getenv("OPENWEATHER_API_KEY")

# =====================================================
# LOAD ML MODEL (ONCE)
# =====================================================

BASE_DIR = Path(__file__).resolve().parent
MODEL_PATH = BASE_DIR / "model" / "aqi_model.pkl"

model = joblib.load(MODEL_PATH)

# =====================================================
# FASTAPI APP
# =====================================================

app = FastAPI(
    title="Air Quality Prediction & Analytics API",
    version="1.0"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://air-quality-prediction-phi.vercel.app/"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# =====================================================
# SCHEMAS
# =====================================================

class ManualAQIInput(BaseModel):
    city: str
    pm25: float
    pm10: float
    no2: float
    so2: float
    co: float
    o3: float

# =====================================================
# UTILITIES
# =====================================================

def get_db_connection():
    return psycopg2.connect(**DB_CONFIG)


def get_coordinates(city: str):
    url = "http://api.openweathermap.org/geo/1.0/direct"
    params = {
        "q": city,
        "limit": 1,
        "appid": OPENWEATHER_API_KEY
    }

    res = requests.get(url, params=params)
    res.raise_for_status()
    data = res.json()

    if not data:
        raise HTTPException(status_code=404, detail="City not found")

    return data[0]["lat"], data[0]["lon"]


def get_live_pollution(lat, lon):
    url = "http://api.openweathermap.org/data/2.5/air_pollution"
    params = {
        "lat": lat,
        "lon": lon,
        "appid": OPENWEATHER_API_KEY
    }

    res = requests.get(url, params=params)
    res.raise_for_status()

    item = res.json()["list"][0]
    components = item["components"]

    return {
        "pm25": components["pm2_5"],
        "pm10": components["pm10"],
        "no2": components["no2"],
        "so2": components["so2"],
        "co": components["co"],
        "o3": components["o3"],
        "api_aqi": item["main"]["aqi"],  # OpenWeather AQI scale (1–5)
        "timestamp": datetime.utcfromtimestamp(item["dt"])
    }


def predict_aqi(features: dict):
    # 1. Unit correction
    features["co"] = features["co"] / 1000.0  # μg/m³ → mg/m³

    # 2. Normalize to training-like bounds
    features = normalize_features(features)

    # 3. Model input
    x = np.array([[
        features["pm25"],
        features["pm10"],
        features["no2"],
        features["so2"],
        features["co"],
        features["o3"]
    ]])

    # 4. Predict
    predicted = float(model.predict(x)[0])

    # 5. Enforce AQI limits
    predicted = max(0, min(predicted, 500))

    return predicted



def normalize_features(features):
    return {
        "pm25": min(features["pm25"], 500),
        "pm10": min(features["pm10"], 600),
        "no2": min(features["no2"], 200),
        "so2": min(features["so2"], 200),
        "co": min(features["co"], 50),   # mg/m³
        "o3": min(features["o3"], 300)
    }

# =====================================================
# ENDPOINTS
# =====================================================

@app.get("/health")
def health():
    return {"status": "OK"}


# -----------------------------------------------------
# PRIMARY ENDPOINT — LIVE AQI + ML PREDICTION
# -----------------------------------------------------
@app.get("/predict/city")
def predict_city(city: str):
    lat, lon = get_coordinates(city)
    live_data = get_live_pollution(lat, lon)

    predicted_aqi = predict_aqi(live_data)

    # Store in DB
    # conn = get_db_connection()
    # cur = conn.cursor()

    # cur.execute("""
    #     INSERT INTO aqi_predictions
    #     (city, prediction_time, predicted_aqi, model_name)
    #     VALUES (%s, %s, %s, %s)
    # """, (
    #     city,
    #     datetime.utcnow(),
    #     predicted_aqi,
    #     "RandomForest_v1"
    # ))

    # conn.commit()
    # cur.close()
    # conn.close()

    return {
        "city": city,
        "real_time_aqi_api": live_data["api_aqi"],
        "predicted_aqi_ml": round(predicted_aqi, 2),
        "pollutants": {
            "pm25": live_data["pm25"],
            "pm10": live_data["pm10"],
            "no2": live_data["no2"],
            "so2": live_data["so2"],
            "co": live_data["co"],
            "o3": live_data["o3"]
        },
        "model": "RandomForest_v1",
        "source": "OpenWeather + ML",
        "timestamp": live_data["timestamp"]
    }


# -----------------------------------------------------
# SECONDARY — MANUAL INPUT (TEST MODE)
# -----------------------------------------------------
@app.post("/predict")
def predict_manual(data: ManualAQIInput):
    predicted_aqi = predict_aqi(data.dict())

    return {
        "city": data.city,
        "predicted_aqi": round(predicted_aqi, 2),
        "model": "RandomForest_v1",
        "mode": "manual_test"
    }


# -----------------------------------------------------
# ANALYTICS — LATEST PREDICTION
# -----------------------------------------------------
@app.get("/analytics/latest")
def latest_prediction(city: str):
    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("""
        SELECT predicted_aqi, prediction_time, model_name
        FROM aqi_predictions
        WHERE city = %s
        ORDER BY prediction_time DESC
        LIMIT 1
    """, (city,))

    row = cur.fetchone()
    cur.close()
    conn.close()

    if not row:
        raise HTTPException(status_code=404, detail="No data found")

    return {
        "city": city,
        "predicted_aqi": row[0],
        "prediction_time": row[1],
        "model": row[2]
    }

@app.get("/aqi/current")
def get_current_aqi(city: str):
    lat, lon = get_coordinates(city)
    live_data = get_live_pollution(lat, lon)

    return {
        "city": city,
        "aqi_source": "OpenWeather",
        "aqi_scale": "1-5",
        "current_aqi": live_data["api_aqi"],
        "pollutants": {
            "pm25": live_data["pm25"],
            "pm10": live_data["pm10"],
            "no2": live_data["no2"],
            "so2": live_data["so2"],
            "co": live_data["co"],
            "o3": live_data["o3"]
        },
        "timestamp": live_data["timestamp"]
    }

@app.get("/analytics/trend")
def aqi_trend(city: str, limit: int = 10):
    try:
        conn = get_db_connection()
        cur = conn.cursor()

        cur.execute("""
            SELECT predicted_aqi, prediction_time
            FROM aqi_predictions
            WHERE city = %s
            ORDER BY prediction_time DESC
            LIMIT %s
        """, (city, limit))

        rows = cur.fetchall()
    except Exception as e:
        print("TREND ERROR:", e)
        raise HTTPException(status_code=500, detail="Failed to fetch trend data")
    finally:
        if cur: cur.close()
        if conn: conn.close()

    if not rows:
        return []

    # Reverse so graph goes left → right
    rows.reverse()

    return [
        {
            "aqi": row[0],
            "time": row[1].isoformat()
        }
        for row in rows
    ]
