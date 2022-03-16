import React from 'react'
import { Link } from 'react-router-dom'

export default function Pagination(props) {

    const { page, limit, totalRows } = props;

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalRows / limit); i++) {
        pageNumbers.push(i);
    }

    return (
        <>
            {
                pageNumbers.length <= 1 ? null : (
                    <ul className="pagination">
                        <li className="page-item">
                            {parseInt(page) - 1 <= 0 ? (
                                null
                            ) : (
                                <Link className="page-link" to={`?page=${parseInt(page) - 1}`}>
                                    <span aria-hidden="true" aria-disabled="true">«</span>
                                </Link>
                            )}
                        </li>

                        {pageNumbers.map((number, index) => {
                            return (
                                <li
                                className="page-item"
                                    key={index}
                                >
                                    <Link className={
                                        number === parseInt(page)
                                            ? "page-link active"
                                            : "page-link"
                                    } to={`?page=${number}`} >
                                        {number}
                                    </Link>
                                </li>
                            );
                        })}
                        <li className="page-item">
                            {parseInt(page) === pageNumbers.length ? (
                                null
                            ) : (
                                <Link to={`?page=${parseInt(page) + 1}`} disabled={parseInt(page) === pageNumbers.length} className="page-link">
                                    <span aria-hidden="true">»</span>
                                    <span className="sr-only">Next</span>
                                </Link>
                            )}

                        </li>
                    </ul>
                )}
        </>
    )
}
