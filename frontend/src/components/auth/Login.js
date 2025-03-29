import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import APIClient from '../../api/APIClient';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  const [authRequest, setAuthRequest] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAuthRequest({ ...authRequest, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await APIClient.login(authRequest);
      const { token, email, userId, role } = response.data;  
  
      localStorage.setItem('token', token);
      localStorage.setItem('email', email);
      if (role === 'ROLE_STUDENT') {
        localStorage.setItem('studentId', userId);  
      }else if (role === 'ROLE_USER') {
        localStorage.setItem('userId', userId )
      } else {
        localStorage.setItem('adminId', userId);  
      }
      localStorage.setItem('userRole', role); 
     
  
      setMessage('Login successful!');
  
      setTimeout(() => {
        navigate('/');
        window.location.reload();
      }, 1000);
  
    } catch (error) {
      setMessage('Error logging in: ' + (error.response?.data?.message || error.message));
    }
  };
  

  return (
    <div className="d-flex justify-content-center" style={{ height: '40vh', marginTop: '100px' }}>
      <div className="card" style={{ width: '30rem' }}>
        <div className="card-body">
          <h2 className="card-title text-center">Login</h2>
          {message && <p className="text-center text-success mb-3">{message}</p>}  
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
            >Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
