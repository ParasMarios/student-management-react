// src/App.js
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Navbar from "./layout/Navbar";
import Home from "./pages/Home";
import AddStudent from "./students/AddStudent";
import EditStudent from "./students/EditStudent";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import PrivateRoute from "./auth/PrivateRoute";
import Auth from "./pages/Auth";

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/app" element={<PrivateRoute />}>
          <Route index element={<Home />} />
          <Route path="addstudent" element={<AddStudent />} />
          <Route path="editstudent/:email" element={<EditStudent />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
