import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AnimatedRoutes from "./components/AnimatedRoutes/AnimatedRoutes";
import { UserContext } from "./Helpers/Context";
import { useState } from "react";
import Footer from "./components/Footer/Footer";

function App() {
  const [username, setUsername] = useState("");
  return (
    <UserContext.Provider value={{ username, setUsername }}>
      <div className="app">
        <BrowserRouter>
          <AnimatedRoutes />
        </BrowserRouter>
      </div>
    </UserContext.Provider>
  );
}

export default App;
