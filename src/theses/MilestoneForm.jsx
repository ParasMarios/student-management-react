import React, { useState } from "react";

export default function MilestoneForm({ milestones = [], setMilestones }) {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [completionPercentage, setCompletionPercentage] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div>
      <h4>Milestones</h4>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label>Description:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label>Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div>
        <label>Completion Percentage:</label>
        <input
          type="number"
          value={completionPercentage}
          onChange={(e) => setCompletionPercentage(e.target.value)}
        />
      </div>
    </div>
  );
}
