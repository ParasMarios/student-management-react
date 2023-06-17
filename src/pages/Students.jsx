import React, { useContext, useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import Navbar from "../layout/Navbar";
import { AuthContext } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Home() {
  let navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const { authState } = useContext(AuthContext);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (authState.isAuthenticated) {
      loadStudents();
    }
  }, [authState]);

  const loadStudents = async () => {
    try {
      const result = await axiosInstance.get("/students");
      setStudents(result.data);
    } catch (error) {
      if (error.response.status === 403) {
        setError("You must log in to use CRUD operations.");
      } else {
        console.error("Error while loading students:", error);
      }
    }
  };

  const deleteThesisFromTable = async (title) => {
    try {
      await axiosInstance.delete(`/theses/${encodeURIComponent(title)}`);
    } catch (error) {
      console.error("Error while deleting thesis:", error);
    }
  };

  const deleteStudent = async (email) => {
    if (window.confirm("Do you really want to delete this student?")) {
      const studentToDelete = students.find(
        (student) => student.email === email
      );
      const studentsWithSameThesis = students.filter(
        (student) => student.thesisTitle === studentToDelete.thesisTitle
      );
      let reassignThesis = false;
      if (studentsWithSameThesis.length === 1) {
        // Check if there's only one other student with the same thesis
        reassignThesis = window.confirm(
          "Do you want to mark the relevant thesis as 'available'?"
        );
      }
      await axiosInstance.delete(`/students/${email}`, {
        params: { reassignThesis },
      });
      if (studentsWithSameThesis.length === 1 && !reassignThesis) {
        // Only delete the thesis if this was the last student and the user didn't opt to reassign it
        await deleteThesisFromTable(studentToDelete.thesisTitle);
      }
      loadStudents();
      window.location.reload();
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="py-4">
          {error && <div className="alert alert-danger">{error}</div>}
          <table className="table table-dark table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Email</th>
                <th scope="col">Thesis Title</th>
                <th scope="col">Comments</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(students) &&
                students.map((student, index) => (
                  <tr key={student.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{student.firstName}</td>
                    <td>{student.lastName}</td>
                    <td>{student.email}</td>
                    <td>{student.thesisTitle}</td>
                    <td>{student.comments}</td>
                    <td>
                      <button
                        className="btn btn-outline-warning"
                        onClick={() =>
                          navigate(`/app/editstudent/${student.email}`)
                        }
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-outline-danger mx-2"
                        onClick={() => deleteStudent(student.email)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
