import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef } from "react";

const LocationCard = ({
  Location,
  Region,
  Country,
  Longitude,
  Latitude,
  Density,
}) => {
  const boxRef = useRef();

  useGSAP(() => {
    gsap.from(boxRef.current, {
      y: -50,
      delay: 0,
      duration: 0.5,
      opacity: 0,
    });
  });
  return (
    <div
      ref={boxRef}
      className="rounded-3xl shadow-md flex flex-col justify-between h-[16.45rem] w-[20rem] bg-[#f5f5f5] dark:bg-[#353535]"
    >
      <div className="bg-white h-36 flex flex-col justify-between dark:bg-[#242424] p-7 shadow-xl rounded-3xl">
        <h1 className="text-black dark:text-white text-xl font-bold">
          {Location}
        </h1>
        <div className=" flex flex-row gap-24">
          <h2 className="text-zinc-700 dark:text-zinc-300 font-bold ">
            {Region}
          </h2>
          <h2 className="text-zinc-700 dark:text-zinc-300 font-bold ">
            {Country}
          </h2>
        </div>
        <div className="flex flex-row justify-between">
          <h2 className="text-zinc-700 dark:text-zinc-300 font-bold text-xs">
            longitude : {Longitude}
          </h2>
          <h2 className="text-zinc-700 dark:text-zinc-300 font-bold text-xs">
            Latitude : {Latitude}
          </h2>
        </div>
      </div>
      <div className="bg-white h-28 dark:bg-[#242424] shadow-xl p-7 rounded-3xl">
        <div className="flex flex-row justify-between">
          <h2 className="text-black w-32 dark:text-zinc-300 text-xl font-bold ">
            Population Density
          </h2>
          <h2 className="text-zinc-700 dark:text-zinc-300 font-bold text-2xl">
            {Density}
            <br></br>
            <span className="text-xs">person/Km</span>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default LocationCard;
