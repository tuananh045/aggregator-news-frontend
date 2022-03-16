import React, { useEffect, useState } from 'react'
import { Button, Divider, message, Space } from 'antd';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import BreadCrumd from 'components/admin/breadcrumb/BreadCrumd';
import axios from 'axios';
import CommonForm from 'components/admin/form/CommonForm';

export default function Tags() {
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
        title: 'Slug',
        dataIndex: 'slug',
        sorter: {
          compare: (a, b) => a.slug - b.slug,
          multiple: 1,
        },
        hide: true
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
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (item) => <div key={item.id}>
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
    fetchTagList();
  }, [])

  async function fetchTagList() {
    setLoading(true);
    try {
      const response = await axios.get('/api/news/tag');
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
  }

  const handleFetchItem = async (id) => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/news/tag/${id}`);
      setItem(res.data)
      onOpenModal();
      setLoading(false);
    } catch (err) {
      message.error(err.response.data.message)
      console.log(err);
    }
  };

  const handleSubmit = async (item) => {
    if (item?.id) {
      try {
        const res = await axios.put(`/api/news/tag/${item.id}`, item);
        fetchTagList();
        message.success(res.data.message)
        onCloseModal();
      } catch (err) {
        message.error(err.response.data.message)
        console.log(err);
      }
    } else {
      try {
        const res = await axios.post(`/api/news/tag`, item);
        fetchTagList();
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
      <BreadCrumd title='Tags' subtitle='Danh sách' />
      <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
        <Space direction="horizontal" style={{ width: '100%', justifyContent: 'left' }}>
          <Button type="primary" htmlType="submit" icon={<PlusOutlined />} onClick={onOpenModal}>
            Thêm tags
          </Button>
        </Space>
        <Divider />
        <Table loading={loading} columns={columns} dataSource={data} />
        <CommonForm fields={columns} item={item} openModal={openModal} handleSubmit={handleSubmit} onCloseModal={onCloseModal} />
      </div>
    </Content>

  )
}
