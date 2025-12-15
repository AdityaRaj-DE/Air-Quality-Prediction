import React, { createContext, useState } from "react";

export const AQIContext = createContext();

const AQIProvider = ({ children }) => {
  const [citiesData, setCitiesData] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [loading, setLoading] = useState(false);
  const [trendData, setTrendData] = useState([]);

  const API = import.meta.env.VITE_API_URL || "http://localhost:8000";

  const fetchCityData = async (city) => {
    setLoading(true);
    try {
      const [currentRes, predictRes] = await Promise.all([
        fetch(`${API}/aqi/current?city=${city}`),
        fetch(`${API}/predict/city?city=${city}`)
      ]);
      const trendRes = await fetch(
        `${API}/analytics/trend?city=${city}&limit=10`
      );
      
      const trend = trendRes.ok ? await trendRes.json() : [];
      setTrendData(trend);
      
      if (currentRes.status === 404 || predictRes.status === 404) {
        throw new Error("City not found");
      }
  
      if (!currentRes.ok || !predictRes.ok) {
        throw new Error("API failed");
      }
  
      const current = await currentRes.json();
      const predicted = await predictRes.json();
  
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
      return { success: true };
    } catch (err) {
      alert("Failed to fetch AQI data. Try again.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <AQIContext.Provider value={{
      citiesData,
      selectedCity,
      fetchCityData,
      trendData,
      loading
    }}>
      {children}
    </AQIContext.Provider>
  );
};

export default AQIProvider;
