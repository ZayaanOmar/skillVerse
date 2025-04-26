import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function JobRequests() {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [applicationError, setApplicationError] = useState("");
  const [applicationSuccess, setApplicationSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);

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

  const handleJobSelection = (job) => {
    setSelectedJob(job);
    setCoverLetter("");
    setApplicationError("");
    setApplicationSuccess(false);
    setShowModal(true);
  };

  const handleApply = async (event) => {
    event.preventDefault();

    if (!coverLetter) {
      setApplicationError("Please provide a cover letter.");
      return;
    }

    try {
      const freelancerId = "680bf5c791b752bb1ac59cc0";

      const res = await fetch("http://localhost:5000/api/service-requests/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobId: selectedJob._id,
          freelancerId: freelancerId,
          coverLetter: coverLetter,
        }),
      });

      if (res.ok) {
        setApplicationSuccess(true);
        setApplicationError("");
        setShowModal(false);
        setShowResultModal(true);
      } else {
        const data = await res.json();
        setApplicationError(data.message || "An error occurred while applying");
        setApplicationSuccess(false);
        setShowResultModal(true);
      }
      
    } catch (err) {
      console.error("Error applying for job:", err);
      setApplicationError("An error occurred while submitting your application");
      setApplicationSuccess(false);
      setShowResultModal(true); // Show failure message

    }
  };

  return (
    <main>
      <h1>Available Jobs</h1>
      {error && <p>{error}</p>}

      {jobs.length === 0 ? (
        <p>No available jobs at the moment.</p>
      ) : (
        <section>
          {jobs.map((job) => (
            <article key={job._id} style={{ marginBottom: "1rem" }}>
              <strong>Service Type:</strong> {job.serviceType} <br />
              <strong>Client:</strong> {job.clientId?.username || "N/A"} <br />
              <button onClick={() => handleJobSelection(job)}>Apply</button>
            </article>
          ))}
        </section>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Apply for: {selectedJob?.serviceType}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleApply}>
            <Form.Group controlId="formCoverLetter">
              <Form.Label>Cover Letter</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                placeholder="Enter your cover letter here..."
              />
            </Form.Group>
            {applicationError && (
              <article style={{ color: "red", marginTop: "1rem" }}>{applicationError}</article>
            )}
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleApply}>
            Submit Application
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showResultModal} onHide={() => setShowResultModal(false)}>
  <Modal.Header closeButton>
    <Modal.Title>Application Status</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    {applicationSuccess ? (
      <p style={{ color: "green" }}>Your application was submitted successfully!</p>
    ) : (
      <p style={{ color: "red" }}>Your application could not be submitted. Please try again.</p>
    )}
  </Modal.Body>
  <Modal.Footer>
    <Button variant="primary" onClick={() => setShowResultModal(false)}>
      Close
    </Button>
  </Modal.Footer>
</Modal>

    </main>
  );
}

export default JobRequests;
