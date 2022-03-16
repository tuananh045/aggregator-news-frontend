import React from 'react'
import { Link } from 'react-router-dom'

export default function Post({ data }) {
    return (
        <div className="news-item" style={{ paddingTop: '20px' }}>
            <span>BÀI VIẾT</span>
            <p></p>
            <div className="row" style={{ paddingBottom: '20px', borderBottom: '1px solid #eee' }}>
                <div className="col-lg-8 col-md-6">
                    <div className="title">
                        <Link to={`/bai-viet/${data[0]?.slug}`}>{data[0]?.title}</Link>
                    </div>
                    <div className="news-item-left">
                        <Link to={`/bai-viet/${data[0]?.slug}`}>
                            <img src={data[0]?.image} alt="" />
                        </Link>
                        <div className='short_home' dangerouslySetInnerHTML={{ __html: data[0]?.content }}></div>
                    </div>
                </div>
                <div className="col-lg-4 col-sm-12">
                    {
                        data.slice(1, 3).map(item => {
                            return (
                                <div className="news-item-right" key={item.id}>
                                    <Link to={`/bai-viet/${item?.slug}`}>
                                        <img src={item?.image} alt="" />
                                    </Link>
                                    <Link to={`/bai-viet/${item?.slug}`}>
                                        {item?.title}
                                    </Link>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className="row">
                {
                    data.slice(3).map(item => {
                        return (
                            <div className="col-sm-12 col-lg-4 w-100" key={item.id}>
                                <div className="news-bottom w-100" style={{ paddingTop: '10px' }}>
                                    <Link to={`/bai-viet/${item?.slug}`}>
                                        {item?.title}
                                    </Link>
                                    <div className='short_home' dangerouslySetInnerHTML={{ __html: item?.content }}></div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
