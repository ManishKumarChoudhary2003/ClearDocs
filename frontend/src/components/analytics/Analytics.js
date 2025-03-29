import React, { useEffect, useState } from "react";
import axios from "axios";
import AuditChart from "./AuditChart";
import { Bar, Pie, Line } from "react-chartjs-2";
import "chart.js/auto";

const Analytics = () => {
    const [auditLogs, setAuditLogs] = useState([]);
    const [analyticsData, setAnalyticsData] = useState(null);
    const [documentAnalytics, setDocumentAnalytics] = useState({});
    const [error, setError] = useState("");
    const [selectedField, setSelectedField] = useState(null);
    const [visualizationType, setVisualizationType] = useState("PieChart");
    const [expandedChart, setExpandedChart] = useState(null);
    const [expandedDocumentField, setExpandedDocumentField] = useState(null);

    useEffect(() => {
        const fetchAuditLogs = async () => {
            const token = localStorage.getItem("token");
            try {
                const response = await axios.get("http://localhost:8080/audit/get-all", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setAuditLogs(response.data ? response.data.reverse() : []);
            } catch (err) {
                console.error("Error fetching audit logs:", err);
                setError(err.response?.data?.message || "Failed to fetch audit logs.");
            }
        };

        const fetchAnalyticsData = async () => {
            const token = localStorage.getItem("token");
            try {
                const response = await axios.get("http://localhost:8080/analytics/verification", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setAnalyticsData(response.data);
            } catch (err) {
                console.error("Error fetching analytics data:", err);
                setError("Failed to fetch verification analytics.");
            }
        };

        const fetchDocumentAnalytics = async () => {
            const token = localStorage.getItem("token");
            try {
                const totalStorage = await axios.get("http://localhost:8080/analytics/total-storage", { headers: { Authorization: `Bearer ${token}` } });
                const averageFileSize = await axios.get("http://localhost:8080/analytics/average-file-size", { headers: { Authorization: `Bearer ${token}` } });
                const commonDocumentType = await axios.get("http://localhost:8080/analytics/common-document-type", { headers: { Authorization: `Bearer ${token}` } });
                const topUploaders = await axios.get("http://localhost:8080/analytics/top-uploaders", { headers: { Authorization: `Bearer ${token}` } });
                const largestFile = await axios.get("http://localhost:8080/analytics/largest-file", { headers: { Authorization: `Bearer ${token}` } });

                setDocumentAnalytics({
                    totalStorage: totalStorage.data.TotalStorageUsed,
                    averageFileSize: averageFileSize.data.AverageFileSize,
                    commonDocumentType: commonDocumentType.data,
                    topUploaders: topUploaders.data.TopUploaders,
                    largestFile: largestFile.data.LargestFileSize,
                });
            } catch (err) {
                console.error("Error fetching document analytics:", err);
                setError("Failed to fetch document analytics.");
            }
        };
        fetchDocumentAnalytics();

        fetchAuditLogs();
        fetchAnalyticsData();
    }, []);

    const fieldOptions = ["action", "name", "email", "mobileNumber", "systemOS", "systemUserName", "systemUserIp"];
    const visualizationOptions = [
        { type: "PieChart", label: "Pie Chart" },
        { type: "BarChart", label: "Bar Graph" },
        { type: "LineChart", label: "Line Chart" },
    ];

    const toggleExpandedChart = (chartType) => {
        setExpandedChart(expandedChart === chartType ? null : chartType);
    };

    const toggleExpandedDocumentField = (field) => {
        setExpandedDocumentField(expandedDocumentField === field ? null : field);
    };

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    return (
        <div className="container mt-5 text-center">
            <h2 className="text-primary fw-bold">Analytics Dashboard</h2>

            <div className="card shadow-lg p-3 mt-4">
                <h4 className="text-muted">Auditing Analytics</h4>
                <div className="d-flex flex-wrap justify-content-center gap-2 mt-3">
                    {fieldOptions.map((field) => (
                        <button
                            key={field}
                            className={`btn ${selectedField === field ? "btn-primary" : "btn-outline-primary"}`}
                            onClick={() => setSelectedField((prev) => (prev === field ? null : field))}
                        >
                            {field.replace(/([A-Z])/g, " $1").toUpperCase()}
                        </button>
                    ))}
                </div>
            </div>

            {selectedField && (
                <div className="card shadow-lg p-3 mt-4 text-center w-75 mx-auto" style={{ maxWidth: "600px" }}>
                    <h5>Visualization for {selectedField.replace(/([A-Z])/g, " $1").toUpperCase()}</h5>
                    <div className="d-flex flex-wrap justify-content-center gap-2 mt-2">
                        {visualizationOptions.map((option) => (
                            <button
                                key={option.type}
                                className={`btn ${visualizationType === option.type ? "btn-success" : "btn-outline-success"}`}
                                onClick={() => setVisualizationType(option.type)}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                    <div className="mt-3">
                        <AuditChart auditLogs={auditLogs} selectedField={selectedField} visualizationType={visualizationType} />
                    </div>
                </div>
            )}

            {analyticsData && (
                <div className="card shadow-lg p-3 mt-5 text-center">
                    <h4 className="text-muted">Verification Analytics</h4>
                    <div className="d-flex flex-wrap justify-content-center gap-2 mt-2">
                        {visualizationOptions.map((option) => (
                            <button
                                key={option.type}
                                className={`btn ${expandedChart === option.type ? "btn-info" : "btn-outline-info"}`}
                                onClick={() => toggleExpandedChart(option.type)}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>

                    {expandedChart && (
                        <div className="d-flex justify-content-center flex-wrap mt-3 gap-3">
                            {expandedChart === "PieChart" && (
                                <Pie data={{
                                    labels: ["Verified", "Pending"],
                                    datasets: [{
                                        data: [analyticsData.studentsWithAllVerifiedDocs, analyticsData.studentsWithPendingDocs],
                                        backgroundColor: ["#4CAF50", "#FF5733"],
                                    }],
                                }} options={{ maintainAspectRatio: false }} />
                            )}
                            {expandedChart === "BarChart" && (
                                <Bar data={{
                                    labels: ["Total Students", "Total Docs", "Verified Docs"],
                                    datasets: [{
                                        label: "Count",
                                        data: [analyticsData.totalStudents, analyticsData.totalDocuments, analyticsData.verifiedDocuments],
                                        backgroundColor: "#3B82F6",
                                    }],
                                }} options={{ maintainAspectRatio: false }} />
                            )}
                            {expandedChart === "LineChart" && (
                                <Line data={{
                                    labels: ["Total Students", "Total Docs", "Verified Docs"],
                                    datasets: [{
                                        label: "Count",
                                        data: [analyticsData.totalStudents, analyticsData.totalDocuments, analyticsData.verifiedDocuments],
                                        borderColor: "#FF5733",
                                        backgroundColor: "rgba(255, 87, 51, 0.2)",
                                    }],
                                }} options={{ maintainAspectRatio: false }} />
                            )}
                        </div>
                    )}
                </div>
            )}
            <div className="container mt-5 text-center">
                <div className="card shadow-lg p-4 mt-5 text-center">
                    <h4 className="text-muted">Document Analytics</h4>
                    <div className="d-flex flex-wrap justify-content-center gap-2 mt-3">
                        {Object.keys(documentAnalytics).map((field) => (
                            <button
                                key={field}
                                className={`btn ${expandedDocumentField === field ? "btn-success" : "btn-outline-success"}`}
                                onClick={() => toggleExpandedDocumentField(field)}
                            >
                                {field.replace(/([A-Z])/g, " $1").toUpperCase()}
                            </button>
                        ))}
                    </div>
                    {expandedDocumentField && (
                        <div className="mt-4 p-4 border border-success rounded d-flex flex-column align-items-center text-center">
                            <h5 className="fw-bold">{expandedDocumentField.replace(/([A-Z])/g, " $1").toUpperCase()}</h5>
                            {expandedDocumentField === "commonDocumentType" ? (
                                <p className="fw-semibold">
                                    <strong>Type:</strong> {documentAnalytics.commonDocumentType.DocumentType} <br />
                                    <strong>Percentage:</strong> {documentAnalytics.commonDocumentType.Percentage}
                                </p>
                            ) : expandedDocumentField === "topUploaders" ? (
                                <ul className="list-group w-50">
                                    {documentAnalytics.topUploaders.map(([name, count], index) => (
                                        <li key={index} className="list-group-item text-center">
                                            {name} - {count} 
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <pre className="text-center">{JSON.stringify(documentAnalytics[expandedDocumentField], null, 2)}</pre>
                            )}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Analytics;

