import { Layout, Menu, Breadcrumb } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import React from 'react';
import { Link, useIntl, connect } from 'umi';
import RightContent from '../components/GlobalHeader/RightContent'
import './index.less'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class SiderDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }
  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  render() {
    const { children } = this.props;
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider 
          breakpoint='lg'
          collapsible collapsed={this.state.collapsed} 
          onCollapse={this.onCollapse}>
          <div className="logo">
            Shop
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
              <Menu.Item key="1">
                <Link to={'/dashboard/analysis'}>分析页</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to={'/dashboard/monitor'}>监控页</Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to={'/dashboard/workplace'}>工作台</Link>
              </Menu.Item>
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
            <div  style={{ padding: 24, minHeight: 360 }}>
              {children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Base Umi And Ant Design Created by Catherine</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default SiderDemo