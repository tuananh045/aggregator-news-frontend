import { Content } from 'antd/lib/layout/layout'
import { Button, Divider, message, Table } from 'antd';
import { EyeFilled, EditOutlined } from '@ant-design/icons';
import BreadCrumd from 'components/admin/breadcrumb/BreadCrumd'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Posts(props) {
  const columns = [
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdDate',
      sorter: (a, b) => a.createdDate.localeCompare(b.createdDate),
    },
    {
      title: 'Tác giả',
      dataIndex: 'author_name',
      sorter: (a, b) => a.author_name.localeCompare(b.author_name),
    },
    {
      title: 'Danh mục',
      dataIndex: 'category_name',
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
        <Button danger onClick={() => handleDelete(item.id)} shape="round" icon={<EyeFilled />}></Button>
        <Divider type='vertical' />
        <Link to={`/admin/post/update/${item.id}`}>
          <Button type="primary" shape="round" icon={<EditOutlined />}></Button>
        </Link>
      </>,
    },
  ];
  // const [pagination, setPagination] = useState({
  //   current: 1,
  //   pageSize: 10,
  // })
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPostList();
  }, [])

  async function fetchPostList() {
    setLoading(true);
    try {
      const response = await axios.get('/api/post');
      setData(response.data.content.map((item) => {
        return {
          ...item,
          key: item.id
        }
      }));
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const res = await axios.delete(`/api/post/delete/${id}`);
      fetchPostList();
      message.success(res.data.message);
      setLoading(false);
    } catch (err) {
      message.error(err.response.data.message)
      console.log(err);
    }
  };

  return (
    <Content style={{ margin: '0 16px' }}>
      <BreadCrumd title='Bài viết' subtitle='Danh sách' />
      <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
        <Table
          columns={columns}
          dataSource={data}
          loading={loading}
          expandable={{
            expandedRowRender: record => <div dangerouslySetInnerHTML={{ __html: record.content }} style={{ margin: 0 }}></div>,
            rowExpandable: record => record.name !== 'Not Expandable',
          }}
        />
      </div>
    </Content>
  )
}
