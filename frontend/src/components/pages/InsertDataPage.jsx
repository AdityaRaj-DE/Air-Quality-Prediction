import React, { useContext, useState } from "react";
import axios from "axios";
import { UserLoginContext } from "../../context/LoginContext";
import LoginPage from "./Loginpage";
import InputTag from "../tools/InputTag";
import ButtonMain from "../tools/ButtonMain";

const InsertDataPage = () => {
  const { login } = useContext(UserLoginContext);
  const [locationData, setLocationData] = useState({
    LocationID: "",
    City: "",
    Region: "",
    Country: "",
    Latitude: "",
    Longitude: "",
    PopulationDensity: "",
  });

  const [pollutionSourceData, setPollutionSourceData] = useState({
    SourceID: "",
    SourceType: "",
    EmissionType: "",
    Description: "",
    LocationID: "",
  });

  const [airQualityMetricData, setAirQualityMetricData] = useState({
    MetricID: "",
    MetricName: "",
    MeasurementUnit: "",
    HazardLevel: "",
  });

  // State for Pollution Reading
  const [pollutionReadingData, setPollutionReadingData] = useState({
    ReadingID: "",
    Value: "",
    Timestamp: "",
    ReadingAccuracy: "",
    LocationID: "",
    SourceID: "",
    MetricID: "",
  });

  // State for Weather Condition
  const [weatherConditionData, setWeatherConditionData] = useState({
    ConditionID: "",
    Temperature: "",
    Humidity: "",
    WindSpeed: "",
    PrecipitationLevel: "",
    WindDirection: "",
    Timestamp: "",
    LocationID: "",
  });

  // State for Alert Thresholds
  const [alertThresholdsData, setAlertThresholdsData] = useState({
    ThresholdID: "",
    MetricID: "",
    LocationID: "",
    ThresholdValue: "",
    AlertLevel: "",
    AlertMessage: "",
  });

  // State for Emissions Inventory
  const [emissionsInventoryData, setEmissionsInventoryData] = useState({
    InventoryID: "",
    SourceID: "",
    MetricID: "",
    EmissionRate: "",
    Timestamp: "",
  });

  // State for Air Quality Trend
  const [airQualityTrendData, setAirQualityTrendData] = useState({
    TrendID: "",
    LocationID: "",
    MetricID: "",
    AverageValue: "",
    StartDate: "",
    EndDate: "",
  });

  const handleSubmit = async (endpoint, data) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL_ALT || 'http://localhost:8081';
      const response = await axios.post(
        `${apiUrl}/insert/${endpoint}`,
        data
      );
      alert(response.data.message);
    } catch (error) {
      console.error("Error inserting data:", error);
      alert("Failed to insert data. Please check the input.");
    }
  };

  const handleChange = (setter) => (e) => {
    const { name, value } = e.target;
    setter((prevState) => ({ ...prevState, [name]: value }));
  };

  return login === 1 ? (
    <>
      <div className="flex flex-row">
        <div className="h-screen overflow-y-scroll no-scrollbar">
          <div className="mb-10">
            <h1 className="text-3xl text-black dark:text-white">
              Insert Data into Database
            </h1>

            {/* Location Form */}
            <h2 className="bg-white dark:bg-[#242424] w-72 pb-4 -mb-4 p-4 px-8 mt-4 rounded-xl text-zinc-800 dark:text-zinc-300">
              Insert Location
            </h2>
            <form
              className="bg-white dark:bg-[#242424] rounded-xl p-2"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit("location", locationData);
              }}
            >
              <InputTag
                type="number"
                name="LocationID"
                placeholder="LocationID"
                value={locationData.LocationID}
                onChange={handleChange(setLocationData)}
              />
              <InputTag
                type="text"
                name="City"
                placeholder="City"
                value={locationData.City}
                onChange={handleChange(setLocationData)}
              />
              <InputTag
                type="text"
                name="Region"
                placeholder="Region"
                value={locationData.Region}
                onChange={handleChange(setLocationData)}
              />
              <InputTag
                type="text"
                name="Country"
                placeholder="Country"
                value={locationData.Country}
                onChange={handleChange(setLocationData)}
              />
              <InputTag
                type="number"
                step="0.000001"
                name="Latitude"
                placeholder="Latitude"
                value={locationData.Latitude}
                onChange={handleChange(setLocationData)}
              />
              <InputTag
                type="number"
                step="0.000001"
                name="Longitude"
                placeholder="Longitude"
                value={locationData.Longitude}
                onChange={handleChange(setLocationData)}
              />
              <InputTag
                type="number"
                name="PopulationDensity"
                placeholder="PopulationDensity"
                value={locationData.PopulationDensity}
                onChange={handleChange(setLocationData)}
              />
              <div className="m-2 mx-3">
                <ButtonMain value="Submit" />
              </div>
            </form>

            {/* Pollution Source Form */}
            <h2 className="bg-white dark:bg-[#242424] w-72 pb-4 -mb-4 p-4 px-8 mt-4 rounded-xl text-zinc-800 dark:text-zinc-300">
              Insert Pollution Source
            </h2>
            <form
              className="bg-white dark:bg-[#242424] rounded-xl p-2"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit("pollutionsource", pollutionSourceData);
              }}
            >
              <InputTag
                type="number"
                name="SourceID"
                placeholder="SourceID"
                value={pollutionSourceData.SourceID}
                onChange={handleChange(setPollutionSourceData)}
              />
              <InputTag
                type="text"
                name="SourceType"
                placeholder="SourceType"
                value={pollutionSourceData.SourceType}
                onChange={handleChange(setPollutionSourceData)}
              />
              <InputTag
                type="text"
                name="EmissionType"
                placeholder="EmissionType"
                value={pollutionSourceData.EmissionType}
                onChange={handleChange(setPollutionSourceData)}
              />
              <InputTag
                type="text"
                name="Description"
                placeholder="Description"
                value={pollutionSourceData.Description}
                onChange={handleChange(setPollutionSourceData)}
              />
              <InputTag
                type="number"
                name="LocationID"
                placeholder="LocationID"
                value={pollutionSourceData.LocationID}
                onChange={handleChange(setPollutionSourceData)}
              />
              <div className="m-2 mx-3">
                <ButtonMain value="Submit" />
              </div>
            </form>

            {/* Air Quality Metric Form */}
            <h2 className="bg-white dark:bg-[#242424] w-72 pb-4 -mb-4 p-4 px-8 mt-4 rounded-xl text-zinc-800 dark:text-zinc-300">
              Insert Air Quality Metric
            </h2>
            <form
              className="bg-white dark:bg-[#242424] rounded-xl p-2"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit("airqualitymetric", airQualityMetricData);
              }}
            >
              <InputTag
                type="number"
                name="MetricID"
                placeholder="MetricID"
                value={airQualityMetricData.MetricID}
                onChange={handleChange(setAirQualityMetricData)}
              />
              <InputTag
                type="text"
                name="MetricName"
                placeholder="MetricName"
                value={airQualityMetricData.MetricName}
                onChange={handleChange(setAirQualityMetricData)}
              />
              <InputTag
                type="text"
                name="MeasurementUnit"
                placeholder="MeasurementUnit"
                value={airQualityMetricData.MeasurementUnit}
                onChange={handleChange(setAirQualityMetricData)}
              />
              <InputTag
                type="text"
                name="HazardLevel"
                placeholder="HazardLevel"
                value={airQualityMetricData.HazardLevel}
                onChange={handleChange(setAirQualityMetricData)}
              />
              <div className="m-2 mx-3">
                <ButtonMain value="Submit" />
              </div>
            </form>
            {/* Pollution Reading Form */}
            <h2 className="bg-white dark:bg-[#242424] w-72 pb-4 -mb-4 p-4 px-8 mt-4 rounded-xl text-zinc-800 dark:text-zinc-300">
              Insert Pollution Reading
            </h2>
            <form
              className="bg-white dark:bg-[#242424] rounded-xl p-2"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit("pollutionreading", pollutionReadingData);
              }}
            >
              <InputTag
                type="number"
                name="ReadingID"
                placeholder="ReadingID"
                value={pollutionReadingData.ReadingID}
                onChange={handleChange(setPollutionReadingData)}
              />
              <InputTag
                type="number"
                name="Value"
                placeholder="Value"
                value={pollutionReadingData.Value}
                onChange={handleChange(setPollutionReadingData)}
              />
              <InputTag
                type="datetime-local"
                name="Timestamp"
                placeholder="Timestamp"
                value={pollutionReadingData.Timestamp}
                onChange={handleChange(setPollutionReadingData)}
              />
              <InputTag
                type="number"
                step="0.01"
                name="ReadingAccuracy"
                placeholder="ReadingAccuracy"
                value={pollutionReadingData.ReadingAccuracy}
                onChange={handleChange(setPollutionReadingData)}
              />
              <InputTag
                type="number"
                name="LocationID"
                placeholder="LocationID"
                value={pollutionReadingData.LocationID}
                onChange={handleChange(setPollutionReadingData)}
              />
              <InputTag
                type="number"
                name="SourceID"
                placeholder="SourceID"
                value={pollutionReadingData.SourceID}
                onChange={handleChange(setPollutionReadingData)}
              />
              <InputTag
                type="number"
                name="MetricID"
                placeholder="MetricID"
                value={pollutionReadingData.MetricID}
                onChange={handleChange(setPollutionReadingData)}
              />
              <div className="m-2 mx-3">
                <ButtonMain value="Submit" />
              </div>
            </form>

            {/* Weather Condition Form */}
            <h2 className="bg-white dark:bg-[#242424] w-72 pb-4 -mb-4 p-4 px-8 mt-4 rounded-xl text-zinc-800 dark:text-zinc-300">
              Insert Weather Condition
            </h2>
            <form
              className="bg-white dark:bg-[#242424] rounded-xl p-2"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit("weathercondition", weatherConditionData);
              }}
            >
              <InputTag
                type="number"
                name="ConditionID"
                placeholder="ConditionID"
                value={weatherConditionData.ConditionID}
                onChange={handleChange(setWeatherConditionData)}
              />
              <InputTag
                type="number"
                step="0.1"
                name="Temperature"
                placeholder="Temperature"
                value={weatherConditionData.Temperature}
                onChange={handleChange(setWeatherConditionData)}
              />
              <InputTag
                type="number"
                step="0.1"
                name="Humidity"
                placeholder="Humidity"
                value={weatherConditionData.Humidity}
                onChange={handleChange(setWeatherConditionData)}
              />
              <InputTag
                type="number"
                step="0.1"
                name="WindSpeed"
                placeholder="WindSpeed"
                value={weatherConditionData.WindSpeed}
                onChange={handleChange(setWeatherConditionData)}
              />
              <InputTag
                type="number"
                step="0.1"
                name="PrecipitationLevel"
                placeholder="PrecipitationLevel"
                value={weatherConditionData.PrecipitationLevel}
                onChange={handleChange(setWeatherConditionData)}
              />
              <InputTag
                type="text"
                name="WindDirection"
                placeholder="WindDirection"
                value={weatherConditionData.WindDirection}
                onChange={handleChange(setWeatherConditionData)}
              />
              <InputTag
                type="datetime-local"
                name="Timestamp"
                placeholder="Timestamp"
                value={weatherConditionData.Timestamp}
                onChange={handleChange(setWeatherConditionData)}
              />
              <InputTag
                type="number"
                name="LocationID"
                placeholder="LocationID"
                value={weatherConditionData.LocationID}
                onChange={handleChange(setWeatherConditionData)}
              />
              <div className="m-2 mx-3">
                <ButtonMain value="Submit" />
              </div>
            </form>

            {/* Alert Thresholds Form */}
            <h2 className="bg-white dark:bg-[#242424] w-72 pb-4 -mb-4 p-4 px-8 mt-4 rounded-xl text-zinc-800 dark:text-zinc-300">
              Insert Alert Thresholds
            </h2>
            <form
              className="bg-white dark:bg-[#242424] rounded-xl p-2"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit("alertthresholds", alertThresholdsData);
              }}
            >
              <InputTag
                type="number"
                name="ThresholdID"
                placeholder="ThresholdID"
                value={alertThresholdsData.ThresholdID}
                onChange={handleChange(setAlertThresholdsData)}
              />
              <InputTag
                type="number"
                name="MetricID"
                placeholder="MetricID"
                value={alertThresholdsData.MetricID}
                onChange={handleChange(setAlertThresholdsData)}
              />
              <InputTag
                type="number"
                name="LocationID"
                placeholder="LocationID"
                value={alertThresholdsData.LocationID}
                onChange={handleChange(setAlertThresholdsData)}
              />
              <InputTag
                type="number"
                name="ThresholdValue"
                placeholder="ThresholdValue"
                value={alertThresholdsData.ThresholdValue}
                onChange={handleChange(setAlertThresholdsData)}
              />
              <InputTag
                type="text"
                name="AlertLevel"
                placeholder="AlertLevel"
                value={alertThresholdsData.AlertLevel}
                onChange={handleChange(setAlertThresholdsData)}
              />
              <InputTag
                type="text"
                name="AlertMessage"
                placeholder="AlertMessage"
                value={alertThresholdsData.AlertMessage}
                onChange={handleChange(setAlertThresholdsData)}
              />
              <div className="m-2 mx-3">
                <ButtonMain value="Submit" />
              </div>
            </form>

            {/* Emissions Inventory Form */}
            <h2 className="bg-white dark:bg-[#242424] w-72 pb-4 -mb-4 p-4 px-8 mt-4 rounded-xl text-zinc-800 dark:text-zinc-300">
              Insert Emissions Inventory
            </h2>
            <form
              className="bg-white dark:bg-[#242424] rounded-xl p-2"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit("emissionsinventory", emissionsInventoryData);
              }}
            >
              <InputTag
                type="number"
                name="InventoryID"
                placeholder="InventoryID"
                value={emissionsInventoryData.InventoryID}
                onChange={handleChange(setEmissionsInventoryData)}
              />
              <InputTag
                type="number"
                name="SourceID"
                placeholder="SourceID"
                value={emissionsInventoryData.SourceID}
                onChange={handleChange(setEmissionsInventoryData)}
              />
              <InputTag
                type="number"
                name="MetricID"
                placeholder="MetricID"
                value={emissionsInventoryData.MetricID}
                onChange={handleChange(setEmissionsInventoryData)}
              />
              <InputTag
                type="number"
                step="0.1"
                name="EmissionRate"
                placeholder="EmissionRate"
                value={emissionsInventoryData.EmissionRate}
                onChange={handleChange(setEmissionsInventoryData)}
              />
              <InputTag
                type="datetime-local"
                name="Timestamp"
                placeholder="Timestamp"
                value={emissionsInventoryData.Timestamp}
                onChange={handleChange(setEmissionsInventoryData)}
              />
              <div className="m-2 mx-3">
                <ButtonMain value="Submit" />
              </div>
            </form>

            {/* Air Quality Trend Form */}
            <h2 className="bg-white dark:bg-[#242424] w-72 pb-4 -mb-4 p-4 px-8 mt-4 rounded-xl text-zinc-800 dark:text-zinc-300">
              Insert Air Quality Trend
            </h2>
            <form
              className="bg-white dark:bg-[#242424] rounded-xl p-2"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit("airqualitytrend", airQualityTrendData);
              }}
            >
              <InputTag
                type="number"
                name="TrendID"
                placeholder="TrendID"
                value={airQualityTrendData.TrendID}
                onChange={handleChange(setAirQualityTrendData)}
              />
              <InputTag
                type="number"
                name="LocationID"
                placeholder="LocationID"
                value={airQualityTrendData.LocationID}
                onChange={handleChange(setAirQualityTrendData)}
              />
              <InputTag
                type="number"
                name="MetricID"
                placeholder="MetricID"
                value={airQualityTrendData.MetricID}
                onChange={handleChange(setAirQualityTrendData)}
              />
              <InputTag
                type="number"
                name="AverageValue"
                placeholder="AverageValue"
                value={airQualityTrendData.AverageValue}
                onChange={handleChange(setAirQualityTrendData)}
              />
              <InputTag
                type="date"
                name="StartDate"
                placeholder="StartDate"
                value={airQualityTrendData.StartDate}
                onChange={handleChange(setAirQualityTrendData)}
              />
              <InputTag
                type="date"
                name="EndDate"
                placeholder="EndDate"
                value={airQualityTrendData.EndDate}
                onChange={handleChange(setAirQualityTrendData)}
              />
              <div className="m-2 mx-3">
                <ButtonMain value="Submit" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  ) : (
    <LoginPage />
  );
};
export default InsertDataPage;
