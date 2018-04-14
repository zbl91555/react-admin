import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Layout, Menu, Icon, Button, Modal, Spin } from 'antd'
import menuConfig from '../../contants/menuConfig'
import { observer, inject } from 'mobx-react'
import './index.scss'
const { Sider, Header, Content } = Layout
const MenuItem = Menu.Item
const SubMenu = Menu.SubMenu

@inject('store')
@observer
@withRouter
export default class LayoutComponent extends Component {
  constructor(props) {
    super(props)
    const { location } = this.props.history
    this.state = {
      collapsed: false,
      selectedKeys: [location.pathname],
      openKeys: [
        location.pathname.match(/^\/\w+/) &&
          location.pathname.match(/^\/\w+/)[0]
      ]
    }
  }

  componentWillReceiveProps(nextProps) {
    this.handleHistoryChange(nextProps)
  }

  handleHistoryChange = nextProps => {
    const { location } = nextProps.history
    if (location.pathname !== this.props.location.pathname) {
      this.setState({
        selectedKeys: [location.pathname],
        openKeys: [
          location.pathname.match(/^\/\w+/) &&
            location.pathname.match(/^\/\w+/)[0]
        ]
      })
    }
  }

  handleMenuSelect = ({ key }) => {
    this.props.history.push(key)
  }

  collapseMenu = () => {
    this.setState(prevState => ({
      collapsed: !prevState.collapsed
    }))
  }
  logout = () => {
    const ref = Modal.confirm({
      title: '退出登陆',
      content: '确定要退出登陆吗？',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        window.sessionStorage.clear()
        window.location.reload()
        ref.destroy()
      }
    })
  }
  render() {
    const { selectedKeys, openKeys, collapsed } = this.state
    return (
      <div className="layout-container">
        <Layout className="header-layout">
          <Header className="header">
            <Button
              onClick={this.collapseMenu}
              className="toggle-collapsed-btn"
              icon={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
            />
            <div className="title">
              道路救援管理系统 &nbsp;<Icon type="car" />
            </div>
            <Button
              className="login-out-btn"
              icon="logout"
              onClick={this.logout}
            />
          </Header>
        </Layout>
        <div className="content-container">
          <Layout className="sider-layout">
            <Sider
              collapsed={collapsed}
              style={{ background: '#fff' }}
              width={212}
              collapsedWidth="0"
            >
              <Menu
                mode="inline"
                defaultOpenKeys={openKeys}
                selectedKeys={selectedKeys}
                onSelect={this.handleMenuSelect}
              >
                {menuConfig.map(subMenu => (
                  <SubMenu
                    key={subMenu.path}
                    title={
                      <span>
                        <Icon type={subMenu.icon} />
                        <span>{subMenu.title}</span>
                      </span>
                    }
                  >
                    {subMenu.children.map(menu => (
                      <MenuItem key={menu.path}>
                        <Icon type={menu.icon} />
                        {menu.title}
                      </MenuItem>
                    ))}
                  </SubMenu>
                ))}
              </Menu>
            </Sider>
          </Layout>
          <Layout className="content-layout">
            <Spin
              delay="300"
              size="large"
              tip="加载中"
              spinning={this.props.store.loading}
            >
              <Content className="content">{this.props.children}</Content>
            </Spin>
          </Layout>
        </div>
      </div>
    )
  }
}
