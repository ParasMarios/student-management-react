import React, { useState } from "react";
import axiosInstance from "../axiosInstance";
import NavbarThesis from "../layout/NavbarThesis";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

export default function AddThesis() {
  let navigate = useNavigate();
  const [showMilestone, setShowMilestone] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const [thesis, setThesis] = useState({
    title: "",
    description: "",
    maxNumberOfStudents: 1,
    necessaryKnowledge: "",
    deliverables: "",
    bibliographicReferences: "",
    status: "available",
    milestones: [],
  });

  const [validation, setValidation] = useState({
    title: "",
    description: "",
    maxNumberOfStudents: "",
    necessaryKnowledge: "",
    deliverables: "",
    bibliographicReferences: "",
  });

  const validateInput = (field, value) => {
    let message = "";

    switch (field) {
      case "title":
        if (!value.trim()) {
          message = "Title cannot be blank";
        } else if (value.length < 5 || value.length > 200) {
          message = "Title must be between 5 and 200 characters";
        }
        break;
      case "description":
        if (!value.trim()) {
          message = "Description cannot be blank";
        } else if (value.length < 10 || value.length > 500) {
          message = "Description must be between 10 and 500 characters";
        }
        break;
      case "necessaryKnowledge":
        if (!value.trim()) {
          message = "Necessary knowledge cannot be blank";
        } else if (value.length < 5 || value.length > 500) {
          message = "Necessary knowledge must be between 5 and 500 characters";
        }
        break;
      case "deliverables":
        if (!value.trim()) {
          message = "Deliverables cannot be blank";
        } else if (value.length < 5 || value.length > 500) {
          message = "Deliverables must be between 5 and 500 characters";
        }
        break;
      case "bibliographicReferences":
        if (!value.trim()) {
          message = "Bibliographic references cannot be blank";
        } else if (value.length < 10 || value.length > 500) {
          message =
            "Bibliographic references must be between 10 and 500 characters";
        }
        break;
      default:
        break;
    }

    setValidation({
      ...validation,
      [field]: message,
    });
  };

  const isFormValid = () => {
    // Check validation messages
    const isValidated = Object.values(validation).every((value) => !value);

    // Check required fields
    const hasRequiredValues = [
      "title",
      "description",
      "necessaryKnowledge",
      "deliverables",
      "bibliographicReferences",
    ].every((field) => thesis[field]);

    return isValidated && hasRequiredValues;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("milestone")) {
      const milestoneField = name.split("-")[1];
      const milestoneIndex = Number(name.split("-")[2]);
      const newMilestones = [...thesis.milestones];
      newMilestones[milestoneIndex][milestoneField] = value;
      setThesis({ ...thesis, milestones: newMilestones });
    } else {
      setThesis({ ...thesis, [name]: value });
      validateInput(name, value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      alert("Invalid input!");
      return;
    }

    const newThesis = { ...thesis };

    await axiosInstance.post("/theses", newThesis);
    navigate("/theses");
    enqueueSnackbar("Thesis created successfully", { variant: "success" });
  };

  const addMilestone = () => {
    setThesis({
      ...thesis,
      milestones: [
        ...thesis.milestones,
        {
          name: "",
          description: "",
          date: "",
          completionPercentage: 0,
        },
      ],
    });
    setShowMilestone(true);
  };

  return (
    <div>
      <NavbarThesis />
      <div className="container">
        <div className="row mt-5">
          <div className="col-md-6 shadow mx-auto p-5">
            <h2 className="text-center mb-4">Add Thesis</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group mt-3">
                <label htmlFor="title">Title:</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  placeholder="Enter title"
                  value={thesis.title}
                  onChange={handleChange}
                  required
                />
                {validation.title && (
                  <div className="text-danger">{validation.title}</div>
                )}
                <label htmlFor="description">Description:</label>
                <textarea
                  type="text"
                  className="form-control"
                  id="description"
                  name="description"
                  placeholder="Enter description"
                  value={thesis.description}
                  onChange={handleChange}
                  required
                />
                {validation.description && (
                  <div className="text-danger">{validation.description}</div>
                )}
                <label htmlFor="maxNumberOfStudents">
                  Max Number Of Students:
                </label>
                <select
                  className="form-control"
                  id="maxNumberOfStudents"
                  name="maxNumberOfStudents"
                  value={thesis.maxNumberOfStudents}
                  onChange={handleChange}
                  required
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                </select>
                {validation.maxNumberOfStudents && (
                  <div className="text-danger">
                    {validation.maxNumberOfStudents}
                  </div>
                )}
                <label htmlFor="necessaryKnowledge">Necessary Knowledge:</label>
                <textarea
                  type="text"
                  className="form-control"
                  id="necessaryKnowledge"
                  name="necessaryKnowledge"
                  placeholder="Enter necessary knowledge"
                  value={thesis.necessaryKnowledge}
                  onChange={handleChange}
                  required
                />
                {validation.necessaryKnowledge && (
                  <div className="text-danger">
                    {validation.necessaryKnowledge}
                  </div>
                )}
                <label htmlFor="deliverables">Deliverables:</label>
                <textarea
                  type="text"
                  className="form-control"
                  id="deliverables"
                  name="deliverables"
                  placeholder="Enter deliverables"
                  value={thesis.deliverables}
                  onChange={handleChange}
                  required
                />
                {validation.deliverables && (
                  <div className="text-danger">{validation.deliverables}</div>
                )}
                <label htmlFor="bibliographicReferences">
                  Bibliographic References:
                </label>
                <textarea
                  type="text"
                  className="form-control"
                  id="bibliographicReferences"
                  name="bibliographicReferences"
                  placeholder="Enter bibliographic references"
                  value={thesis.bibliographicReferences}
                  onChange={handleChange}
                  required
                />
                {validation.bibliographicReferences && (
                  <div className="text-danger">
                    {validation.bibliographicReferences}
                  </div>
                )}
              </div>
              <fieldset className="border p-3 mt-3">
                <legend>Milestones</legend>
                {showMilestone &&
                  thesis.milestones.map((milestone, index) => (
                    <div key={index}>
                      <label htmlFor={`milestone-name-${index}`}>
                        Milestone Name:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id={`milestone-name-${index}`}
                        name={`milestone-name-${index}`}
                        placeholder="Enter milestone name"
                        value={milestone.name}
                        onChange={handleChange}
                      />
                      {validation[`milestone-name-${index}`] && (
                        <div className="text-danger">
                          {validation[`milestone-name-${index}`]}
                        </div>
                      )}
                      <label htmlFor={`milestone-description-${index}`}>
                        Milestone Description:
                      </label>
                      <textarea
                        type="text"
                        className="form-control"
                        id={`milestone-description-${index}`}
                        name={`milestone-description-${index}`}
                        placeholder="Enter milestone description"
                        value={milestone.description}
                        onChange={handleChange}
                      />
                      {validation[`milestone-description-${index}`] && (
                        <div className="text-danger">
                          {validation[`milestone-description-${index}`]}
                        </div>
                      )}
                      <label htmlFor={`milestone-date-${index}`}>
                        Milestone Date:
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id={`milestone-date-${index}`}
                        name={`milestone-date-${index}`}
                        value={milestone.date}
                        onChange={handleChange}
                      />
                      <label
                        htmlFor={`milestone-completionPercentage-${index}`}
                      >
                        Milestone Completion Percentage:
                        {milestone.completionPercentage}%
                      </label>
                      <input
                        type="range"
                        className="form-range"
                        id={`milestone-completionPercentage-${index}`}
                        name={`milestone-completionPercentage-${index}`}
                        min="0"
                        max="100"
                        value={milestone.completionPercentage}
                        onChange={handleChange}
                      />
                    </div>
                  ))}
              </fieldset>

              <div className="form-group mt-3">
                <button
                  type="button"
                  className="btn btn-secondary mb-3"
                  onClick={addMilestone}
                >
                  Add Milestone
                </button>
              </div>
              <button
                type="button"
                className="btn btn-danger mr-2"
                onClick={() => navigate("/theses")}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary mx-2">
                Add Thesis
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
