// src/pages/Thesis.js
import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import { Link } from "react-router-dom";
import NavbarThesis from "../layout/NavbarThesis";

export default function Thesis() {
  const [theses, setTheses] = useState([]);

  useEffect(() => {
    loadTheses();
  }, []);

  const loadTheses = async () => {
    const result = await axiosInstance.get("/theses");
    setTheses(result.data);
  };

  const deleteThesis = async (title) => {
    await axiosInstance.delete(`/theses/${title}`);
    loadTheses();
  };

  return (
    <div>
      <NavbarThesis />
      <div className="container">
        <div className="py-4">
          <table className="table table-dark table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Description</th>
                <th scope="col">Max Students</th>
                <th scope="col">Necessary Knowledge</th>
                <th scope="col">Deliverables</th>
                <th scope="col">Bibliographic References</th>
                <th scope="col">Status</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(theses) &&
                theses.map((thesis, index) => (
                  <tr key={thesis.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{thesis.title}</td>
                    <td>{thesis.description}</td>
                    <td>{thesis.maxNumberOfStudents}</td>
                    <td>{thesis.necessaryKnowledge}</td>
                    <td>{thesis.deliverables}</td>
                    <td>{thesis.bibliographicReferences}</td>
                    <td>{thesis.status}</td>
                    <td>
                      <div className="d-inline-flex">
                        <Link
                          className="btn btn-outline-warning mx-2"
                          to={`/app/theses/editthesis/${thesis.title}`}
                        >
                          Edit
                        </Link>
                        <button
                          className="btn btn-outline-danger"
                          onClick={() => deleteThesis(thesis.title)}
                        >
                          Delete
                        </button>
                      </div>
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
