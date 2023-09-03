import React, { useState, useEffect } from "react";
import axiosInstance from "../axiosInstance";
import { useNavigate } from "react-router-dom";
import Navbar from "../layout/Navbar";
import { useSnackbar } from "notistack";

export default function AddStudent() {
  let navigate = useNavigate();
  const [errorMessage] = useState("");
  const [emailCheck, setEmailCheck] = useState(false);
  const [availableTheses, setAvailableTheses] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const [student, setStudent] = useState({
    firstName: "",
    lastName: "",
    email: "",
    thesisTitle: "",
    comments: [],
  });

  const [validation, setValidation] = useState({
    firstName: "",
    lastName: "",
    email: "",
    thesisTitle: "",
  });

  const { firstName, lastName, email, thesisTitle, comments } = student;

  const onThesisTitleChange = (e) => {
    const { value } = e.target;
    setStudent({ ...student, thesisTitle: value });
  };

  const addComment = () => {
    const newComment = {
      title: "",
      date: new Date().toISOString(), // You can customize how you set the date
      text: "",
    };

    setStudent((prevStudent) => ({
      ...prevStudent,
      comments: [...prevStudent.comments, newComment],
    }));
  };

  const updateComment = (index, field, value) => {
    const updatedComments = [...comments];
    updatedComments[index][field] = value;

    setStudent((prevStudent) => ({
      ...prevStudent,
      comments: updatedComments,
    }));
  };

  const removeComment = (index) => {
    const updatedComments = comments.filter((_, i) => i !== index);

    setStudent((prevStudent) => ({
      ...prevStudent,
      comments: updatedComments,
    }));
  };

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
    const fetchAvailableTheses = async () => {
      try {
        const response = await axiosInstance.get("/theses");
        const availableThesesData = response.data.filter(
          (thesis) =>
            thesis.status === "Available" ||
            (thesis.status === "Assigned" &&
              thesis.assignedStudents.length < thesis.maxNumberOfStudents)
        );
        setAvailableTheses(availableThesesData);
      } catch (error) {
        console.error("Error while fetching available theses:", error);
      }
    };
    fetchAvailableTheses();
  }, []);

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
        enqueueSnackbar("Student created successfully", { variant: "success" });
      } catch (error) {
        if (error.response && error.response.status === 500) {
          enqueueSnackbar(
            "An error occurred while adding the student. Please try again.",
            { variant: "error" }
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
                <select
                  className="form-select"
                  id="thesisTitle"
                  value={thesisTitle}
                  onChange={(e) => onThesisTitleChange(e)}
                >
                  <option value="">Select a thesis title</option>
                  {availableTheses.map((thesis) => (
                    <option key={thesis.id} value={thesis.title}>
                      {thesis.title}
                    </option>
                  ))}
                </select>
                {validation.thesisTitle && (
                  <div className="text-danger">{validation.thesisTitle}</div>
                )}
              </div>
              {/* Comments */}
              <fieldset className="border p-3 mt-3">
                <legend>Comments</legend>
                {comments.map((comment, index) => (
                  <div key={index}>
                    <label htmlFor={`comment-title-${index}`}>
                      Comment Title:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id={`comment-title-${index}`}
                      name={`comment-title-${index}`}
                      placeholder="Enter comment title"
                      value={comment.title}
                      onChange={(e) =>
                        updateComment(index, "title", e.target.value)
                      }
                    />
                    <label htmlFor={`comment-text-${index}`}>
                      Comment Text:
                    </label>
                    <textarea
                      className="form-control"
                      id={`comment-text-${index}`}
                      name={`comment-text-${index}`}
                      rows="3"
                      placeholder="Enter comment text"
                      value={comment.text}
                      onChange={(e) =>
                        updateComment(index, "text", e.target.value)
                      }
                    />
                    <button
                      type="button"
                      className="btn btn-danger mb-3"
                      onClick={() => removeComment(index)}
                    >
                      Remove Comment
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="btn btn-secondary mb-3"
                  onClick={addComment}
                >
                  Add Comment
                </button>
              </fieldset>
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
