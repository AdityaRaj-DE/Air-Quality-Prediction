import { createContext, useState } from "react";

export const AQIContext = createContext();

const AQIProvider = ({ children }) => {
  const [aqiData, setAqiData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCityAQI = async (city) => {
    setLoading(true);

    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
    const [realtimeRes, predictedRes] = await Promise.all([
      fetch(`${apiUrl}/aqi/current?city=${city}`).then(r => r.json()),
      fetch(`${apiUrl}/predict/city?city=${city}`).then(r => r.json())
    ]);

    setAqiData({
      city,
      location: realtimeRes.location || null,
      realtime: realtimeRes,
      predicted: predictedRes
    });

    setLoading(false);
  };

  return (
    <AQIContext.Provider value={{ aqiData, loading, fetchCityAQI }}>
      {children}
    </AQIContext.Provider>
  );
};

export default AQIProvider;
