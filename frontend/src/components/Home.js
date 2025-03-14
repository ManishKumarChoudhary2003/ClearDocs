import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaClipboardCheck, FaUserShield, FaBell, FaSearch, FaDocker } from 'react-icons/fa';

// Import local images from the assets folder
import documentVerificationImg from '../assets/image1.jpeg';
import documentFeaturesImg from '../assets/image2.jpeg';

const Home = () => {
  const navigate = useNavigate(); 

  const [isAuthenticated, setAuthenticated] = useState(false);
  
    useEffect(() => {
      const storedRole = localStorage.getItem('userRole');
      const authToken = localStorage.getItem("token");
      if (authToken) {
        setAuthenticated(true);
      }
    }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-5 lead" style={{ color: '#343a40', fontWeight: 'bold', fontSize: '2.0rem' }}>
        Simplifying Document Verification for Everyone with Trust and Efficiency.
      </h1>

      <div className="row align-items-center mt-5 mb-5" style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '10px' }}>
        <div className="col-md-6">
          <h3>Overview</h3>
          <p>
            Welcome to ClearDocs! Our platform revolutionizes the way official documents are verified.
            With an intuitive interface and advanced technology, we empower users to navigate the verification process seamlessly.
          </p>
        </div>
        <div className="col-md-6">
          <img
            src={documentVerificationImg} 
            alt="Document Verification"
            className="img-fluid rounded shadow"
            style={{ width: '80%', height: 'auto' }} 
          />
        </div>
      </div>

      <div className="row mt-5" style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '10px' }}>
        <div className="col-md-6">
          <img
            src={documentFeaturesImg} 
            alt="Document Features"
            className="img-fluid rounded shadow"
            style={{ width: '80%', height: 'auto' }} 
          />
        </div>
        <div className="col-md-6">
          <h3>Key Features</h3>
          <ul className="list-unstyled">
            <li className="d-flex align-items-center mb-4" style={{ backgroundColor: '#e7f3fe', padding: '10px', borderRadius: '5px' }}>
              <FaSearch className="me-2 text-primary" size={30} />
              <span><strong>Document Search:</strong> Leverage Solr/Elasticsearch for quick and efficient document retrieval.</span>
            </li>
            <li className="d-flex align-items-center mb-4" style={{ backgroundColor: '#e7f3fe', padding: '10px', borderRadius: '5px' }}>
              <FaClipboardCheck className="me-2 text-success" size={30} />
              <span><strong>Real-Time Verification:</strong> Instant verification for faster processing and peace of mind.</span>
            </li>
            <li className="d-flex align-items-center mb-4" style={{ backgroundColor: '#e7f3fe', padding: '10px', borderRadius: '5px' }}>
              <FaUserShield className="me-2 text-warning" size={30} />
              <span><strong>Role-Based Access Control:</strong> Secure access tailored to different user roles and responsibilities.</span>
            </li>
            <li className="d-flex align-items-center mb-4" style={{ backgroundColor: '#e7f3fe', padding: '10px', borderRadius: '5px' }}>
              <FaBell className="me-2 text-info" size={30} />
              <span><strong>Notification System:</strong> Stay updated with real-time notifications on document status and updates.</span>
            </li>
            <li className="d-flex align-items-center mb-4" style={{ backgroundColor: '#e7f3fe', padding: '10px', borderRadius: '5px' }}>
              <FaDocker className="me-2 text-danger" size={30} />
              <span><strong>Containerized Architecture:</strong> Easy deployment with Docker for seamless scalability and management.</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="text-center mt-5" style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '10px' }}>
        
        {!isAuthenticated ? (
          <>
          <h3>Ready to Get Started?</h3>
          <p>Join us in transforming the document verification landscape.</p>
          <button className="btn btn-primary" onClick={() => navigate('/register')}>Sign Up Now</button>
          </>
        ) : (
          <>
          <h3>Welcome Back!</h3>
          <p>Explore the latest features and updates.</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
