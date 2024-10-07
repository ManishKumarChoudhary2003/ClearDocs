// src/components/StudentForm.js
import React, { useState } from 'react';
import axios from 'axios';

const StudentForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [enrollmentNumber, setEnrollmentNumber] = useState('');
  const [userId, setUserId] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const studentData = {
      name,
      email,
      dateOfBirth,
      enrollmentNumber,
    };

    try {
      const response = await axios.post(`http://localhost:8080/student/add?userId=${userId}`, studentData);
      if (response.status === 201) {
        setSuccess('Student added successfully!');
        setName('');
        setEmail('');
        setDateOfBirth('');
        setEnrollmentNumber('');
        setError('');
      }
    } catch (error) {
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
                <div className="form-group mb-3">
                  <label htmlFor="userId" className="form-label">User ID</label>
                  <input
                    type="text"
                    className="form-control"
                    id="userId"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    placeholder="Enter user ID"
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
