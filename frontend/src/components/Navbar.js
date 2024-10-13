import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const Navbar = () => {
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false); // State for result modal
  const [enrollmentNumber, setEnrollmentNumber] = useState('');
  const [file, setFile] = useState(null);
  const [verificationResult, setVerificationResult] = useState('');
  const [error, setError] = useState('');

  // Handle file upload
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle form submission to verify the document
  const handleVerifyDocument = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('enrollmentNumber', enrollmentNumber);
    formData.append('file', file);

    try {
      const token = localStorage.getItem('token'); // Retrieve the token
      const response = await axios.post('http://localhost:8080/doc/verify-document', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`, // Include the token
        },
      });

      setVerificationResult(response.data);
      setError(''); // Clear error message if any
      setShowVerifyModal(false); // Close verification modal
      setShowResultModal(true); // Open result modal
    } catch (err) {
      setError('Error verifying document: ' + (err.response?.data || err.message));
      setVerificationResult('');
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">MyBrand</Link>
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
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/all-students">All Students</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">Contact</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">Register</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                {/* Styled as a link instead of a button */}
                <a href="#!" className="nav-link" onClick={() => setShowVerifyModal(true)}>
                  Verify Document
                </a>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/logout">Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Verify Document Modal */}
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

      {/* Result Modal */}
      <Modal show={showResultModal} onHide={() => setShowResultModal(false)}>
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
          <Button variant="secondary" onClick={() => setShowResultModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Navbar;
