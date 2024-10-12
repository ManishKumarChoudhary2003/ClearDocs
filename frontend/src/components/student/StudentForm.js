import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const StudentForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [enrollmentNumber, setEnrollmentNumber] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem("userId"); // Fetch userId from localStorage
    const token = localStorage.getItem("token"); // Fetch token from localStorage

    // Append time 'T00:00:00' to the dateOfBirth to match LocalDateTime format
    const dateOfBirthWithTime = `${dateOfBirth}T00:00:00`;

    const studentData = {
      name,
      email,
      dateOfBirth: dateOfBirthWithTime, // Pass the date with time
      enrollmentNumber,
    };

    try {
      const response = await axios.post(`http://localhost:8080/student/add/${userId}`, studentData, {
        headers: {
          Authorization: `Bearer ${token}`, // Include JWT token
          'Content-Type': 'application/json', // Set content type
        },
      });

      if (response.status === 201) {
        console.log('Student added successfully:', response.data);
        setSuccess('Student added successfully!');
        setError('');

        // Navigate to the all-students route after a successful submission
        setTimeout(() => {
          navigate('/all-students'); // Navigate to all-students route
        }, 2000); // 2 seconds delay before navigation
      }
    } catch (error) {
      console.error('Failed to add student', error);
      setError('Failed to add student. Please try again.');
      setSuccess('');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-header bg-primary text-white text-center">
              <h3>Add Student</h3>
            </div>
            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter student name"
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter student email"
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="dateOfBirth" className="form-label">Date of Birth</label>
                  <input
                    type="date"
                    className="form-control"
                    id="dateOfBirth"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="enrollmentNumber" className="form-label">Enrollment Number</label>
                  <input
                    type="text"
                    className="form-control"
                    id="enrollmentNumber"
                    value={enrollmentNumber}
                    onChange={(e) => setEnrollmentNumber(e.target.value)}
                    placeholder="Enter enrollment number"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                  Add Student
                </button>
              </form>

              {error && <div className="alert alert-danger mt-3">{error}</div>}
              {success && <div className="alert alert-success mt-3">{success}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentForm;
