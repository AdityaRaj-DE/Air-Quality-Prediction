import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Context from "./context/Context.jsx";
import LoginContext from "./context/LoginContext.jsx";

createRoot(document.getElementById("root")).render(
  <Context>
    <LoginContext>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </LoginContext>
  </Context>
);
