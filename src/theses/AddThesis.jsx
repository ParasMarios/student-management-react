import React, { useState } from "react";
import axiosInstance from "../axiosInstance";
import NavbarThesis from "../layout/NavbarThesis";
import { useNavigate } from "react-router-dom";

export default function AddThesis() {
  let navigate = useNavigate();

  const [thesis, setThesis] = useState({
    title: "",
    description: "",
    maxNumberOfStudents: 1,
    necessaryKnowledge: "",
    deliverables: "",
    bibliographicReferences: "",
    status: "available",
  });

  const [validation, setValidation] = useState({
    title: "",
    description: "",
    maxNumberOfStudents: "",
    necessaryKnowledge: "",
    deliverables: "",
    bibliographicReferences: "",
    status: "",
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

    setValidation({ ...validation, [field]: message });
  };

  const isFormValid = () => {
    return (
      Object.values(validation).every((value) => !value) &&
      Object.values(thesis).every((value) => value)
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setThesis({ ...thesis, [e.target.name]: e.target.value });
    validateInput(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      alert("Invalid input!");
      return;
    }
    await axiosInstance.post("/theses", thesis);
    navigate("/theses");
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
                <input
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
                <input
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
                <input
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
                <input
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
                <label htmlFor="status">Status:</label>
                <select
                  className="form-control"
                  id="status"
                  name="status"
                  value={thesis.status}
                  onChange={handleChange}
                  required
                >
                  <option value="available">Available</option>
                  <option value="assigned">Assigned</option>
                </select>
              </div>
              <button
                type="button"
                className="btn btn-danger mx-2 mt-3"
                onClick={() => navigate("/theses")}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary mt-3">
                Add Thesis
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
