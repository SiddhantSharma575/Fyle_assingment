import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import LeftSubjectBar from '../components/LeftSubjectBar';
import TableData from '../components/TableData';
import styles from "./Home.module.css";
import Search from "../assets/search.png"
import { useEffect } from 'react';

const Home = () => {
    const location = useLocation()
    console.log(location.pathname)
    const [isSearch, setIsSearch] = useState(false)
    const [query, setQuery] = useState("")
    const [isSubject, setIsSubject] = useState()
    const navigate = useNavigate()
    const hanleSearch = () => {
        setIsSearch(true);
        navigate(`/${query.toLowerCase()}`)
    }

    const subjects = [
        "javascript",
        "love",
        "indian_history",
        "crypto_currency",
        "criminal_law"
    ]

    useEffect(() => {
        if (location.pathname !== '/') {
            for (let i = 0; i < 5; i++) {
                if (location.pathname.substring(1).includes(subjects[i])) {
                    setIsSubject(true)
                }
            }
        }
    }, [location.pathname])


    return (
        <div className={styles.home_container}>
            <LeftSubjectBar setIsSearch={setIsSearch} />
            <hr className={styles.hr_st} />
            <div className={styles.right_home_top}>
                {location.pathname !== "/" && isSubject ? <h3>{location.pathname.substring(1).toUpperCase()}</h3> : <div>
                    <input type="text" placeholder='Search Books by title or Author' value={query} onChange={(e) => setQuery(e.target.value)} />
                    <img src={Search} alt="search.png" onClick={hanleSearch} />
                </div>}
                <hr className={styles.bt_st} />
                {location.pathname !== "/" && <TableData subject={location.pathname.substring(1)} isSearch={isSearch} query={query} />}
            </div>
        </div>
    )
}

export default Home