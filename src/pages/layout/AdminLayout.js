import { useState } from 'react';
import Routers from "./Routers";
import { Layout, Menu } from 'antd';
import {
  MenuOutlined,
  PieChartOutlined,
  LineChartOutlined,
  EditOutlined,
  TagOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from 'redux/actions/AuthActions';

const { Header, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function AdminLayout(props) {

  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = collapsed => {
    setCollapsed(collapsed);
  };

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            <span>Dashboard</span>
            <Link to="/admin/dashboard" />
          </Menu.Item>
          <Menu.Item key="2" icon={<MenuOutlined />}>
            <span>Danh mục</span>
            <Link to="/admin/categories" />
          </Menu.Item>
          <Menu.Item key="3" icon={<TagOutlined />}>
            <span>Tags</span>
            <Link to="/admin/tags" />
          </Menu.Item>
          <Menu.Item key="8" icon={<UserOutlined />}>
            <span>Tác giả</span>
            <Link to="/admin/authors" />
          </Menu.Item>
          <SubMenu key="sub1" icon={<LineChartOutlined />} title="Tin tức">
            <Menu.Item key="4">
              Danh sách
              <Link to="/admin/news" />
            </Menu.Item>
            <Menu.Item key="5">
              Thêm tin tức
              <Link to="/admin/news/add" />
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<EditOutlined />} title="Bài viết">
            <Menu.Item key="6">
              Danh sách
              <Link to="/admin/posts" />
              </Menu.Item>
            <Menu.Item key="7">
              Thêm bài viết
              <Link to="/admin/post/add" />
              </Menu.Item>
          </SubMenu>
          <Menu.Item key="10" icon={<PieChartOutlined />}>
            <span>Đăng xuất</span>
            <Link to="#" onClick={handleLogout} />
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Routers />
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>

  );
}

export default AdminLayout;