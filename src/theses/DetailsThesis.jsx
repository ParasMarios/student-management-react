import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axiosInstance from "../axiosInstance";

export default function DetailsThesis() {
  const [thesis, setThesis] = useState(null);
  const { title } = useParams();

  useEffect(() => {
    const fetchThesis = async () => {
      try {
        const result = await axiosInstance.get(
          `/theses/${encodeURIComponent(title)}`
        );
        setThesis(result.data);
      } catch (error) {
        console.error("Error while fetching thesis:", error);
      }
    };

    fetchThesis();
  }, [title]);

  if (!thesis) {
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
          Details for Thesis: {thesis.title}{" "}
          <Link
            className="btn btn-outline-warning mx-2"
            to={`/app/theses/${encodeURIComponent(thesis.id)}/edit`}
          >
            Edit
          </Link>
        </h1>
        <p>
          <strong>Description:</strong> {thesis.description}
        </p>
        <p>
          <strong>Max Students:</strong> {thesis.maxNumberOfStudents}
        </p>
        <p>
          <strong>Necessary Knowledge:</strong> {thesis.necessaryKnowledge}
        </p>
        <p>
          <strong>Deliverables:</strong> {thesis.deliverables}
        </p>
        <p>
          <strong>Bibliographic References:</strong>{" "}
          {thesis.bibliographicReferences}
        </p>
        <p>
          <strong>Status:</strong> {thesis.status}
        </p>

        <div>
          <strong>Assigned Students:</strong>
          {thesis.assignedStudents && thesis.assignedStudents.length > 0 ? (
            <ul>
              {thesis.assignedStudents.map((student, index) => (
                <li key={index}>{student}</li>
              ))}
            </ul>
          ) : (
            " No students assigned"
          )}
        </div>

        {thesis.milestones && thesis.milestones.length > 0 ? (
          <fieldset className="border p-3 mt-3">
            <legend>Thesis Milestones</legend>
            {thesis.milestones.map(
              ({ name, description, date, completionPercentage }, index) => {
                return (
                  <div key={name}>
                    <h2>Milestone {index + 1}</h2>
                    <p>
                      <strong>Milestone Name:</strong> {name}
                    </p>
                    <p>
                      <strong>Milestone Description:</strong> {description}
                    </p>
                    <p>
                      <strong>Milestone Date:</strong> {date}
                    </p>
                    <p>
                      <strong>Milestone Completion Percentage:</strong>{" "}
                      {completionPercentage}
                    </p>
                  </div>
                );
              }
            )}
          </fieldset>
        ) : (
          <p>No milestones</p>
        )}
      </div>
    </div>
  );
}
