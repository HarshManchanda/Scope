import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/OnboardingPage.css";
import onboading_person from "../assets/images/onboarding-person.png";
import signin from "../assets/images/sign-in-arrow.svg";

const OnboardingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="vDOnboardingWrapper">
            <div className="onBoardingImage">
                <img src={onboading_person} alt="Onboarding" />
            </div>
            <div className="onBoardingContent">
                <div className="onBoardingContentInner">
                    <h2>VProCURE HRMS</h2>
                    <h5>Streamlining HR for Modern Businesses</h5>
                    <p>
                        Empower your organization with an advanced Human Resource
                        Management System (HRMS) designed to automate and simplify HR
                        processes.
                    </p>
                    <button className="letsStartBtn" onClick={() => navigate("/signin")}>
                        Let’s Start <img src={signin} alt="Arrow" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OnboardingPage;