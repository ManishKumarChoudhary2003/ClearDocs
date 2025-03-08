import React, { useEffect, useState } from "react";
import axios from "axios";
import AuditChart from "./AuditChart";
import { Bar, Pie, Line } from "react-chartjs-2";
import "chart.js/auto";

const Analytics = () => {
    const [auditLogs, setAuditLogs] = useState([]);
    const [analyticsData, setAnalyticsData] = useState(null);
    const [error, setError] = useState("");
    const [selectedField, setSelectedField] = useState(null);
    const [visualizationType, setVisualizationType] = useState("PieChart");
    const [expandedChart, setExpandedChart] = useState(null);

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

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    return (
        <div className="container mt-5 text-center">
            <h2 className="text-primary fw-bold">Analytics Dashboard</h2>

            {/* Audit Analytics Section */}
            <div className="card shadow-lg p-3 mt-4">
                <h5>Select a Field to Visualize (Audit Logs)</h5>
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

            {/* Selected Audit Chart */}
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

            {/* Verification Analytics Section */}
            {analyticsData && (
                <div className="card shadow-lg p-3 mt-5 text-center">
                    <h4 className="text-info">Verification Analytics</h4>
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
        </div>
    );
};

export default Analytics;

