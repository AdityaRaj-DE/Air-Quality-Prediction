import { useState, useContext } from "react";
import { AQIContext } from "../../context/AQIContext";

const SearchBar = () => {
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const { fetchCityData } = useContext(AQIContext);

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    if (!city.trim()) {
      setError("Please enter a city name");
      return;
    }

    const result = await fetchCityData(city.trim());

    if (!result?.success) {
      setError(result?.message || "City not found");
    } else {
      setCity("");
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <form onSubmit={submit} className="flex gap-2">
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
          className="px-3 py-1 rounded-md outline-none"
        />
        <button className="px-3 py-1 bg-black text-white rounded-md">
          Search
        </button>
      </form>

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default SearchBar;
