import React, { useState, useEffect } from "react";
import axiosInstance from "../axiosInstance";
import { useNavigate } from "react-router-dom";
import Navbar from "../layout/Navbar";

export default function AddStudent() {
  let navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [emailCheck, setEmailCheck] = useState(false);

  const [student, setStudent] = useState({
    firstName: "",
    lastName: "",
    email: "",
    thesisTitle: "",
    comments: "",
  });

  const [validation, setValidation] = useState({
    firstName: "",
    lastName: "",
    email: "",
    thesisTitle: "",
    comments: "",
  });

  const { firstName, lastName, email, thesisTitle, comments } = student;

  const checkEmailExists = async (email) => {
    try {
      const response = await axiosInstance.get(`/students/checkEmail/${email}`);
      return response.data ? true : false;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return false;
      } else {
        console.error("Error while checking email existence:", error);
        return false;
      }
    }
  };

  useEffect(() => {
    if (emailCheck) {
      const checkEmail = async () => {
        const exists = await checkEmailExists(email);
        setValidation((prevValidation) => ({
          ...prevValidation,
          email: exists ? "Email already exists" : "",
        }));
        setEmailCheck(false);
      };

      checkEmail();
    }
  }, [emailCheck, email]);

  const validateInput = (field, value) => {
    let message = "";

    switch (field) {
      case "firstName":
      case "lastName":
        if (!value.trim()) {
          message = "This field cannot be blank";
        } else if (value.length < 2 || value.length > 50) {
          message = "Must be between 2 and 50 characters";
        }
        break;
      case "email":
        const emailRegex = /^.+@uop\.gr$/;
        if (!value.trim()) {
          message = "Email cannot be blank";
        } else if (!emailRegex.test(value)) {
          message = "Email should be valid and end with @uop.gr";
        }
        setEmailCheck(true);
        break;
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
      try {
        await axiosInstance.post("/students", student);
        navigate("/app/students", { replace: true });
      } catch (error) {
        if (error.response && error.response.status === 500) {
          setErrorMessage(
            "The thesis title is already taken. Please choose a different one."
          );
        } else {
          setErrorMessage(
            "An error occurred while adding the student. Please try again."
          );
        }
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row mt-5">
          <div className="col-md-6 shadow mx-auto p-5">
            <h2 className="text-center mb-4">Add A Student</h2>
            <form onSubmit={(e) => onSubmit(e)}>
              {/* First Name */}
              <div className="mb-3">
                <label htmlFor="firstName" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  placeholder="Enter first name"
                  value={firstName}
                  onChange={(e) => onInputChange(e)}
                />
                {validation.firstName && (
                  <div className="text-danger">{validation.firstName}</div>
                )}
              </div>
              {/* Last Name */}
              <div className="mb-3">
                <label htmlFor="lastName" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  placeholder="Enter last name"
                  value={lastName}
                  onChange={(e) => onInputChange(e)}
                />
                {validation.lastName && (
                  <div className="text-danger">{validation.lastName}</div>
                )}
              </div>
              {/* Email */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => onInputChange(e)}
                />
                {validation.email && (
                  <div className="text-danger">{validation.email}</div>
                )}
              </div>
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
              <button
                type="button"
                className="btn btn-danger me-2"
                onClick={() => navigate("/app/students")}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
            {errorMessage && (
              <div className="alert alert-danger" role="alert">
                {errorMessage}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
