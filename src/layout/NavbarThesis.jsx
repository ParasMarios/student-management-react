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
          <Link className="btn btn-outline-primary me-2" to="/app/students">
            Students
          </Link>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {authState.isAuthenticated && (
              <div className="ms-auto">
                <button
                  className="btn btn-outline-danger me-2"
                  type="button"
                  onClick={deleteAllTheses}
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
      </nav>
    </div>
  );
}
