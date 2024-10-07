// src/pages/Home.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Comprehensive Automated Document Verification System</h1>
      <p className="text-center mb-5">
        Streamlining the process of document verification using AI and Blockchain technology.
      </p>

      <div className="row">
        <div className="col-md-6">
          <h3>Background</h3>
          <p>
            The current manual process of verifying documents for various official purposes is time-consuming, 
            error-prone, and lacks efficiency. This system addresses the urgent requirement for an online 
            platform that automates and secures the document verification process.
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
            alt="AI Technology"
            className="img-fluid rounded"
          />
        </div>
        <div className="col-md-6">
          <h3>Expected Solution</h3>
          <p>
            The proposed solution aims to establish a user-friendly portal accessible to issuing authorities, 
            verifying authorities, and individuals. Participants will develop a comprehensive portal that facilitates 
            the generation, verification, and accessibility of essential documents for any official purpose. 
            AI algorithms will efficiently verify the authenticity of uploaded documents, and blockchain technology 
            will ensure the immutability and integrity of verified certificates.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
