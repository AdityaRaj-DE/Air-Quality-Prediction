import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AQIContext } from "../../context/AQIContext";
import AQITrendChart from "../ui/AQITrendChart";

const LocationPage = () => {
  const { city } = useParams();
  const { selectedCity, trendData, fetchCityData, loading } = useContext(AQIContext);

  useEffect(() => {
    fetchCityData(city);
  }, [city]);

  if (loading || !selectedCity) {
    return <p className="p-4">Loading...</p>;
  }

  const { aqi_api, aqi_ml, pollutants, timestamp } = selectedCity;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-2">{city}</h1>
      <p className="text-sm text-zinc-500 mb-4">
        Last updated: {new Date(timestamp).toLocaleString()}
      </p>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="font-semibold mb-2">AQI</h2>
          <p>API AQI (1–5): {aqi_api}</p>
          <p>ML AQI: {aqi_ml}</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="font-semibold mb-2">Pollutants (µg/m³)</h2>
          {Object.entries(pollutants).map(([k, v]) => (
            <p key={k}>{k.toUpperCase()}: {v}</p>
          ))}
        </div>
      </div>
      <h1 className="font-bold">Due to free database this option is block by developer;</h1>
      {/* <AQITrendChart data={trendData} /> */}

    </div>
  );
};

export default LocationPage;
