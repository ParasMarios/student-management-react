// src/auth/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../axiosInstance";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export { AuthContext }; // Place the export here

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    accessToken: null,
  });

  const navigate = useNavigate(); // Use useNavigate instead of Navigate

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setAuthState({ isAuthenticated: true, accessToken: token });
    }
  }, []);

  const loginUser = async (email, password) => {
    try {
      console.log("Sending request with email:", email, "and password:", password);

      const res = await axiosInstance.post("/auth/authenticate", {
        email,
        password,
      });
      const { accessToken } = res.data;
      localStorage.setItem("accessToken", accessToken);
      setAuthState({
        ...authState,
        isAuthenticated: true,
        accessToken: accessToken,
      });

      navigate("/app"); // Use navigate instead of history.push
    } catch (error) {
      console.error("Error during login", error);
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    }
  };

  const registerUser = async (firstName, lastName, email, password) => {
    await axiosInstance.post("/auth/register", {
      firstName,
      lastName,
      email,
      password,
    });
    await loginUser(email, password);
  };

  const logoutUser = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ isAuthenticated: false, accessToken: null });
    navigate("/"); // Use navigate instead of history.push
  };

  const value = {
    authState,
    loginUser,
    registerUser,
    logoutUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
