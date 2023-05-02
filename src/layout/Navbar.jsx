import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Navbar() {
  const deleteAllStudents = async () => {
    if (window.confirm("Are you sure you want to delete all students?")) {
      await axios.delete(`http://localhost:8080/api/v1/students`);
      window.location.reload();
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand ms-5" to="/">
            Student Management System
          </Link>
          <div className="ms-auto">
            <Link
              className="btn btn-outline-danger me-2"
              onClick={deleteAllStudents}
            >
              Delete All Students
            </Link>
            <Link className="btn btn-outline-success" to="/app/addstudent">
              Add Student
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
