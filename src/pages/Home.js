import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export default function Home() {
  const [students, setStudents] = useState([]);

  const { email: studentEmail } = useParams();

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    const result = await axios.get("http://localhost:8080/api/v1/students");
    setStudents(result.data);
  };

  const deleteStudent = async (email) => {
    await axios.delete(`http://localhost:8080/api/v1/students/${email}`);
    loadStudents();
  };

  return (
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
  );
}
