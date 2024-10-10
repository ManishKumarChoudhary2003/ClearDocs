import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Contact from './components/Contact';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import StudentForm from './components/student/StudentForm';
import AllStudents from './components/student/AllStudents'; // Ensure the correct import path
import StudentDetails from './components/student/StudentDetails'; // Ensure the correct import path
import UpdateStudent from './components/student/UpdateStudent'; // Ensure the correct import path

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/add-student" element={<StudentForm />} />
            <Route path="/student/:studentId" element={<StudentDetails />} />
            <Route path="/update-student/:studentId" element={<UpdateStudent />} />
            <Route path="/register" element={<Register />} />
            <Route path="/all-students" element={<AllStudents />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
