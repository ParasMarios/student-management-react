// src/layout/NavbarThesis.js
import React from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import { useAuth } from "../auth/AuthContext";

export default function NavbarThesis() {
  const { authState } = useAuth();
  const { logoutUser } = useAuth(); // Use the useAuth hook

  const deleteAllTheses = async () => {
    if (
      authState.isAuthenticated &&
      window.confirm("Are you sure you want to delete all theses?")
    ) {
      await axiosInstance.delete(`/theses`);
      window.location.reload();
    }
  };

  const handleLogout = () => {
    logoutUser(); // Call the logoutUser function
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand ms-5" to="/">
            Thesis Management
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {authState.isAuthenticated && (
              <div className="d-flex">
                <button
                  className="btn btn-outline-success mx-2"
                  type="button"
                  onClick={() => (window.location.href = "/app/addthesis")}
                >
                  Add Thesis
                </button>
                <button
                  className="btn btn-outline-danger mx-2"
                  type="button"
                  onClick={deleteAllTheses}
                >
                  Delete All Theses
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
      </nav>
    </div>
  );
}
