// src/pages/Auth.js
import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";

export default function Auth() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="container">
      <div className="row my-5">
        <div className="col-md-6 col-lg-6 shadow mx-auto p-5">
          {showLogin ? (
            <>
              <Login />
              <div className="mt-3 text-center">
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
              <div className="mt-3 text-center">
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
