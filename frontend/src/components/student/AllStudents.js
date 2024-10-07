import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AllStudents = () => {
  const [students, setStudents] = useState([]);
  const [userId, setUserId] = useState(1); // Replace this with actual user ID
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Correct hook for navigation in React Router v6

  useEffect(() => {
    // Fetch all students for the user
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/user/${userId}`);
        if (response.data) {
          setStudents(response.data);
        }
      } catch (err) {
        setError('Failed to fetch students.');
      }
    };
    fetchStudents();
  }, [userId]);

  const deleteStudent = async (studentId) => {
    try {
      await axios.delete(`http://localhost:8080/delete/${studentId}`);
      setStudents(students.filter(student => student.id !== studentId));
    } catch (err) {
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
    navigate('/add-student'); // Navigate to add-student route
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
          {students.map(student => (
            <li key={student.id} className="list-group-item d-flex justify-content-between align-items-center">
              <span onClick={() => goToStudentDetails(student.id)} style={{ cursor: 'pointer' }}>
                {student.name} - {student.email}
              </span>
              <div>
                <button className="btn btn-warning btn-sm me-2" onClick={() => goToUpdatePage(student.id)}>
                  Update
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => deleteStudent(student.id)}>
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
