import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import NavbarThesis from "../layout/NavbarThesis";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Thesis() {
  let navigate = useNavigate();
  const [theses, setTheses] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const { authState } = useAuth();

  useEffect(() => {
    loadTheses();
  }, []);

  const loadTheses = async () => {
    const result = await axiosInstance.get("/theses");
    setTheses(result.data);
  };

  const deleteThesis = async (id) => {
    try {
      await axiosInstance.delete(`/theses/${encodeURIComponent(id)}`);
      loadTheses();
    } catch (error) {
      console.error("Error while deleting thesis:", error);
    }
  };

  const searchThesesByTitleOrDescriptionContains = async (keyword, status) => {
    const result = await axiosInstance.get(
      `/theses/search/${encodeURIComponent(
        keyword
      )}?status=${encodeURIComponent(status)}`
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
              <option value="Available">Available</option>
              <option value="Assigned">Assigned</option>
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
                    <td>
                      {thesis.status.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
                        letter.toUpperCase()
                      )}
                    </td>
                    <td>
                      {authState.isAuthenticated && (
                        <div className="d-inline-flex">
                          <button
                            className="btn btn-outline-info"
                            onClick={() =>
                              navigate(
                                `/app/theses/detailsthesis/${encodeURIComponent(
                                  thesis.id
                                )}`
                              )
                            }
                          >
                            Details
                          </button>
                          <button
                            className="btn btn-outline-warning mx-2"
                            onClick={() =>
                              navigate(
                                `/app/theses/editthesis/${encodeURIComponent(
                                  thesis.id
                                )}`
                              )
                            }
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-outline-danger"
                            onClick={() => deleteThesis(thesis.title)}
                          >
                            Delete
                          </button>
                        </div>
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
