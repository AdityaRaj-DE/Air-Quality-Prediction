import { useContext } from "react";
import { AQIContext } from "../../context/AQIContext";
import { Link } from "react-router-dom";

const TableCard = () => {
  const { citiesData } = useContext(AQIContext);

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <div className="grid grid-cols-4 font-semibold border-b pb-2">
        <span>City</span>
        <span>API AQI</span>
        <span>ML AQI</span>
        <span>PM2.5</span>
      </div>

      {citiesData.map(city => (
        <Link
          key={city.city}
          to={`/city/${city.city}`}
          className="grid grid-cols-4 py-2 hover:bg-zinc-100"
        >
          <span>{city.city}</span>
          <span>{city.aqi_api}</span>
          <span>{city.aqi_ml}</span>
          <span>{city.pollutants.pm25}</span>
        </Link>
      ))}
    </div>
  );
};

export default TableCard;
