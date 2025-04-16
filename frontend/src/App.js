import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthLogin from "./pages/AuthLogin";
import ClientHome from "./pages/ClientHome";
import RoleSelection from "./pages/RoleSelection";

import FreelancerHome from "./pages/FreelancerHome";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<AuthLogin />} />
        <Route path="/client/home" element={<ClientHome />} />
        <Route path="/client/home" element={<ClientHome user={user} />} />
        <Route path="/freelancer/home" element={<FreelancerHome user={user} />} />
      </Routes>
    </Router>
  );
}

export default App;
