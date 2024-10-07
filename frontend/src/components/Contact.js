import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Contact = () => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg p-3 mb-5 bg-white rounded">
            <div className="row no-gutters">
              {/* Image Section */}
              <div className="col-md-4">
                <img
                  src="https://via.placeholder.com/150" // Replace this with your image URL
                  className="img-fluid rounded-circle p-3"
                  alt="Your Name"
                />
              </div>

              {/* Contact Details Section */}
              <div className="col-md-8">
                <div className="card-body">
                  <h3 className="card-title">Your Name</h3>
                  <p className="card-text">Backend Developer | Java | Spring Boot</p>
                  <p className="card-text">
                    I am a passionate backend developer specializing in Java and Spring Boot. I love building scalable web applications and exploring new technologies.
                  </p>

                  {/* Social Media Links */}
                  <div className="d-flex justify-content-start">
                    <a
                      href="https://www.linkedin.com/in/yourprofile"
                      className="btn btn-outline-primary btn-sm me-2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-linkedin"></i> LinkedIn
                    </a>
                    <a
                      href="https://github.com/yourprofile"
                      className="btn btn-outline-dark btn-sm me-2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-github"></i> GitHub
                    </a>
                    <a
                      href="https://yourportfolio.com"
                      className="btn btn-outline-info btn-sm me-2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fas fa-briefcase"></i> Portfolio
                    </a>
                    <a
                      href="mailto:youremail@gmail.com"
                      className="btn btn-outline-danger btn-sm"
                    >
                      <i className="fas fa-envelope"></i> Email
                    </a>
                  </div>

                  {/* Extra Info */}
                  <div className="mt-4">
                    <p>
                      <strong>Phone:</strong> +1234567890
                    </p>
                    <p>
                      <strong>Location:</strong> Your City, Your Country
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-5">
            <p className="text-muted">&copy; 2024 Your Name. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
