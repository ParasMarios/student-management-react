import React from "react";
import StudentDataService from "../services/student";

export default class AddStudent extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeThesisTitle = this.onChangeThesisTitle.bind(this);
    this.onChangeComments = this.onChangeComments.bind(this);
    this.saveStudent = this.saveStudent.bind(this);
    this.newStudent = this.newStudent.bind(this);

    this.state = {
      id: null,
      firstName: "",
      lastName: "",
      email: "",
      thesisTitle: "",
      comments: "",
    };
  }

  onChangeFirstName(e) {
    this.setState({
      firstName: e.target.value,
    });
  }

  onChangeLastName(e) {
    this.setState({
      lastName: e.target.value,
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangeThesisTitle(e) {
    this.setState({
      thesisTitle: e.target.value,
    });
  }

  onChangeComments(e) {
    this.setState({
      comments: e.target.value,
    });
  }

  saveStudent() {
    var data = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      thesisTitle: this.state.thesisTitle,
      comments: this.state.comments,
    };

    StudentDataService.create(data)
      .then((response) => {
        this.setState({
          id: response.data.id,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
          thesisTitle: response.data.thesisTitle,
          comments: response.data.comments,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  newStudent() {
    this.setState({
      id: null,
      firstName: "",
      lastName: "",
      email: "",
      thesisTitle: "",
      comments: "",
    });
  }

  render() {
    return (
      <div className="submit-form">
        <h4>Add a Student</h4>
        <form>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              required
              value={this.state.firstName}
              onChange={this.onChangeFirstName}
              name="firstName"
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              required
              value={this.state.lastName}
              onChange={this.onChangeLastName}
              name="lastName"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="text"
              className="form-control"
              id="email"
              required
              value={this.state.email}
              onChange={this.onChangeEmail}
              name="email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="thesisTitle">Thesis Title</label>
            <input
              type="text"
              className="form-control"
              id="thesisTitle"
              required
              value={this.state.thesisTitle}
              onChange={this.onChangeThesisTitle}
              name="thesisTitle"
            />
          </div>
          <div className="form-group">
            <label htmlFor="comments">Comments</label>
            <input
              type="text"
              className="form-control"
              id="comments"
              required
              value={this.state.comments}
              onChange={this.onChangeComments}
              name="comments"
            />
          </div>
          <button onClick={this.saveStudent} className="btn btn-success">
            Submit
          </button>
        </form>
      </div>
    );
  }
}
