import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import documentVerificationImg from "../assets/Verification.jpg";
import secureDocsImg from "../assets/security-cloud-illustration.webp";
import userFriendly from "../assets/User.avif";
import instance from "../assets/Instance.jpg";

const Home = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("token");

  return (
    <div className="container mt-5">
      <style>
        {`
          .feature-img {
            max-width: 80%;
            border-radius: 15px;
          }
        `}
      </style>

      {/* Hero Section */}
      <div className="text-center mb-5">
      <h1 className="fw-bold" style={{ color: "#46a2b9" }}>
        ClearDocs - Verify Documents with Ease
      </h1>
        <p className="text-muted fs-5">
          A seamless and secure platform to verify documents in just a few clicks.
        </p>
        {/* {!isAuthenticated && (
          <button className="btn btn-lg btn-primary mt-3" onClick={() => navigate("/register")}>
            Get Started
          </button>
        )} */}
      </div>

      {/* Feature Sections */}
      <div className="row align-items-center mb-5 p-4 rounded bg-white">
        <div className="col-md-6">
          <h3 className="text-dark">Fast & Reliable Document Verification</h3>
          <p className="text-muted fs-5">
            Whether you're an individual or an organization, ClearDocs helps you
            verify official documents with accuracy and speed, eliminating the
            hassle of manual verification.
          </p>
        </div>
        <div className="col-md-6 text-center">
          <img
            src={documentVerificationImg}
            alt="Document Verification"
            className="feature-img"
          />
        </div>
      </div>

      <div className="row align-items-center mb-5 p-4 rounded bg-white">
        <div className="col-md-6 text-center">
          <img
            src={secureDocsImg}
            alt="Secure Documents"
            className="feature-img"
          />
        </div>
        <div className="col-md-6">
          <h3 className="text-dark">Security You Can Trust</h3>
          <p className="text-muted fs-5">
            Your data security is our priority. With advanced protection
            mechanisms, we ensure that all document verifications remain
            confidential and tamper-proof.
          </p>
        </div>
      </div>

      <div className="row align-items-center mb-5 p-4 rounded bg-white">
        <div className="col-md-6">
          <h3 className="text-dark">User-Friendly & Efficient</h3>
          <p className="text-muted fs-5">
            Our intuitive interface ensures a hassle-free experience, making
            document verification simple and efficient for everyone.
          </p>
        </div>
        <div className="col-md-6 text-center">
          <img
            src={userFriendly}
            alt="User Friendly"
            className="feature-img"
          />
        </div>
      </div>

      <div className="row align-items-center mb-5 p-4 rounded bg-white">
        <div className="col-md-6 text-center">
          <img
            src={instance}
            alt="Instant Access"
            className="feature-img"
          />
        </div>
        <div className="col-md-6">
          <h3 className="text-dark">Instant Access Anytime</h3>
          <p className="text-muted fs-5">
            Access and verify documents anytime, anywhere, with just a few clicks.
            No waiting, no delays, just seamless verification.
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center p-4 bg-light rounded">
  {!isAuthenticated ? (
    <>
      <h3>Ready to Get Started?</h3>
      <p className="text-muted">Continue managing and verifying documents with ease.</p>
      <button
  className="btn btn-primary"
  onClick={() => navigate('/login')}
  style={{
    transition: 'transform 0.3s ease, opacity 0.3s ease',
  }}
  onMouseDown={(e) => {
    e.target.style.transform = 'scale(1.1)'; // Slight zoom-in effect
    e.target.style.opacity = '0.8'; // Reduce opacity slightly
  }}
  onMouseUp={(e) => {
    e.target.style.transform = 'scale(1)'; // Return to normal size
    e.target.style.opacity = '1'; // Restore full opacity
  }}
>
  Sign In Now
</button>

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






















// import React from 'react';
// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { FaClipboardCheck, FaUserShield, FaBell, FaSearch, FaDocker } from 'react-icons/fa';

// // Import local images from the assets folder
// import documentVerificationImg from '../assets/image1.jpeg';
// import documentFeaturesImg from '../assets/image2.jpeg';

// const Home = () => {
//   const navigate = useNavigate(); 

//   const [isAuthenticated, setAuthenticated] = useState(false);
  
//     useEffect(() => {
//       const storedRole = localStorage.getItem('userRole');
//       const authToken = localStorage.getItem("token");
//       if (authToken) {
//         setAuthenticated(true);
//       }
//     }, []);

//   return (
//     <div className="container mt-5">
//       <h1 className="text-center mb-5 lead" style={{ color: '#343a40', fontWeight: 'bold', fontSize: '2.0rem' }}>
//         Simplifying Document Verification for Everyone with Trust and Efficiency.
//       </h1>

//       <div className="row align-items-center mt-5 mb-5" style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '10px' }}>
//         <div className="col-md-6">
//           <h3>Overview</h3>
//           <p>
//             Welcome to ClearDocs! Our platform revolutionizes the way official documents are verified.
//             With an intuitive interface and advanced technology, we empower users to navigate the verification process seamlessly.
//           </p>
//         </div>
//         <div className="col-md-6">
//           <img
//             src={documentVerificationImg} 
//             alt="Document Verification"
//             className="img-fluid rounded shadow"
//             style={{ width: '80%', height: 'auto' }} 
//           />
//         </div>
//       </div>

//       <div className="row mt-5" style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '10px' }}>
//         <div className="col-md-6">
//           <img
//             src={documentFeaturesImg} 
//             alt="Document Features"
//             className="img-fluid rounded shadow"
//             style={{ width: '80%', height: 'auto' }} 
//           />
//         </div>
//         <div className="col-md-6">
//           <h3>Key Features</h3>
//           <ul className="list-unstyled">
//             <li className="d-flex align-items-center mb-4" style={{ backgroundColor: '#e7f3fe', padding: '10px', borderRadius: '5px' }}>
//               <FaSearch className="me-2 text-primary" size={30} />
//               <span><strong>Document Search:</strong> Leverage Solr/Elasticsearch for quick and efficient document retrieval.</span>
//             </li>
//             <li className="d-flex align-items-center mb-4" style={{ backgroundColor: '#e7f3fe', padding: '10px', borderRadius: '5px' }}>
//               <FaClipboardCheck className="me-2 text-success" size={30} />
//               <span><strong>Real-Time Verification:</strong> Instant verification for faster processing and peace of mind.</span>
//             </li>
//             <li className="d-flex align-items-center mb-4" style={{ backgroundColor: '#e7f3fe', padding: '10px', borderRadius: '5px' }}>
//               <FaUserShield className="me-2 text-warning" size={30} />
//               <span><strong>Role-Based Access Control:</strong> Secure access tailored to different user roles and responsibilities.</span>
//             </li>
//             <li className="d-flex align-items-center mb-4" style={{ backgroundColor: '#e7f3fe', padding: '10px', borderRadius: '5px' }}>
//               <FaBell className="me-2 text-info" size={30} />
//               <span><strong>Notification System:</strong> Stay updated with real-time notifications on document status and updates.</span>
//             </li>
//             <li className="d-flex align-items-center mb-4" style={{ backgroundColor: '#e7f3fe', padding: '10px', borderRadius: '5px' }}>
//               <FaDocker className="me-2 text-danger" size={30} />
//               <span><strong>Containerized Architecture:</strong> Easy deployment with Docker for seamless scalability and management.</span>
//             </li>
//           </ul>
//         </div>
//       </div>

//       <div className="text-center mt-5" style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '10px' }}>
        
//         {!isAuthenticated ? (
//           <>
//           <h3>Ready to Get Started?</h3>
//           <p>Join us in transforming the document verification landscape.</p>
//           <button className="btn btn-primary" onClick={() => navigate('/register')}>Sign Up Now</button>
//           </>
//         ) : (
//           <>
//           <h3>Welcome Back!</h3>
//           <p>Explore the latest features and updates.</p>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Home;
