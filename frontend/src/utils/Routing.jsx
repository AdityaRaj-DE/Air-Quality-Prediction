import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "../components/pages/Homepage";
import Metricpage from "../components/pages/Metricpage";
import LocationPage from "../components/pages/LocationPage";
import InsertDataPage from "../components/pages/InsertDataPage";
import DeleteDataPage from "../components/pages/DeleteDataPage";
import LoginPage from "../components/pages/Loginpage";
import Navbar from "../components/ui/Navbar";
import AboutPage from "../components/pages/AboutPage";

const Routing = () => {
  const [here, setHere] = useState(1);

  const handleNavChange = (id) => {
    setHere(id);
    console.log("Navbar updated with ID:", id);
  };

  return (
    <div className="flex h-screen overflow-x-hidden overflow-y-hidden">
      {/* Static Navbar */}
      <Navbar setNav={handleNavChange} />

      {/* Dynamic Content Area */}
      <div className="flex-grow p-6">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/metric" element={<Metricpage />} />
          <Route path="/:index" element={<LocationPage />} />
          <Route path="/insertdatapage" element={<InsertDataPage />} />
          <Route path="/deletedatapage" element={<DeleteDataPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default Routing;
