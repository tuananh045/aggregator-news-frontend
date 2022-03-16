import React, { useState, useEffect } from 'react'
import axios from 'axios';

export default function Sidebar({ title }) {

    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchNewsList() {
            try {
                const response = await axios.get(`/api/news/rss/most-viewed`);
                setData(response.data.items);
            } catch (error) {
                console.log(error);
            }
        }
        fetchNewsList();
    }, [])

    return (
        <div className="col-lg-4 col-md-6">
            <h4>{title}</h4>
            {
                data.map((item) => {
                    return (
                        <div className="content" key={item.link}>
                            <a href={item.link} target='_blank' rel="noreferrer">
                                <img src={item.image} alt="anh12" />
                            </a>
                            <a href={item.link} target='_blank' rel="noreferrer">{item.title}</a>
                        </div>
                    )
                })
            }
        </div>
    )
}
