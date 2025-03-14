import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AuditLogs = () => {
    const [auditLogs, setAuditLogs] = useState([]);
    const [filteredLogs, setFilteredLogs] = useState([]);
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchAuditLogs = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get('http://localhost:8080/audit/get-all', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const logs = response.data ? response.data.reverse() : [];
                setAuditLogs(logs);
                setFilteredLogs(logs);
            } catch (err) {
                console.error('Error fetching audit logs:', err.response ? err.response.data : err.message);
                setError(err.response?.data?.message || 'Failed to fetch audit logs.');
            }
        };

        fetchAuditLogs();
    }, []);

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase().trim();
        setSearchQuery(query);

        if (query === '') {
            setFilteredLogs(auditLogs);
            return;
        }

        const filtered = auditLogs.filter(log =>
            [
                log.action,
                log.name,
                log.email,
                log.mobileNumber,
                log.systemOS,
                log.systemUserName,
                log.systemUserIp,
            ].some(field => (field ? field.toString().toLowerCase().includes(query) : false))
        );

        setFilteredLogs(filtered);
    };

    const getCardStyle = () => {
        return { backgroundColor: "white", transition: "background-color 0.3s ease" };  
    };
    
    const getHoverCardStyle = (action) => {
        if (action === "DOCUMENT_VERIFICATION_FAILED") return { backgroundColor: "rgba(248, 215, 218, 0.8)" }; // Light Red on Hover
        if (action === "DOCUMENT_VERIFICATION_SUCCESS") return { backgroundColor: "rgba(212, 237, 218, 0.8)" }; // Light Green on Hover
        return { backgroundColor: "rgba(248, 249, 250, 1)" };  
    };
    
    
    

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4 text-primary fw-bold">Audit Logs</h2>
            {error && <div className="alert alert-danger text-center">{error}</div>}
            
            <div className="mb-4">
                <input 
                    type="text" 
                    className="form-control shadow-sm" 
                    placeholder="Search logs..." 
                    value={searchQuery} 
                    onChange={handleSearch} 
                />
            </div>

            {filteredLogs.length === 0 ? (
                <div className="alert alert-info text-center">No audit logs found.</div>
            ) : (
                <div className="row justify-content-center">
                    {filteredLogs.map((log, index) => (
                        <div 
                        key={log.id || index} 
                        className="col-lg-4 col-md-6 mb-4"
                    >
                        <div 
                            className="card shadow-lg border-0 rounded-4" 
                            style={getCardStyle()} 
                            onMouseEnter={(e) => Object.assign(e.currentTarget.style, getHoverCardStyle(log.action))}
                            onMouseLeave={(e) => Object.assign(e.currentTarget.style, getCardStyle())}
                        >
                            <div className="card-body p-4">
                                <h5 className="card-title text-center text-uppercase fw-bold text-dark">{log.action}</h5>
                                <hr className="my-3" />
                                <p className="card-text"><strong>Auditor:</strong> {log.name}</p>
                                <p className="card-text"><strong>Email:</strong> {log.email}</p>
                                <p className="card-text"><strong>Phone:</strong> {log.mobileNumber}</p>
                                <p className="card-text"><strong>System OS:</strong> {log.systemOS}</p>
                                <p className="card-text"><strong>System User:</strong> {log.systemUserName}</p>
                                <p className="card-text"><strong>IP Address:</strong> {log.systemUserIp}</p>
                                <p className="card-text text-muted text-end"><small>{new Date(log.timestamp).toLocaleString()}</small></p>
                            </div>
                        </div>
                    </div>
                    
                    ))}
                </div>
            )}
        </div>
    );
};

export default AuditLogs;




// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const AuditLogs = () => {
//     const [auditLogs, setAuditLogs] = useState([]);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         const fetchAuditLogs = async () => {
//             const token = localStorage.getItem('token');
//             try {
//                 const response = await axios.get('http://localhost:8080/audit/get-all', {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 });
//                 setAuditLogs(response.data || []);
//             } catch (err) {
//                 console.error('Error fetching audit logs:', err.response ? err.response.data : err.message);
//                 setError(err.response?.data?.message || 'Failed to fetch audit logs.');
//             }
//         };

//         fetchAuditLogs();
//     }, []);

//     return (
//         <div className="container mt-5">
//             <h2 className="text-center mb-4">Audit Logs</h2>
//             {error && <div className="alert alert-danger">{error}</div>}

//             {auditLogs.length === 0 ? (
//                 <div className="alert alert-info text-center">No audit logs found.</div>
//             ) : (
//                 <div className="table-responsive" style={{ maxHeight: '500px', overflow: 'auto' }}>
//                     <table className="table table-bordered table-striped table-hover text-center">
//                         <thead className="thead-dark">
//                             <tr>
//                                 <th style={{ width: '5%' }}>#</th>
//                                 <th style={{ width: '10%' }}>Action</th>
//                                 <th style={{ width: '15%' }}>Auditor Name</th>
//                                 <th style={{ width: '15%' }}>Email</th>
//                                 <th style={{ width: '10%' }}>Phone</th>
//                                 <th style={{ width: '10%' }}>System OS</th>
//                                 <th style={{ width: '10%' }}>System User</th>
//                                 <th style={{ width: '10%' }}>IP Address</th>
//                                 <th style={{ width: '15%' }}>Timestamp</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {auditLogs.map((log, index) => (
//                                 <tr key={log.id}>
//                                     <td>{index + 1}</td>
//                                     <td>{log.action}</td>
//                                     <td>{log.name}</td>
//                                     <td>{log.email}</td>
//                                     <td>{log.mobileNumber}</td>
//                                     <td>{log.systemOS}</td>
//                                     <td>{log.systemUserName}</td>
//                                     <td>{log.systemUserIp}</td>
//                                     <td>{new Date(log.timestamp).toLocaleString()}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default AuditLogs;
