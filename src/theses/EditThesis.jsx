import React, { useState, useEffect } from "react";
import axiosInstance from "../axiosInstance";
import { useNavigate, useParams } from "react-router-dom";

export default function EditThesis() {
  let navigate = useNavigate();
  const { title } = useParams();

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

  const addNewMilestone = () => {
    const newMilestone = {
      name: "",
      description: "",
      date: "",
      completionPercentage: 0,
    };

    setThesis({ ...thesis, milestones: [...thesis.milestones, newMilestone] });
  };

  const [validation, setValidation] = useState({
    title: "",
    description: "",
    necessaryKnowledge: "",
    deliverables: "",
    bibliographicReferences: "",
  });

  useEffect(() => {
    const fetchThesis = async () => {
      const { data } = await axiosInstance.get(
        `/theses/${encodeURIComponent(title)}`
      );
      setThesis(data);
    };
    fetchThesis();
  }, [title]);

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
        }
        break;
      case "deliverables":
        if (!value.trim()) {
          message = "Deliverables cannot be blank";
        }
        break;
      case "bibliographicReferences":
        if (!value.trim()) {
          message = "Bibliographic references cannot be blank";
        }
        break;
      default:
        break;
    }

    setValidation({ ...validation, [field]: message });
  };

  const onInputChange = (e) => {
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

  const isFormValid = () => {
    const requiredThesisFields = {
      title: thesis.title,
      description: thesis.description,
      necessaryKnowledge: thesis.necessaryKnowledge,
      deliverables: thesis.deliverables,
      bibliographicReferences: thesis.bibliographicReferences,
    };

    return (
      Object.values(validation).every((value) => !value) &&
      Object.values(requiredThesisFields).every((value) => value)
    );
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (isFormValid()) {
      await axiosInstance.patch(`/theses/${encodeURIComponent(title)}`, {
        ...thesis,
      });
      navigate("/theses");
    }
  };

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-6 shadow mx-auto p-5">
          <h2 className="text-center mb-4">Edit Thesis</h2>
          <form onSubmit={(e) => onSubmit(e)}>
            {/* Title */}
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                placeholder="Enter title"
                value={thesis.title}
                onChange={onInputChange}
              />
              {validation.title && (
                <div className="text-danger">{validation.title}</div>
              )}
            </div>
            {/* Description */}
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                placeholder="Enter description"
                value={thesis.description}
                onChange={onInputChange}
              />
              {validation.description && (
                <div className="text-danger">{validation.description}</div>
              )}
            </div>
            {/* Max Number Of Students */}
            <div className="mb-3">
              <label htmlFor="maxNumberOfStudents">
                Max Number Of Students:
              </label>
              <select
                className="form-control"
                id="maxNumberOfStudents"
                name="maxNumberOfStudents"
                value={thesis.maxNumberOfStudents}
                onChange={onInputChange}
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
            </div>
            {/* Necessary Knowledge */}
            <div className="mb-3">
              <label htmlFor="necessaryKnowledge" className="form-label">
                Necessary Knowledge
              </label>
              <input
                type="text"
                className="form-control"
                id="necessaryKnowledge"
                name="necessaryKnowledge"
                placeholder="Enter necessary knowledge"
                value={thesis.necessaryKnowledge}
                onChange={onInputChange}
              />
              {validation.necessaryKnowledge && (
                <div className="text-danger">
                  {validation.necessaryKnowledge}
                </div>
              )}
            </div>
            {/* Deliverables */}
            <div className="mb-3">
              <label htmlFor="deliverables" className="form-label">
                Deliverables
              </label>
              <input
                type="text"
                className="form-control"
                id="deliverables"
                name="deliverables"
                placeholder="Enter deliverables"
                value={thesis.deliverables}
                onChange={onInputChange}
              />
              {validation.deliverables && (
                <div className="text-danger">{validation.deliverables}</div>
              )}
            </div>
            {/* Bibliographic References */}
            <div className="mb-3">
              <label htmlFor="bibliographicReferences" className="form-label">
                Bibliographic References
              </label>
              <input
                type="text"
                className="form-control"
                id="bibliographicReferences"
                name="bibliographicReferences"
                placeholder="Enter bibliographic references"
                value={thesis.bibliographicReferences}
                onChange={onInputChange}
              />
              {validation.bibliographicReferences && (
                <div className="text-danger">
                  {validation.bibliographicReferences}
                </div>
              )}
            </div>
            {thesis.milestones.map((milestone, index) => (
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
                  onChange={onInputChange}
                />
                {validation[`milestone-name-${index}`] && (
                  <div className="text-danger">
                    {validation[`milestone-name-${index}`]}
                  </div>
                )}
                <label htmlFor={`milestone-description-${index}`}>
                  Milestone Description:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id={`milestone-description-${index}`}
                  name={`milestone-description-${index}`}
                  placeholder="Enter milestone description"
                  value={milestone.description}
                  onChange={onInputChange}
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
                  onChange={onInputChange}
                />
                <label htmlFor={`milestone-completionPercentage-${index}`}>
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
                  onChange={onInputChange}
                />
              </div>
            ))}

            <div className="mb-3">
              <button
                type="button"
                onClick={addNewMilestone}
                className="btn btn-secondary mb-3"
              >
                New Milestone
              </button>
            </div>
            <div className="d-flex justify-content-start">
              <button
                type="button"
                className="btn btn-danger mr-2"
                onClick={() => window.history.back()}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary mx-2">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
