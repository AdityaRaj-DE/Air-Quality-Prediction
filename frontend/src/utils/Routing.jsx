import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "../components/pages/Homepage";
import LocationPage from "../components/pages/LocationPage";
import AQIProvider from "../context/AQIContext";

const Routing = () => {
  return (
   
      <AQIProvider>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/city/:city" element={<LocationPage />} />
        </Routes>
      </AQIProvider>
   
  );
};

export default Routing;
