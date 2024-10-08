import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">ClearDocs: Automated Document Verification System</h1>
      <p className="text-center mb-5">
        Simplifying Document Verification for Everyone.
      </p>

      <div className="row">
        <div className="col-md-6">
          <h3>Overview</h3>
          <p>
            ClearDocs is a secure and efficient platform designed to streamline the verification of official documents. Our goal is to provide a user-friendly portal for issuing authorities, verifiers, and individuals.
          </p>
        </div>
        <div className="col-md-6">
          <img
            src="https://via.placeholder.com/500x300" // Replace with a relevant image
            alt="Document Verification"
            className="img-fluid rounded"
          />
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-6">
          <img
            src="https://via.placeholder.com/500x300" // Replace with a relevant image
            alt="Document Features"
            className="img-fluid rounded"
          />
        </div>
        <div className="col-md-6">
          <h3>Key Features</h3>
          <ul className="list-unstyled">
            <li>
              <strong>Document Search:</strong> Leverage Solr/Elasticsearch for quick and efficient document retrieval.
            </li>
            <li>
              <strong>Real-Time Verification:</strong> Instant verification for faster processing.
            </li>
            <li>
              <strong>Role-Based Access Control:</strong> Secure access tailored to different user roles.
            </li>
            <li>
              <strong>Notification System:</strong> Stay updated with real-time notifications on document status.
            </li>
            <li>
              <strong>Containerized Architecture:</strong> Easy deployment with Docker for scalability.
            </li>
          </ul>
        </div>
      </div>

      <div className="text-center mt-5">
        <p className="text-muted">&copy; 2024 ClearDocs. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Home;
