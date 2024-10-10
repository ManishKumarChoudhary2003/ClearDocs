import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // Updated import

const UploadDocument = () => {
    const { studentId } = useParams();
    const navigate = useNavigate(); // Updated hook
    const [documentType, setDocumentType] = useState('');
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleDocumentTypeChange = (e) => {
        setDocumentType(e.target.value);
    };

    const uploadDocument = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('studentId', studentId);
        formData.append('file', file);
        formData.append('documentType', documentType);

        try {
            await axios.post(`http://localhost:8080/doc/upload`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            // Redirect to student details after upload
            navigate(`/student/${studentId}`); // Updated navigation
        } catch (err) {
            console.error('Error uploading document:', err.response ? err.response.data : err.message);
            setError('Failed to upload document.');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Upload Document for Student ID: {studentId}</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={uploadDocument} className="mb-4">
                <div className="form-group">
                    <label htmlFor="documentType">Document Type:</label>
                    <input
                        type="text"
                        id="documentType"
                        className="form-control"
                        value={documentType}
                        onChange={handleDocumentTypeChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="file">Upload Document:</label>
                    <input
                        type="file"
                        id="file"
                        className="form-control"
                        onChange={handleFileChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary mt-2">Upload Document</button>
            </form>
        </div>
    );
};

export default UploadDocument;
