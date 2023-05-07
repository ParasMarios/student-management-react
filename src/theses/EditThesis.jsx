import React, { useState, useEffect } from "react";
import axiosInstance from "../axiosInstance";
import { Link, useNavigate, useParams } from "react-router-dom";

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
    setThesis({ ...thesis, [name]: value });
    validateInput(name, value);
  };

  const isFormValid = () => {
    return (
      Object.values(validation).every((value) => !value) &&
      Object.values(thesis).every((value) => value)
    );
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (isFormValid()) {
      await axiosInstance.patch(`/theses/${encodeURIComponent(title)}`, thesis);
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
            {/* Status */}
            <div className="mb-3">
              <label htmlFor="status">Status:</label>
              <select
                className="form-control"
                id="status"
                name="status"
                value={thesis.status}
                onChange={onInputChange}
                required
              >
                <option value="available">Available</option>
                <option value="assigned">Assigned</option>
              </select>
            </div>
            <Link type="button" className="btn btn-danger mx-2" to={"/theses"}>
              Cancel
            </Link>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
