import React, { useState } from "react";

export default function MilestoneForm({ milestones = [], setMilestones }) {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [completionPercentage, setCompletionPercentage] = useState("");

  const addMilestone = () => {
    const newMilestone = {
      name,
      date,
      completionPercentage: Number(completionPercentage),
    };
    setMilestones([...milestones, newMilestone]);
    setName("");
    setDate("");
    setCompletionPercentage("");
  };

  const deleteMilestone = (index) => {
    const updatedMilestones = milestones.filter((_, i) => i !== index);
    setMilestones(updatedMilestones);
  };

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
      <button onClick={addMilestone}>Add Milestone</button>
      <div>
        <h5>Current Milestones</h5>
        <ul>
          {milestones.map((milestone, index) => (
            <li key={index}>
              {milestone.name} - {milestone.date} -{" "}
              {milestone.completionPercentage}%
              <button onClick={() => deleteMilestone(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
