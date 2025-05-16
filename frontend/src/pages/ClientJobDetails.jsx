import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "./ClientJobDetails.css";
import API_URL from "../config/api";

const ClientJobDetails = () => {
  const { jobId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [job, setJob] = useState(state?.job || null);
  const [loading, setLoading] = useState(!state?.job);
  const [error, setError] = useState("");

  useEffect(() => {
    if (job) return;//dont fetch the job again since its already passed to state in client home

    const fetchJobDetails = async () => {
      try {
        const res = await fetch(
          `${API_URL}/api/service-requests/client/job/${jobId}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        setJob(data);
      } catch (err) {
        console.error("Error fetching job details:", err);
        setError("Failed to load job details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [jobId, job]);

  if (loading) {
    return <div className="loading">Loading job details...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!job) {
    return <div className="not-found">Job not found</div>;
  }

  return (
    <main className="client-job-details">
      <section className="job-details-container">
        <h1 className="header-text">Job Details</h1>
        
        <article className="detailed-job-card">
          <div className="job-info-section">
            <p><strong>Service Type:</strong> {job.serviceType}</p>
            <p>
              <strong>Freelancer: </strong>
              {job.freelancerId !== null
                ? job.freelancerId?.username
                : "No Freelancer Assigned Yet"}
            </p>
            <p><strong>Status:</strong> {job.status}</p>
            <p><strong>Progress:</strong> {job.progressActual}%</p>
          </div>

          <div className="financial-info-section">
            <p><strong>Total Price: R</strong> {job.price}</p>
            <p>
              <strong>Amount Outstanding: R</strong>{" "}
              {((job.progressActual - job.progressPaid) / 100) * job.price}
            </p>
          </div>

          <div className="action-buttons">
            <button
              className="btnBack"
              onClick={() => navigate("/client/home")}
            >
              Back to Jobs
            </button>
          </div>
        </article>
      </section>
    </main>
  );
};

export default ClientJobDetails;