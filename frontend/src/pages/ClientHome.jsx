import React, { useEffect, useState } from "react";
import "./ClientHome.css";
import Navbar from "../components/Navbar";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";

const ClientHome = () => {
  const [showModal, setShowModal] = useState(false);//this is for req submitted successfully(popup)
  const [showConfirmModal, setShowConfirmModal] = useState(false);//this brings up the yes no pop up, on yes sends req
  const [pendingCategory, setPendingCategory] = useState(null);//save the req on button click but dont send it yet
  const [user, setUser] = useState(null);
  const [message /*setMessage*/] = useState("");

  useEffect(() => {
    //this is used to retrieve the client details from local storage (from role selections)
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

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
        "http://localhost:5000/api/service-requests/create",
        {
          clientId: user._id,
          serviceType: category,
          description: `Request for ${category}`,
        },
        { withCredentials: true }
      );
      console.log("Service request response:", response.data);
      setShowModal(true);
    } catch (error) {
      console.error("Error creating request:", error);
    }
  };

  //Handling role change request by a user

  /* const [requestedRole, setRequestedRole] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      requestedRole,
      message,
    };

    try {
      const response = await fetch("/users/request-role-change", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      
      if (response.ok) {
        setStatus("success");
        setRequestedRole("");
        setMessage("");
        console.log("response is ok here") //debugging
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error("Submission error:", err);
      setStatus("error");
    }
  }; */

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
        {/* Footer */}
        <footer className="Ebrahimfooter">
          <footer className="footer">
            <section>
              <p>&copy; 2025 SkillVerse. All rights reserved.</p>
            </section>
          </footer>
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
<Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)} centered>
  <Modal.Header closeButton>
    <Modal.Title>Confirm Request</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    Are you sure you want to request a service for <strong>{pendingCategory}</strong>?
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
      No
    </Button>
    <Button
      variant="primary"
      onClick={() => {
        handleServiceSelection(pendingCategory);/*sends requested service using route when clicks yes*/
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
