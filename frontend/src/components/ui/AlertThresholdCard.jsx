import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef } from "react";

const AlertThresholdCard = ({ ThresholdValue, AlertLevel, AlertMessage }) => {
  const boxRef = useRef();

  useGSAP(() => {
    gsap.from(boxRef.current, {
      y: 50,
      delay: 0.6,
      duration: 0.5,
      opacity: 0,
    });
  });
  return (
    <div
      ref={boxRef}
      className="rounded-3xl p-7 h-56 flex flex-col justify-between shadow-xl w-[21rem] bg-white dark:bg-[#242424]"
    >
      <div className="flex flex-row gap-16">
        <h1 className="text-black dark:text-white text-xl font-bold">
          Alert<br></br>Threshold
        </h1>
        <div className="flex flex-col">
          <h1 className="text-xs text-black dark:text-white">Value</h1>
          <h1 className="text-3xl text-black dark:text-white">
            {ThresholdValue}
          </h1>
        </div>
      </div>
      <div className="flex flex-row gap-12 content-center align-middle">
        <h1 className="text-zinc-700 dark:text-zinc-300 text-base font-bold">
          Alert Level -
        </h1>
        <h1 className="text-lg text-black dark:text-white">{AlertLevel}</h1>
      </div>
      <div className="flex flex-row">
        <h2 className="text-zinc-700 dark:text-zinc-300 font-bold ">
          {AlertMessage}
        </h2>
      </div>
    </div>
  );
};

export default AlertThresholdCard;
