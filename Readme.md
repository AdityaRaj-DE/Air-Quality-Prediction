# Air Quality Prediction & Analytics System

**(ML + Full Stack | Real-Time AQI + ML Prediction)**

---

## 📌 Project Overview

The **Air Quality Prediction & Analytics System** is a full-stack, ML-powered web application designed to **monitor, analyze, and predict air quality for Indian cities**.

This project is an upgraded, production-oriented version of a traditional *Air Quality Statistical Management System*.

Instead of relying on static or hardcoded database values, the system now:

- **Fetches real-time air pollution data** from an external API
- **Uses machine learning models** to predict AQI
- **Provides visual analytics** through a modern frontend
- **Logs predictions** for analysis and comparison

The project demonstrates **end-to-end system design**, combining:

- Data engineering
- Machine learning
- Backend REST APIs
- Frontend visualization and UX

---

## 🎯 What This Project Provides

### ✅ Core Features

#### 1. Real-Time AQI Monitoring

- **Fetches live pollutant data** (PM2.5, PM10, NO₂, SO₂, CO, O₃)
- **Displays current AQI** from an authoritative external source

#### 2. Machine Learning–Based AQI Prediction

- **Predicts AQI** using a trained **Random Forest Regressor**
- Uses **live pollutant values as input features**
- Clearly separates **real AQI vs predicted AQI** in the UI

#### 3. City-Based Exploration

- **Search and select cities**
- **Table view** of cities with AQI summaries
- **Detailed city page** with pollutant breakdown and ML prediction

#### 4. Analytics & Logging

- **Stores predictions** in PostgreSQL
- **Tracks model performance metrics** (MAE, RMSE, R²)

#### 5. Modern Frontend Experience

- **High-fidelity UI**
- **Smooth animations** using GSAP
- **Context-based state management**
- **Responsive**, dark-mode-friendly design

---

## 🧠 Problem Statement

Traditional AQI dashboards often:

- Show only **historical or static AQI values**
- Do **not explain why AQI changes**
- **Lack predictive capability**

This project addresses these gaps by:

- **Integrating live pollutant data**
- **Applying machine learning** for AQI prediction
- Allowing users to **compare real-time AQI vs predicted AQI**

---

## 🏗️ High-Level Architecture

```text
User (Browser)
   ↓
React Frontend (Vite + Tailwind + GSAP)
   ↓
FastAPI Backend
   ├── Real-Time AQI (External API)
   ├── ML Model Inference
   └── Analytics APIs
   ↓
PostgreSQL (Supabase)
   ├── Historical AQI Data
   ├── Predictions
   └── Model Metrics
```

---

## 🗂️ Project Structure

```text
aqi-ml-system/
│
├── backend/
│   ├── main.py                # FastAPI backend
│   ├── train.py               # ML training pipeline
│   ├── ingest_data.py         # Data ingestion script
│   ├── model/
│   │   └── aqi_model.pkl      # Trained ML model
│
├── frontend/
│   ├── src/
│   │   ├── components/        # UI components
│   │   ├── context/           # Context API (state management)
│   │   ├── pages/             # Pages (Dashboard, Location)
│   │   └── services/          # API service layer
│   ├── package.json
│   └── vite.config.js
│
├── data/
│   └── clean_city_day_aqi.csv # Cleaned dataset
│
├── database/
│   └── schema.sql             # PostgreSQL schema
│
└── README.md
```

---

## 🧪 Machine Learning Design

### 🎯 ML Task

- **Type**: Regression
- **Target Variable**: AQI (continuous)

### 📊 Input Features

- PM2.5
- PM10
- NO₂
- SO₂
- CO
- O₃

### 🤖 Models Used

- **Linear Regression (Baseline)**
  - Simple, interpretable benchmark

- **Random Forest Regressor (Production Model)**
  - Handles non-linear relationships
  - Robust to outliers
  - Strong real-world performance

### 📈 Evaluation Metrics

| Metric | Purpose                     |
|--------|-----------------------------|
| MAE    | Average prediction error    |
| RMSE   | Penalizes large AQI errors  |
| R²     | Explained variance          |

### ✅ Final Model Performance

- **MAE**: ~21.78
- **RMSE**: ~41.29
- **R²**: ~0.91

---

## ⚙️ Backend Technology Stack

- **FastAPI** – ML-friendly, async REST API
- **Python** – Data processing & ML
- **scikit-learn** – Model training
- **PostgreSQL (Supabase)** – Data storage
- **psycopg2** – Database connectivity
- **joblib** – Model persistence
- **External AQI API** – Live pollution data

### Key Backend Endpoints

| Endpoint           | Description                    |
|--------------------|--------------------------------|
| `/aqi/current`     | Real-time AQI from API         |
| `/predict/city`    | ML-based AQI prediction        |
| `/predict`         | Manual test prediction         |
| `/analytics/latest`| Latest stored prediction       |

---

## 🎨 Frontend Technology Stack

### Core Libraries

- **React 18**
- **Vite** (fast dev + build)
- **React Router DOM** (routing)
- **Context API** (global state)
- **Axios** (API calls)
- **Tailwind CSS** (styling)
- **GSAP + @gsap/react** (animations)

### Frontend Package Summary

- `react`, `react-dom`, `react-router-dom`
- `axios`
- `gsap`, `@gsap/react`
- `tailwindcss`, `postcss`, `autoprefixer`
- `vite`
- `eslint` + React hooks plugins

### 🎥 Frontend Design Philosophy

- **Data-driven UI** (no hardcoded AQI values)
- Clear separation between:
  - **Real-time AQI**
  - **ML-predicted AQI**
- **Reusability** via context-based state
- **Smooth UX** with GSAP animations
- **No manual pollutant input** in production flow

---

## 🚀 Development Phases

1. **Dataset Selection & Cleaning**
   - Real Indian AQI dataset (2015–2020)
   - Handling missing values
   - Feature selection

2. **Database Design**
   - PostgreSQL schema
   - Indexed for analytics

3. **ML Pipeline**
   - Baseline + production model
   - Evaluation & comparison
   - Model persistence

4. **Backend APIs**
   - ML inference endpoints
   - External API integration
   - Analytics logging

5. **Frontend Integration**
   - Context-based state management
   - City-based navigation
   - Real-time + predicted AQI views

6. **Future Deployment**
   - Backend: Render / Railway
   - Database: Supabase
   - Frontend: Vercel / Netlify

---

## 🔮 Future Enhancements

- AQI forecasting using time-series models
- Historical AQI trend charts
- City comparison dashboard
- User alerts for high AQI
- Role-based access (admin / public)

---

## 🧑‍💻 What This Project Demonstrates

- **SQL & relational database design**
- **End-to-end ML pipeline**
- **Real-world API integration**
- **Backend system design**
- **Frontend architecture & UX**
- **Deployment-ready thinking**

---
