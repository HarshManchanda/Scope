// import React, { useEffect, useState } from "react";
// import { fetchEmployees } from '../js/api';
// import axios from "axios";
// import plus from '../assets/images/Plus.svg'
// import excel from '../assets/images/excel.svg'
// import businessman from '../assets/images/businessman.svg'
// import page from '../assets/images/page.svg'
// import folder from '../assets/images/folder.svg'
// import salary from '../assets/images/salary.svg'
// import form from '../assets/images/form.svg'
// import mail from '../assets/images/mail.svg'
// import holiday from '../assets/images/holiday.svg'
// import leave from '../assets/images/leave.svg'
// import wfh from '../assets/images/work-from-home.svg'
// import birthday from '../assets/images/birthday.svg'
// import anniversary from '../assets/images/anniversary.svg'
// import new_joinee from '../assets/images/new-joinee.svg'
// import eleanor from '../assets/images/eleanor-pena.png'
// import arlene from '../assets/images/arlene-mcCoy.png'
// import guy_hawkins from '../assets/images/guy-hawkins.png'
// import devon_lane from '../assets/images/devon-lane.png'
// import bessie from '../assets/images/bessie-cooper.png'
// import post from '../assets/images/post.svg'
// import polling from '../assets/images/polling.svg'

// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

// function Organization(){
//     const settings = {
//         dots: false, 
//         infinite: false, 
//         speed: 500, 
//         slidesToShow: 3.8, 
//         slidesToScroll: 1, 
//         autoplay: false,
//         arrows: false, 
//         swipeToSlide: true, // Allow mouse drag to move items
//         draggable: true,
//         responsive: [
//             { breakpoint: 1000, settings: { slidesToShow: 3, slidesToScroll: 1 } },
//             { breakpoint: 600, settings: { slidesToShow: 2, slidesToScroll: 1 } },
//             { breakpoint: 0, settings: { slidesToShow: 1, slidesToScroll: 1 } },
//         ],
//     };

//     const [activeTab, setActiveTab] = useState('birthdaysTab');
//     const [activePostPoll, setActivePostPoll] = useState('postContent');
//     const [employees, setEmployees] = useState([]);
//     const [activeCount, setActiveCount] = useState(0);
//     const [birthdaysThisMonth, setBirthdaysThisMonth] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     const handleTabChange = (tab) => {
//         setActiveTab(tab);
//     };

//     const handlePostPollChange = (panel) => {
//         setActivePostPoll(panel);
//     };

//     const FRAPPE_API_KEY = import.meta.env.VITE_REACT_APP_API_KEY;
//     const FRAPPE_API_SECRET = import.meta.env.VITE_REACT_APP_API_SECRET;
//     const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const data = await fetchEmployees(
//                     ["name", "status","employee_name","first_name","last_name", "date_of_birth"],
//                     10000,
//                     `${FRAPPE_API_KEY}:${FRAPPE_API_SECRET}`
//                 );
//                 setEmployees(data);

//                 // Calculate active employees
//                 const activeEmployees = data.filter((employee) => employee.status === "Active");
//                 setActiveCount(activeEmployees.length);

//                 // Get the current month and year
//                 const currentDate = new Date();
//                 const currentMonth = currentDate.getMonth() + 1; // Months are zero-indexed
//                 const currentYear = currentDate.getFullYear();

//                 // Find active employees whose birthday is this month
//                 const birthdays = activeEmployees
//                 .filter((employee) => {
//                     const birthDate = new Date(employee.date_of_birth);
//                     return birthDate.getMonth() + 1 === currentMonth; // Check month only
//                 })
//                 .map((employee) => {
//                     const firstName = employee.first_name || ""; // Fallback to an empty string if null/undefined
//                     const lastName = employee.last_name || ""; // Fallback to an empty string if null/undefined
            
//                     return {
//                         first_name: `${firstName.charAt(0).toUpperCase()}`, // Add initial
//                         last_name: `${lastName.charAt(0).toUpperCase()}`, // Add initial
//                         employee_name: employee.employee_name,
//                         date_of_birth: employee.date_of_birth,
//                     };
//                 });
//             setBirthdaysThisMonth(birthdays);
//             } catch (err) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, []); // Empty dependency array ensures it runs only once on mount.

