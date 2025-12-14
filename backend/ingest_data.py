import pandas as pd
import psycopg2
from dotenv import load_dotenv
import os
from psycopg2.extras import execute_batch

# Load environment variables from .env
load_dotenv()

# Fetch variables from environment
conn = psycopg2.connect(
    host=os.getenv("DB_HOST"),
    database=os.getenv("DB_NAME"),
    user=os.getenv("DB_USER"),
    password=os.getenv("DB_PASSWORD"),
    port=int(os.getenv("DB_PORT", 5432))
)

df = pd.read_csv("../data/clean_city_day_aqi.csv")
df = df.rename(columns={
    "PM2.5": "PM25"
})

print(df.columns)
print(df.itertuples().__next__())

cursor = conn.cursor()

records = [
    (
        row.City,
        row.Date,
        row.PM25,
        row.PM10,
        row.NO2,
        row.SO2,
        row.CO,
        row.O3,
        row.AQI
    )
    for row in df.itertuples(index=False)
]

query = """
INSERT INTO air_quality_data
(city, date, pm25, pm10, no2, so2, co, o3, aqi)
VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s)
"""

execute_batch(cursor, query, records, page_size=1000)

conn.commit()
cursor.close()
conn.close()

print("Ingestion completed:", len(records))