import React, { useEffect, useState } from "react";
import SummaryCards from "./SummaryCards";
import employee from "../assets/images/employee.svg";
import leave from "../assets//images/application-development.png"

function Home({ loggedInUser }) {
    const [employeeCount, setEmployeeCount] = useState(0);
    const [leavePending, setLeavePending] = useState(0);
    const [leaveApproved, setLeaveApproved] = useState(0);
    const [expensePending, setExpensePending] = useState(0);
    const [expenseApproved, setExpenseApproved] = useState(0);
    const [isHR, setIsHR] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const FRAPPE_API_KEY = import.meta.env.VITE_REACT_APP_API_KEY;
    const FRAPPE_API_SECRET = import.meta.env.VITE_REACT_APP_API_SECRET;
    const URL = import.meta.env.VITE_REACT_APP_URL;

    useEffect(() => {
        const fetchCounts = async () => {
            try {
                const response = await fetch(`${URL}api/method/get_employee`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `token ${FRAPPE_API_KEY}:${FRAPPE_API_SECRET}`,
                    },
                    body: JSON.stringify({ user: loggedInUser }),
                });

                if (!response.ok) throw new Error("Failed to fetch data");

                const result = await response.json();
                
                if (result.message) {
                    setEmployeeCount(result.message.employee_count || 0);
                    setLeavePending(result.message.leave_pending || 0);
                    setLeaveApproved(result.message.leave_approved || 0);
                    setExpensePending(result.message.expense_pending || 0);
                    setExpenseApproved(result.message.expense_approved || 0);
                    setIsHR(result.message.is_hr || false);
                }

            } catch (err) {
                setError(err.message || "Failed to fetch data.");
            } finally {
                setLoading(false);
            }
        };

        if (loggedInUser) {
            fetchCounts(); // Fetch data only if loggedInUser is available
          }

        fetchCounts();
    }, [loggedInUser]);

    const handleCardClick = (doctype, filter, value) => {
        const cookies = document.cookie.split("; ").reduce((acc, cookie) => {
            const [key, value] = cookie.split("=");
            acc[key] = value;
            return acc;
        }, {});

        const sid = cookies.sid; // Retrieve the session ID from cookies

        if (sid) {
            let formattedItem = doctype.toLowerCase().replace(/\s+/g, '-');

            let emp_url = `${URL}app/${encodeURIComponent(formattedItem)}?sid=${sid}`;
    
            // Handle filters
            if (filter && value) {
                emp_url += `&${filter}=${encodeURIComponent(value)}`;
            }
    
            window.open(emp_url, "_blank"); // Open in a new tab
        } else {
            alert("Session ID not found. Please log in again.");
        }

    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <section className="homeSummary">
            <div className="summaryRow">
                <div className="summaryCol">
                    <a target="_blank" rel="noopener noreferrer">
                        <div className="summaryCard" onClick={ () => handleCardClick("Employee","status","Active") }>
                            <div className="summaryIcon"><img src={employee} alt="Employees" /></div>
                            <div className="summaryDetail">
                                <h3>Employees Head Count <span className="badge active">Active</span></h3>
                                <p className="homep">{employeeCount}</p>
                            </div>
                        </div>
                    </a>
                </div>

                <div className="summaryCol">
                    <div className="summaryCard blueCard" onClick={() => handleCardClick("Leave Application","status","Approved")}>
                        <div className="summaryIcon"></div>
                        <div className="summaryDetail">
                            <h3>Leave Applications</h3>
                            <p className="homep">Pending: {leavePending} | Approved: {leaveApproved}</p>
                        </div>
                    </div>
                </div>

                <div className="summaryCol">
                    <div className="summaryCard greenCard" onClick={() => handleCardClick("Expense Claim","status","open")}>
                        <div className="summaryIcon"></div>
                        <div className="summaryDetail">
                            <h3>Expense Claims</h3>
                            <p className="homep">Pending: {expensePending} | Approved: {expenseApproved}</p>
                        </div>
                    </div>
                </div>
            </div>

            {isHR && <SummaryCards />}
        </section>
    );
}

export default Home;