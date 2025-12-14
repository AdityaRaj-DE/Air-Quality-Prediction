import React, { useRef } from "react";
import SearchBar from "../tools/SearchBar";
import MetricTableCard from "../ui/MetricTableCard";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";



const Metricpage = () => {
  const str1 = "Metric";
  const str2 = "Table";
  const boxRef1 = useRef([]);
  const boxRef2 = useRef([]);

  useGSAP(() => {
    gsap.from(boxRef1.current, {
      y: -30,
      delay: 0.5,
      duration: 0.2,
      opacity:0,
      stagger: 0.06,
    });
    gsap.from(boxRef2.current, {
      y: -30,
      delay: 0.94,
      duration: 0.2,
      opacity:0,
      stagger: 0.06,
    });
  });
  return (
    <div className="overflow-x-hidden overflow-y-hidden h-screen">
      <div className="flex flex-row">
        <div className="flex flex-col gap-3">
          <div className="flex flex-row justify-between">
            <h1 className="text-3xl text-black dark:text-white">
            {str1.split("").map((char, index) => (
              <span className="inline-block" key={index} ref={(el) => (boxRef1.current[index] = el)}>
                {char}
              </span>
            ))}{` `}
            {str2.split("").map((char, index) => (
              <span className="inline-block" key={index} ref={(el) => (boxRef2.current[index] = el)}>
                {char}
              </span>
            ))}
            </h1>
            <SearchBar />
          </div>
          <MetricTableCard />
        </div>
      </div>
    </div>
  );
};

export default Metricpage;
