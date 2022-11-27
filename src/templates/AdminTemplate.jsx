import React, { useState } from 'react'
import { Fragment } from 'react'
import { Route } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { history } from "../App"
import { FileOutlined, UserOutlined, } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import LogoImg from "../asset/img/logo.svg";
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem('Quản lý tài khoản', 'sub1', <UserOutlined />, [
    getItem('Tài khoản', '/admin/users'),
    getItem('Thêm tài khoản', '/admin/adduser'),
  ]),
  getItem('Quản lý phim', 'sub2', <FileOutlined />, [
    getItem('Phim', '/admin/film'), 
    getItem('Thêm mới', '/admin/addfilm')]),
];
export const AdminTemplate = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  return <Route exact path={props.path} render={(propsRouter) => {
    return <Fragment>
      <Layout style={{ minHeight: '100vh', }}>
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <NavLink className="logo" to="/home"><img src={LogoImg} alt="" /><span className="title_logo">PHIM HAY</span> </NavLink>
          <Menu  onClick={(link) => { 
              history.push(link.key);
           }} theme="dark" defaultSelectedKeys={['/admin/film']} mode="inline" items={items} />
        </Sider>
        <Layout className="site-layout">
          <Header/>
          <Content style={{ margin: '0 16px', }}>
            <props.component {...propsRouter} />
          </Content>
          <Footer style={{ textAlign: 'center', }} >
            Copyright by Q
          </Footer>
        </Layout>
      </Layout>
    </Fragment>
  }} />
}