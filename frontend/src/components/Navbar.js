import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { FaHome, FaFileAlt, FaUser, FaUserShield, FaSignInAlt, FaSignOutAlt, FaClipboardCheck } from 'react-icons/fa';

const Navbar = () => {
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [enrollmentNumber, setEnrollmentNumber] = useState('');
  const [file, setFile] = useState(null);
  const [verificationResult, setVerificationResult] = useState('');
  const [error, setError] = useState('');

  const [userRole, setUserRole] = useState('');
  const [isAuthenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const storedRole = localStorage.getItem('userRole');
    const authToken = localStorage.getItem("token");
    if (authToken) {
      setAuthenticated(true);
    }
    if (storedRole) {
      setUserRole(storedRole);
    }
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleCloseResultModal = () => {
    setShowResultModal(false);
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };


  const handleVerifyDocument = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('enrollmentNumber', enrollmentNumber);
    formData.append('file', file);
    const userId = localStorage.getItem('userId');
    const adminId = localStorage.getItem('adminId');
    formData.append('userId', userId ? userId : adminId);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:8080/doc/verify-document', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      setVerificationResult(response.data);
      setError('');
      setShowVerifyModal(false);
      setShowResultModal(true);
    } catch (err) {
      setError('Error verifying document: ' + (err.response?.data || err.message));
      setVerificationResult('');
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/" style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>ClearDocs</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  <FaHome className="me-1" /> Home
                </Link>
              </li>
              {userRole === 'ROLE_STUDENT' && isAuthenticated && (
                <li className="nav-item">
                  <Link className="nav-link" to="/student-documents">
                    <FaFileAlt className="me-1" /> Documents
                  </Link>
                </li>
              )}
              {userRole === 'ROLE_ADMIN' && isAuthenticated && (
                <li className="nav-item">
                  <Link className="nav-link" to="/all-students">
                    <FaUserShield className="me-1" /> Students
                  </Link>
                </li>
              )}
              {userRole === 'ROLE_ADMIN' && isAuthenticated && (
                <li className="nav-item">
                  <Link className="nav-link" to="/auditor">
                    <FaUserShield className="me-1" /> Auditors
                  </Link>
                </li>
              )}
              {userRole === 'ROLE_ADMIN' && isAuthenticated && (
                <li className="nav-item">
                  <Link className="nav-link" to="/analytics">
                    <FaUserShield className="me-1" /> Analytics
                  </Link>
                </li>
              )}

              {(userRole === 'ROLE_ADMIN' || userRole === 'ROLE_USER') && isAuthenticated && (
                <li className="nav-item">
                  <a href="#!" className="nav-link" onClick={() => setShowVerifyModal(true)}>
                    <FaClipboardCheck className="me-1" /> Verify Document
                  </a>
                </li>
              )}
              <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  <FaUser className="me-1" /> Contact
                </Link>
              </li>
              {!isAuthenticated && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">
                      <FaSignInAlt className="me-1" /> Register
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      <FaSignInAlt className="me-1" /> Login
                    </Link>
                  </li>
                </>
              )}
              {isAuthenticated && (
                <li className="nav-item">
                  <Link className="nav-link" to="/logout">
                    <FaSignOutAlt className="me-1" /> Logout
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <Modal show={showVerifyModal} onHide={() => setShowVerifyModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Verify Document</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleVerifyDocument}>
            <Form.Group controlId="enrollmentNumber">
              <Form.Label>Enrollment Number</Form.Label>
              <Form.Control
                type="text"
                value={enrollmentNumber}
                onChange={(e) => setEnrollmentNumber(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="file" className="mt-3">
              <Form.Label>Upload Document</Form.Label>
              <Form.Control
                type="file"
                onChange={handleFileChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-4">Verify</Button>
          </Form>
          {error && (
            <div className="alert alert-danger mt-3">{error}</div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowVerifyModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showResultModal} onHide={handleCloseResultModal}>
        <Modal.Header closeButton>
          <Modal.Title>Verification Result</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {verificationResult ? (
            <div className="alert alert-success">{verificationResult}</div>
          ) : (
            <div className="alert alert-danger">Verification failed. Please try again.</div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseResultModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Navbar;
