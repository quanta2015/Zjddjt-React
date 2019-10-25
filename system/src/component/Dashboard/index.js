import React from 'react'
import { Layout, Row, Col,Drawer, Dropdown, Icon, Menu, Avatar, BackTop,Button } from 'antd'
const { Header, Sider, Content } = Layout;


import { NavLink } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

import { MENU_MAIN }  from 'constant/data'
import './index.less'
import IMG_KY from './keyboard.svg'
import ICON_MORE from './more.svg'

@inject('mainActions', 'mainStore')
@observer
class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      menu: ['','',''],
    }
  }

  doLink = (link) =>{
    let openid = '236f13a40693f48434e788411b9'
    window.location.replace(`/#${link}?code=${openid}`)
  }


  render() {
    let { menu } = this.state

    return (
      <Layout className="g-menu">
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="m-logo">加梯管理系统</div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['0']}>
            {MENU_MAIN.map((item,j)=>
                <Menu.Item key={j}>
                  <NavLink to={item.path} >
                    <Icon type={item.icon} />
                    <span>{item.title}</span>
                  </NavLink>
                </Menu.Item>
            )}
          </Menu>
        </Sider>
        <Layout className="g-content">
          <Content>
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    )
  }
}

export default Dashboard
