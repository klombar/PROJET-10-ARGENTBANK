import Home from "../../Pages/Home/Home";
import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import Header from "../../Layout/Header/Header";
import Footer from "../../Layout/Footer/Footer";
import SignIn from "../../Pages/Sign-in/Sign-in";
import Dashboard from "../../Pages/Dashboard/Dashboard";
import "./App.css"; 

function App() {

  const token = localStorage.getItem("token");

  useEffect(() => {
    // Si le token est absent, redirige vers la page d'accueil
    if (!token) {
      <Navigate to="/" />;
    }
  }, [token]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/Dashboard" element={<Dashboard />} />
      </Routes>
      <Footer />
      </>
  );
}

export default App;