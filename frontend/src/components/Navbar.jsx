import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { Modal, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  //const [reason, setReason] = useState("");

  //Handling role change request by a user
  const [requestedRole, setRequestedRole] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null);

  //Initialize useNavigate hook
  const navigate = useNavigate();

  //Function to take user to the profile page once the user clicks on the profile button
  const showProfile = () => {
    console.log("Showing profile...");
    navigate("/profile"); //Redirect to the profile page
  }

  // Function to handle opening the modal
  const handleShowModal = () => setShowModal(true);

  // Function to handle closing the modal
  const handleCloseModal = () => setShowModal(false);

  //Added the logout handler
  const handleLogout = () => {
    console.log("Logging out...");
    navigate("/"); //Redirect to the AuthLogin page
  };

  // Function to handle form submission (this is just an example for now)
  const handleSubmitReason = async (e) => {
    console.log("Reason for changing roles:", message);
    // Add logic to handle the reason submission (e.g., API call)
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
        console.log(status); //just for debugging
        setRequestedRole("");
        setMessage("");
        console.log("response is ok here"); //debugging
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error("Submission error:", err);
      setStatus("error");
    }

    handleCloseModal(); // Close the modal after submission
    //navigate("/admin/support");
  };
  return (
    <nav className="bg-slate-800 text-white px-8 py-4 flex justify-end items-center">
      <ul className ="">
        {/*<li><a href="#about" className="font-semibold hover:underline">About</a></li>*/}

        {/* Settings Dropdown */}
        <li>
          <Dropdown align="end">
            <Dropdown.Toggle
              variant="link"
              id="settings-dropdown"
              className="text-white"
            >
              <i className="bi bi-gear-fill"></i>{" "}
              {/* Example icon, you can replace it */}
            </Dropdown.Toggle>

            <Dropdown.Menu>
            <Dropdown.Item onClick={handleShowModal}>Change Roles</Dropdown.Item>
              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              <Dropdown.Item onClick={showProfile}>My Profile</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </li>
      </ul>
      {/* Modal for asking reason for changing roles */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Change Roles</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formReason">
              <Form.Label>Why do you want to change roles?</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  setRequestedRole("freelancer");
                }}
                placeholder="Enter your reason here..."
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmitReason}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </nav>
  );
};

export default Navbar;
