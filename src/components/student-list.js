import React from "react";
import StudentDataService from "../services/student";
import { Link } from "react-router-dom";

export default class StudentList extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeSearchEmail = this.onChangeSearchEmail.bind(this);
    this.retrieveStudents = this.retrieveStudents.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveStudent = this.setActiveStudent.bind(this);
    this.removeAllStudents = this.removeAllStudents.bind(this);
    this.searchEmail = this.searchEmail.bind(this);

    this.state = {
      students: [],
      currentStudent: null,
      currentIndex: -1,
      searchEmail: "",
    };
  }

  componentDidMount() {
    this.retrieveStudents();
  }

  onChangeSearchEmail(e) {
    const searchEmail = e.target.value;

    this.setState({
      searchEmail: searchEmail,
    });
  }

  retrieveStudents() {
    StudentDataService.getAll()
      .then((response) => {
        this.setState({
          students: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveStudents();
    this.setState({
      currentStudent: null,
      currentIndex: -1,
    });
  }

  setActiveStudent(student, index) {
    this.setState({
      currentStudent: student,
      currentIndex: index,
    });
  }

  removeAllStudents() {
    StudentDataService.deleteAll()
      .then((response) => {
        console.log(response.data);
        this.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  searchEmail() {
    StudentDataService.findByEmail(this.state.searchEmail)
      .then((response) => {
        this.setState({
          students: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { searchEmail, students, currentIndex } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4 offset-md-4 mt-4">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search by email"
                value={searchEmail}
                onChange={this.onChangeSearchEmail}
                style={{ marginRight: "10px" }}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={this.searchEmail}
                  style={{ marginLeft: "10px" }}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-8 offset-md-2">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Thesis</th>
                  <th>Comments</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {students &&
                  students.map((student, index) => (
                    <tr
                      className={
                        "list-group-item " +
                        (index === currentIndex ? "active" : "")
                      }
                      onClick={() => this.setActiveStudent(student, index)}
                      key={index}
                    >
                      <td>{student.firstName}</td>
                      <td>{student.lastName}</td>
                      <td>{student.email}</td>
                      <td>{student.thesis}</td>
                      <td>{student.comments}</td>
                      <td>
                        <Link
                          to={"/students/" + student.email}
                          className="btn btn-sm btn-primary mr-2"
                        >
                          Edit
                        </Link>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => this.deleteStudent(student.email)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            {students && students.length === 0 && (
              <div className="alert alert-info">No students found.</div>
            )}
            <div className="text-center mt-4">
              <button
                className="btn btn-sm btn-danger"
                onClick={this.removeAllStudents}
              >
                Delete All
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
