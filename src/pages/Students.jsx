import React, { useContext, useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import Navbar from "../layout/Navbar";
import { AuthContext } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";

const Home = () => {
  let navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const { authState } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReassignModalOpen, setIsReassignModalOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
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

  const handleDelete = (student) => {
    setIsModalOpen(true);
    setStudentToDelete(student);
  };

  const handleConfirmDelete = async () => {
    setIsModalOpen(false);
    const studentsWithSameThesis = students.filter(
      (student) => student.thesisTitle === studentToDelete.thesisTitle
    );

    if (studentsWithSameThesis.length === 1) {
      setIsReassignModalOpen(true);
    } else {
      await deleteStudent(studentToDelete.email, false);
    }
  };

  const handleReassignConfirmation = async (reassign) => {
    setIsReassignModalOpen(false);
    await deleteStudent(studentToDelete.email, reassign);
  };

  const deleteThesisFromTable = async (title) => {
    try {
      await axiosInstance.delete(`/theses/${encodeURIComponent(title)}`);
    } catch (error) {
      console.error("Error while deleting thesis:", error);
    }
  };

  const deleteStudent = async (email, reassignThesis) => {
    await axiosInstance.delete(`/students/${email}`, {
      params: { reassignThesis },
    });
    if (!reassignThesis) {
      await deleteThesisFromTable(studentToDelete.thesisTitle);
    }
    loadStudents();
    window.location.reload();
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
                    <td>
                      <button
                        className="btn btn-outline-info"
                        onClick={() => {
                          console.log("Student email:", student.email);
                          navigate(`/app/${student.email}/details`);
                        }}
                      >
                        Details
                      </button>

                      <button
                        className="btn btn-outline-warning mx-2"
                        onClick={() => navigate(`/app/${student.email}/edit`)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-outline-danger mx-2"
                        onClick={() => handleDelete(student)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Student</Modal.Title>
          </Modal.Header>
          <Modal.Body>Do you really want to delete this student?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleConfirmDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal
          show={isReassignModalOpen}
          onHide={() => setIsReassignModalOpen(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Reassign Thesis</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Do you want to mark the relevant thesis as 'available'?
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => handleReassignConfirmation(false)}
            >
              No
            </Button>
            <Button
              variant="danger"
              onClick={() => handleReassignConfirmation(true)}
            >
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Home;
