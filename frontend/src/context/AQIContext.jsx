import React, { createContext, useState } from "react";

export const AQIContext = createContext();

const AQIProvider = ({ children }) => {
  const [citiesData, setCitiesData] = useState([]); // table
  const [selectedCity, setSelectedCity] = useState(null); // detail
  const [loading, setLoading] = useState(false);

  const fetchCityData = async (city) => {
    setLoading(true);

    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
    const [realtimeRes, predictedRes] = await Promise.all([
      fetch(`${apiUrl}/aqi/current?city=${city}`).then(r => r.json()),
      fetch(`${apiUrl}/predict/city?city=${city}`).then(r => r.json())
    ]);

    const cityObj = {
      city,
      country: "India",
      region: city,
      realtime: realtimeRes,
      predicted: predictedRes
    };

    setSelectedCity(cityObj);

    setCitiesData(prev => {
      const exists = prev.find(c => c.city === city);
      return exists ? prev : [...prev, cityObj];
    });

    setLoading(false);
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
