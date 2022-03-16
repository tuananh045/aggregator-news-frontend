import React, { useEffect, useState } from 'react'
import { Button, Divider, Select, Form, Space, message } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import BreadCrumd from 'components/admin/breadcrumb/BreadCrumd';
import { useLocation, useNavigate, generatePath } from 'react-router-dom';
import axios from 'axios';
const { Option } = Select;

const columns = [
  {
    title: 'Hình ảnh',
    dataIndex: 'image',
    render: (item) =>
      <>
        <img style={{ width: '200px', height: 'auto' }} src={item} alt='' />
      </>
  },
  {
    title: 'Tiêu đề',
    dataIndex: 'title',
    sorter: (a, b) => a.title.localeCompare(b.title),
  },
  Table.EXPAND_COLUMN,
  {
    title: 'Link',
    dataIndex: 'link',
    render: (item) =>
      <>
        <a href={item} target='_blank' rel="noreferrer">Link</a>
      </>
  },
];

const sources = [
  {
    source: 'VnExpress',
    slug: 'vnexpress'
  },
  {
    source: 'Tuổi Trẻ',
    slug: 'tuoi-tre'
  },
  {
    source: 'Thanh Niên',
    slug: 'thanh-nien'
  },
]

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const useNavigateParams = () => {
  const navigate = useNavigate();

  return (url, params) => {
    const path = generatePath(":url?:queryString", {
      url,
      queryString: params
    });
    navigate(path);
  };
};

export default function AddNews() {

  const [state, setState] = useState({
    source: 'vnexpress',
    category: ''
  })

  let query = useQuery();
  const source = query.get('source') ? query.get('source') : ''
  const category = query.get('category') ? query.get('category') : '';

  const navigate = useNavigateParams();

  const navigateHandler = () => {
    navigate("/admin/news/add", `source=${state.source}&category=${state.category}`);
  };

  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);

  const [newsSelects, setNewsSelects] = useState([]);
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    fetchNewsList();
    fetchCategoryList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, source])

  async function fetchNewsList() {
    setLoading(true);
    try {
      const response = await fetch(`/api/news/rss?source=${source}&category=${category}`);
      const json = await response.json();
      setData(json.items.map(item => {
        return {
          ...item,
          url: item.link,
          key: item.link
        }
      }));
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchCategoryList() {
    try {
      const response = await axios.get('/api/news/category');
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      setNewsSelects(selectedRows);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User',
      name: record.name,
    }),
  };

  // const handleAddNews = async (data) => {
  //   try {
  //     const res = await axios.post(`/api/news/article/add`, data);
  //     message.success(res.data.message)
  //   } catch (err) {
  //     message.error(err.response.data.message)
  //     console.log(err);
  //   }
  // }

  const handleSubmit = async () => {
    setLoading(true);
    const newsSubmit = [...newsSelects];
    for (let i = 0; i < newsSubmit.length; i++) {
      newsSubmit[i].category_slug = category;
      newsSubmit[i].source_slug = source;
      // let formData = new FormData();
      // formData.append('file', newsSubmit[i].image);
      // formData.append('upload_preset', 'rtwfq3oq');
      // formData.append('folder', 'post/');
      // formData.append('tags', 'browser_upload');
      // axios.post('https://api.cloudinary.com/v1_1/huong-news/image/upload', formData)
      //   .then(function (res) {
      //     setLoading(false);
      //     return res.data;
      //   })
      //   .then((result) => {
      //     newsSubmit[i].image = result.url;
      //     handleAddNews(newsSubmit);
      //   })
      //   .catch(function (err) {
      //     console.log(err)
      //   });
    }
    try {
      const res = await axios.post(`/api/news/article/add`, newsSubmit);
      message.success(res.data.message)
      setLoading(false);
      fetchNewsList();
    } catch (err) {
      message.error(err.response.data.message)
      console.log(err);
    }
  };




  return (
    <Content style={{ margin: '0 16px' }}>
      <BreadCrumd title='Tin tức' subtitle='Thêm mới' />
      <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
        <Form layout='inline' name="nest-messages">
          <Form.Item
            label="Nguồn"
            style={{ width: '200px' }}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              name='source'
              showSearch
              placeholder="Source"
              optionFilterProp="children"
              onChange={(value) => setState({
                ...state,
                source: value
              })}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              value={state?.source}
            >
              {
                sources.map((item, index) => {
                  return (
                    <Option key={index} value={item.slug}>{item.source}</Option>
                  )
                })
              }
            </Select>
          </Form.Item>
          <Form.Item
            label="Danh mục"
            style={{ width: '300px' }}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              name='category'
              showSearch
              placeholder="Source"
              optionFilterProp="children"
              onChange={(value) => setState({
                ...state,
                category: value
              })}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              value={state.category ? state.category : category}
            >
              {
                categories.map((item, index) => {
                  return (
                    <Option key={index} value={item.slug}>{item.name}</Option>
                  )
                })
              }
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" onClick={navigateHandler} icon={<SearchOutlined />}>
              Tìm kiếm
            </Button>
          </Form.Item>
        </Form>
        <Divider />
        <Table
          loading={loading}
          rowSelection={{
            type: 'checkbox',
            ...rowSelection,
          }}
          columns={columns}
          dataSource={data}
          expandable={{
            expandedRowRender: record => <p style={{ fontStyle: 'italic', fontSize: '15px', padding: '10px', background: '#eee', margin: 0 }}>{record.short_description}</p>,
            rowExpandable: record => record.name !== 'Not Expandable',
          }}
        />
        <Divider />
        <Space direction="horizontal" style={{ width: '100%', justifyContent: 'center' }}>
          <Button size='large' type="primary" htmlType="submit" onClick={handleSubmit} icon={<PlusOutlined />}>
            Thêm tin tức
          </Button>
        </Space>

      </div>
    </Content>
  )
}
