import React, { useEffect, useState } from 'react';

function JobRequests() {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState("");
  const [freelancerId, setFreelancerId] = useState(""); // State to store freelancer ID
  const [freelancer, setFreelancer] = useState(null); // State to store freelancer data

  useEffect(() => {
    // Fetch available jobs for the freelancer
    const fetchJobs = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/service-requests/all", {
          credentials: "include", // Include credentials if necessary
        });

        if (res.ok) {
          const data = await res.json();
          setJobs(data);
        } else {
          setError("Failed to fetch jobs");
        }
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError("An error occurred while fetching jobs");
      }
    };

    // Fetch freelancer info
    const fetchFreelancer = async () => {
      try {
        // Fetch the freelancerId from the session or user context (you may need to implement this)
        const freelancerIdFromSession = "FETCHED_FREELANCER_ID"; // Replace this with actual dynamic ID fetching logic

        const res = await fetch(`http://localhost:5000/api/users/freelancer/${freelancerIdFromSession}`, {
          credentials: "include", // Include credentials if necessary
        });

        if (res.ok) {
          const data = await res.json();
          setFreelancer(data); // Set freelancer data
          setFreelancerId(freelancerIdFromSession); // Set freelancerId for applying
        } else {
          setError("Failed to fetch freelancer data");
        }
      } catch (err) {
        console.error("Error fetching freelancer data:", err);
        setError("An error occurred while fetching freelancer data");
      }
    };

    fetchJobs();
    fetchFreelancer();
  }, []);

  const handleApply = async (jobId) => {
    if (!freelancerId) {
      alert("Freelancer ID is missing.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/service-requests/accept/${jobId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          freelancerId, // The freelancer's ID you fetched
        }),
        credentials: "include", // Include credentials if necessary
      });

      if (res.ok) {
        const data = await res.json();
        alert("Successfully applied for the job!");
      } else {
        alert("Failed to apply for the job");
      }
    } catch (err) {
      console.error("Error applying for job:", err);
      alert("An error occurred while applying for the job");
    }
  };

  return (
    <main>
      <h1>Available Jobs</h1>
      {error && <p>{error}</p>}
      {freelancer && <p>Freelancer: {freelancer.username}</p>} {/* Display freelancer's name */}
      {jobs.length === 0 ? (
        <p>No available jobs at the moment.</p>
      ) : (
        <ul>
          {jobs.map((job) => (
            <li key={job._id}>
              <strong>Service Type:</strong> {job.serviceType} <br />
              <strong>Client:</strong> {job.clientId?.username || "N/A"}
              {/* Add the "Apply" button here */}
              <button onClick={() => handleApply(job._id)}>Apply</button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

export default JobRequests;
