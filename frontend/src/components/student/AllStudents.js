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

      if (!userId) {
        setError('User ID is not found. Please log in again.');
        return;
      }

      try {
        const response = await axios.get(`http://localhost:8080/student/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Sort students by studentId or another key to show the newest first
        const sortedStudents = (response.data || []).sort((a, b) => b.studentId - a.studentId);
        setStudents(sortedStudents);
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

  const goToStudentDetails = (studentId) => {
    navigate(`/student/${studentId}`);
  };

  const goToUpdatePage = (studentId) => {
    navigate(`/update-student/${studentId}`);
  };

  const goToAddStudent = () => {
    navigate('/add-student');
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">All Students</h2>
      <button className="btn btn-outline-info mb-4 btn-lg shadow-sm" onClick={goToAddStudent}>
        Add Student
      </button>



      {error && <div className="alert alert-danger">{error}</div>}
      {students.length === 0 ? (
        <div className="alert alert-info text-center">No students found.</div>
      ) : (
        <div className="row">
          {students.map((student) => (
            <div key={student.studentId} className="col-md-4 mb-4">
              <div className="card shadow" style={{ cursor: 'pointer' }} onClick={() => goToStudentDetails(student.studentId)}>
                <div className="card-body text-center">
                  <h5 className="card-title mb-3">{student.name}</h5>
                  <p className="card-text mb-2"><strong>Email:</strong> {student.email}</p>
                  <p className="card-text"><strong>Enrollment Number:</strong> {student.enrollmentNumber}</p>
                  <p className="card-text">
                    <strong>Date of Birth:</strong> {new Date(student.dateOfBirth).toLocaleDateString()}
                  </p>
                  <div className="d-flex justify-content-between mt-3">
                    <button
                      className="btn btn-outline-success btn-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        goToUpdatePage(student.studentId);
                      }}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteStudent(student.studentId);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllStudents;
