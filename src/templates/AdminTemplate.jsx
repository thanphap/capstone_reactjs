import React, { useEffect, useState } from 'react'
import { Fragment } from 'react'
import { Route } from 'react-router-dom'
import { DesktopOutlined, FileOutlined, UserOutlined, } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
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
  getItem('Quản lý', '1', <DesktopOutlined />),
  getItem('Tài khoản', 'sub1', <UserOutlined />, [
    getItem('Tom', '2'),
    getItem('Bill', '3'),
    getItem('Alex', '4'),
  ]),
  getItem('Quản lý phim', 'sub2', <FileOutlined />, [getItem('Phim', '5'), getItem('Thêm mới', '6')]),
];
export const AdminTemplate = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  return <Route exact path={props.path} render={(propsRouter) => {
    return <Fragment>
      <Layout style={{ minHeight: '100vh', }}>
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0, }} />
          <Content style={{ margin: '0 16px', }}>
          <props.component {...propsRouter} />
          </Content>
          <Footer style={{ textAlign: 'center', }} >
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </Fragment>
  }} />
}