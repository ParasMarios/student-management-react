import React, { useState } from "react";

const MilestoneForm = ({ milestones, setMilestones }) => {
  const [milestone, setMilestone] = useState({
    name: "",
    description: "",
    date: "",
    completionPercentage: 0,
  });

  const handleInputChange = (e) => {
    setMilestone({ ...milestone, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMilestones([...milestones, milestone]);
    setMilestone({
      name: "",
      description: "",
      date: "",
      completionPercentage: 0,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Milestone Name:</label>
      <input
        type="text"
        name="name"
        value={milestone.name}
        onChange={handleInputChange}
        required
      />

      <label htmlFor="description">Description:</label>
      <textarea
        name="description"
        value={milestone.description}
        onChange={handleInputChange}
        required
      />

      <label htmlFor="date">Date:</label>
      <input
        type="date"
        name="date"
        value={milestone.date}
        onChange={handleInputChange}
        required
      />

      <label htmlFor="completionPercentage">Completion Percentage:</label>
      <input
        type="number"
        min="0"
        max="100"
        name="completionPercentage"
        value={milestone.completionPercentage}
        onChange={handleInputChange}
        required
      />

      <button type="submit">Add Milestone</button>
    </form>
  );
};

export default MilestoneForm;
