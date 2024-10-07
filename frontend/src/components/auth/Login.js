import React, { useState } from 'react';
import APIClient from '../../api/APIClient';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  const [authRequest, setAuthRequest] = useState({ email: '', password: '' });
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAuthRequest({ ...authRequest, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await APIClient.login(authRequest);
      setToken(response.data); // Save the token
      setMessage('Login successful!');
    } catch (error) {
      setMessage('Error logging in: ' + error.response.data.message);
    }
  };

  return (
    <div className="d-flex justify-content-center" style={{ height: '30vh', marginTop: '100px' }}>
      <div className="card" style={{ width: '30rem' }}>
        <div className="card-body">
          <h2 className="card-title text-center">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email:</label>
              <input
                type="email"
                name="email"
                value={authRequest.email}
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
                value={authRequest.password}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Login</button>
          </form>
          {message && <p className="text-center mt-3">{message}</p>}
          {token && <p className="text-center mt-3">Your token: <strong>{token}</strong></p>}
        </div>
      </div>
    </div>
  );
};

export default Login;
