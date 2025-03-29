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

      <div className="text-center mb-5">
      <h1 className="fw-bold" style={{ color: "#46a2b9" }}>
        ClearDocs - Verify Documents with Ease
      </h1>
        <p className="text-muted fs-5">
          A seamless and secure platform to verify documents in just a few clicks.
        </p>
   
      </div>

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
          e.target.style.transform = 'scale(1.1)';  
          e.target.style.opacity = '0.8';  
        }}
        onMouseUp={(e) => {
          e.target.style.transform = 'scale(1)';  
          e.target.style.opacity = '1';  
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
