import React, { useState } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import { Modal, Button, Form } from 'react-bootstrap';
const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [reason, setReason] = useState("");

  // Function to handle opening the modal
  const handleShowModal = () => setShowModal(true);

  // Function to handle closing the modal
  const handleCloseModal = () => setShowModal(false);

  // Function to handle form submission (this is just an example for now)
  const handleSubmitReason = () => {
    console.log("Reason for changing roles:", reason);
    // Add logic to handle the reason submission (e.g., API call)
    handleCloseModal(); // Close the modal after submission
  };
  return (
    <nav className="bg-slate-800 text-white px-8 py-4 flex justify-end items-center">
      <ul className>
        {/*<li><a href="#about" className="font-semibold hover:underline">About</a></li>*/}
        
        {/* Settings Dropdown */}
        <li>
          <Dropdown align="end">
            <Dropdown.Toggle variant="link" id="settings-dropdown" className="text-white">
              <i className="bi bi-gear-fill"></i> {/* Example icon, you can replace it */}
            </Dropdown.Toggle>

            <Dropdown.Menu>
            <Dropdown.Item onClick={handleShowModal}>Change Roles</Dropdown.Item>
              <Dropdown.Item href="#/logout">Logout</Dropdown.Item>
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
                value={reason}
                onChange={(e) => setReason(e.target.value)}
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
