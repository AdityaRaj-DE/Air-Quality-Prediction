import React, { useRef, useEffect } from "react";
import Routing from "./utils/Routing";
import gsap from "gsap";

function App() {
  const cursorRef = useRef(null);

  const handleMouseMove = (e) => {
    gsap.to(cursorRef.current, {
      x: e.clientX - 20,
      y: e.clientY - 20,
      duration: 0.3,
      ease:"elastic.inout"
    });
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      id="main"
      className="bg-zinc-100 overflow-x-hidden overflow-y-hidden h-full dark:bg-[#1e1e1e]"
    >
      <div
        ref={cursorRef}
        id="cursor"
        className="z-50 h-4 w-4 left-5 top-7 bg-black dark:bg-white rounded-full fixed"
      ></div>
      <Routing />
    </div>
  );
}

export default App;
