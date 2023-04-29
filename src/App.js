import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Navbar from "./layout/Navbar";
import Home from "./pages/Home";
import AddStudent from "./students/AddStudent";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import EditStudent from "./students/EditStudent";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addstudent" element={<AddStudent />} />
        <Route path="/editstudent/:email" element={<EditStudent />} />
      </Routes>
    </div>
  );
}

export default App;
