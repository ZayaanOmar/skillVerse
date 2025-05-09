import React, { useEffect, useState } from "react";
import API_URL from "../config/api";

const ManageJobs = () => {
  const [serviceRequests, setServiceRequests] = useState([]);

  useEffect(() => {
    const fetchServiceRequests = async () => {
      try {
        const res = await fetch(`${API_URL}/api/service-requests/manage-jobs`, {
          credentials: "include",
        });
        const data = await res.json();

        if (res.ok) {
          setServiceRequests(data);
        } else {
          console.error("Failed to fetch service requests");
        }
      } catch (err) {
        console.error("Error fetching service requests:", err);
      }
    };

    fetchServiceRequests();
  }, []);

  return (
    <section className="container mt-4">
      <h2>Manage Service Requests</h2>
      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>Service Type</th>
            <th>Client Username</th>
            <th>Freelancer Username</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {serviceRequests.length === 0 ? (
            <tr>
              <td colSpan="4">No service requests found.</td>
            </tr>
          ) : (
            serviceRequests.map((request) => (
              <tr key={request._id}>
                <td>{request.serviceType}</td>
                <td>{request.clientId ? request.clientId.username : "Unknown"}</td>
                <td>{request.freelancerId && request.freelancerId.username ? request.freelancerId.username : "Pending"}</td>
                <td>{request.status}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </section>
  );
};

export default ManageJobs;
