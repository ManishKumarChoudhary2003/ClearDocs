import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

const AuditLogs = () => {
    const [auditLogs, setAuditLogs] = useState([]);
    const [error, setError] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const fetchAuditLogs = async (query = "") => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get(query.trim() ? "http://localhost:8080/audit/search" : "http://localhost:8080/audit/get-all", {
                headers: { Authorization: `Bearer ${token}` },
                params: query.trim() ? { query } : {},
            });
            setAuditLogs(response.data || []);
            setError("");  
        } catch (err) {
            console.error("Error fetching audit logs:", err.response?.data || err.message);
            setError(err.response?.data?.message || "Failed to fetch audit logs.");
        }
    };

    const debounceSearch = useCallback(() => {
        const delay = setTimeout(() => {
            fetchAuditLogs(searchQuery);
        }, 1000);  

        return () => clearTimeout(delay);
    }, [searchQuery]);

    useEffect(() => {
        debounceSearch();
    }, [searchQuery, debounceSearch]);

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4 text-primary fw-bold">Audit Logs</h2>
            {error && <div className="alert alert-danger text-center">{error}</div>}

            <div className="row justify-content-center mb-4">
                <div className="col-md-6">
                    <input
                        type="text"
                        className="form-control shadow-sm"
                        placeholder="Search logs by name, email, action, or OS..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {auditLogs.length === 0 ? (
                <div className="alert alert-info text-center">No audit logs found.</div>
            ) : (
                <div className="row">
                    {auditLogs.map((log, index) => {
                        const backgroundColor =
                            hoveredIndex === index
                                ? log.action === "DOCUMENT_VERIFICATION_SUCCESS"
                                    ? "#d4edda"  
                                    : log.action === "DOCUMENT_VERIFICATION_FAILED"
                                    ? "#f8d7da"  
                                    : "#ffffff"  
                                : "#ffffff";  

                        return (
                            <div key={log.id || index} className="col-lg-4 col-md-6 mb-4">
                                <div
                                    className="card shadow border-0 rounded-4"
                                    style={{ backgroundColor, transition: "background-color 0.3s ease-in-out" }}
                                    onMouseEnter={() => setHoveredIndex(index)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                >
                                    <div className="card-body p-3">
                                        <h5 className="card-title text-center text-uppercase fw-bold text-dark">
                                            {log.action}
                                        </h5>
                                        <p className="card-text"><strong>Auditor:</strong> {log.name}</p>
                                        <p className="card-text"><strong>Email:</strong> {log.email}</p>
                                        <p className="card-text"><strong>Phone:</strong> {log.mobileNumber}</p>
                                        <p className="card-text"><strong>System OS:</strong> {log.systemOS}</p>
                                        <p className="card-text"><strong>IP Address:</strong> {log.systemUserIp}</p>
                                        <p className="card-text text-muted text-end">
                                            <small>{new Date(log.timestamp).toLocaleString()}</small>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default AuditLogs;
