import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Modal } from 'react-bootstrap';

const StudentDetails = () => {
  const navigate = useNavigate();
  const { studentId } = useParams(); // Get student ID from URL
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [documentType, setDocumentType] = useState('');
  const [file, setFile] = useState(null);

  // Fetch documents for the student
  useEffect(() => {
    const fetchDocuments = async () => {
      const token = localStorage.getItem('token');

      try {
        const documentsResponse = await axios.get(`http://localhost:8080/documents/${studentId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDocuments(documentsResponse.data);
      } catch (err) {
        console.error('Error fetching documents:', err.response ? err.response.data : err.message);
        setError('Failed to load documents.');
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, [studentId]); // Add studentId as a dependency

  // Function to delete a document
  const deleteDocument = async (documentId) => {
    const token = localStorage.getItem('token');
    if (window.confirm('Are you sure you want to delete this document?')) {
      try {
        await axios.delete(`http://localhost:8080/doc/${documentId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Update the documents state to remove the deleted document
        setDocuments(documents.filter(doc => doc.documentId !== documentId));
        alert('Document deleted successfully!');
      } catch (err) {
        console.error('Error deleting document:', err.response ? err.response.data : err.message);
        setError('Failed to delete document.');
      }
    }
  };

  // Function to handle file upload
  const handleUpload = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');

    const formData = new FormData();
    formData.append('studentId', studentId); // Use dynamic studentId from URL
    formData.append('file', file);
    formData.append('documentType', documentType);

    try {
      await axios.post('http://localhost:8080/doc/upload', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Document uploaded successfully!');
      setShowModal(false);
      setDocuments([...documents, { documentType, documentName: file.name }]); // Update local state
    } catch (err) {
      console.error('Error uploading document:', err.response ? err.response.data : err.message);
      setError('Failed to upload document.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Document Management for Student ID: {studentId}</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {loading ? (
        <div className="alert alert-info">Loading documents...</div>
      ) : (
        <>
          <button
            className="btn btn-secondary mb-4"
            onClick={() => setShowModal(true)} // Show modal when clicked
          >
            Upload Document
          </button>

          {/* Document display section */}
          {documents.length > 0 ? (
            <ul className="list-group">
              {documents.map((document) => (
                <li key={document.documentId} className="list-group-item d-flex justify-content-between align-items-center">
                  <span>{document.documentType} - {document.documentName}</span>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteDocument(document.documentId)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="alert alert-info">No documents found.</div>
          )}

          {/* Upload Document Modal */}
          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Upload Document</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={handleUpload}>
                <div className="mb-3">
                  <label htmlFor="documentType" className="form-label">Document Type</label>
                  <select
                    id="documentType"
                    className="form-select"
                    value={documentType}
                    onChange={(e) => setDocumentType(e.target.value)}
                    required
                  >
                    <option value="">Select Document Type</option>
                    <option value="Type 1">Type 1</option>
                    <option value="Type 2">Type 2</option>
                    <option value="Type 3">Type 3</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="file" className="form-label">File</label>
                  <input
                    type="file"
                    id="file"
                    className="form-control"
                    onChange={(e) => setFile(e.target.files[0])}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">Upload</button>
              </form>
            </Modal.Body>
          </Modal>
        </>
      )}
    </div>
  );
};

export default StudentDetails;
