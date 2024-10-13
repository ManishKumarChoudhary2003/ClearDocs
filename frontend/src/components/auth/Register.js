import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import APIClient from '../../api/APIClient';
import 'bootstrap/dist/css/bootstrap.min.css';

const Register = () => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    mobileNumber: '',
    password: '',
    roles: [], // Store roles as an array
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // For navigation

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'roles') {
      setUser({ ...user, roles: [value] }); // Wrap the selected role in an array
    } else {
      setUser({ ...user, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await APIClient.register(user);
      console.log('API response:', response); // Debugging response

      // Store user ID in localStorage

      localStorage.setItem('userRole', user.roles[0]);
      // If the role is ROLE_STUDENT, store studentId instead
      if (user.roles[0] === 'ROLE_STUDENT') {
        localStorage.setItem('studentId', response.data.id); // Store student ID
      } else {
        localStorage.setItem('userId', response.data.id);
      }

      // Set success message
      setMessage('Registration successful! Redirecting to login...');

      // Clear form fields immediately after setting the message
      setUser({
        username: '',
        email: '',
        mobileNumber: '',
        password: '',
        roles: [],
      });

      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate('/login'); // Navigate to login page
      }, 2000);

    } catch (error) {
      console.log('Error response:', error.response); // Debugging error response
      setMessage('Error registering user: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '90vh', backgroundColor: '#f8f9fa' }}>
      <div className="card shadow-lg" style={{ width: '30rem' }}>
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Register</h2>
          {message && (
            <div className={`alert ${message.includes('Error') ? 'alert-danger' : 'alert-success'} text-center`}>
              {message}
            </div>
          )} {/* Success or error message */}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                name="username"
                value={user.username}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter username"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter email"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Mobile Number</label>
              <input
                type="text"
                name="mobileNumber"
                value={user.mobileNumber}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter mobile number"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter password"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Role</label>
              <select
                name="roles"
                value={user.roles[0] || ''} // Ensure only the first role is displayed
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="" disabled>Select a role</option>
                <option value="ROLE_USER">User</option>
                <option value="ROLE_ADMIN">Admin</option>
                <option value="ROLE_STUDENT">Student</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary w-100">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
