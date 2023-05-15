import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import { Link } from "react-router-dom";
import NavbarThesis from "../layout/NavbarThesis";
import DetailsThesis from "../theses/DetailsThesis";
import { useAuth } from "../auth/AuthContext";

export default function Thesis() {
  const [theses, setTheses] = useState([]);
  const [search, setSearch] = useState("");
  const [showDetails, setShowDetails] = useState({});
  const [statusFilter, setStatusFilter] = useState("");
  const { authState } = useAuth();

  const toggleDetails = (id) => {
    setShowDetails((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  useEffect(() => {
    loadTheses();
  }, []);

  const loadTheses = async () => {
    const result = await axiosInstance.get("/theses");
    setTheses(result.data);
  };

  const deleteThesis = async (title) => {
    try {
      await axiosInstance.delete(`/theses/${encodeURIComponent(title)}`);
      loadTheses();
    } catch (error) {
      console.error("Error while deleting thesis:", error);
    }
  };

  const searchThesesByTitleOrDescriptionContains = async (keyword, status) => {
    const result = await axiosInstance.get(
      `/theses/search/${keyword}?status=${status}`
    );
    setTheses(result.data);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    searchThesesByTitleOrDescriptionContains(search, statusFilter);
  };

  const handleSearchKeyPress = (e) => {
    if (e.key === "Enter") {
      searchThesesByTitleOrDescriptionContains(search, statusFilter);
    }
  };

  return (
    <div>
      <NavbarThesis />
      <div className="container">
        <div className="py-4">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title or description"
              aria-label="Search by title or description"
              aria-describedby="button-addon2"
              value={search}
              onChange={handleSearchChange}
              onKeyDown={handleSearchKeyPress}
            />
            <select
              className="form-control"
              id="statusFilter"
              name="statusFilter"
              value={statusFilter}
              onChange={handleStatusFilterChange}
            >
              <option value="">All statuses</option>
              <option value="available">Available</option>
            </select>
            <button
              className="btn btn-outline-secondary"
              type="button"
              id="button-addon2"
              onClick={handleSearchSubmit}
            >
              Search
            </button>
          </div>
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
                      {authState.isAuthenticated && (
                        <div className="d-inline-flex">
                          <button
                            className="btn btn-outline-info mx-2"
                            onClick={() => toggleDetails(thesis.id)}
                          >
                            Details
                          </button>
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
                      )}
                      {showDetails[thesis.id] && (
                        <DetailsThesis thesis={thesis} />
                      )}
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
