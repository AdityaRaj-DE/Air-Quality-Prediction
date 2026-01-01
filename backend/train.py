import pandas as pd
import psycopg2
import numpy as np
import joblib
from pathlib import Path
from dotenv import load_dotenv
import os

from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

# Load environment variables
load_dotenv()

# ===============================
# 1. DATABASE CONFIG
# ===============================
DB_CONFIG = {
    "host": os.getenv("DB_HOST"),
    "database": os.getenv("DB_NAME"),
    "user": os.getenv("DB_USER"),
    "password": os.getenv("DB_PASSWORD"),
    "port": int(os.getenv("DB_PORT", 5432))
}


# ===============================
# 2. LOAD DATA FROM POSTGRES
# ===============================
def load_data():
    conn = psycopg2.connect(**DB_CONFIG)

    query = """
        SELECT
            pm25,
            pm10,
            no2,
            so2,
            co,
            o3,
            aqi
        FROM air_quality_data
    """

    df = pd.read_sql(query, conn)
    conn.close()

    return df


# ===============================
# 3. TRAIN & EVALUATE MODELS
# ===============================
def train_models(df):
    X = df.drop(columns=["aqi"])
    y = df["aqi"]

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

    # ---- Linear Regression (Baseline) ----
    lr = LinearRegression()
    lr.fit(X_train, y_train)
    lr_preds = lr.predict(X_test)

    lr_mae = mean_absolute_error(y_test, lr_preds)
    lr_rmse = np.sqrt(mean_squared_error(y_test, lr_preds))
    lr_r2 = r2_score(y_test, lr_preds)

    # ---- Random Forest (Main Model) ----
    rf = RandomForestRegressor(
        n_estimators=100,        # ↓ from 200
        max_depth=12,            # CRITICAL
        min_samples_leaf=5,      # CRITICAL
        min_samples_split=10,    # CRITICAL
        random_state=42,
        n_jobs=-1
    )


    rf.fit(X_train, y_train)
    rf_preds = rf.predict(X_test)

    rf_mae = mean_absolute_error(y_test, rf_preds)
    rf_rmse = np.sqrt(mean_squared_error(y_test, rf_preds))
    rf_r2 = r2_score(y_test, rf_preds)

    results = {
        "linear": (lr_mae, lr_rmse, lr_r2),
        "random_forest": (rf_mae, rf_rmse, rf_r2),
        "model": rf
    }

    return results


# ===============================
# 4. SAVE MODEL
# ===============================
def save_model(model):
    model_dir = Path(__file__).resolve().parent / "model"
    model_dir.mkdir(exist_ok=True)

    model_path = model_dir / "aqi_model_new.pkl"
    joblib.dump(
        model,
        model_path,
        compress=("gzip", 3)
    )


    print(f"✅ Model saved at: {model_path}")


# ===============================
# 5. STORE METRICS IN DATABASE
# ===============================
def save_metrics(mae, rmse, r2):
    conn = psycopg2.connect(**DB_CONFIG)
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO model_metrics (model_name, mae, rmse, r2, trained_at)
        VALUES (%s, %s, %s, %s, NOW())
    """, (
        "RandomForest_v1",
        float(mae),
        float(rmse),
        float(r2)
    ))

    conn.commit()
    cursor.close()
    conn.close()


# ===============================
# 6. MAIN EXECUTION
# ===============================
def main():
    print("🔄 Loading data from database...")
    df = load_data()

    print(f"📊 Dataset shape: {df.shape}")

    print("🤖 Training models...")
    results = train_models(df)

    lr_mae, lr_rmse, lr_r2 = results["linear"]
    rf_mae, rf_rmse, rf_r2 = results["random_forest"]

    print("\n===== MODEL COMPARISON =====")
    print("Linear Regression")
    print(f"MAE  : {lr_mae:.2f}")
    print(f"RMSE : {lr_rmse:.2f}")
    print(f"R2   : {lr_r2:.3f}")

    print("\nRandom Forest")
    print(f"MAE  : {rf_mae:.2f}")
    print(f"RMSE : {rf_rmse:.2f}")
    print(f"R2   : {rf_r2:.3f}")

    print("\n💾 Saving best model...")
    save_model(results["model"])

    print("🧾 Storing metrics in database...")
    save_metrics(rf_mae, rf_rmse, rf_r2)

    print("\n✅ TRAINING PIPELINE COMPLETED SUCCESSFULLY")


if __name__ == "__main__":
    main()