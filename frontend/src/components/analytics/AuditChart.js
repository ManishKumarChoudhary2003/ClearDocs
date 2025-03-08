import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28CFB", "#FC636B", "#82ca9d"];

const AuditChart = ({ auditLogs, selectedField, visualizationType }) => {
    if (!auditLogs || auditLogs.length === 0) {
        return <p className="text-center text-muted mt-3">No audit data available.</p>;
    }

    // Grouping data by selected field
    const groupedData = auditLogs.reduce((acc, log) => {
        const key = log[selectedField] || "Unknown";
        acc[key] = (acc[key] || 0) + 1;
        return acc;
    }, {});

    // Convert object into array for chart
    const chartData = Object.keys(groupedData).map((key, index) => ({
        name: key,
        value: groupedData[key],
        color: COLORS[index % COLORS.length],
    }));

    return (
        <div className="card shadow-lg p-4 mt-4">
            <h4 className="text-center text-primary">Visualization: {visualizationType.replace("Chart", " Chart")}</h4>

            {/* Pie Chart */}
            {visualizationType === "PieChart" && (
                <PieChart width={400} height={400}>
                    <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120} label>
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            )}

            {/* Bar Chart */}
            {visualizationType === "BarChart" && (
                <BarChart width={500} height={300} data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#82ca9d" />
                </BarChart>
            )}

            {/* Line Chart */}
            {visualizationType === "LineChart" && (
                <LineChart width={500} height={300} data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="value" stroke="#8884d8" />
                </LineChart>
            )}
        </div>
    );
};

export default AuditChart;
