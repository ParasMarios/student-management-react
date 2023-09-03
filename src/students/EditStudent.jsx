import React, { useState, useEffect } from "react";
import axiosInstance from "../axiosInstance";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

export default function EditStudent() {
  let navigate = useNavigate();
  const [errorMessage] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const { email: studentEmail } = useParams();

  const [student, setStudent] = useState({
    thesisTitle: "",
    comments: [],
  });

  const [availableTheses, setAvailableTheses] = useState([]);
  const [validation, setValidation] = useState({
    thesisTitle: "",
  });

  const { thesisTitle } = student;

  const addNewComment = () => {
    const newComment = {
      title: "",
      description: "",
    };
    setStudent((prevStudent) => ({
      ...prevStudent,
      comments: [...prevStudent.comments, newComment],
    }));
  };

  const updateComment = (index, field, value) => {
    const updatedComments = [...student.comments];
    updatedComments[index] = {
      ...updatedComments[index],
      [field]: value,
    };

    setStudent((prevStudent) => ({
      ...prevStudent,
      comments: updatedComments,
    }));
  };

  const deleteComment = (index) => {
    const updatedComments = student.comments.filter((_, i) => i !== index);

    setStudent((prevStudent) => ({
      ...prevStudent,
      comments: updatedComments,
    }));
  };

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
      default:
        break;
    }

    setValidation({ ...validation, [field]: message });
  };

  useEffect(() => {
    const fetchStudent = async () => {
      const { data } = await axiosInstance.get(`/students/${studentEmail}`);
      setStudent({
        thesisTitle: data.thesisTitle,
        comments: data.comments.map((comment) => ({
          title: comment.title,
          description: comment.description,
        })),
      });
    };

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

    fetchStudent();
    fetchAvailableTheses();
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
      try {
        await axiosInstance.patch(`/students/${studentEmail}`, student);
        navigate("/app/students");
        enqueueSnackbar("Student edited successfully", { variant: "success" });
      } catch (error) {
        if (error.response && error.response.status === 500) {
          enqueueSnackbar(
            "An error occurred while editing the student. Please try again.",
            { variant: "error" }
          );
        }
      }
    }
  };

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-6 shadow mx-auto p-5">
          <h2 className="text-center mb-4">Edit Student</h2>
          <form onSubmit={(e) => onSubmit(e)}>
            {/* Thesis Title Dropdown */}
            <div className="mb-3">
              <label htmlFor="thesisTitle" className="form-label">
                Thesis Title
              </label>
              <select
                className="form-select"
                id="thesisTitle"
                value={thesisTitle}
                onChange={(e) => onInputChange(e)}
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
              {student.comments.map((comment, index) => (
                <div key={index}>
                  <button
                    type="button"
                    onClick={() => deleteComment(index)}
                    className="btn btn-danger mb-3"
                  >
                    Delete Comment
                  </button>
                  <div>
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
                  </div>
                  <div>
                    <label htmlFor={`comment-description-${index}`}>
                      Comment Description:
                    </label>
                    <textarea
                      className="form-control"
                      id={`comment-description-${index}`}
                      name={`comment-description-${index}`}
                      placeholder="Enter comment description"
                      value={comment.description}
                      onChange={(e) =>
                        updateComment(index, "description", e.target.value)
                      }
                    />
                  </div>
                </div>
              ))}
            </fieldset>
            <div className="mb-3">
              <button
                type="button"
                onClick={addNewComment}
                className="btn btn-secondary mb-3"
              >
                New Comment
              </button>
            </div>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => navigate("/app/students")}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary mx-2">
              Submit
            </button>
          </form>
          {errorMessage && (
            <div className="alert alert-danger">{errorMessage}</div>
          )}
        </div>
      </div>
    </div>
  );
}