//     return (
//         <>
//         <script src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js"></script>
//         <script src="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js"></script>
//         <div className="contentBox">
//             <h3>Organization</h3>
//             <div className="organizationRow">
//                 <div className="organizationCol birthdayTabCol">
//                     <div className="tabContainer">
//                         <div className="tabHeaders">
//                             <div className={`tabHeader ${activeTab === 'birthdaysTab' ? 'active' : ''}`} onClick={() => handleTabChange('birthdaysTab')}>
//                                 <img src={birthday} alt="Birthday" />Birthdays
//                             </div>
//                             <div className={`tabHeader ${activeTab === 'workAnniversariesTab' ? 'active' : ''}`} onClick={() => handleTabChange('workAnniversariesTab')}>
//                                 <img src={anniversary} alt="Anniversary" />Work Anniversaries
//                             </div>
//                             <div className={`tabHeader ${activeTab === 'newJoineeTab' ? 'active' : ''}`} onClick={() => handleTabChange('newJoineeTab')}>
//                                 <img src={new_joinee} alt="New Joinee" />New Joinee
//                             </div>
//                         </div>
//                         <div className="tabContents">
//                             <div className={`tabContent ${activeTab === 'birthdaysTab' ? 'active' : ''}`} id="birthdaysTab">
//                                 <div className="birthdayBox">
//                                     <h4>Today's</h4>
//                                     <div className="birthdayList">
//                                         <div className="birthdayItem">
//                                             <img src={eleanor} className="profileImage" alt="Eleanor Pena" />
//                                             Eleanor Pena
//                                         </div>
//                                         <div className="birthdayItem">
//                                             <img src={arlene} className="profileImage" alt="Arlene McCoy" />
//                                             Arlene McCoy
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="birthdayBox">
//                                     <h4>Upcoming</h4>
//                                     {birthdaysThisMonth.length > 0 ? (
//                                     <div className="birthdayList">
//                                         {birthdaysThisMonth.map((employee, index) => (
//                                         <div className="birthdayItem">
//                                             <Slider {...settings} className="quickAccessSlider"></Slider>
//                                                 <span className="avatar">
//                                                 {employee.first_name} {employee.last_name.charAt(0)}. {" "}{employee.employee_name}
//                                                 {new Date(employee.date_of_birth).toLocaleDateString()}</span>  
//                                         </div>
//                                         ))}  
//                                     </div>
//                                     ) : (
//                                         <p>No birthdays this month</p>
//                                     )}
//                                 </div>
//                             </div>
//                             <div className={`tabContent ${activeTab === 'workAnniversariesTab' ? 'active' : ''}`} id="workAnniversariesTab">
//                                 <h4>Work Anniversaries Content</h4>
//                             </div>
//                             <div className={`tabContent ${activeTab === 'newJoineeTab' ? 'active' : ''}`} id="newJoineeTab">
//                                 <h4>New Joinee Content</h4>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="organizationCol postTabCol">
//                     <div className="postPollWrapper">
//                         <div className="postPollNavigation">
//                             <div className={`postPollTab ${activePostPoll === 'postContent' ? 'activePostPoll' : ''}`} onClick={() => handlePostPollChange('postContent')}>
//                                 <img src={post} alt="Post" />Post
//                             </div>
//                             <div className={`postPollTab ${activePostPoll === 'pollContent' ? 'activePostPoll' : ''}`} onClick={() => handlePostPollChange('pollContent')}>
//                                 <img src={polling} alt="Poll" />Poll
//                             </div>
//                         </div>
//                         <div className="postPollContainer">
//                             <div className={`postPollContent ${activePostPoll === 'postContent' ? 'activePostPollPanel' : ''}`} id="postContent">
//                                 <p>Write your post here and mention your peers</p>
//                             </div>
//                             <div className={`postPollContent ${activePostPoll === 'pollContent' ? 'activePostPollPanel' : ''}`} id="pollContent">
//                                 <p>Create a poll and engage with your peers</p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="organizationCol announceMentCol">
//                     <div className="quickAccessCard purpleCard">
//                         <div className="qAHead">
//                             <h4>Announcement</h4>
//                         </div>
//                         <div className="qABody">
//                             <p>No announcement</p>
//                             <a href="" className="addAnnouncementBtn">+ Add</a>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//         </>
//     );
// };

