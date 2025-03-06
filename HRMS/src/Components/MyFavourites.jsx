import React from 'react';
import { useRef, useState, useEffect } from 'react';
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
import prevArrow from '../assets/images/prev.svg';
import nextArrow from '../assets/images/next.svg';

const favourites = [
    { img: excel, alt: 'Excel', label: 'Import Data From Excel', erp_label:'Data Import' },
    { img: businessman, alt: 'Add Employee', label: 'Add Employee', erp_label:'Employee' },
    { img: page, alt: 'Employee Separation', label: 'Employee Separation', erp_label: 'Employee Separation' },
    { img: folder, alt: 'Bulk Update', label: 'Bulk Update', erp_label:'Bulk Update' },
    { img: salary, alt: 'Process Payroll', label: 'Process Payroll', erp_label: 'Payroll Entry' },
    { img: form, alt: 'Leave Application', label: 'Leave Application', erp_label:'Leave Application' },
];

const CustomPrevArrow = () => (
    <button className="custom-arrow prev-arrow" onClick={() => sliderRef.current?.slickPrev()}>
        <img src={prevArrow} alt="Previous" />
    </button>
);

const CustomNextArrow = () => (
    <button className="custom-arrow next-arrow" onClick={() => sliderRef.current?.slickNext()}>
        <img src={nextArrow} alt="Next" />
    </button>
);

const MyFavourites = ({ onLogout, roles }) => {

    const URL = import.meta.env.VITE_REACT_APP_URL;

    const isHRUser = roles.includes("HR User"); // Use roles prop directly

    console.log("Roles:", roles);
    console.log("HR User:", isHRUser);

    const [dropdownIndex, setDropdownIndex] = useState(null);

    const handleCardClick = (item) => {
        const logged_in_user = localStorage.getItem("isLoggedIn")
        if (logged_in_user) {
            let formattedItem = item.toLowerCase().replace(/\s+/g, '-');
            let url = `${URL}app/${encodeURIComponent(formattedItem)}`;
            window.open(url, "_blank"); 
        } else {
            alert("Not Logged in. Please log in again.");
        }
    };

    const handleAddNewClick = (item) => {
        setDropdownIndex(null);
        const logged_in_user = localStorage.getItem("isLoggedIn")
        if (logged_in_user) {
            let formattedItem = item.toLowerCase().replace(/\s+/g, '-');
            let url = `${URL}app/${encodeURIComponent(formattedItem)}/new`;
            window.open(url, "_blank");
        } else {
            alert("Not Logged in. Please log in again.");
        }
    };

    const sliderRef = useRef(null); // Create a ref for Slider

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        swipeToSlide: true,
        draggable: true,
        touchMove: true,  
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 1 } },
            { breakpoint: 600, settings: { slidesToShow: 2, slidesToScroll: 1 } },
            { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
        ],
    };

    return (
        <div className="contentBox">
            <div className="header-container">
                <h3>My Favourites</h3>
                <div className="arrow-container">
                    <button className="custom-arrow prev-arrow" onClick={() => sliderRef.current.slickPrev()}>
                        <img src={prevArrow} alt="Previous" />
                    </button>
                    <button className="custom-arrow next-arrow" onClick={() => sliderRef.current.slickNext()}>
                        <img src={nextArrow} alt="Next" />
                    </button>
                </div>
            </div>
            <div className="myFavouriteBox">
                <div className="favouriteAddAction">
                    <a href="#">
                        <div className="myFavIcon">
                            <img src={plus} alt="Add" />
                        </div>
                    </a>
                </div>
                <div className="myFavSlider owl-carousel" style={{ overflow: 'hidden', position: 'relative' }}>
                    <Slider ref={sliderRef} {...settings}>
                        {favourites.map((fav, index) => (
                            <div className="item" key={index} onClick={() => handleCardClick(fav.erp_label)}>
                                <a href="#">
                                    <div className="myFavIcon">
                                        <img src={fav.img} alt={fav.alt} />
                                    </div>
                                    <span>{fav.label}</span>
                                    <button className="plusIcon" onClick={() => handleAddNewClick(fav.erp_label)}>
                                        <img src={plus} alt="Add New" />
                                    </button>
                                </a>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    );
};

export default MyFavourites;
