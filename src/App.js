import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";

import Home from "./components/Home";
import Login from "./components/Login";

const App = () => {
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
