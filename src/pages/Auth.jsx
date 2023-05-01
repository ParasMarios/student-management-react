// src/pages/Auth.js
import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";

export default function Auth() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-4 offset-md-4">
          {showLogin ? (
            <>
              <Login />
              <div className="mt-3">
                Don't have an account?{" "}
                <button
                  className="btn btn-link"
                  onClick={() => setShowLogin(false)}
                >
                  Register
                </button>
              </div>
            </>
          ) : (
            <>
              <Register />
              <div className="mt-3">
                Already have an account?{" "}
                <button
                  className="btn btn-link"
                  onClick={() => setShowLogin(true)}
                >
                  Log in
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
