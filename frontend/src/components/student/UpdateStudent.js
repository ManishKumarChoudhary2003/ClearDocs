import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateStudent = () => {
  const { studentId } = useParams(); 
  const [student, setStudent] = useState({
    name: '',
    email: '',
    dateOfBirth: '',
    enrollmentNumber: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudent = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`http://localhost:8080/student/${studentId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const formattedDate = response.data.dateOfBirth.split('T')[0];  
        setStudent({ ...response.data, dateOfBirth: formattedDate });
      } catch (err) {
        console.error('Error fetching student data:', err.response ? err.response.data : err.message);
        setError(err.response?.data?.message || 'Failed to fetch student details.');
      }
    };

    fetchStudent();
  }, [studentId]);

  const handleUpdate = async () => {
    const token = localStorage.getItem('token');
    const dateOfBirthWithTime = `${student.dateOfBirth}T00:00:00`;

    const updatedStudent = {
      ...student,
      dateOfBirth: dateOfBirthWithTime, 
    };

    try {
      await axios.put(`http://localhost:8080/student/update/${studentId}`, updatedStudent, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Student updated successfully!');
      navigate('/all-students');  
    } catch (err) {
      console.error('Error updating student:', err.response ? err.response.data : err.message);
      setError(err.response?.data?.message || 'Failed to update student.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Update Student</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            value={student.name}
            onChange={e => setStudent({ ...student, name: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={student.email}
            onChange={e => setStudent({ ...student, email: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Date of Birth</label>
          <input
            type="date"
            className="form-control"
            value={student.dateOfBirth}
            onChange={e => setStudent({ ...student, dateOfBirth: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Enrollment Number</label>
          <input
            type="text"
            className="form-control"
            value={student.enrollmentNumber}
            onChange={e => setStudent({ ...student, enrollmentNumber: e.target.value })}
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={handleUpdate}>
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateStudent;
