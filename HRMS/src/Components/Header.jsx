import SearchAutocomplete from './SearchAutocomplete';
import bellicon from '../assets/images/bell.svg'
import settings from '../assets/images/setting.svg'
import logout from '../assets/images/logout.svg'
import React, { useEffect, useState } from "react";

function Header({ onLogout}) {
    const [userName, setUserName] = useState("Administrator"); // Replace with dynamic user name
    const [showMessage, setShowMessage] = useState(false);

    return (
        <header className="header">
            <div className="headerRow">
            <SearchAutocomplete />
            <div className="headerProfile">
                <select name="" id="">
                    <option value="">Febuary 2025</option>
                </select>
                <ul>
                    <li>
                        <img src={bellicon} alt="Notification" className="bellIcon"/>
                    </li>
                    <li>
                        <img src={settings} alt="Setting" className="bellIcon"/>
                    </li>
                    <li>
                        <img src={logout} alt="Logout" className="bellIcon" onClick={onLogout}/>
                    </li>
                </ul>
            </div>
            </div>
            <div className="headerAction">
                <a href="">Book A Demo</a>
            </div>
        </header>
    );
}

export default Header;