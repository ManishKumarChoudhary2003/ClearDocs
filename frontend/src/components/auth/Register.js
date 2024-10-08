import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import APIClient from '../../api/APIClient';
import 'bootstrap/dist/css/bootstrap.min.css';

const Register = () => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    mobileNumber: '',
    password: '',
    roles: [], // Initialize roles as an array
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Initialize navigate for routing

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'roles') {
      setUser({ ...user, roles: [value] }); // Wrap role in an array
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
      localStorage.setItem('userId', response.data.id);

      // Set success message
      setMessage('Registration successful');

      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate('/login'); // Navigate to login page
      }, 2000);

      // Clear form fields
      setUser({
        username: '',
        email: '',
        mobileNumber: '',
        password: '',
        roles: [],
      });
    } catch (error) {
      console.log('Error response:', error.response); // Debugging error response
      setMessage('Error registering user: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="card" style={{ width: '30rem' }}>
        <div className="card-body">
          <h2 className="card-title text-center">Register</h2>
          {message && <p className="text-center text-success mb-3">{message}</p>} {/* Display message above form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Username:</label>
              <input
                type="text"
                name="username"
                value={user.username}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email:</label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Mobile Number:</label>
              <input
                type="text"
                name="mobileNumber"
                value={user.mobileNumber}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password:</label>
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Roles:</label>
              <select
                name="roles"
                value={user.roles[0]} // Ensure only the first role is displayed
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="" disabled>Select a role</option>
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
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
