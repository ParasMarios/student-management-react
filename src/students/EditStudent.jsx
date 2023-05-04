import React, { useState, useEffect } from "react";
import axiosInstance from "../axiosInstance";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditStudent() {
  let navigate = useNavigate();

  const { email: studentEmail } = useParams();

  const [student, setStudent] = useState({
    thesisTitle: "",
    comments: "",
  });

  const [validation, setValidation] = useState({
    thesisTitle: "",
    comments: "",
  });

  const { thesisTitle, comments } = student;

  const validateInput = (field, value) => {
    let message = "";

    switch (field) {
      case "thesisTitle":
        if (!value.trim()) {
          message = "Thesis title cannot be blank";
        } else if (value.length < 5 || value.length > 200) {
          message = "Thesis title must be between 5 and 200 characters";
        }
        break;
      case "comments":
        if (value.length > 500) {
          message = "Comments should not exceed 500 characters";
        }
        break;
      default:
        break;
    }

    setValidation({ ...validation, [field]: message });
  };

  useEffect(() => {
    const fetchStudent = async () => {
      const { data } = await axiosInstance.get(`/students/${studentEmail}`);
      setStudent({ thesisTitle: data.thesisTitle, comments: data.comments });
    };
    fetchStudent();
  }, [studentEmail]);

  const onInputChange = (e) => {
    const { id, value } = e.target;
    setStudent({ ...student, [id]: value });
    validateInput(id, value);
  };

  const isFormValid = () => {
    return (
      Object.values(validation).every((message) => message === "") &&
      Object.values(student).some((value) => value.trim() !== "")
    );
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (isFormValid()) {
      await axiosInstance.patch(`/students/${studentEmail}`, student);
      navigate("/app/students");
    }
  };

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-6 shadow mx-auto p-5">
          <h2 className="text-center mb-4">Edit Student</h2>
          <form onSubmit={(e) => onSubmit(e)}>
            {/* Thesis Title */}
            <div className="mb-3">
              <label htmlFor="thesisTitle" className="form-label">
                Thesis Title
              </label>
              <input
                type="text"
                className="form-control"
                id="thesisTitle"
                placeholder="Enter thesis title"
                value={thesisTitle}
                onChange={(e) => onInputChange(e)}
              />
              {validation.thesisTitle && (
                <div className="text-danger">{validation.thesisTitle}</div>
              )}
            </div>
            {/* Comments */}
            <div className="mb-3">
              <label htmlFor="comments" className="form-label">
                Comments
              </label>
              <input
                type="text"
                className="form-control"
                id="comments"
                placeholder="Enter comments"
                value={comments}
                onChange={(e) => onInputChange(e)}
              />
              {validation.comments && (
                <div className="text-danger">{validation.comments}</div>
              )}
            </div>
            <Link
              type="button"
              className="btn btn-danger mx-2"
              to={"/app/students"}
            >
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
