import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef } from "react";

const PollutionReadingCard = ({ Value, ReadingAccuracy, ReadingTimestamp }) => {
  const boxRef = useRef();

  useGSAP(()=>{
    gsap.from(boxRef.current,{
      y:50,
      delay:0.5,
      duration:0.5,
      opacity:0
    })
  })
  return (
    <div ref={boxRef} className="rounded-3xl shadow-xl flex flex-col justify-between p-7 h-56 w-[21rem] bg-white dark:bg-[#242424]">
      <div className="flex flex-row gap-12">
        <h1 className="text-black dark:text-white text-xl font-bold">
          Pollution<br></br>Reading
        </h1>
        <div className="">
          <h1 className="text-xs text-black dark:text-white">Value</h1>
          <h1 className="text-3xl text-black dark:text-white">{Value}</h1>
        </div>
      </div>
      <div className=" flex flex-row gap-12">
        <h1 className="text-zinc-700 dark:text-zinc-300 font-bold">
          Reading Accuracy
        </h1>
        <h1 className="text-xl text-black dark:text-white">
          {ReadingAccuracy}
        </h1>
      </div>
      <div className="flex flex-row">
        <h2 className="text-zinc-700 dark:text-zinc-300 font-bold ">
          {ReadingTimestamp.slice(0, 10)}
        </h2>
      </div>
    </div>
  );
};

export default PollutionReadingCard;
