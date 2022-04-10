import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Home from "./components/Home";
import Login from "./components/Login";

const App = () => {
  let navigate = useNavigate();
  useEffect(() => {
    localStorage.getItem("alkemyToken") ? navigate("/") : navigate("/login");
  }, []);

  return (
    <div className="mh-100">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
