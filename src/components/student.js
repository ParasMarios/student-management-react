import React from "react";
import StudentDataService from "../services/student";
import { withRouter } from "../common/with-router";

class Student extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeThesisTitle = this.onChangeThesisTitle.bind(this);
    this.onChangeComments = this.onChangeComments.bind(this);
    this.saveStudent = this.saveStudent.bind(this);
    this.newStudent = this.newStudent.bind(this);
    this.getStudent = this.getStudent.bind(this);

    this.state = {
      id: null,
      firstName: "",
      lastName: "",
      email: "",
      thesisTitle: "",
      comments: "",
    };
  }

  componentDidMount() {
    this.getStudent(this.props.router.params.id);
  }

  onChangeThesisTitle(e) {
    const thesisTitle = e.target.value;

    this.setState(function (prevState) {
      return {
        currentStudent: {
          ...prevState.currentStudent,
          thesisTitle: thesisTitle,
        },
      };
    });
  }

  onChangeComments(e) {
    const comments = e.target.value;

    this.setState(function (prevState) {
      return {
        currentStudent: {
          ...prevState.currentStudent,
          comments: comments,
        },
      };
    });
  }

  getStudent(id) {
    StudentDataService.get(id)
      .then((response) => {
        this.setState({
          currentStudent: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateStudent() {
    StudentDataService.update(this.state.id, {
      thesisTitle: this.state.thesisTitle,
      comments: this.state.comments,
    })
      .then((response) => {
        console.log(response.data);
        this.setState({
          message: "The student was updated successfully!",
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  deleteStudent() {
    StudentDataService.delete(this.state.id)
      .then((response) => {
        console.log(response.data);
        this.props.router.navigate("/students");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentStudent } = this.state;

    return (
      <div>
        {currentStudent ? (
          <div className="edit-form">
            <h4>Student</h4>
            <form>
              <div className="form-group">
                <label htmlFor="thesisTitle">Thesis Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="thesisTitle"
                  value={currentStudent.thesisTitle}
                  onChange={this.onChangeThesisTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="comments">Comments</label>
                <input
                  type="text"
                  className="form-control"
                  id="comments"
                  value={currentStudent.comments}
                  onChange={this.onChangeComments}
                />
              </div>
            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteStudent}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateStudent}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Student...</p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Student);
