import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Logout = () => {
    const [showPopup, setShowPopup] = useState(true); // Show popup on component load
    const navigate = useNavigate();

    // Function to handle logout (removing only token)
    const handleLogout = () => {
        // Remove token from localStorage
        localStorage.removeItem('token');

        // Redirect to the login page after clearing the token
        navigate('/');
        window.location.reload();
    };

    // Function to handle account deletion (remove all data)
    const handleDeleteAccount = () => {
        // Remove all user details from localStorage
        // localStorage.removeItem('userId');
        // localStorage.removeItem('studentId');
        // localStorage.removeItem('userRole');
        localStorage.removeItem('token');
        localStorage.removeItem('email');

        // Redirect to the login page after clearing all data
        navigate('/');
        window.location.reload();
    };

    // Function to close the confirmation popup without logging out
    const closePopup = () => {
        setShowPopup(false);
        navigate(-1); // Navigate back to the previous page
    };

    return (
        <>
            {/* Confirmation Popup */}
            {showPopup && (
                <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirm Action</h5>
                                <button type="button" className="btn-close" onClick={closePopup}></button>
                            </div>
                            <div className="modal-body">
                                <p>What would you like to do?</p>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={closePopup}>
                                    Cancel
                                </button>
                                <button className="btn btn-danger" onClick={handleDeleteAccount}>
                                    Delete Account
                                </button>
                                <button className="btn btn-warning" onClick={handleLogout}>
                                    Log Out
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Logout;
