import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef } from "react";

const PollutionSourceCard = ({
  SourceType,
  EmissionType,
  MeasurmentUnit,
  HazardLevel,
  Description,
}) => {
  const boxRef = useRef();

  useGSAP(() => {
    gsap.from(boxRef.current, {
      y: -50,
      delay: 0.1,
      duration: 0.5,
      opacity: 0,
    });
  });
  return (
    <div
      ref={boxRef}
      className="rounded-3xl shadow-xl flex flex-col justify-between p-7 h-[16.45rem] w-[29rem] bg-white dark:bg-[#242424]"
    >
      <h1 className="text-black dark:text-white text-xl font-bold">
        Pollution Source
      </h1>
      <div className="flex flex-row gap-10">
        <h2 className="text-zinc-700 dark:text-zinc-300 font-bold ">
          Source Type :
        </h2>
        <h2 className="text-zinc-700 dark:text-zinc-300 font-bold ">
          {SourceType}
        </h2>
      </div>
      <div className="flex flex-row gap-10">
        <h2 className="text-zinc-700 dark:text-zinc-300 font-bold ">
          Emission Type :
        </h2>
        <h2 className="text-black dark:text-white font-bold text-lg">
          {EmissionType} {MeasurmentUnit}
        </h2>
      </div>
      <div className="flex flex-row gap-10">
        <h2 className="text-zinc-700 dark:text-zinc-300 font-bold ">
          Hazard Level :
        </h2>
        <h2 className="text-zinc-700 dark:text-zinc-300 font-bold ">
          {HazardLevel}
        </h2>
      </div>
    </div>
  );
};

export default PollutionSourceCard;
