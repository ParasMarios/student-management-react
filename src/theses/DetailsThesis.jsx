import React from "react";

export default function DetailsThesis({ thesis }) {
  const milestones = thesis.milestones || [];
  const assignedStudents = thesis.assignedStudents || [];

  return (
    <div>
      <h5>Milestones:</h5>
      <ul>
        {milestones.map((milestone, index) => (
          <li key={index}>{milestone.name}</li>
        ))}
      </ul>
      <h5>Assigned Students:</h5>
      <ul>
        {assignedStudents.map((student, index) => (
          <li key={index}>{student}</li>
        ))}
      </ul>
    </div>
  );
}
