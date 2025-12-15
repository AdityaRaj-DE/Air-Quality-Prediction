import SearchBar from "../tools/SearchBar";
import TableCard from "../ui/TableCard";
import { useEffect, useContext } from "react";
import { AQIContext } from "../../context/AQIContext";
const Homepage = () => {
  const { fetchCityData } = useContext(AQIContext);

  useEffect(() => {
    ["Delhi", "Mumbai", "Kanpur"].forEach(fetchCityData);
  }, []);
  return (
    <div className="p-4 h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Location Table</h1>
        <SearchBar />
      </div>
      <TableCard />
    </div>
  );
};

export default Homepage;
