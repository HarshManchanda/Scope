import { fetchEmployees } from '../js/api';
import React, { useEffect, useState } from "react";
import axios from "axios";

function Birthdays() {
    // const birthdays = []; // Replace with actual data
    const [employees, setEmployees] = useState([]);
    const [activeCount, setActiveCount] = useState(0);
    const [birthdaysThisMonth, setBirthdaysThisMonth] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const FRAPPE_API_KEY = import.meta.env.VITE_REACT_APP_API_KEY;
    const FRAPPE_API_SECRET = import.meta.env.VITE_REACT_APP_API_SECRET;
    const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchEmployees(
                    ["name", "status","employee_name","first_name","last_name", "date_of_birth", "date_of_joining", "date_of_retirement"],
                    10000,
                    `${FRAPPE_API_KEY}:${FRAPPE_API_SECRET}`
                );
                setEmployees(data);

                // Calculate active employees
                const activeEmployees = data.filter((employee) => employee.status === "Active");
                setActiveCount(activeEmployees.length);

                // Get the current month and year
                const currentDate = new Date();
                const currentMonth = currentDate.getMonth() + 1; // Months are zero-indexed
                const currentYear = currentDate.getFullYear();

                // Find active employees whose birthday is this month
                const birthdays = activeEmployees
                .filter((employee) => {
                    const birthDate = new Date(employee.date_of_birth);
                    return birthDate.getMonth() + 1 === currentMonth; // Check month only
                })
                .map((employee) => {
                    const firstName = employee.first_name || ""; // Fallback to an empty string if null/undefined
                    const lastName = employee.last_name || ""; // Fallback to an empty string if null/undefined
            
                    return {
                        first_name: `${firstName.charAt(0).toUpperCase()}`, // Add initial
                        last_name: `${lastName.charAt(0).toUpperCase()}`, // Add initial
                        employee_name: employee.employee_name,
                        date_of_birth: employee.date_of_birth,
                    };
                });
            setBirthdaysThisMonth(birthdays);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []); // Empty dependency array ensures it runs only once on mount.
    
    return (
        <div className="birthdays">
        <h3>Birthdays This Month</h3>
        {birthdaysThisMonth.length > 0 ? (
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Date of Birth</th>
                    </tr>
                </thead>
                <tbody>
                    {birthdaysThisMonth.map((employee, index) => (
                        <tr key={index}>
                            <td>
                                <span className="avatar">
                                    {employee.first_name} {employee.last_name.charAt(0)}.
                                </span>{" "}
                                {employee.employee_name}
                            </td>
                            <td>{new Date(employee.date_of_birth).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        ) : (
            <p>No birthdays this month</p>
        )}
    </div>
    );
}

export default Birthdays;