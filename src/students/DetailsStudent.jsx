import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axiosInstance from "../axiosInstance";

export default function DetailsStudent() {
  const [student, setStudent] = useState(null);
  const { email } = useParams();

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const result = await axiosInstance.get(
          `/students/${encodeURIComponent(email)}`
        );
        setStudent(result.data);
      } catch (error) {
        console.error("Error while fetching student:", error);
      }
    };

    fetchStudent();
  }, [email]);

  if (!student) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <div className="navbar-brand ms-5">Student Management System</div>
          <div className="ms-auto">
            <Link className="btn btn-outline-primary me-2" to="/theses">
              Theses
            </Link>
            <Link className="btn btn-outline-primary me-2" to="/app/students">
              Students
            </Link>
          </div>
        </div>
      </nav>

      <div className="container">
        <h1>
          Details for Student: {student.firstName} {student.lastName}
        </h1>
        <p>
          <strong>Email:</strong> {student.email}
        </p>
        <p>
          <strong>Thesis Title:</strong> {student.thesisTitle}
        </p>
        <div>
          <strong>Comments:</strong>
          {student.comments && student.comments.length > 0 ? (
            <ul>
              {student.comments.map((comment, index) => (
                <li key={index}>
                  <strong>Title:</strong> {comment.title}
                  <br />
                  <strong>Date:</strong> {comment.date}
                  <br />
                  <strong>Text:</strong> {comment.text}
                </li>
              ))}
            </ul>
          ) : (
            " No comments"
          )}
        </div>
      </div>
    </div>
  );
}
