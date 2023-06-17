// src/App.js
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Students from "./pages/Students";
import AddStudent from "./students/AddStudent";
import EditStudent from "./students/EditStudent";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import PrivateRoute from "./auth/PrivateRoute";
import Auth from "./pages/Auth";
import Theses from "./pages/Theses";
import AddThesis from "./theses/AddThesis";
import EditThesis from "./theses/EditThesis";
import DetailsThesis from "./theses/DetailsThesis";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/app" element={<PrivateRoute />} />
        <Route path="/app/students" element={<Students />} />
        <Route path="/app/addstudent" element={<AddStudent />} />
        <Route path="/app/editstudent/:email" element={<EditStudent />} />
        {/* Add routes for the Thesis components */}
        <Route path="theses" element={<Theses />} />
        <Route path="/app/theses/addthesis" element={<AddThesis />} />
        <Route path="/app/theses/editthesis/:title" element={<EditThesis />} />
        <Route
          path="/app/theses/detailsthesis/:title"
          element={<DetailsThesis />}
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
