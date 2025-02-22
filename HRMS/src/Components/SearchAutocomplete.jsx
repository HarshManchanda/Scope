import React, { useEffect, useState, useRef } from "react";
import { fetchDoctype } from "../js/doc_api";

function SearchAutocomplete() {
    const FRAPPE_API_KEY = import.meta.env.VITE_REACT_APP_API_KEY;
    const FRAPPE_API_SECRET = import.meta.env.VITE_REACT_APP_API_SECRET;
    const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
    const URL = import.meta.env.VITE_REACT_APP_URL;

    const [keywords, setDoctype] = useState([]); 
    const [results, setResults] = useState([]);
    const [input, setInput] = useState('');
    const [showResults, setShowResults] = useState(false); // New state for showing results

    const searchRef = useRef(null); // Ref to the search input box

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchDoctype(
                    ["name", "module"],
                    5000,
                    `${FRAPPE_API_KEY}:${FRAPPE_API_SECRET}`
                );
                const new_data = data.filter((docs) => docs.module === "HR");
                const keywordList = new_data.map(item => item.name);
                setDoctype(keywordList);
            } catch (err) {
                console.error(err.message);
            }
        };
        fetchData();
    }, []);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInput(value);

        setResults(
            keywords.filter((keyword) =>
                keyword.toLowerCase().includes(value.toLowerCase())
            )
        );
    };

    const handleSelect = (item) => {
        setInput(item);
        setResults([]); // Clear results on select
        setShowResults(false); // Close the result box after selection
        // Session management
        const cookies = document.cookie.split("; ").reduce((acc, cookie) => {
            const [key, value] = cookie.split("=");
            acc[key] = value;
            return acc;
        }, {});
        const sid = cookies.sid;
        if (sid) {
            // Format item for URL
            let formattedItem = item.toLowerCase().replace(/\s+/g, '-');
            let url = `${URL}app/${encodeURIComponent(formattedItem)}?sid=${sid}`;
            window.open(url, "_blank"); // Open in a new tab
        } else {
            alert("Session ID not found. Please log in again.");
        }
    };

    // Handle clicks outside the search box to close results
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setResults([]);
                setShowResults(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Show results box when search input is focused
    const handleFocus = () => {
        if (!input) {
            setResults(keywords);
        }
        setShowResults(true);
    };

    return (
        <div className="search-box" ref={searchRef}>
            <div className="headerSearch">
                <input
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    onFocus={handleFocus} // Show results on focus
                    className="search"
                    placeholder="Search Actions"
                    autoComplete="off"
                />
                {/* <button><i className="fa-solid fa-magnifying-glass"></i></button> */}
            </div>

            {showResults && results.length > 0 && (
                <div className="result-box">
                    <ul>
                        {results.map((result, index) => (
                            <li key={index} onClick={() => handleSelect(result)}>
                                {result}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
        );
}

export default SearchAutocomplete;
