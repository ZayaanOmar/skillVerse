import React, { useEffect, useState } from 'react';

function JobRequests() {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/service-requests/all", {
          credentials: "include",
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

    fetchJobs();
  }, []);

  return (
    <main>
      <h1>Available Jobs</h1>
      {error && <p>{error}</p>}
      {jobs.length === 0 ? (
        <p>No available jobs at the moment.</p>
      ) : (
        <ul>
          {jobs.map((job) => (
            <li key={job._id}>
              <strong>Service Type:</strong> {job.serviceType} <br />
              <strong>Client:</strong> {job.clientId?.username || "N/A"}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

export default JobRequests;
