import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Contact from './components/Contact';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import StudentForm from './components/student/StudentForm';
import AllStudents from './components/student/AllStudents';
import StudentDetails from './components/student/StudentDetails';
import UpdateStudent from './components/student/UpdateStudent';
import UploadDocument from './components/document/UploadDocument';
import Logout from './components/auth/Logout';
import StudentDocuments from './components/student/StudentDocuments';
import AuditLogs from './components/audit/AuditLogs';
import Analytics from './components/analytics/Analytics';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auditor" element={<AuditLogs />} />
            <Route path='/analytics' element={<Analytics />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/add-student" element={<StudentForm />} />
            <Route path="/student/:studentId" element={<StudentDetails />} />
            <Route path="/upload-document/:studentId" element={<UploadDocument />} />
            <Route path="/update-student/:studentId" element={<UpdateStudent />} />
            <Route path="/register" element={<Register />} />
            <Route path="/all-students" element={<AllStudents />} />
            <Route path="/student-documents" element={<StudentDocuments />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
