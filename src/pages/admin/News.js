import React, { useCallback, useEffect, useState } from 'react'
import { Button, Divider, message, Form, Select } from 'antd';
import { EyeFilled, EyeInvisibleOutlined, SearchOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import BreadCrumd from 'components/admin/breadcrumb/BreadCrumd';
import axios from 'axios';
import { generatePath, useLocation, useNavigate } from 'react-router-dom';

const { Option } = Select;

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

export default function News() {

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
      title: 'Danh mục',
      dataIndex: 'category_name',
      sorter: (a, b) => a.category_name.localeCompare(b.category_name),
    },
    {
      title: 'Nguồn',
      dataIndex: 'source_name',
      sorter: (a, b) => a.source_name.localeCompare(b.source_name),
    },
    {
      title: 'Link',
      dataIndex: 'url',
      render: (item) =>
        <>
          <a href={item} target='_blank' rel="noreferrer">Link</a>
        </>
    },
    {
      title: 'Trạng thái',
      dataIndex: 'display',
      sorter: {
        compare: (a, b) => a.display - b.display,
        multiple: 1,
      },
      render: ((display) => display === 1 ? 'Hiển thị' : 'Ẩn'),
      hide: true
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (item) => <>
        <Button type='primary' onClick={() => handleDelete(item.id)} icon={item.display === 1 ? <EyeFilled /> : <EyeInvisibleOutlined />}></Button>
      </>,
    },
  ];

  const [data, setData] = useState([]);
  const [state, setState] = useState({
    source: 'vnexpress',
    category: ''
  })
  const [loading, setLoading] = useState(true);

  let query = useQuery();
  const source = query.get('source') ? query.get('source') : ''
  const category = query.get('category') ? query.get('category') : ''

  const navigate = useNavigateParams();

  const navigateHandler = () => {
    navigate("/admin/news", `source=${state.source}&category=${state.category}`);
  };

  const [categories, setCategories] = useState([]);

  async function fetchCategoryList() {
    try {
      const response = await axios.get('/api/news/category');
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchCategoryList()
  }, [])

  useEffect(() => {
    fetchNewsList();
    // eslint-disable-next-line no-use-before-define
  }, [fetchNewsList])

  const fetchNewsList = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/news/article/all?category=${category}&source=${source}`);
      setData(response.data.content.map(item => {
        return {
          ...item,
          key: item.id
        }
      }));
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [category, source]);


  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`/api/news/article/delete/${id}`);
      fetchNewsList();
      message.success(res.data.message)
    } catch (err) {
      message.error(err.response.data.message)
      console.log(err);
    }
  };

  return (
    <Content style={{ margin: '0 16px' }}>
      <BreadCrumd title='Tin tức' subtitle='Danh sách' />
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
            style={{ width: '200px' }}
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
              value={state?.category}
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
          columns={columns}
          dataSource={data}
          expandable={{
            expandedRowRender: record => <p style={{ fontStyle: 'italic', fontSize: '15px', padding: '10px', background: '#eee', margin: 0 }}>{record.short_description}</p>,
            rowExpandable: record => record.name !== 'Not Expandable',
          }}
        />
      </div>
    </Content>
  )
}
