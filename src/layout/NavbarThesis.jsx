import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import { useAuth } from "../auth/AuthContext";

export default function NavbarThesis() {
  const { authState } = useAuth();
  const { logoutUser } = useAuth();
  const [isDeleteAllThesesModalOpen, setIsDeleteAllThesesModalOpen] =
    useState(false);

  const openDeleteAllThesesModal = () => {
    setIsDeleteAllThesesModalOpen(true);
  };

  const closeDeleteAllThesesModal = () => {
    setIsDeleteAllThesesModalOpen(false);
  };

  const handleDeleteAllTheses = async () => {
    closeDeleteAllThesesModal();

    await axiosInstance.delete(`/theses`);
    window.location.reload();
  };

  const handleLogout = () => {
    logoutUser();
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand ms-5" to="/">
            Thesis Management
          </Link>
          <Link className="btn btn-outline-primary me-2" to="/app/students">
            Students
          </Link>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {authState.isAuthenticated && (
              <div className="ms-auto">
                <button
                  className="btn btn-outline-danger me-2"
                  type="button"
                  onClick={openDeleteAllThesesModal}
                >
                  Delete All Theses
                </button>

                <button
                  className="btn btn-outline-success me-2"
                  type="button"
                  onClick={() =>
                    (window.location.href = "/app/theses/addthesis")
                  }
                >
                  Add Thesis
                </button>
                <button
                  className="btn btn-outline-warning"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
        <Modal
          show={isDeleteAllThesesModalOpen}
          onHide={closeDeleteAllThesesModal}
        >
          <Modal.Header closeButton>
            <Modal.Title>Delete All Theses</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete all theses?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeDeleteAllThesesModal}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDeleteAllTheses}>
              Delete All
            </Button>
          </Modal.Footer>
        </Modal>
      </nav>
    </div>
  );
}
