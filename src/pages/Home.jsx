import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import { Link } from "react-router-dom";
import Navbar from "../layout/Navbar";

export default function Home() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    const result = await axiosInstance.get("/students");
    setStudents(result.data);
  };

  const deleteStudent = async (email) => {
    await axiosInstance.delete(`/students/${email}`);
    loadStudents();
  };

  return (
    <div>
    <Navbar />
    <div className="container">
      <div className="py-4">
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
            {students.map((student, index) => (
              <tr key={student.id}>
                <th scope="row">{index + 1}</th>
                <td>{student.firstName}</td>
                <td>{student.lastName}</td>
                <td>{student.email}</td>
                <td>{student.thesisTitle}</td>
                <td>{student.comments}</td>
                <td>
                  <Link
                    className="btn btn-outline-warning mx-2"
                    to={`/editstudent/${student.email}`}
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-outline-danger"
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
