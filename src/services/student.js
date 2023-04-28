import http from "../common/http-common";

class StudentDataService {
  getAll() {
    return http.get("/students");
  }

  findByEmail(email) {
    return http.get(`/students/${email}`);
  }

  create(data) {
    return http
      .post("/students", data)
      .then((response) => {
        console.log(response.data);
        return response.data;
      })
      .catch((e) => {
        console.log(e);
      });
  }

  update(email, data) {
    return http.put(`/students/${email}`, data);
  }

  delete(email) {
    return http.delete(`/students/${email}`);
  }

  deleteAll() {
    return http.delete(`/students`);
  }
}

export default new StudentDataService();
