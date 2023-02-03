import React, { useEffect } from 'react'
import styles from "./TableData.module.css"
import axios from "axios"
import { useState } from 'react'

const TableData = ({ subject, isSearch, query }) => {
    const [books, setBooks] = useState([]);
    const [page, setPage] = useState(1);
    // const [currBooks, setCurrBooks] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        setBooks([])
        const getBooks = async (req, res) => {
            if (!isSearch) {
                const result = await axios.get(`https://openlibrary.org/subjects/${subject}.json`)
                console.log(result.data.works);
                setBooks(result.data.works)
                setLoading(false)
            } else {
                const result = await axios.get(`https://openlibrary.org/search.json?q=${query}`)
                setBooks(result.data.docs)
                setLoading(false)
            }
        }
        getBooks()

    }, [subject])

    const selectPageHandler = (selectedPage) => {
        // if (selectedPage >= 1 && selectedPage <= books.length / 10 && selectedPage !== page) {
        setPage(selectedPage);
        // }
    }

    useEffect(() => {
        console.log(page)
    }, [page])


    return (
        <div className={styles.table_container}>
            {loading && <h1> Loading...</h1>}
            {!loading && <>
                <table>
                    <tr>
                        <th>Title and Sub-title 🔼</th>
                        <th>Author</th>
                        <th>Latest Pubish Year</th>
                        <th>First Publish Year</th>
                    </tr>
                    {
                        books.slice(page * 10 - 10, page * 10).map((book) => (
                            <tr key={book.key}>
                                <td>{book.title}</td>
                                <td>{book.authors && book.authors.length > 0 ? book.authors[0].name : "N/A"}</td>
                                <td>{book?.availability?.last_loan_date ? book?.availability?.last_loan_date.substring(0, 5) : book.first_publish_year
                                }</td>
                                <td>{book.first_publish_year}</td>
                            </tr>
                        ))
                    }
                </table>
                <div className={styles.btn_container}>
                    <button className={page > 1 ? "" : `${styles.pag_disable}`} onClick={() => selectPageHandler(page - 1)}>Prev</button>
                    <button className={page < books.length / 10 ? "" : `${styles.pag_disable}`} onClick={() => selectPageHandler(page + 1)}>Next</button>
                </div>
            </>
            }
        </div>
    )
}

export default TableData