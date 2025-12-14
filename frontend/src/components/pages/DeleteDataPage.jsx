import React, { useContext, useState } from "react";
import axios from "axios";
import { UserLoginContext } from "../../context/LoginContext";
import LoginPage from "./Loginpage";
import ButtonMain from "../tools/ButtonMain";
import InputTag from "../tools/InputTag";

const DeleteDataPage = () => {
  const { login } = useContext(UserLoginContext);
  // States to hold IDs for deletion
  const [locationID, setLocationID] = useState("");
  const [sourceID, setSourceID] = useState("");
  const [metricID, setMetricID] = useState("");
  const [readingID, setReadingID] = useState("");
  const [conditionID, setConditionID] = useState("");
  const [thresholdID, setThresholdID] = useState("");
  const [inventoryID, setInventoryID] = useState("");
  const [trendID, setTrendID] = useState("");

  // Handler for delete requests
  const handleDelete = async (endpoint, id) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL_ALT || 'http://localhost:8081';
      const response = await axios.delete(
        `${apiUrl}/delete/${endpoint}/${id}`
      );
      alert(response.data.message);
    } catch (error) {
      console.error("Error deleting data:", error);
      alert("Failed to delete data. Please try again.");
    }
  };

  return login === 1 ? (
    <div className="flex flex-row">
      <div>
        <h1 className="text-3xl text-zinc-800 dark:text-white ">
          Delete Data from Database
        </h1>
        <div className="flex flex-row gap-20">
          <div className="">
            <h2 className="mt-9 bg-white dark:bg-[#242424] p-1 px-3 -mb-4 pb-4 text-zinc-600 dark:text-zinc-400 w-72 rounded-xl">
              Delete Location
            </h2>
            <form
              className="bg-white dark:bg-[#242424] rounded-xl pr-5 py-2"
              onSubmit={(e) => {
                e.preventDefault();
                handleDelete("location", locationID);
              }}
            >
              <InputTag
                type="number"
                placeholder="LocationID"
                value={locationID}
                onChange={(e) => setLocationID(e.target.value)}
              />
              <ButtonMain value="Delete" />
            </form>

            {/* Delete Pollution Source */}
            <h2 className="mt-9 bg-white dark:bg-[#242424] p-1 px-3 -mb-4 pb-4 text-zinc-600 dark:text-zinc-400 w-72 rounded-xl">
              Delete Pollution Source
            </h2>
            <form
              className="bg-white dark:bg-[#242424] rounded-xl pr-5 py-2"
              onSubmit={(e) => {
                e.preventDefault();
                handleDelete("pollutionsource", sourceID);
              }}
            >
              <InputTag
                type="number"
                placeholder="SourceID"
                value={sourceID}
                onChange={(e) => setSourceID(e.target.value)}
              />
              <ButtonMain value="Delete" />
            </form>

            {/* Delete Air Quality Metric */}
            <h2 className="mt-9 bg-white dark:bg-[#242424] p-1 px-3 -mb-4 pb-4 text-zinc-600 dark:text-zinc-400 w-72 rounded-xl">
              Delete Air Quality Metric
            </h2>
            <form
              className="bg-white dark:bg-[#242424] rounded-xl pr-5 py-2"
              onSubmit={(e) => {
                e.preventDefault();
                handleDelete("airqualitymetric", metricID);
              }}
            >
              <InputTag
                type="number"
                placeholder="MetricID"
                value={metricID}
                onChange={(e) => setMetricID(e.target.value)}
              />
              <ButtonMain value="Delete" />
            </form>

            {/* Delete Pollution Reading */}
            <h2 className="mt-9 bg-white dark:bg-[#242424] p-1 px-3 -mb-4 pb-4 text-zinc-600 dark:text-zinc-400 w-72 rounded-xl">
              Delete Pollution Reading
            </h2>
            <form
              className="bg-white dark:bg-[#242424] rounded-xl pr-5 py-2"
              onSubmit={(e) => {
                e.preventDefault();
                handleDelete("pollutionreading", readingID);
              }}
            >
              <InputTag
                type="number"
                placeholder="ReadingID"
                value={readingID}
                onChange={(e) => setReadingID(e.target.value)}
              />
              <ButtonMain value="Delete" />
            </form>
          </div>
          <div className="">
            <h2 className="mt-9 bg-white dark:bg-[#242424] p-1 px-3 -mb-4 pb-4 text-zinc-600 dark:text-zinc-400 w-72 rounded-xl">
              Delete Weather Condition
            </h2>
            <form
              className="bg-white dark:bg-[#242424] rounded-xl pr-5 py-2"
              onSubmit={(e) => {
                e.preventDefault();
                handleDelete("weathercondition", conditionID);
              }}
            >
              <InputTag
                type="number"
                placeholder="ConditionID"
                value={conditionID}
                onChange={(e) => setConditionID(e.target.value)}
              />
              <ButtonMain value="Delete" />
            </form>

            {/* Delete Alert Thresholds */}
            <h2 className="mt-9 bg-white dark:bg-[#242424] p-1 px-3 -mb-4 pb-4 text-zinc-600 dark:text-zinc-400 w-72 rounded-xl">
              Delete Alert Thresholds
            </h2>
            <form
              className="bg-white dark:bg-[#242424] rounded-xl pr-5 py-2"
              onSubmit={(e) => {
                e.preventDefault();
                handleDelete("alertthresholds", thresholdID);
              }}
            >
              <InputTag
                type="number"
                placeholder="ThresholdID"
                value={thresholdID}
                onChange={(e) => setThresholdID(e.target.value)}
              />
              <ButtonMain value="Delete" />
            </form>

            {/* Delete Emissions Inventory */}
            <h2 className="mt-9 bg-white dark:bg-[#242424] p-1 px-3 -mb-4 pb-4 text-zinc-600 dark:text-zinc-400 w-72 rounded-xl">
              Delete Emissions Inventory
            </h2>
            <form
              className="bg-white dark:bg-[#242424] rounded-xl pr-5 py-2"
              onSubmit={(e) => {
                e.preventDefault();
                handleDelete("emissionsinventory", inventoryID);
              }}
            >
              <InputTag
                type="number"
                placeholder="InventoryID"
                value={inventoryID}
                onChange={(e) => setInventoryID(e.target.value)}
              />
              <ButtonMain value="Delete" />
            </form>

            {/* Delete Air Quality Trend */}
            <h2 className="mt-9 bg-white dark:bg-[#242424] p-1 px-3 -mb-4 pb-4 text-zinc-600 dark:text-zinc-400 w-72 rounded-xl">
              Delete Air Quality Trend
            </h2>
            <form
              className="bg-white dark:bg-[#242424] rounded-xl pr-5 py-2"
              onSubmit={(e) => {
                e.preventDefault();
                handleDelete("airqualitytrend", trendID);
              }}
            >
              <InputTag
                type="number"
                placeholder="TrendID"
                value={trendID}
                onChange={(e) => setTrendID(e.target.value)}
              />
              <ButtonMain value="Delete" />
            </form>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <LoginPage />
  );
};

export default DeleteDataPage;
