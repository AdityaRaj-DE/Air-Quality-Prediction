import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef } from "react";

const EmissionRateCard = ({ EmissionRate, EmissionTimestamp }) => {
  const boxRef = useRef();

  useGSAP(()=>{
    gsap.from(boxRef.current,{
      y:50,
      delay:0.3,
      duration:0.5,
      opacity:0
    })
  })
  return (
    <div ref={boxRef} className="rounded-3xl shadow-xl flex flex-col justify-between p-7 h-[7.85rem] bg-white dark:bg-[#242424]">
      <div className="flex flex-row justify-between">
        <h1 className="text-black dark:text-zinc-300 text-lg font-bold">
          Emission Rate
        </h1>
        <div className="">
          <h1 className="text-3xl text-black dark:text-white">
            {EmissionRate}
          </h1>
        </div>
      </div>
      <div className="flex flex-row">
        <h2 className="text-zinc-700 dark:text-zinc-300 font-bold text-xs">
          {EmissionTimestamp.slice(0, 10)}
        </h2>
      </div>
    </div>
  );
};

export default EmissionRateCard;
