import React, { createContext, useState } from "react";

export const AQIContext = createContext();

const AQIProvider = ({ children }) => {
  const [citiesData, setCitiesData] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [loading, setLoading] = useState(false);

  const API = import.meta.env.VITE_API_URL || "http://localhost:8000";

  const fetchCityData = async (city) => {
    setLoading(true);
    try {
      const [current, predicted] = await Promise.all([
        fetch(`${API}/aqi/current?city=${city}`).then(r => r.json()),
        fetch(`${API}/predict/city?city=${city}`).then(r => r.json())
      ]);

      const normalized = {
        city,
        aqi_api: current.current_aqi,
        aqi_ml: predicted.predicted_aqi_ml,
        pollutants: current.pollutants,
        timestamp: current.timestamp
      };

      setSelectedCity(normalized);

      setCitiesData(prev =>
        prev.find(c => c.city === city) ? prev : [...prev, normalized]
      );
    } catch (err) {
      console.error("AQI fetch failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AQIContext.Provider value={{
      citiesData,
      selectedCity,
      fetchCityData,
      loading
    }}>
      {children}
    </AQIContext.Provider>
  );
};

export default AQIProvider;
