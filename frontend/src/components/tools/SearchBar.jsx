import { useState, useContext } from "react";
import { AQIContext } from "../../context/AQIContext";

const SearchBar = () => {
  const [city, setCity] = useState("");
  const { fetchCityData } = useContext(AQIContext);

  const submit = (e) => {
    e.preventDefault();
    if (!city.trim()) return;
    fetchCityData(city.trim());
    setCity("");
  };

  return (
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
  );
};

export default SearchBar;
