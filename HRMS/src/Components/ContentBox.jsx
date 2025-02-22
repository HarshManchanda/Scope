import React, { useEffect, useState } from "react";
import plus from '../assets/images/Plus.svg'
import excel from '../assets/images/excel.svg'
import businessman from '../assets/images/businessman.svg'
import page from '../assets/images/page.svg'
import folder from '../assets/images/folder.svg'
import salary from '../assets/images/salary.svg'
import form from '../assets/images/form.svg'
import mail from '../assets/images/mail.svg'
import holiday from '../assets/images/holiday.svg'
import leave from '../assets/images/leave.svg'
import wfh from '../assets/images/work-from-home.svg'
import birthday from '../assets/images/birthday.svg'
import anniversary from '../assets/images/anniversary.svg'
import new_joinee from '../assets/images/new-joinee.svg'
import eleanor from '../assets/images/eleanor-pena.png'
import arlene from '../assets/images/arlene-mcCoy.png'
import guy_hawkins from '../assets/images/guy-hawkins.png'
import devon_lane from '../assets/images/devon-lane.png'
import bessie from '../assets/images/bessie-cooper.png'
import post from '../assets/images/post.svg'
import polling from '../assets/images/polling.svg'
import MyFavourites from "./MyFavourites";
import QuickAccess from "./QuickAccess";
import Organization from "./Organization";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


function ContentBox({ loggedInUser, onLogout, roles }){
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

    return(
        <>
            <MyFavourites onLogout={onLogout} roles={roles}/>
            <QuickAccess/>
            <Organization/>
        </>
    );
}

export default ContentBox;