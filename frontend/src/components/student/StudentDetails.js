import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const StudentDetails = () => {
  const { studentId } = useParams();
  const [student, setStudent] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStudentDetails = async () => {
      const token = localStorage.getItem('token');

      try {
        const response = await axios.get(`http://localhost:8080/student/${studentId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStudent(response.data);
      } catch (err) {
        console.error('Error fetching student details:', err.response ? err.response.data : err.message);
        setError('Failed to fetch student details.');
      }
    };

    fetchStudentDetails();
  }, [studentId]);

  return (
    <div className="container mt-5">
      <h2>Student Details</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {student ? (
        <div className="card shadow mt-4">
          <div className="card-body">
            <h5 className="card-title">{student.name}</h5>
            <p className="card-text">Email: {student.email}</p>
            <p className="card-text">Date of Birth: {new Date(student.dateOfBirth).toLocaleDateString()}</p>
            <p className="card-text">Enrollment Number: {student.enrollmentNumber}</p>
          </div>
        </div>
      ) : (
        <div className="alert alert-info">Loading student details...</div>
      )}
    </div>
  );
};

export default StudentDetails;