// export default Organization;

import React, { useEffect, useState } from "react";
import { fetchEmployees } from '../js/api';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import plus from '../assets/images/Plus.svg';
import excel from '../assets/images/excel.svg';
import businessman from '../assets/images/businessman.svg';
import page from '../assets/images/page.svg';
import folder from '../assets/images/folder.svg';
import salary from '../assets/images/salary.svg';
import form from '../assets/images/form.svg';
import mail from '../assets/images/mail.svg';
import holiday from '../assets/images/holiday.svg';
import leave from '../assets/images/leave.svg';
import wfh from '../assets/images/work-from-home.svg';
import birthday from '../assets/images/birthday.svg';
import anniversary from '../assets/images/anniversary.svg';
import new_joinee from '../assets/images/new-joinee.svg';
import eleanor from '../assets/images/eleanor-pena.png';
import arlene from '../assets/images/arlene-mcCoy.png';
import guy_hawkins from '../assets/images/guy-hawkins.png';
import devon_lane from '../assets/images/devon-lane.png';
import bessie from '../assets/images/bessie-cooper.png';
import post from '../assets/images/post.svg';
import polling from '../assets/images/polling.svg';

function Organization() {
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3.8,
        slidesToScroll: 1,
        autoplay: false,
        arrows: false,
        swipeToSlide: true,
        draggable: true,
        responsive: [
            { breakpoint: 1000, settings: { slidesToShow: 3, slidesToScroll: 1 } },
            { breakpoint: 600, settings: { slidesToShow: 2, slidesToScroll: 1 } },
            { breakpoint: 0, settings: { slidesToShow: 1, slidesToScroll: 1 } },
        ],
    };

    const [activeTab, setActiveTab] = useState('birthdaysTab');
    const [activePostPoll, setActivePostPoll] = useState('postContent');
    const [employees, setEmployees] = useState([]);
    const [todayBirthdays, setTodayBirthdays] = useState([]);
    const [upcomingBirthdays, setUpcomingBirthdays] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handlePostPollChange = (panel) => {
        setActivePostPoll(panel);
    };

    const FRAPPE_API_KEY = import.meta.env.VITE_REACT_APP_API_KEY;
    const FRAPPE_API_SECRET = import.meta.env.VITE_REACT_APP_API_SECRET;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchEmployees(
                    ["name", "status", "employee_name", "first_name", "last_name", "date_of_birth"],
                    10000,
                    `${FRAPPE_API_KEY}:${FRAPPE_API_SECRET}`
                );
                setEmployees(data);

                // Get the current date
                const currentDate = new Date();
                const currentMonth = currentDate.getMonth() + 1; // Months are zero-indexed
                const currentDay = currentDate.getDate();

                // Find active employees whose birthday is this month
                const activeEmployees = data.filter((employee) => employee.status === "Active");

                // Filter birthdays for today and upcoming
                const today = [];
                const upcoming = [];

                activeEmployees.forEach((employee) => {
                    const birthDate = new Date(employee.date_of_birth);
                    if (birthDate.getMonth() + 1 === currentMonth) {
                        if (birthDate.getDate() === currentDay) {
                            // Today's birthday
                            today.push({
                                initials: `${employee.first_name?.charAt(0)}${employee.last_name?.charAt(0)}`,
                                employee_name: employee.employee_name,
                                date_of_birth: employee.date_of_birth,
                            });
                        } else if (birthDate.getDate() > currentDay) {
                            // Upcoming birthday
                            upcoming.push({
                                initials: `${employee.first_name?.charAt(0)}${employee.last_name?.charAt(0)}`,
                                employee_name: employee.employee_name,
                                date_of_birth: employee.date_of_birth,
                            });
                        }
                    }
                });

                setTodayBirthdays(today);
                setUpcomingBirthdays(upcoming);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;


    return (
        <div className="contentBox">
            <h3>Organization</h3>
            <div className="organizationRow">
                <div className="organizationCol birthdayTabCol">
                    <div className="tabContainer">
                        <div className="tabHeaders">
                            <div className={`tabHeader ${activeTab === 'birthdaysTab' ? 'active' : ''}`} onClick={() => handleTabChange('birthdaysTab')}>
                                <img src={birthday} alt="Birthday" />Birthdays
                            </div>
                            <div className={`tabHeader ${activeTab === 'workAnniversariesTab' ? 'active' : ''}`} onClick={() => handleTabChange('workAnniversariesTab')}>
                                <img src={anniversary} alt="Anniversary" />Work Anniversaries
                            </div>
                            <div className={`tabHeader ${activeTab === 'newJoineeTab' ? 'active' : ''}`} onClick={() => handleTabChange('newJoineeTab')}>
                                <img src={new_joinee} alt="New Joinee" />New Joinee
                            </div>
                        </div>
                        <div className="tabContents">
                            <div className={`tabContent ${activeTab === 'birthdaysTab' ? 'active' : ''}`} id="birthdaysTab">
                                <div className="birthdayBox">
                                    <h4>Today's</h4>
                                    {todayBirthdays.length > 0 ? (
                                        <Slider {...settings} className="quickAccessBirthdaySlider">
                                            {todayBirthdays.map((employee, index) => (
                                                <div className="birthdayItem" key={index}>
                                                    <div className="avatar" title={`${new Date(employee.date_of_birth).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}`}>
                                                        {employee.initials}
                                                    </div>
                                                    <p>{employee.employee_name}</p>
                                                </div>
                                            ))}
                                        </Slider>
                                    ) : (
                                        <p>No birthdays this month</p>
                                    )}
                                </div>
                                <div className="birthdayBox">
                                    <h4>Upcoming</h4>
                                    {upcomingBirthdays.length > 0 ? (
                                        <Slider {...settings} className="quickAccessBirthdaySlider">
                                            {upcomingBirthdays.map((employee, index) => (
                                                <div className="birthdayItem" key={index}>
                                                    <div className="avatar" title={`${new Date(employee.date_of_birth).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}`}>
                                                        {employee.initials}
                                                    </div>
                                                    <p>{employee.employee_name}</p>
                                                </div>
                                            ))}
                                        </Slider>
                                    ) : (
                                        <p>No birthdays this month</p>
                                    )}
                                </div>
                            </div>
                            <div className={`tabContent ${activeTab === 'workAnniversariesTab' ? 'active' : ''}`} id="workAnniversariesTab">
                                <h4>Work Anniversaries Content</h4>
                            </div>
                            <div className={`tabContent ${activeTab === 'newJoineeTab' ? 'active' : ''}`} id="newJoineeTab">
                                <h4>New Joinee Content</h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="organizationCol postTabCol">
                    <div className="postPollWrapper">
                        <div className="postPollNavigation">
                            <div className={`postPollTab ${activePostPoll === 'postContent' ? 'activePostPoll' : ''}`} onClick={() => handlePostPollChange('postContent')}>
                                <img src={post} alt="Post" />Post
                            </div>
                            <div className={`postPollTab ${activePostPoll === 'pollContent' ? 'activePostPoll' : ''}`} onClick={() => handlePostPollChange('pollContent')}>
                                <img src={polling} alt="Poll" />Poll
                            </div>
                        </div>
                        <div className="postPollContainer">
                            <div className={`postPollContent ${activePostPoll === 'postContent' ? 'activePostPollPanel' : ''}`} id="postContent">
                                <p>Write your post here and mention your peers</p>
                            </div>
                            <div className={`postPollContent ${activePostPoll === 'pollContent' ? 'activePostPollPanel' : ''}`} id="pollContent">
                                <p>Create a poll and engage with your peers</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="organizationCol announceMentCol">
                    <div className="quickAccessCard purpleCard">
                        <div className="qAHead">
                            <h4>Announcement</h4>
                        </div>
                        <div className="qABody">
                            <p>No announcement</p>
                            <a href="" className="addAnnouncementBtn">+ Add</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Organization;