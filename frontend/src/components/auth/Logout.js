import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Logout = () => {
    const [showPopup, setShowPopup] = useState(true);  
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        localStorage.removeItem('userRole');
        localStorage.removeItem('studentId');
        localStorage.removeItem('userId');
      
        navigate('/');
        window.location.reload();
    };
    
    const closePopup = () => {
        setShowPopup(false);
        navigate(-1);  
    };

    return (
        <>
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
                                <button className="btn btn-danger" onClick={handleLogout}>
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
