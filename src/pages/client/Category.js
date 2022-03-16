import React, { useEffect, useState } from 'react'
import BreadCrumb from 'components/breadcrumb/BreadCrumb'
import Sidebar from 'components/sidebar/Sidebar'
import axios from 'axios';
import { Link, useLocation, useParams } from 'react-router-dom';
import Loading from 'components/loading/Loading';
import Pagination from 'components/pagination/Pagination';

const LIMIT = 18;

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default function Category() {

  const params = useParams();
  const [data, setData] = useState([]);
  const [totalElements, setTotalElements] = useState([]);
  const [loading, setLoading] = useState(true);
  // const page = params.page ? params.page : 1;
  // const keyword = params.keyword ? params.keyword : '';
  const category = params.category ? params.category : '';

  let query = useQuery();
  const page = query.get('page') ? query.get('page') : 0;


  useEffect(() => {
    async function fetchNewsList() {
      setLoading(true);
      const search = {};
      search.page = page;
      search.keyword = '';
      search.category = category;
      if (category === 'bai-viet') {
        try {
          const response = await axios.get(`/api/post?page=${page}&limit=${LIMIT}`);
          setData(response.data.content);
          setTotalElements(response.data.totalElements)
          setLoading(false);
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          const response = await axios.get(`/api/news/article/${category}?page=${page}&limit=${LIMIT}`);
          setData(response.data.content);
          setTotalElements(response.data.totalElements)
          setLoading(false);
        } catch (error) {
          console.log(error);
        }
      }
    }
    fetchNewsList();
  }, [category, page])

  return (
    <>
      <BreadCrumb title={data[0]?.category_name} />
      <div className="container news-category">
        <div className="news w-100">
          <div className="row">
            {
              loading ? <Loading /> : (
                <div className="col-lg-8 col-sm-12">
                  <div className="news-top w-100">
                    {
                      category === 'bai-viet' ? (
                        <>
                          <Link to={`/bai-viet/${data[0].slug}`}>
                            <img src={data[0].image} alt="" />
                          </Link>
                          <div className="news-top-item w-100">
                            <Link to={`/bai-viet/${data[0].slug}`}>{data[0].title}</Link>
                            <div className='short_content' dangerouslySetInnerHTML={{ __html: data[0].content }}></div>
                          </div>
                        </>
                      ) : (
                        <>
                          <a href={data[0].url} target='_blank' style={{ textDecoration: 'none' }} rel="noreferrer">
                            <img src={data[0].image} alt="" />
                          </a>
                          <div className="news-top-item w-100">
                            <a href={data[0].url} target='_blank' rel="noreferrer">{data[0].title}</a>
                            <p>{data[0].short_description}</p>
                          </div>
                        </>
                      )
                    }
                  </div>
                  <div className="row">
                    {
                      data?.slice(1, 4).map((item) => {
                        return (
                          <div className="col-sm-12 col-lg-4 w-100" key={item.id}>
                            <div className="news-bottom w-100">
                              {
                                category === 'bai-viet' ? (
                                  <>
                                    <Link to={`/bai-viet/${item.slug}`}>
                                      {item.title}
                                    </Link>
                                    <div className='short_content' dangerouslySetInnerHTML={{ __html: item.content }}></div>
                                  </>
                                ) : (
                                  <>
                                    <a href={item.url} target='_blank' rel="noreferrer">
                                      {item.title}
                                    </a>
                                    <p>{item.short_description}</p>
                                  </>
                                )
                              }
                            </div>
                          </div>
                        )
                      })
                    }
                  </div>
                  <div className="news-border" />
                  {
                    data?.slice(4).map((item) => {
                      return (
                        <div className="news-main" key={item.id}>
                          {
                            category === 'bai-viet' ? (
                              <Link to={`/bai-viet/${item.slug}`}>
                                <img src={item.image} alt="" />
                              </Link>
                            ) : (
                              <a href={item.url} target='_blank' style={{ textDecoration: 'none' }} rel="noreferrer">
                                <img src={item.image} alt="" />
                              </a>
                            )
                          }
                          <div className="news-main-item">
                            {
                              category === 'bai-viet' ? (
                                <>
                                  <Link to={`/bai-viet/${item.slug}`}>
                                    {item.title}
                                  </Link>
                                  <div className='short' dangerouslySetInnerHTML={{ __html: item.content }}></div>
                                </>
                              ) : (
                                <>
                                  <a href={item.url} target='_blank' style={{ textDecoration: 'none' }} rel="noreferrer">{item.title}</a>
                                  <p className='short'>{item.short_description}</p>
                                </>
                              )
                            }

                          </div>
                        </div>
                      )
                    })
                  }

                  <div className="pages">
                    <nav aria-label="Page navigation example">
                      <Pagination totalRows={totalElements} page={page ? page : 1} limit={LIMIT} />
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
