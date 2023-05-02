import React, { useState, useContext } from "react";
import { useAuth } from "../auth/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser(email, password); // Use loginUser instead of login
    } catch (error) {
      console.error("Error during login", error);
    }
  };

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-4 offset-md-4">
          <h4>Login</h4>
          <form onSubmit={handleSubmit}>
            <div className="form-group mt-3">
              <label htmlFor="email">Email address:</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group mt-3">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary mt-3">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
