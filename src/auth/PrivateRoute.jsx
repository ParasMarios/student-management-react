// src/auth/PrivateRoute.js
import React from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { Navigate } from "react-router-dom";

export default function PrivateRoute() {
    const { authState } = useAuth();
  
    return authState.isAuthenticated ? <Outlet /> : <Navigate to="/" />;
  }
