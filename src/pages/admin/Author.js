import React, { useEffect, useState } from 'react'
import { Button, Divider, message, Space } from 'antd';
import { EditOutlined, PlusOutlined, EyeFilled } from '@ant-design/icons';
import { Table } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import BreadCrumd from 'components/admin/breadcrumb/BreadCrumd';
import axios from 'axios';
import CommonForm from 'components/admin/form/CommonForm';

export default function Author() {
  const columns = [
    {
      title: 'Tên',
      dataIndex: 'name',
      sorter: {
        compare: (a, b) => a.name - b.name,
        multiple: 1,
      },
      hide: false
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdDate',
      sorter: {
        compare: (a, b) => a.createdDate - b.createdDate,
        multiple: 1,
      },
      hide: true
    },
    {
      title: 'Ngày cập nhật',
      dataIndex: 'updatedDate',
      sorter: {
        compare: (a, b) => a.updatedDate - b.updatedDate,
        multiple: 1,
      },
      hide: true
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
      render: (item) => <div key={item.id}>
        <Button danger onClick={() => handleDelete(item.id)} shape="round" icon={<EyeFilled />}></Button>,
        <Divider type='vertical' />
        <Button type="primary" onClick={() => handleFetchItem(item.id)} shape="round" icon={<EditOutlined />}></Button>
      </div>,
      hide: true
    },
  ];

  const [data, setData] = useState([]);
  const [item, setItem] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const onOpenModal = () => {
    setOpenModal(true);
  }

  const onCloseModal = () => {
    setOpenModal(false);
    setItem({})
  }

  useEffect(() => {
    fetchCategoryList();
  }, [])

  async function fetchCategoryList() {
    setLoading(true);
    try {
      const response = await axios.get('/api/post/author');
      setData(response.data.map(item => {
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

  const handleFetchItem = async (id) => {
    try {
      const res = await axios.get(`/api/post/author/${id}`);
      setItem(res.data)
      onOpenModal();
    } catch (err) {
      message.error(err.response.data.message)
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const res = await axios.delete(`/api/post/author/${id}`);
      fetchCategoryList();
      message.success(res.data.message)
      setLoading(false);
    } catch (err) {
      message.error(err.response.data.message)
      console.log(err);
    }
  };

  const handleSubmit = async (item) => {
    if (item?.id) {
      try {
        const res = await axios.put(`/api/post/author/${item.id}`, item);
        fetchCategoryList();
        message.success(res.data.message)
        onCloseModal();
      } catch (err) {
        message.error(err.response.data.message)
        console.log(err);
      }
    } else {
      try {
        const res = await axios.post(`/api/post/author`, item);
        fetchCategoryList();
        message.success(res.data.message)
        onCloseModal();
      } catch (err) {
        message.error(err.response.data.message)
        console.log(err);
      }
    }
  };

  return (
    <Content style={{ margin: '0 16px' }}>
      <BreadCrumd title='Tác giả' subtitle='Danh sách' />
      <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
        <Space direction="horizontal" style={{ width: '100%', justifyContent: 'left' }}>
          <Button type="primary" htmlType="submit" icon={<PlusOutlined />} onClick={onOpenModal}>
            Thêm tác giả
          </Button>
        </Space>
        <Divider />
        <Table loading={loading} columns={columns} dataSource={data} />
        <CommonForm fields={columns} item={item} openModal={openModal} handleSubmit={handleSubmit} onCloseModal={onCloseModal} />
      </div>
    </Content>

  )
}
