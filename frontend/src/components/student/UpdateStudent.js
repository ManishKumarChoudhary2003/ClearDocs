// src/components/UpdateStudent.js
import React, { useState } from 'react';

const UpdateStudent = ({ match }) => {
  const { studentId } = match.params;
  const [student, setStudent] = useState({
    name: '',
    email: '',
    dateOfBirth: '',
    enrollmentNumber: '',
  });

  const handleUpdate = () => {
    // Add logic to update student here
    alert('Student updated successfully!');
  };

  return (
    <div className="container mt-5">
      <h2>Update Student</h2>
      <form>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input type="text" className="form-control" value={student.name} onChange={e => setStudent({ ...student, name: e.target.value })} />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" value={student.email} onChange={e => setStudent({ ...student, email: e.target.value })} />
        </div>
        <div className="mb-3">
          <label className="form-label">Date of Birth</label>
          <input type="date" className="form-control" value={student.dateOfBirth} onChange={e => setStudent({ ...student, dateOfBirth: e.target.value })} />
        </div>
        <button type="button" className="btn btn-primary" onClick={handleUpdate}>Update</button>
      </form>
    </div>
  );
};

export default UpdateStudent;
