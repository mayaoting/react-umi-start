import { Layout, Menu, Breadcrumb } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import React from 'react';
import RightContent from '../components/GlobalHeader/RightContent'
import './index.less'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class SiderDemo extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider 
          breakpoint='lg'
          collapsible collapsed={this.state.collapsed} 
          onCollapse={this.onCollapse}>
          <div className="logo">
            你不会知道这是啥
          </div>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <SubMenu
              key="sub1"
              title={
                <span>
                  <PieChartOutlined />
                  <span>Dashboard</span>
                </span>
              }
            >
              <Menu.Item key="1">分析页</Menu.Item>
              <Menu.Item key="2">监控页</Menu.Item>
              <Menu.Item key="3">工作台</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={
                <span>
                  <TeamOutlined />
                  <span>Team</span>
                </span>
              }
            >
              <Menu.Item key="4">Team 1</Menu.Item>
              <Menu.Item key="5">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="6">
              <FileOutlined />
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} >
            <RightContent/>
          </Header>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              Bill is a cat.
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Base Umi And Ant Design Created by Catherine</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default SiderDemo