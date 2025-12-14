import React, { useContext, useRef } from "react";
import { UserContext } from "../../context/Context";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const MetricTableCard = () => {
  const wdata = useContext(UserContext);

  // Correctly access the first array of data
  const data = wdata[1];
  const boxRef = useRef();
  const lineRefs=useRef([]);
  useGSAP(()=>{
    gsap.from(boxRef.current,{
      y:-50,
      delay:0,
      duration:0.5,
      opacity:0
    })
    gsap.from(lineRefs.current,{
      y:-50,
      delay:0.1,
      duration:0.1,
      opacity:0,
      stagger:0.1
    })
  })
  return (
    <div ref={boxRef} className="h-screen w-[67rem]">
      <div className="h-[85%] shadow-md bg-white dark:bg-[#242424] w-full rounded-xl flex flex-col items-center">
        {/* Header Section */}
        <div className="w-11/12">
          <h1 className="text-black dark:text-white text-xl font-bold pt-5 pb-2">
            India's Status
          </h1>
        </div>

        {/* Table Headers */}
        <div className=" h-96 w-full px-20">
          <div className="flex w-full flex-row justify-around">
            <h1 className="w-36 p-2 text-zinc-400 dark:text-zinc-600 text-center">
              Metric Name
            </h1>
            <h1 className="w-36 p-2 text-zinc-400 dark:text-zinc-600 text-center">
              Measurment
            </h1>
            <h1 className="w-36 p-2 text-zinc-400 dark:text-zinc-600 text-center">
              Hazard Level
            </h1>
          </div>

          {/* Divider */}
          <div className="w-full bg-zinc-300 dark:bg-zinc-700 h-0.5"></div>

          <div className="h-96 overflow-y-scroll no-scrollbar">
            {data.map((item, index) => (
              <div ref={(el)=>(lineRefs.current[index] = el)} key={index} className="flex w-full flex-row justify-around">
                <h1 className="w-72 text-zinc-900 dark:text-white p-2 text-center">
                  {item.MetricName}
                </h1>
                <h1 className="w-72 text-zinc-900 dark:text-white p-2 text-center">
                  {item.MeasurementUnit || "N/A"}
                </h1>
                <h1 className="w-72 text-zinc-900 dark:text-white p-2 text-center">
                  {item.HazardLevel || "N/A"}
                </h1>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricTableCard;
