import React, { useState, useEffect } from "react";
import Home from "../../Pages/Home/Home";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "../../Layout/Header/Header";
import Footer from "../../Layout/Footer/Footer";
import SignIn from "../../Pages/Sign-in/Sign-in";
import Dashboard from "../../Pages/Dashboard/Dashboard";
import Error404 from "../../Pages/Error404/Error404";
import { useSelector } from "react-redux";
import "./App.css";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.token !== null);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route 
          path="/Dashboard" 
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} 
        />
        <Route path="*" element={<Error404 />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
