CREATE TABLE air_quality_data (
    id SERIAL PRIMARY KEY,
    city VARCHAR(100) NOT NULL,
    date DATE NOT NULL,
    pm25 FLOAT,
    pm10 FLOAT,
    no2 FLOAT,
    so2 FLOAT,
    co FLOAT,
    o3 FLOAT,
    aqi FLOAT NOT NULL
);

CREATE INDEX idx_city_date ON air_quality_data(city, date);

CREATE TABLE aqi_predictions (
    id SERIAL PRIMARY KEY,
    city VARCHAR(100),
    prediction_time TIMESTAMP,
    predicted_aqi FLOAT,
    model_name VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE model_metrics (
    id SERIAL PRIMARY KEY,
    model_name VARCHAR(50),
    mae FLOAT,
    rmse FLOAT,
    r2 FLOAT,
    trained_at TIMESTAMP
);
