import React, { useContext, useRef } from "react";
import WeatherCard from "../ui/WeatherCard";
import PollutionSourceCard from "../ui/PollutionSourceCard";
import PollutionReadingCard from "../ui/PollutionReadingCard";
import AverageValueCard from "../ui/AverageValueCard";
import AlertThresholdCard from "../ui/AlertThresholdCard";
import EmissionRateCard from "../ui/EmissionRateCard";
import LocationCard from "../ui/LocationCard";
import SearchBar from "../tools/SearchBar";
import { UserContext } from "../../context/Context";
import { useParams } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const LocationPage = () => {
  const { index } = useParams();
  const wdata = useContext(UserContext);

  const data = wdata[0];
  const value = data[index - 1];

  const str1 = "DashBoard"

  const boxRef = useRef();
  const boxRef1 = useRef([]);
  useGSAP(()=>{
    gsap.from(boxRef.current,{
      x:500,
      delay:0,
      duration:0.8,
      opacity:0
    })
    gsap.from(boxRef1.current, {
      y: -30,
      delay: 0.5,
      duration: 0.2,
      opacity:0,
      stagger: 0.06,
    });
  })
  return (
    <div className="">
      <div className="flex flex-row gap-3">
        <div className="w-[97.8%]">
          <div className="flex flex-col gap-3">
            <div className="flex flex-row justify-between">
              <h1 className="text-3xl text-black dark:text-white">
              {str1.split("").map((char, index) => (
              <span className="inline-block" key={index} ref={(el) => (boxRef1.current[index] = el)}>
                {char}
              </span>
            ))}
              </h1>
              <SearchBar />
            </div>
            <div className="w-full">
              <div className="w-full h-0.5 mb-1 bg-black dark:bg-white"></div>
              <h1 ref={boxRef} className="text-black dark:text-white">
                {value.Description}
              </h1>
              <div className="w-full h-0.5 mt-1 bg-black dark:bg-white"></div>
            </div>
            <div className="flex flex-row gap-3">
              <LocationCard
                Location={value.City}
                Region={value.Region}
                Country={value.Country}
                Longitude={value.Longitude}
                Latitude={value.Latitude}
                Density={value.PopulationDensity}
              />
              <PollutionSourceCard
                SourceType={value.SourceType}
                EmissionType={value.EmissionType}
                MeasurmentUnit={value.MeasurementUnit}
                HazardLevel={value.HazardLevel}
                Description={value.Description}
              />
              <div className="flex flex-col gap-3 justify-center">
                <AverageValueCard
                  AverageValue={value.AverageValue}
                  StartDate={value.StartDate}
                  EndDate={value.EndDate}
                />
                <EmissionRateCard
                  EmissionRate={value.EmissionRate}
                  EmissionTimestamp={value.EmissionTimestamp}
                />
              </div>
            </div>
            <div className="flex flex-row gap-3">
              <WeatherCard
                Temperature={value.Temperature}
                Humidity={value.Humidity}
                WindSpeed={value.WindSpeed}
                WindDirection={value.WindDirection}
                PrecipitationLevel={value.PrecipitationLevel}
                WeatherTimestamp={value.WeatherTimestamp}
              />
              <PollutionReadingCard
                Value={value.PollutionValue}
                ReadingAccuracy={value.ReadingAccuracy}
                ReadingTimestamp={value.PollutionTimestamp}
              />

              <AlertThresholdCard
                ThresholdValue={value.ThresholdValue}
                AlertLevel={value.AlertLevel}
                AlertMessage={value.AlertMessage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationPage;
