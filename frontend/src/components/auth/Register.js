import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  
import APIClient from '../../api/APIClient';
import 'bootstrap/dist/css/bootstrap.min.css';

const Register = () => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    mobileNumber: '',
    password: '',
    roles: [], 
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();  

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'roles') {
      setUser({ ...user, roles: [value] });  
    } else {
      setUser({ ...user, [name]: value });
    }
  };

  const validateMobileNumber = (mobileNumber) => {
    const mobileNumberRegex = /^\d{10}$/;
    return mobileNumberRegex.test(mobileNumber);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateMobileNumber(user.mobileNumber)) {
      setMessage('Mobile number must be exactly 10 digits.');
      return;
    }

    if (!validatePassword(user.password)) {
      setMessage('Password must be at least 8 characters long and contain at least one special character.');
      return;
    }

    try {
      const response = await APIClient.register(user);
      console.log('API response:', response);  

    
      setMessage('Registration successful! Redirecting to login...');

      setUser({
        username: '',
        email: '',
        mobileNumber: '',
        password: '',
        roles: [],
      });

      setTimeout(() => {
        navigate('/login'); 
      }, 2000);
    } catch (error) {
      console.log('Error response:', error.response);  
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
          )}  
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
                value={user.roles[0] || ''} 
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
            <button type="submit" className="btn btn-primary w-100"
            style={{
              transition: 'transform 0.3s ease, opacity 0.3s ease',
            }}
            onMouseDown={(e) => {
              e.target.style.transform = 'scale(1.1)';  
              e.target.style.opacity = '0.8';  
            }}
            onMouseUp={(e) => {
              e.target.style.transform = 'scale(1)';  
              e.target.style.opacity = '1';  
            }}
            >Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
