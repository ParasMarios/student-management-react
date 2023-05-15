import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
    <div className="container">
      <h1>Details for Thesis: {thesis.title}</h1>
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

      <p>
        <strong>Milestone Name:</strong> {thesis.milestoneName}
      </p>
      <p>
        <strong>Milestone Description:</strong> {thesis.milestoneDescription}
      </p>
      <p>
        <strong>Milestone Date:</strong> {thesis.milestoneDate}
      </p>
      <p>
        <strong>Milestone Completion Percentage:</strong>{" "}
        {thesis.milestoneCompletionPercentage}
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
    </div>
  );
}
