import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const StudentDetails = () => {
  const { studentId } = useParams();  
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [documentType, setDocumentType] = useState('');
  const [file, setFile] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);  
  const [docToDelete, setDocToDelete] = useState(null);  
  const [successMessage, setSuccessMessage] = useState('');  

  useEffect(() => {
    const fetchDocuments = async () => {
      const token = localStorage.getItem('token');
      try {
        const documentsResponse = await axios.get(`http://localhost:8080/doc/student/${studentId}`, {
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
  }, [studentId]);

  const confirmDeleteDocument = async () => {
    const token = localStorage.getItem('token');
    if (docToDelete) {
      try {
        await axios.delete(`http://localhost:8080/doc/${docToDelete}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setDocuments(documents.filter(doc => doc.documentId !== docToDelete));
        setSuccessMessage('Document deleted successfully!');
        setDeleteModal(false); 
        setDocToDelete(null); 

        setTimeout(() => {
          setSuccessMessage('');
        }, 1000);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } catch (err) {
        console.error('Error deleting document:', err.response ? err.response.data : err.message);
        setError('Failed to delete document.');
      }
    }
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');

    const formData = new FormData();
    formData.append('studentId', studentId);
    formData.append('file', file);
    formData.append('documentType', documentType);

    try {
      await axios.post('http://localhost:8080/doc/upload', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccessMessage('Document uploaded successfully!');
      setShowModal(false);

      setDocuments([{ documentType, documentName: file.name, fileSize: `${(file.size / 1024).toFixed(2)} KB` }, ...documents]);

      setTimeout(() => {
        setSuccessMessage('');
      }, 1000);

      setTimeout(() => {
        window.location.reload();
      }, 1000);

    } catch (err) {
      console.error('Error uploading document:', err.response ? err.response.data : err.message);
      setError('Failed to upload document.');
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

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Document Management</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      {loading ? (
        <div className="alert alert-info">Loading documents...</div>
      ) : (
        <>
          <button
            className="btn btn-primary mb-4"
            onClick={() => setShowModal(true)}
          >
            Upload Document
          </button>

          {documents.length > 0 ? (
            <ul className="list-group">
              {documents.map((document) => (
                <li
                  key={document.documentId}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <span>{document.documentType} - {document.documentName} ({document.fileSize})</span>
                  <div>
                    <button
                      className="btn btn-primary btn-sm me-2"
                      onClick={() => downloadDocument(document.documentId, document.documentName)}
                    >
                      Download
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => {
                        setDocToDelete(document.documentId);
                        setDeleteModal(true);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="alert alert-info">No documents found.</div>
          )}

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
                    <option value="" disabled>Select Document Type</option>
                    <option value="Marksheet">Marksheet</option>
                    <option value="Receipt">Receipt</option>
                    <option value="Notice">Notice</option>
                    <option value="Certificate">Certificate</option>
                    <option value="ID Proof">ID Proof</option>
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

          <Modal show={deleteModal} onHide={() => setDeleteModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Confirm Document Deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Are you sure you want to delete this document?</p>
            </Modal.Body>
            <Modal.Footer>
              <button className="btn btn-secondary" onClick={() => setDeleteModal(false)}>Cancel</button>
              <button className="btn btn-danger" onClick={confirmDeleteDocument}>Delete</button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </div>
  );
};

export default StudentDetails;
