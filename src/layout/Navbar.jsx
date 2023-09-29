import React, { useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import { useAuth } from "../auth/AuthContext";
import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";

export default function Navbar() {
  const { logoutUser } = useAuth();
  const { authState } = useAuth();
  const [isDeleteAllStudentsModalOpen, setIsDeleteAllStudentsModalOpen] =
    useState(false);

  const openDeleteAllStudentsModal = () => {
    setIsDeleteAllStudentsModalOpen(true);
  };

  const closeDeleteAllStudentsModal = () => {
    setIsDeleteAllStudentsModalOpen(false);
  };

  const handleDeleteAllStudents = async () => {
    closeDeleteAllStudentsModal();

    await axiosInstance.delete(`/students`);
    window.location.reload();
  };

  const handleLogout = () => {
    logoutUser();
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <div className="navbar-brand ms-5">Student Management System</div>
          <Link className="btn btn-outline-primary me-2" to="/theses">
            Theses
          </Link>
          {authState.isAuthenticated && (
            <div className="ms-auto">
              <Link
                className="btn btn-outline-danger me-2"
                onClick={openDeleteAllStudentsModal}
              >
                Delete All Students
              </Link>
              <Link
                className="btn btn-outline-success me-2"
                to="/app/addstudent"
              >
                Add Student
              </Link>

              <button
                className="btn btn-outline-warning"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
        <Modal
          show={isDeleteAllStudentsModalOpen}
          onHide={closeDeleteAllStudentsModal}
        >
          <Modal.Header closeButton>
            <Modal.Title>Delete All Students</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete all students?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeDeleteAllStudentsModal}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDeleteAllStudents}>
              Delete All
            </Button>
          </Modal.Footer>
        </Modal>
      </nav>
    </div>
  );
}
