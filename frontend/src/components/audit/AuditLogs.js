import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AuditLogs = () => {
    const [auditLogs, setAuditLogs] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAuditLogs = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get('http://localhost:8080/audit/get-all', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setAuditLogs(response.data || []);
            } catch (err) {
                console.error('Error fetching audit logs:', err.response ? err.response.data : err.message);
                setError(err.response?.data?.message || 'Failed to fetch audit logs.');
            }
        };

        fetchAuditLogs();
    }, []);

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Audit Logs</h2>
            {error && <div className="alert alert-danger">{error}</div>}

            {auditLogs.length === 0 ? (
                <div className="alert alert-info text-center">No audit logs found.</div>
            ) : (
                <div className="table-responsive" style={{ maxHeight: '500px', overflow: 'auto' }}>
                    <table className="table table-bordered table-striped table-hover text-center">
                        <thead className="thead-dark">
                            <tr>
                                <th style={{ width: '5%' }}>#</th>
                                <th style={{ width: '10%' }}>Action</th>
                                <th style={{ width: '15%' }}>Auditor Name</th>
                                <th style={{ width: '15%' }}>Email</th>
                                <th style={{ width: '10%' }}>Phone</th>
                                <th style={{ width: '10%' }}>System OS</th>
                                <th style={{ width: '10%' }}>System User</th>
                                <th style={{ width: '10%' }}>IP Address</th>
                                <th style={{ width: '15%' }}>Timestamp</th>
                            </tr>
                        </thead>
                        <tbody>
                            {auditLogs.map((log, index) => (
                                <tr key={log.id}>
                                    <td>{index + 1}</td>
                                    <td>{log.action}</td>
                                    <td>{log.name}</td>
                                    <td>{log.email}</td>
                                    <td>{log.mobileNumber}</td>
                                    <td>{log.systemOS}</td>
                                    <td>{log.systemUserName}</td>
                                    <td>{log.systemUserIp}</td>
                                    <td>{new Date(log.timestamp).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AuditLogs;
