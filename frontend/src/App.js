/* import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthLogin from "./pages/AuthLogin";
import ClientHome from "./pages/ClientHome";
import RoleSelection from "./pages/RoleSelection";
import JobRequests from "./pages/JobRequests";
import FreelancerHome from "./pages/FreelancerHome";
import FreelancerProfile from "./pages/FreelancerProfile";
import TicketSupport from "./pages/TicketSupport";
import AdminHome from "./pages/AdminHome";
import JobApplications from "./pages/JobApplications";
import "bootstrap/dist/css/bootstrap.min.css";

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
        <Route path="/myjobs/:jobId" element={<JobApplications />} />
        <Route path="/admin/support" element={<TicketSupport />} />
      </Routes>
    </Router>
  );
}

export default App;


//App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthLogin from "./pages/AuthLogin";
import ClientHome from "./pages/ClientHome";
import RoleSelection from "./pages/RoleSelection";
import JobRequests from "./pages/JobRequests";
import FreelancerHome from "./pages/FreelancerHome";
import FreelancerProfile from "./pages/FreelancerProfile";
import CreateProfile from "./pages/CreateProfile";
import TicketSupport from "./pages/TicketSupport";
import AdminHome from "./pages/AdminHome";
import "bootstrap/dist/css/bootstrap.min.css";

import ViewFreelancers from "./pages/ViewFreelancers";
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
        <Route path="/admin/home" element={<AdminHome />} />
        <Route path="/roles" element={<RoleSelection />} />
        <Route path="/freelancer/home" element={<FreelancerHome user={user} />} />
        <Route path="/freelancer/jobs" element={<JobRequests />} /> 
        <Route path="/create/profile" element={<CreateProfile />} />
        <Route path="/profile" element={<FreelancerProfile user={user}/>} />
        <Route path="/view/freelancers" element={<ViewFreelancers />} />
        <Route path="/admin/support" element={<TicketSupport />} />
      </Routes>
    </Router>
  );
}

export default App;*/

import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthLogin from "./pages/AuthLogin";
import ClientHome from "./pages/ClientHome";
import RoleSelection from "./pages/RoleSelection";
import JobRequests from "./pages/JobRequests";
import FreelancerHome from "./pages/FreelancerHome";
import FreelancerProfile from "./pages/FreelancerProfile";
import CreateProfile from "./pages/CreateProfile";
import TicketSupport from "./pages/TicketSupport";
import AdminHome from "./pages/AdminHome";
import JobApplications from "./pages/JobApplications";
import ManageAccounts from "./pages/ManageAccounts";
import ManageJobs from "./pages/ManageJobs";
//import ViewFreelancers from "./pages/ViewFreelancers";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const user = JSON.parse(localStorage.getItem("user")); // Retrieve user data from localStorage
  const [role, setRole] = useState(""); // Store the selected role

  return (
    <Router>
      <Routes>
        {/* Authentication/Login Page */}
        <Route path="/" element={<AuthLogin />} />

        {/* Client Home Page */}
        <Route path="/client/home" element={<ClientHome user={user} />} />

        {/* Freelancer Home Page */}
        <Route
          path="/freelancer/home"
          element={<FreelancerHome user={user} />}
        />

        {/* Admin Home Page */}
        <Route path="/admin/home" element={<AdminHome />} />

        {/* Role Selection Page */}
        <Route
          path="/roles"
          element={
            <RoleSelection
              setRole={setRole}
              setEmail={(email) => (user.email = email)}
            />
          }
        />

        {/* Freelancer Job Requests */}
        <Route path="/freelancer/jobs" element={<JobRequests />} />

        {/* Create Profile Page */}
        <Route
          path="/create-profile"
          element={<CreateProfile email={user?.email} role={role} />}
        />

        {/* Freelancer Profile Page */}
        <Route path="/profile" element={<FreelancerProfile user={user} />} />

        {/* Admin Ticket Support Page */}
        <Route path="/admin/support" element={<TicketSupport />} />
        <Route path="/myjobs/:jobId" element={<JobApplications />} />
        {/* route to show all user accounts on admin dashboard */}
        <Route path="/admin/manage-accounts" element={<ManageAccounts />} />
        <Route path="/admin/manage-jobs" element={<ManageJobs />} />
      </Routes>
    </Router>
  );
}

export default App;
