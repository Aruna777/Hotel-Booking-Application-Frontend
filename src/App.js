import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./navbar/Login";
import Register from "./navbar/Register";
import Navbar from "./navbar/Navbar";
import Home from "./Home";
import backgroundImage from "./assets/image.jpg";
import OffersModal from "./navbar/OffersModal";

const App = () => {
  const [showOffersModal, setShowOffersModal] = useState(false);

  return (
    <Router>
      <div
        className="min-h-screen bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <Navbar setShowOffersModal={setShowOffersModal} />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
        </Routes>

        {showOffersModal && (
          <OffersModal setShowOffersModal={setShowOffersModal} />
        )}
      </div>
    </Router>
  );
};

export default App;
