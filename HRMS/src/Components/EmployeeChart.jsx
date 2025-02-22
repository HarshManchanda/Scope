import chart from '../assets/images/chart.png'
import React, { useEffect, useState } from "react";
import axios from "axios";
import { fetchEmployees } from "../js/api";
import Chart from "chart.js/auto";

function EmployeeChart() {
    const [employees, setEmployees] = useState([]);
    const [activeCount, setActiveCount] = useState(0);
    const [chart_labels, setChartLabel] = useState([]);
    const [chart_values, setChartValues] = useState([]);
    const [chartInstance, setChartInstance] = useState(null); // Track the chart instance

    const FRAPPE_API_KEY = import.meta.env.VITE_REACT_APP_API_KEY;
    const FRAPPE_API_SECRET = import.meta.env.VITE_REACT_APP_API_SECRET;
    const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchEmployees(
                    ["name", "status","employee_name","first_name","last_name", "date_of_birth", "date_of_joining", "date_of_retirement","department"],
                    10000,
                    `${FRAPPE_API_KEY}:${FRAPPE_API_SECRET}`
                );
                setEmployees(data);

                // Calculate active employees
                const activeEmployees = data.filter((employee) => employee.status === "Active");
                setActiveCount(activeEmployees.length);

                const departmentCounts = activeEmployees.reduce((acc, employee) => {
                    // Count only active employees
                    acc[employee.department] = (acc[employee.department] || 0) + 1;
                    return acc;
                }, {});
    
                // Extract labels and values for the chart
                const labels = Object.keys(departmentCounts); // Department names
                const values = Object.values(departmentCounts); // Employee counts
    
                setChartLabel(labels);
                setChartValues(values);
            } catch (err) {
                console.error(err.message);
            }
        };

        fetchData();
    }, []); // Empty dependency array ensures it runs only once on mount.

    useEffect(() => {
        if (chart_labels.length > 0 && chart_values.length > 0) {
            // Function to generate random colors
            const getRandomColor = () => {
                const letters = "0123456789ABCDEF";
                let color = "#";
                for (let i = 0; i < 6; i++) {
                    color += letters[Math.floor(Math.random() * 16)];
                }
                return color;
            };

            // Generate random colors for bars
            const randomColors = chart_values.map(() => getRandomColor());

            const ctx = document.getElementById("employeeChart").getContext("2d");

            // Destroy the previous chart instance if it exists
            if (chartInstance) {
                chartInstance.destroy();
            }

            const newChartInstance = new Chart(ctx, {
                type: "bar", // Chart type
                data: {
                    labels: chart_labels, // Dynamic labels
                    datasets: [
                        {
                            label: "Employee Count by Department",
                            data: chart_values, // Dynamic values
                            backgroundColor: randomColors, // Bar colors
                            borderColor: randomColors,
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    layout: {
                        padding: {
                            left: 20,
                            right: 20,
                            top: 20,
                            bottom: 20,
                        },
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                        x: {
                            ticks: {
                                autoSkip: true,
                                maxRotation: 45,
                                minRotation: 45,
                            },
                        },
                    },
                    plugins: {
                        tooltip: {
                            enabled: true,
                        },
                    },
                },
            });
            // Save the chart instance to state
            setChartInstance(newChartInstance);
        }
    }, [chart_labels, chart_values]); // Re-run when data changes

    return(
        <div className="employeeDistribution">
            <h3>Employee Distribution by Department</h3>
            <div className="chart">
                <canvas id="employeeChart"></canvas>
            </div>
        </div>
    );
}

export default EmployeeChart