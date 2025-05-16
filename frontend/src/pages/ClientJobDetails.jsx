import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "./ClientJobDetails.css";
import API_URL from "../config/api";
import axios from "axios";
const ClientJobDetails = () => {
  const { jobId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [job, setJob] = useState(state?.job || null);
  const [loading, setLoading] = useState(!state?.job);
  const [error, setError] = useState("");
  const [milestones, setMilestones] = useState([]);
  const [milestonesLoading, setMilestonesLoading] = useState(true);
  const [milestonesError, setMilestonesError] = useState("");

  useEffect(() => {
    if (job) {
      // Fetch milestones
      const fetchMilestones = async () => {
        try {
          const res = await fetch(`${API_URL}/api/milestones/job/${jobId}`, {
            method: "GET",
            credentials: "include",
          });

          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }

          const data = await res.json();
          setMilestones(data);
        } catch (err) {
          console.error("Error fetching milestones:", err);
          setMilestonesError("Failed to load milestones.");
        } finally {
          setMilestonesLoading(false);
        }
      };

      fetchMilestones();
    }
  }, [job, jobId]);

  useEffect(() => {
    if (job) return; // don't fetch the job again since it's already passed to state in client home

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
    return <section className="loading">Loading job details...</section>;
  }

  if (error) {
    return <section className="error">{error}</section>;
  }

  if (!job) {
    return <section className="not-found">Job not found</section>;
  }
  const handlePay = async (id) => {
    //console.log("Button clicked!");
    const email = "***@example.com";
    //need a call to backend to retrieve price from applications model.
    //need to handle payment logic as well

    try {
      const response = await axios.post(
        `${API_URL}/payments/create-checkout-session`,
        {
          email: email,
          jobId: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Full response:", response);
      const { checkoutUrl } = response.data;

      // Redirect user to the checkout page
      window.location.href = checkoutUrl;
    } catch (error) {
      console.error("Error creating checkout session:", error);
    }
  };
  return (
    <main className="client-job-details">
      <section className="job-details-container">
        <h1 className="header-text">Job Details</h1>

        <article className="detailed-job-card">
          <section className="job-info-section">
            <p>
              <strong>Service Type:</strong> {job.serviceType}
            </p>
            <p>
              <strong>Freelancer: </strong>
              {job.freelancerId !== null
                ? job.freelancerId?.username
                : "No Freelancer Assigned Yet"}
            </p>
            <p>
              <strong>Status:</strong> {job.status}
            </p>
            <p>
              <strong>Progress:</strong> {job.progressActual}%
            </p>
          </section>

          <section className="financial-info-section">
            <p>
              <strong>Total Price: R</strong> {job.price}
            </p>
            <p>
              <strong>Amount Outstanding: R</strong>{" "}
              {((job.progressActual - job.progressPaid) / 100) * job.price}
            </p>
          </section>
          <section className="action-buttons-rowebra">
            <button
              className="btnCheck"
              onClick={() => handlePay(job._id)}>
              Checkout
            </button>
            <button
              className="btnBack"
              onClick={() => navigate("/client/home")}>
              Back to Client Home
            </button>

          </section>
        </article>
      </section>

      <section className="milestones-section">
        <h2>Project Milestones</h2>

        {milestonesLoading && <p>Loading milestones...</p>}

        {milestonesError && <p className="error">{milestonesError}</p>}

        {!milestonesLoading && milestones.length === 0 && (
          <p>No milestones have been set for this project yet.</p>
        )}

        <ul className="milestones-list">
          {milestones.map((milestone) => (
            <li
              key={milestone._id}
              className={`milestone-item ${milestone.status.toLowerCase()}`}
            >
              <h3>{milestone.description}</h3>
              <p>
                <strong>Due Date:</strong>{" "}
                {new Date(milestone.dueDate).toLocaleDateString()}
              </p>
              <p>
                <strong>Status:</strong> {milestone.status}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default ClientJobDetails;
