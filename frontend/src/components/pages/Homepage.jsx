import SearchBar from "../tools/SearchBar";
import TableCard from "../ui/TableCard";
import { useEffect, useContext } from "react";
import { AQIContext } from "../../context/AQIContext";
import { Link } from "react-router-dom";

const Homepage = () => {
  const { fetchCityData } = useContext(AQIContext);

  useEffect(() => {
    ["Delhi", "Mumbai", "Kanpur"].forEach(fetchCityData);
  }, []);

  return (
    <div className="p-4 h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Location Table</h1>

        <div className="flex gap-3 items-center">
          <Link to="/manual">
            <button className="px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition">
              Manual Predict
            </button>
          </Link>

          <SearchBar />
        </div>
      </div>

      <TableCard />
    </div>
  );
};

export default Homepage;
