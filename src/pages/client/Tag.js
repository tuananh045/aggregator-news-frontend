import React, { useEffect, useState } from 'react'
import Sidebar from 'components/sidebar/Sidebar'
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Loading from 'components/loading/Loading';

export default function Tag() {

    const params = useParams();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const page = params.page ? params.page : 1;
    const keyword = params.keyword ? params.keyword : '';
    const tag = params.tag ? params.tag : '';
    useEffect(() => {
        async function fetchPostList() {
            setLoading(true);
            const search = {};
            search.page = page;
            search.keyword = keyword;
            search.tag = tag;
            try {
                const response = await axios.get(`/api/post/tag/${tag}`);
                setData(response.data.content);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        }
        fetchPostList();
    }, [tag, keyword, page])

    return (
        <>
            <div className="container news-category">
                <div className="news w-100">
                    <div className="row">
                        {
                            loading ? <Loading /> : (
                                <div className="col-lg-8 col-sm-12">
                                    {
                                        data?.map((item) => {
                                            return (
                                                <div className="news-main" style={{paddingTop: 0, marginBottom: 40}} key={item.id}>
                                                    <Link to={`/bai-viet/${item.slug}`}>
                                                        <img src={item.image} alt="" />
                                                    </Link>
                                                    <div className="news-main-item">
                                                        <Link to={`/bai-viet/${item.slug}`}>
                                                            {item.title}
                                                        </Link>
                                                        <div className='short' dangerouslySetInnerHTML={{ __html: item.content }}></div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }

                                    <div className="pages">
                                        <nav aria-label="Page navigation example">
                                            <ul className="pagination">
                                                <li className="page-item">
                                                    <Link className="page-link" to="#" aria-label="Previous">
                                                        <span aria-hidden="true">«</span>
                                                        <span className="sr-only">Previous</span>
                                                    </Link>
                                                </li>
                                                <li className="page-item">
                                                    <Link className="page-link active" to="#">1</Link>
                                                </li>
                                                <li className="page-item">
                                                    <Link className="page-link" to="#" aria-label="Next">
                                                        <span aria-hidden="true">»</span>
                                                        <span className="sr-only">Next</span>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                            )
                        }
                        <Sidebar title='ĐỌC NHIỀU NHẤT' />
                    </div>
                </div>
            </div>
        </>
    )
}
