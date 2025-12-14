import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";

const ColorModeSwitcher = () => {
  const [theme, setTheme] = useState("light");
  const boxRef = useRef();

  useEffect(() => {
    // Toggle the dark mode class
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Animate the switch button
    gsap.to(boxRef.current, {
      x: theme === "dark" ? 48 : -6, // Adjust the position dynamically
      duration: 0.3,
      ease: "power1.out",
    });
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return (
    <div className="text-xs z-0 bg-white text-black dark:bg-[#242424] dark:text-white px-3 py-1 rounded-full flex items-center justify-between shadow-lg relative">
      {/* Animated Box */}
      <div
        ref={boxRef}
        className="absolute top-1/2 transform -translate-y-1/2 h-6 w-16 bg-black dark:bg-white rounded-full"
      ></div>

      {/* Light Button */}
      <button
        onClick={handleThemeSwitch}
        className="text-xs z-20 text-white dark:text-white px-3 py-1 flex items-center justify-center hover:scale-110 transition-transform duration-200"
        aria-label="Switch to Light Mode"
      >
        Light
      </button>

      {/* Dark Button */}
      <button
        onClick={handleThemeSwitch}
        className="text-xs z-20 text-black dark:text-black px-3 py-1 flex items-center justify-center hover:scale-110 transition-transform duration-200"
        aria-label="Switch to Dark Mode"
      >
        Dark
      </button>
    </div>
  );
};

export default ColorModeSwitcher;
