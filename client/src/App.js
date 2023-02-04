import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import FirstPage from "./Pages/FirstPage";
import ErrorPage from "./Pages/ErrorPage";
import HomePage from "./Pages/HomePage";
import Settings from "./Pages/Settings";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="homepage" element={<HomePage />} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
