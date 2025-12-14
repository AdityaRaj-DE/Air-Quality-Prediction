import React, { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/Context";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { AQIContext } from "../../context/AQIContext";
const SearchBar = ({ placeholder = "Search..." }) => {
  const wdata = useContext(UserContext);
  const { citiesData, fetchCityData } = useContext(AQIContext);

  // Correctly access the first array of data
  const data = wdata[0];
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Optional: Add any specific submit behavior if needed
  };

  // Filter function to match search query
  const filteredData = data.filter(
    (item) =>
      item.City.toLowerCase().includes(query.toLowerCase()) ||
      item.Region.toLowerCase().includes(query.toLowerCase()) ||
      item.Country.toLowerCase().includes(query.toLowerCase())
  );
  const holderRef= useRef();
  useGSAP(()=>{
    gsap.from(holderRef.current,()=>{
      
    })
  })

  fetchCityData(item.city);
navigate(`/city/${item.city}`);

  return (
    <div className="w-64 relative">
      <form onSubmit={handleSubmit}>
        <div className="relative ">
          <input
            ref={holderRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="w-full px-4 py-2 dark:text-white pl-10 shadow-md text-sm rounded-full focus:outline-none focus:ring-zinc-500 bg-white dark:bg-[#242424]"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-zinc-400">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </form>

      {query && (
        <div className="absolute no-scrollbar z-10 w-full mt-1 bg-white dark:bg-[#242424] rounded-lg shadow-lg max-h-96 overflow-y-auto">
          {filteredData.length > 0 ? (
            filteredData.map((item, index) => (
              <Link
                key={item.LocationID}
                to={`/${item.LocationID}`}
                className="block hover:bg-zinc-100 dark:hover:bg-[#242424]"
              >
                <div className="flex flex-row justify-between p-2 no-scrollbar ">
                  <span className="text-zinc-900 dark:text-zinc-100">
                    {item.City}
                  </span>
                  <span className="text-zinc-500 text-sm">{item.Country}</span>
                </div>
              </Link>
            ))
          ) : (
            <div className="p-2 text-center text-zinc-500">
              No results found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
