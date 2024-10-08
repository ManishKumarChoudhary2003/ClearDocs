import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AllStudents = () => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');

      // Check if userId is not null or undefined
      if (!userId) {
        setError('User ID is not found. Please log in again.');
        return;
      }

      try {
        // Fetch all students for the logged-in user
        const response = await axios.get(`http://localhost:8080/student/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStudents(response.data || []);
      } catch (err) {
        console.error('Error fetching students:', err.response ? err.response.data : err.message);
        setError(err.response?.data?.message || 'Failed to fetch students.');
      }
    };

    fetchStudents();
  }, []);

  const deleteStudent = async (studentId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:8080/student/delete/${studentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStudents((prevStudents) => prevStudents.filter((student) => student.studentId !== studentId));
    } catch (err) {
      console.error('Error deleting student:', err.response ? err.response.data : err.message);
      setError('Failed to delete student.');
    }
  };

  const goToUpdatePage = (studentId) => {
    navigate(`/update-student/${studentId}`);
  };

  const goToStudentDetails = (studentId) => {
    navigate(`/student/${studentId}`);
  };

  const goToAddStudent = () => {
    navigate('/add-student');
  };

  return (
    <div className="container mt-5">
      <h2>All Students</h2>
      <button className="btn btn-primary mb-3" onClick={goToAddStudent}>
        Add Student
      </button>
      {error && <div className="alert alert-danger">{error}</div>}
      {students.length === 0 ? (
        <div className="alert alert-info">No students found.</div>
      ) : (
        <ul className="list-group">
          {students.map((student) => (
            <li key={student.studentId} className="list-group-item d-flex justify-content-between align-items-center">
              <span onClick={() => goToStudentDetails(student.studentId)} style={{ cursor: 'pointer' }}>
                {student.name} - {student.email}
              </span>
              <div>
                <button className="btn btn-warning btn-sm me-2" onClick={() => goToUpdatePage(student.studentId)}>
                  Update
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => deleteStudent(student.studentId)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AllStudents;
