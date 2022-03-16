import React, { useEffect, useState } from 'react'
import BreadCrumb from 'components/breadcrumb/BreadCrumb'
import Sidebar from 'components/sidebar/Sidebar'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Loading from 'components/loading/Loading';

export default function Post() {
    const params = useParams();
    const [post, setPost] = useState({
        title: '',
        content: '',
        author_name: '',
        category_name: ''
    });
    const [similars, setSimilars] = useState([]);
    const [loading, setLoading] = useState(true);

    const slug = params.slug ? params.slug : '';
    useEffect(() => {
        setLoading(true);
        async function fetchPost() {
            try {
                const response = await axios.get(`/api/post/${slug}`);
                setPost(response.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        }
        async function fetchSimilarPost() {
            try {
                const response = await axios.get(`/api/similar/${slug}`);
                setSimilars(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchPost();
        fetchSimilarPost();
    }, [slug])

    return (
        <>
            <BreadCrumb title={post.category_name} subtitle={post.title} />
            <div className="container">
                <div className="news w-100">
                    <div className="row">
                        <div className="col-lg-8 col-sm-12">
                            {
                                loading ? <Loading /> : (
                                    <div className="main-top">
                                        <h4>{post.title}</h4>
                                        <img src={post.image} alt="" />
                                        <div className='main-content' dangerouslySetInnerHTML={{ __html: post.content }}></div>
                                        <h6>- <i>{post.author_name}</i> -</h6>

                                        <div className="tag_dtl">
                                            <div className="tag_ico">
                                                <p>&bull;Tags</p>
                                            </div>
                                            <ul>
                                                {
                                                    post?.tag_names.map((item, index) => {
                                                        return (
                                                            <li key={index}>
                                                                <Link title={item} to={`/tag/${post?.tag_slugs[index]}`}>{item}</Link>
                                                            </li>
                                                        )
                                                    })
                                                }
                                            </ul>
                                        </div>

                                        <div className="main-item">
                                            <h5>BÀI VIẾT LIÊN QUAN</h5>
                                        </div>
                                        <div className="row">
                                            {
                                                similars.length > 0 ? (
                                                    similars.map(item => {
                                                        return (
                                                            <div className="col-lg-4 col-sm-12" key={item.id}>
                                                                <div className="main-bottom">
                                                                    <Link to={`/bai-viet/${item.slug}`}>
                                                                        <img src={item.image} alt="" />
                                                                    </Link>
                                                                    <Link to={`/bai-viet/${item.slug}`}>
                                                                        {item.title}
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                ) : null
                                            }
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                        <Sidebar title="ĐỌC NHIỀU NHẤT" />
                    </div>
                </div>
            </div>
        </>
    )
}
