import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaClipboardCheck, FaUserShield, FaBell, FaSearch, FaDocker } from 'react-icons/fa';

// Import local images from the assets folder
import documentVerificationImg from '../assets/image1.jpeg'
import documentFeaturesImg from '../assets/images2.jpeg'

const Home = () => {
  return (
    <div className="container mt-5">
      {/* <h1 className="text-center mb-4">ClearDocs: Automated Document Verification System</h1> */}
      <h2 className="text-center mb-5 lead">
        Simplifying Document Verification for Everyone with Trust and Efficiency.
      </h2>

      <div className="row align-items-center">
        <div className="col-md-6">
          <h3>Overview</h3>
          <p>
            Welcome to ClearDocs! Our platform revolutionizes the way official documents are verified.
            With an intuitive interface and advanced technology, we empower users to navigate the verification process seamlessly.
          </p>
        </div>
        <div className="col-md-6">
          <img
            src={documentVerificationImg} // Use the imported image
            alt="Document Verification"
            className="img-fluid rounded shadow"
            style={{ width: '80%', height: 'auto' }} // Increased size
          />
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-6">
          <img
            src={documentFeaturesImg} // Use the imported image
            alt="Document Features"
            className="img-fluid rounded shadow"
            style={{ width: '80%', height: 'auto' }} // Increased size
          />
        </div>
        <div className="col-md-6">
          <h3>Key Features</h3>
          <ul className="list-unstyled">
            <li className="d-flex align-items-center mb-3">
              <FaSearch className="me-2 text-primary" size={30} />
              <span>
                <strong>Document Search:</strong> Leverage Solr/Elasticsearch for quick and efficient document retrieval.
              </span>
            </li>
            <li className="d-flex align-items-center mb-3">
              <FaClipboardCheck className="me-2 text-success" size={30} />
              <span>
                <strong>Real-Time Verification:</strong> Instant verification for faster processing and peace of mind.
              </span>
            </li>
            <li className="d-flex align-items-center mb-3">
              <FaUserShield className="me-2 text-warning" size={30} />
              <span>
                <strong>Role-Based Access Control:</strong> Secure access tailored to different user roles and responsibilities.
              </span>
            </li>
            <li className="d-flex align-items-center mb-3">
              <FaBell className="me-2 text-info" size={30} />
              <span>
                <strong>Notification System:</strong> Stay updated with real-time notifications on document status and updates.
              </span>
            </li>
            <li className="d-flex align-items-center mb-3">
              <FaDocker className="me-2 text-danger" size={30} />
              <span>
                <strong>Containerized Architecture:</strong> Easy deployment with Docker for seamless scalability and management.
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="text-center mt-5">
        <p className="text-muted mt-3">&copy; 2024 ClearDocs. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Home;
