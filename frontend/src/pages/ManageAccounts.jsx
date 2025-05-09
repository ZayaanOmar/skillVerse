import React, { useEffect, useState } from "react";
import API_URL from "../config/api";
import { Modal, Button } from "react-bootstrap";

const ManageAccounts = () => {
  const [users, setUsers] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  // Fetch users from the API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${API_URL}/api/users`);
        const data = await res.json();
        if (res.ok) {
          setUsers(data);
        } else {
          console.error("Failed to fetch users");
        }
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, []);

  // Delete user function
const deleteUser = async (userId) => {
  try {
const res = await fetch(`${API_URL}/api/users/${userId}`, {
  method: "DELETE",
  credentials: "include",
});

    if (res.ok) {
      // Successfully deleted, update the users state
      setUsers(users.filter((user) => user._id !== userId));
      alert("User deleted successfully.");
    } else {
      // If not successful, get the error message
      const data = await res.json();
      alert(data.message || "Failed to delete user.");
    }
  } catch (err) {
    console.error(err);
    alert("Error deleting user.");
  }
};



  return (
    <section className="container mt-4">
      <h2>Manage User Accounts</h2>
      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>Username</th>
            <th>Role</th>
            <th>Google ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="4">No users found.</td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user._id}>
                <td>{user.username}</td>
                <td>{user.role}</td>
                <td>{user.googleID}</td>
                <td>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => {
                      setUserToDelete(user);  // Set the user to delete
                      setShowDeleteModal(true); // Show the confirmation modal
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the account of{" "}
          <strong>{userToDelete ? userToDelete.username : ""}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="noButton"
            variant="secondary"
            onClick={() => setShowDeleteModal(false)}
          >
            No
          </Button>
          <Button
            className="yesButton"
            variant="danger"
            onClick={() => {
              if (userToDelete) {
                deleteUser(userToDelete._id);  // Delete the user
              }
              setShowDeleteModal(false); // Close the modal
            }}
          >
            Yes, Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
};

export default ManageAccounts;
