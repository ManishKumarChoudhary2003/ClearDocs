import React, { useState } from 'react';
import APIClient from '../../api/APIClient';
import 'bootstrap/dist/css/bootstrap.min.css';

const Register = () => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    mobileNumber: '',
    password: '',
    roles: '', // Initialize roles as an empty string
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await APIClient.register(user);
      setMessage(`User registered successfully: ${response.data.email}`);
      setUser({
        username: '',
        email: '',
        mobileNumber: '',
        password: '',
        roles: '',
      }); 
    } catch (error) {
      setMessage('Error registering user: ' + error.response.data.message);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="card" style={{ width: '30rem' }}>
        <div className="card-body">
          <h2 className="card-title text-center">Register</h2>
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
                value={user.roles}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="" disabled>Select a role</option>
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
                {/* Add more roles as needed */}
              </select>
            </div>
            <button type="submit" className="btn btn-primary w-100">Register</button>
          </form>
          {message && <p className="text-center mt-3">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default Register;
