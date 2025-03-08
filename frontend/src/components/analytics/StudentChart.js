import React, { useEffect, useState } from "react";
import { Card, CardContent } from "./Card";
import { Bar, Pie } from "react-chartjs-2";
import "chart.js/auto";
import axios from "axios"; // Import axios for API calls

const StudentChart = () => {
    const [analyticsData, setAnalyticsData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchAnalytics = async () => {
            const token = localStorage.getItem("token"); // Retrieve token from local storage
            if (!token) {
                setError("Authorization token is missing");
                setLoading(false);
                return;
            }
    
            try {
                const response = await axios.get("http://localhost:8080/analytics/verification", {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include Bearer token
                    },
                });
                setAnalyticsData(response.data);
            } catch (error) {
                setError("Failed to load analytics data");
            } finally {
                setLoading(false);
            }
        };
    
        fetchAnalytics();
    }, []);
    

    if (loading) {
        return <h5 className="text-blue-500">Loading analytics data...</h5>;
    }

    if (error) {
        return <h5 className="text-red-500">{error}</h5>;
    }

    if (!analyticsData) {
        return <h5 className="text-danger">No analytics data available</h5>;
    }

    const {
        totalStudents,
        totalDocuments,
        verifiedDocuments,
        verificationSuccessRate,
        studentsWithAllVerifiedDocs,
        studentsWithPendingDocs,
    } = analyticsData;

    const pieData = {
        labels: ["Verified", "Pending"],
        datasets: [
            {
                data: [studentsWithAllVerifiedDocs, studentsWithPendingDocs],
                backgroundColor: ["#4CAF50", "#FF5733"],
            },
        ],
    };

    const barData = {
        labels: ["Total Students", "Total Docs", "Verified Docs"],
        datasets: [
            {
                label: "Count",
                data: [totalStudents, totalDocuments, verifiedDocuments],
                backgroundColor: "#3B82F6",
            },
        ],
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            <Card>
                <CardContent className="p-4 text-center">
                    <h5 className="text-lg font-semibold">Verification Success Rate</h5>
                    <p className="text-2xl text-green-600 font-bold">{verificationSuccessRate.toFixed(2)}%</p>
                </CardContent>
            </Card>
            <Card>
                <CardContent className="p-4">
                    <h5 className="text-lg font-semibold">Students Verification Status</h5>
                    <Pie data={pieData} />
                </CardContent>
            </Card>
            <Card className="col-span-1 md:col-span-2">
                <CardContent className="p-4">
                    <h5 className="text-lg font-semibold">Overall Verification Analytics</h5>
                    <Bar data={barData} />
                </CardContent>
            </Card>
        </div>
    );
};

export default StudentChart;
