import React, { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { UserLoginContext } from "../../context/LoginContext";
import ColorModeSwicher from "../tools/ColorModeSwicher";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Navbar = ({ setNav }) => {
  const { login, setLogin } = useContext(UserLoginContext);
  const handleLogout = () => {
    setLogin(0);
  };

  const menuItems = [
    { name: "Home", path: "/", id: 1, icon: "home-icon" },
    { name: "Metric", path: "/metric", id: 2, icon: "metric-icon" },
    { name: "About", path: "/about", id: 3, icon: "about-icon" },
  ];

  const boxRef = useRef();
  const lineRefs = useRef([]);
  useGSAP(()=>{
    gsap.from(boxRef.current,{
      x:-150,
      delay:0.1,
      duration:0.5
    })
    gsap.from(lineRefs.current,{
      x:-50,
      delay:0.6,
      duration:0.5,
      opacity:0,
      stagger:0.1
    })
  })

  return (
    <nav ref={boxRef} className="flex h-screen shadow-md rounded-xl flex-col">
      <div className="bg-white dark:bg-[#242424] flex flex-col rounded-xl">
        <div className="w-28 mt-12 m-5 flex flex-col rounded-3xl mb-12 items-center">
          <h1 className="text-black dark:text-white font-bold">AQI Project</h1>
        </div>
        <div className="w-20 ml-8 m-5 flex flex-col justify-center">
          <div className="flex flex-col gap-2">
            <h1 className="text-zinc-500 dark:text-[#949494] text-sm font-bold">
              General
            </h1>
            {menuItems.map((item) => (
              <Link
                ref={(el)=>(lineRefs.current[item.id]=el)}
                key={item.id}
                to={item.path}
                onClick={() => setNav(item.id)}
              >
                <div className=" px-2 py-1 rounded-full flex flex-row justify-center gap-2 group hover:bg-black dark:hover:bg-white">
                  <h1 className="text-sm text-black dark:text-white group-hover:text-white dark:group-hover:text-black hover:scale-110 transition-transform duration-200">
                    {item.name}
                  </h1>
                </div>
              </Link>
            ))}
            {login === 1 ? (
              <>
                <h1 className="text-zinc-500 dark:text-[#949494] text-sm font-bold">
                  Operations
                </h1>
                <Link to="/insertdatapage" onClick={() => setNav(4)}>
                  <div className=" px-2 py-1 rounded-full flex flex-row justify-center gap-2 group hover:bg-black dark:hover:bg-white">
                    <h1 className="text-sm text-black dark:text-white group-hover:text-white dark:group-hover:text-black hover:scale-110 transition-transform duration-200">
                      Insert
                    </h1>
                  </div>
                </Link>
                <Link to="/deletedatapage" onClick={() => setNav(5)}>
                  <div className=" px-2 py-1 rounded-full flex flex-row justify-center gap-2 group hover:bg-black dark:hover:bg-white">
                    <h1 className="text-sm text-black dark:text-white group-hover:text-white dark:group-hover:text-black hover:scale-110 transition-transform duration-200">
                      Delete
                    </h1>
                  </div>
                </Link>
              </>
            ) : (
              <div className="h-[5.75rem]">
                <div></div>
              </div>
            )}
          </div>
        </div>
        <div className="w-28 m-5 flex flex-col-reverse items-center h-full"></div>
      </div>

      <div className="w-[9.5rem] rounded-xl h-48 flex flex-col text-center bg-white dark:bg-[#242424] mt-2">
        <div className="w-28 m-5 flex flex-col-reverse items-center h-full">
          <div className="h-11 w-11 rounded-full bg-gradient-to-tr from-[#C0F2D5] to-[#2ED5FF]"></div>
        </div>
        {login === 0 ? (
          <Link to="/login" onClick={() => setNav(6)}>
            <div className=" rounded-full mx-2.5 mb-5 flex flex-row justify-center text-center w-32 group">
              <h1 className="text-xs px-4 py-2 rounded-full text-black dark:text-white group-hover:text-white dark:group-hover:text-black hover:bg-black dark:hover:bg-white hover:scale-110 transition-transform duration-200">
                Login as Admin
              </h1>
            </div>
          </Link>
        ) : (
          <Link onClick={handleLogout}>
            <div className=" rounded-full mx-5 mb-5 flex flex-row justify-center text-center w-28 group">
              <h1 className="text-xs px-4 py-2 rounded-full text-black dark:text-white group-hover:text-white dark:group-hover:text-black hover:bg-black dark:hover:bg-white hover:scale-110 transition-transform duration-200">
                Logout
              </h1>
            </div>
          </Link>
        )}
      </div>
      <div className="h-48 w-28 mx-5 flex items-center justify-center">
        <ColorModeSwicher />
      </div>
    </nav>
  );
};

export default Navbar;
