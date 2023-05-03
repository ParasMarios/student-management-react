import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import { useParams } from "react-router-dom";
import NavbarThesis from "../layout/NavbarThesis";

export default function EditThesis() {
  const { id } = useParams();
  const [thesis, setThesis] = useState({
    title: "",
    description: "",
    maxNumberOfStudents: 1,
    necessaryKnowledge: "",
    deliverables: "",
    bibliographicReferences: "",
    status: "available",
  });

  useEffect(() => {
    loadThesis();
  }, []);

  const loadThesis = async () => {
    const result = await axiosInstance.get(`/theses/${id}`);
    setThesis(result.data);
  };

  const handleChange = (e) => {
    setThesis({ ...thesis, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axiosInstance.put(`/theses/${id}`, thesis);
    window.location.href = "/app/home/thesis";
  };

  return (
    <div>
      <NavbarThesis />
      <div className="container">
        <div className="row mt-5">
          <div className="col-md-4 offset-md-4">
            <h4>Edit Thesis</h4>
            <form onSubmit={handleSubmit}>
              <div className="form-group mt-3">
                <label htmlFor="title">Title:</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  value={thesis.title}
                  onChange={handleChange}
                  required
                />

                <label htmlFor="description">Description:</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  name="description"
                  value={thesis.description}
                  onChange={handleChange}
                  required
                />

                <label htmlFor="maxNumberOfStudents">
                  Max Number Of Students:
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="maxNumberOfStudents"
                  name="maxNumberOfStudents"
                  value={thesis.maxNumberOfStudents}
                  onChange={handleChange}
                  required
                />

                <label htmlFor="necessaryKnowledge">Necessary Knowledge:</label>
                <input
                  type="text"
                  className="form-control"
                  id="necessaryKnowledge"
                  name="necessaryKnowledge"
                  value={thesis.necessaryKnowledge}
                  onChange={handleChange}
                  required
                />

                <label htmlFor="deliverables">Deliverables:</label>
                <input
                  type="text"
                  className="form-control"
                  id="deliverables"
                  name="deliverables"
                  value={thesis.deliverables}
                  onChange={handleChange}
                  required
                />

                <label htmlFor="bibliographicReferences">
                  Bibliographic References:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="bibliographicReferences"
                  name="bibliographicReferences"
                  value={thesis.bibliographicReferences}
                  onChange={handleChange}
                  required
                />

                <label htmlFor="status">Status:</label>
                <input
                  type="text"
                  className="form-control"
                  id="status"
                  name="status"
                  value={thesis.status}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary mt-3">
                Add Thesis
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
