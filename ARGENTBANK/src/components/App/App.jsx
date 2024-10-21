import Home from "../../Pages/Home/Home";
import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import Header from "../../Layout/Header/Header";
import Footer from "../../Layout/Footer/Footer";
import SignIn from "../../Pages/Sign-in/Sign-in";
import Dashboard from "../../Pages/Dashboard/Dashboard";
import Error404 from "../../Pages/Error404/Error404";
import "./App.css"; 

function App() {

  const token = localStorage.getItem("token");

  useEffect(() => {
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
        <Route path="*" element={<Error404 />} />
      </Routes>
      <Footer />
      </>
  );
}

export default App;