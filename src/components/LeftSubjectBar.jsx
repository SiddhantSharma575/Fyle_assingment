import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from "./LeftSubjectBar.module.css"

const LeftSubjectBar = ({ setIsSearch }) => {
    const navigate = useNavigate()
    const subjects = [
        "JavaScript",
        "Love",
        "Indian history",
        "Crypto currency",
        "Criminal Law"
    ]
    return (
        <div className={styles.left_container}>
            <div className={styles.left_top}>
                <h3>Trending Subjects</h3>
                <input type="text" placeholder='Search Subjects' />
            </div>
            <div className={styles.left_list}>
                {
                    subjects.map((sub, i) => {
                        return <span onClick={() => {
                            setIsSearch(false)
                            navigate(`/${sub.toLowerCase().replace(/\s+/g, "_")}`)
                        }} key={i}>{sub}</span>
                    })
                }
            </div>
        </div>
    )
}

export default LeftSubjectBar