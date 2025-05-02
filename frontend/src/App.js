import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthLogin from "./pages/AuthLogin";
import ClientHome from "./pages/ClientHome";
import RoleSelection from "./pages/RoleSelection";
import JobRequests from "./pages/JobRequests";
import FreelancerHome from "./pages/FreelancerHome";
import FreelancerProfile from "./pages/FreelancerProfile";
import TicketSupport from "./pages/TicketSupport";
import AdminHome from "./pages/AdminHome";
import "bootstrap/dist/css/bootstrap.min.css";

import ViewFreelancers from "./pages/ViewFreelancers";
import Progress from "./pages/Progress";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthLogin />} />
        <Route path="/client/home" element={<ClientHome user={user} />} />
        <Route
          path="/freelancer/home"
          element={<FreelancerHome user={user} />}
        />
        <Route path="/admin/home" element={<AdminHome user={user} />} />
        <Route path="/roles" element={<RoleSelection />} />
        <Route path="/freelancer/jobs" element={<JobRequests />} />
        <Route path="/profile" element={<FreelancerProfile />} />
        <Route path="/view/freelancers" element={<ViewFreelancers />} />
        <Route path="/admin/support" element={<TicketSupport />} />
        <Route path="/progress" element={<Progress />} />

      </Routes>
    </Router>
  );
}

export default App;
