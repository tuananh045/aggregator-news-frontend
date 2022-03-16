import React, { useEffect, useState } from 'react'
import Sidebar from 'components/sidebar/Sidebar'
import axios from 'axios';
import Loading from 'components/loading/Loading';
import News from 'components/news/News';
import Post from 'components/news/Post';
export default function Home() {

  const [latestNews, setLatestNews] = useState([]);
  const [breakingNews, setBreakingNews] = useState([]);
  const [worldNews, setWorldNews] = useState([]);
  const [businessNews, setBusinessNews] = useState([]);
  const [educationNews, setEducationNews] = useState([]);
  const [scienceNews, setScienceNews] = useState([]);
  const [entertainmentNews, setEntertainmentNews] = useState([]);
  const [sportNews, setSportNews] = useState([]);
  const [healthNews, setHealthNews] = useState([]);
  const [latestPost, setLatestPost] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchLatestNews(), fetchBreakingNews(), fetchWorldNews(),
    fetchBusinessNews(), fetchScienceNews(), fetchEntertainmentNews(),
    fetchSportNews(), fetchHealthNews(), fetchLatestPost(), fetchEducationNews()
    ])
  }, [])

  async function fetchLatestNews() {
    setLoading(true);
    try {
      const response = await axios.get(`/api/news/article/the-gioi?limit=6`);
      setLatestNews(response.data.content);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchBreakingNews() {
    setLoading(true);
    try {
      const response = await axios.get(`/api/news/article/thoi-su?limit=6`);
      setBreakingNews(response.data.content);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchWorldNews() {
    setLoading(true);
    try {
      const response = await axios.get(`/api/news/article/the-gioi?limit=6&page=2`);
      setWorldNews(response.data.content);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchBusinessNews() {
    setLoading(true);
    try {
      const response = await axios.get(`/api/news/article/kinh-doanh?limit=6`);
      setBusinessNews(response.data.content);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }
  async function fetchEducationNews() {
    setLoading(true);
    try {
      const response = await axios.get(`/api/news/article/giao-duc?limit=6`);
      setEducationNews(response.data.content);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }
  async function fetchScienceNews() {
    setLoading(true);
    try {
      const response = await axios.get(`/api/news/article/khoa-hoc?limit=6`);
      setScienceNews(response.data.content);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }
  async function fetchEntertainmentNews() {
    setLoading(true);
    try {
      const response = await axios.get(`/api/news/article/giai-tri?limit=6`);
      setEntertainmentNews(response.data.content);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }
  async function fetchSportNews() {
    setLoading(true);
    try {
      const response = await axios.get(`/api/news/article/the-thao?limit=6`);
      setSportNews(response.data.content);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }
  async function fetchHealthNews() {
    setLoading(true);
    try {
      const response = await axios.get(`/api/news/article/suc-khoe?limit=6`);
      setHealthNews(response.data.content);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchLatestPost() {
    setLoading(true);
    try {
      const response = await axios.get(`/api/post?limit=6`);
      setLatestPost(response.data.content);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container">
      <div className="news w-100">
        {
          loading ? <Loading /> : (
            <div className="row">
              <div className="col-lg-8 col-sm-12">
                {/* Mới nhất (trang chủ) */}
                <div className="row">
                  <div className="col-sm-12 col-lg-8">
                    <div className="news-top">
                      <a href={latestNews[0]?.url} target='_blank' rel="noreferrer" >
                        <img src={latestNews[0]?.image} alt="" />
                      </a>
                      <a href={latestNews[0]?.url} target='_blank' rel="noreferrer" style={{ textDecoration: 'none' }}>
                        <h3>{latestNews[0]?.title}</h3>
                      </a>
                      <p>
                        {latestNews[0]?.short_description}
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6" style={{ paddingLeft: 0 }}>
                    {
                      latestNews.slice(1).map((item) => {
                        return (
                          <div className="news-top-right" key={item.id}>
                            <a href={item.url} target='_blank' rel="noreferrer">
                              <img src={item.image} alt="" />
                            </a>
                            <a href={item.url} target='_blank' rel="noreferrer">{item.title}</a>
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
                {/* End mới nhất */}

                {/* Mới nhất Theo danh mục */}
                <div>
                  <News data={breakingNews} title='THỜI SỰ' />
                  <News data={worldNews} title='THẾ GIỚI' />
                  <News data={businessNews} title='KINH DOANH' />
                  <News data={educationNews} title='GIÁO DỤC' />
                  <News data={scienceNews} title='KHOA HỌC' />
                  <News data={entertainmentNews} title='GIẢI TRÍ' />
                  <News data={sportNews} title='THỂ THAO' />
                  <News data={healthNews} title='SỨC KHOẺ' />
                  <Post data={latestPost} />
                </div>

                {/* End mới nhất theo dnah mục */}

              </div>
              <Sidebar title="ĐỌC NHIỀU NHẤT" />
            </div>
          )
        }
      </div>
    </div>
  )
}
