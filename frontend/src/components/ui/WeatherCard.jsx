import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef } from "react";

const WeatherCard = ({
  Temperature,
  Humidity,
  WindSpeed,
  WindDirection,
  PrecipitationLevel,
  WeatherTimestamp,
}) => {
  const boxRef = useRef();

  useGSAP(()=>{
    gsap.from(boxRef.current,{
      y:50,
      delay:0.4,
      duration:0.5,
      opacity:0
    })
  })
  return (
    <div ref={boxRef} className="rounded-3xl shadow-xl flex flex-col justify-between p-7 h-56 w-[25rem] bg-white dark:bg-[#242424]">
      <h1 className="text-black dark:text-white text-xl font-bold">
        Weather
      </h1>
      <div className="flex flex-row gap-32">
        <div className="flex flex-col">
          <h2 className="text-zinc-700 dark:text-zinc-300 font-bold text-xs">
            Temperatur
          </h2>
          <h2 className="text-zinc-700 dark:text-zinc-300 font-bold text-2xl">
            {Temperature}*C
          </h2>
        </div>
        <div className="flex flex-col">
          <h2 className="text-zinc-700 dark:text-zinc-300 font-bold text-xs">
            Humidity
          </h2>
          <h2 className="text-zinc-700 dark:text-zinc-300 font-bold text-2xl">
            {Humidity}%
          </h2>
        </div>
      </div>
      <div className="flex flex-row gap-20">
        <h2 className="text-zinc-700 dark:text-zinc-300 font-bold ">
          Wind Speed :
        </h2>
        <h2 className="text-zinc-700 dark:text-zinc-300 font-bold ">
          {WindSpeed} {WindDirection}
        </h2>
      </div>
      <div className="flex flex-row gap-20">
        <h2 className="text-zinc-700 dark:text-zinc-300 font-bold ">
          Precipitate Level :
        </h2>
        <h2 className="text-zinc-700 dark:text-zinc-300 font-bold ">
          {PrecipitationLevel}
        </h2>
      </div>
      <h2 className="text-zinc-700 dark:text-zinc-300 font-bold ">
        {WeatherTimestamp.slice(0, 10)}
      </h2>
    </div>
  );
};

export default WeatherCard;
