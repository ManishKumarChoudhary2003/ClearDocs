import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const StudentDocuments = () => {
    const [documents, setDocuments] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchDocuments();
    }, []);

    const fetchDocuments = async () => {
        try {
            const token = localStorage.getItem('token');
            const email = localStorage.getItem('email');
            const userId = localStorage.getItem('userId');

            if (!email || !userId || !token) {
                setError('Missing user information or token.');
                return;
            }

            const response = await axios.get(`http://localhost:8080/doc/student-documents`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    email,
                    userId,
                },
            });
            setDocuments(response.data);
        } catch (err) {
            console.error('Error fetching documents:', err.response ? err.response.data : err.message);
            setError('Failed to fetch documents.');
        }
    };

    const downloadDocument = async (documentId, documentName) => {
        const token = localStorage.getItem('token');

        if (!documentId) {
            console.error('Document ID is missing or undefined.');
            setError('Failed to download document. Document ID is missing.');
            return;
        }

        try {
            const response = await axios.get(`http://localhost:8080/doc/download?documentId=${documentId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                responseType: 'blob',
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', documentName);
            document.body.appendChild(link);
            link.click();
        } catch (err) {
            console.error('Error downloading document:', err.response ? err.response.data : err.message);
            setError('Failed to download document.');
        }
    };

    const viewDocument = async (documentId, documentName) => {
        const token = localStorage.getItem('token');

        try {
            const response = await axios.get(`http://localhost:8080/doc/download?documentId=${documentId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                responseType: 'blob',
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            window.open(url, '_blank');
        } catch (err) {
            console.error('Error viewing document:', err.response ? err.response.data : err.message);
            setError('Failed to view document.');
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">My Documents</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {documents.length === 0 ? (
                <p className="text-center">No documents found for you.</p>
            ) : (
                <div className="row">
                    {documents.map((document) => (
                        <div key={document.documentId} className="col-md-4 mb-4">
                            <div className="card h-100 shadow-sm">
                                <div className="card-header bg-primary text-white">
                                    <h5 className="card-title mb-0">{document.documentName}</h5>
                                </div>
                                <div className="card-body">
                                    <p className="card-text">
                                        <strong>Type:</strong> <span className="badge bg-info">{document.documentType}</span>
                                    </p>
                                    <p className="card-text">
                                        <strong>Issued on:</strong> {new Date(document.issueDate).toLocaleDateString()}
                                    </p>
                                    <p className="card-text">
                                        <strong>File Size:</strong> {document.fileSize}
                                    </p>
                                </div>
                                <div className="card-footer d-flex justify-content-between">
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => downloadDocument(document.documentId, document.documentName)}
                                    >
                                        Download
                                    </button>
                                    <button
                                        className="btn btn-secondary"
                                        onClick={() => viewDocument(document.documentId, document.documentName)}
                                    >
                                        View
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default StudentDocuments;
