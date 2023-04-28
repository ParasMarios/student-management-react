import http from "../common/http-common";

class StudentDataService {
  getAll() {
    return http.get("/students");
  }

  get(email) {
    return http.get(`/students/${email}`);
  }

  create(data) {
    return http.post("/students", data);
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
