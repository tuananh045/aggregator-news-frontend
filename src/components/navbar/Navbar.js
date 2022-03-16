import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function Navbar() {

    const [listCategory, setListCategory] = useState([]);

    useEffect(() => {
        fetchCategoryList();
    }, [])

    async function fetchCategoryList() {
        try {
            const response = await axios.get(`/api/news/category`);
            setListCategory(response.data);
        } catch (error) {
            console.log(error);
        }
    }



    return (
        <header>
            <div className="header_nav">
                <nav className="navbar navbar-expand-lg navbar-light">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse w-100" id="navbarNav">
                        <div className="container d-flex justify-content-between align-items-center">
                            <ul className="navbar-nav d-flex align-items-center">
                                <div className="logo-img">
                                    <Link to="/"><img src="/assets/images/logo/tto-logo.svg" alt="logo" /></Link>
                                </div>
                                <li className="nav-item">
                                    <NavLink className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} to='/'>Trang chủ <span className="sr-only">(current)</span></NavLink>
                                </li>
                                {
                                    listCategory?.map((item) => {
                                        return <li className="nav-item" key={item?.id}>
                                            <NavLink className={({ isActive }) => (isActive ? 'nav-link actived' : 'nav-link')} to={item?.slug}>{item?.name}</NavLink>
                                        </li>
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    )
}
