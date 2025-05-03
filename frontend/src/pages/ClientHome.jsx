import React, { useEffect, useState } from "react";
import "./ClientHome.css";
import Navbar from "../components/Navbar";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import API_URL from "../config/api";

const ClientHome = () => {
  const [showModal, setShowModal] = useState(false); //this is for req submitted successfully(popup)
  const [showConfirmModal, setShowConfirmModal] = useState(false); //this brings up the yes no pop up, on yes sends req
  const [pendingCategory, setPendingCategory] = useState(null); //save the req on button click but dont send it yet
  const [user, setUser] = useState(null);
  const [jobs, setJobs] = useState([]); //this is
  // for the jobs that are fetched from the backend
  const [message /*setMessage*/] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${API_URL}/auth/me`, {
          credentials: "include",
        });
        if (res.ok) {
          const userData = await res.json();
          localStorage.setItem("user", JSON.stringify(userData));
          setUser(userData);
        } else {
          console.error("Failed to fetch user info");
        }
      } catch (err) {
        console.error("Error fetching user info:", err);
      }
    };

    fetchUser();
  }, []);

  const userId = user ? user._id : null;

  useEffect(() => {
    const fetchJobs = async () => {
      if (!userId || userId === null) {
        console.error("User ID is not available or null");
        return;
      }
      try {
        const res = await fetch(
          `${API_URL}/api/service-requests/jobs/${userId}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (res.ok) {
          const data = await res.json();
          setJobs(data);
          setError(""); // Clear error if fetch is successful
          setSuccess("Jobs fetched successfully!"); // Set success message
          console.log(success);
        } else {
          setError("Failed to fetch jobs");
          console.log(error);
        }
      } catch (err) {
        setError("Error fetching jobs: " + err.message);
      }
    };

    fetchJobs();
  }, [userId, error, success]); // Fetch jobs whenever userId is updated

  /* Debugging logs
  console.log("User in useEffect:", user); // Debugging line to check user data
  console.log("User ID:", user ? user._id : "User not available"); // Debugging line to check user ID
  console.log("User in localStorage:", localStorage.getItem("user")); // Debugging line to check localStorage
  console.log("Jobs fetched:", jobs); // Debugging line to check jobs data
  */

  const handleServiceSelection = async (category) => {
    if (!user || !user._id) {
      console.log("User is not defined or user ID is missing");
      return;
    }

    try {
      console.log("Sending request with:", {
        clientId: user._id,
        category,
        description: `Request for ${category}`,
      });

      const response = await axios.post(
        `${API_URL}/api/service-requests/create`,
        {
          clientId: user._id,
          serviceType: category,
          description: `Request for ${category}`,
        },
        { withCredentials: true }
      );
      setJobs((prevJobs) => [...prevJobs, response.data.newServiceRequest]); // Update jobs state with the new job
      console.log("Service request response:", response.data);
      setShowModal(true);
    } catch (error) {
      console.error("Error creating request:", error);
    }
  };

  const handlePay = async () => {
    //console.log("Button clicked!");
    const email = "johndoe@example.com";

    try {
      const response = await axios.post(
        `${API_URL}/payments/create-checkout-session`,
        {
          email: email,
          amount: 1000,
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
    <main className="client-home">
      <Navbar />
      <section>
        {/* Welcome Banner */}
        <header className="welcome-banner">
          <h1 className="heading1">SkillVerse</h1>
        </header>

        {/* Service buttons*/}
        {/* the choose service blue section */}
        <section className="chooseDesc">
          <p className="description">CHOOSE A SERVICE</p>
        </section>

        {/* each button */}
        <section className="section1">
          <button
            className="buttonSD"
            onClick={() => {
              setPendingCategory("Software Development");
              setShowConfirmModal(true);
            }}
          >
            Software Development
          </button>
          <button
            className="buttonML"
            onClick={() => {
              setPendingCategory("Data Science");
              setShowConfirmModal(true);
            }}
          >
            Data Science
          </button>
          <button
            className="buttonCL"
            onClick={() => {
              setPendingCategory("Creating Logos");
              setShowConfirmModal(true);
            }}
          >
            Creating Logos
          </button>
          <button
            className="buttonGD"
            onClick={() => {
              setPendingCategory("Graphic Designer");
              setShowConfirmModal(true);
            }}
          >
            Graphic Designer
          </button>
          <button
            className="buttonDM"
            onClick={() => {
              setPendingCategory("Digital Marketing");
              setShowConfirmModal(true);
            }}
          >
            Digital Marketing
          </button>
          {message && <p>{message}</p>}
        </section>

        {/* section grid on what skillverse offers */}
        <article>
          <h2>What Skill Verse Offers You</h2>
          <section className="offer-grid">
            <section className="offer-item">
              <h3>Dedicated hiring experts</h3>
              <p>
                Count on an account manager to find you the right talent and see
                to your project’s every need.
              </p>
            </section>
            <section className="offer-item">
              <h3>Satisfaction guarantee</h3>
              <p>
                We guarantee satisfaction with every project, ensuring you're
                happy with the results.
              </p>
            </section>
            <section className="offer-item">
              <h3>Flexible payment models</h3>
              <p>
                Choose from a variety of flexible payment models to fit your
                needs and budget.
              </p>
            </section>
            <section className="offer-item">
              <h3>Advanced management tools</h3>
              <p>
                Access powerful tools to manage your projects and teams with
                ease.
              </p>
            </section>
          </section>
        </article>

        <section className="jobs-banner"></section>

        <section className="section-jobs">
          <h1 className="header-text">Your Current Job Requests</h1>
          <h5>
            Manage your current jobs. View applications for your pending
            requests, and track progress for your jobs that are currently being
            worked on.
          </h5>
          {jobs.length === 0 ? (
            <p>No available jobs at the moment.</p>
          ) : (
            <section className="jobs-grid">
              {Array.isArray(jobs) /* Check if jobs is an array */ &&
                jobs.map((job) => (
                  <article key={job._id} className="my-jobs-card">
                    <p>
                      <strong>Service Type:</strong> {job.serviceType}
                    </p>
                    <p>
                      <strong>Status:</strong> {job.status}
                    </p>

                    <button
                      className="btn btn-outline-success"
                      onClick={handlePay}
                    >
                      Checkout
                    </button>
                    <button
                      className="btn btn-outline-primary"
                      onClick={() => navigate(`/myjobs/${job._id}`)}
                    >
                      View Details
                    </button>
                  </article>
                ))}
            </section>
          )}
        </section>

        {/* Footer */}
        <footer className="Ebrahimfooter">
          <section>
            <p>&copy; 2025 SkillVerse. All rights reserved.</p>
          </section>
        </footer>
      </section>
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Request Submitted</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Your service request was successfully submitted!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showConfirmModal}
        onHide={() => setShowConfirmModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to request a service for{" "}
          <strong>{pendingCategory}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowConfirmModal(false)}
          >
            No
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleServiceSelection(
                pendingCategory
              ); /*sends requested service using route when clicks yes*/
              setShowConfirmModal(false);
            }}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </main>
  );
};

export default ClientHome;
