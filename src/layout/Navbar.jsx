import React from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import { useAuth } from "../auth/AuthContext"; // Import useAuth

export default function Navbar() {
  const { logoutUser } = useAuth(); // Use the useAuth hook

  const deleteAllStudents = async () => {
    if (window.confirm("Are you sure you want to delete all students?")) {
      await axiosInstance.delete(`/students`);
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
          <div className="navbar-brand ms-5">Student Management System</div>
          <div className="ms-auto">
            <Link
              className="btn btn-outline-danger me-2"
              onClick={deleteAllStudents}
            >
              Delete All Students
            </Link>
            <Link className="btn btn-outline-success me-2" to="/app/addstudent">
              Add Student
            </Link>
            <button className="btn btn-outline-warning" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}
