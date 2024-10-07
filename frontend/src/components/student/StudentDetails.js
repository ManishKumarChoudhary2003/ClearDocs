// src/components/StudentDetails.js
import React from 'react';

const StudentDetails = ({ match }) => {
  const { studentId } = match.params;

  return (
    <div className="container mt-5">
      <h2>Student Details</h2>
      <p>Showing details for student ID: {studentId}</p>
      {/* Placeholder content - Implement actual logic to fetch student by ID */}
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Student Name</h5>
          <p className="card-text">Email: student@example.com</p>
          <p className="card-text">Date of Birth: 01/01/2000</p>
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;
