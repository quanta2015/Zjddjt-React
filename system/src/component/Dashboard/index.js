import React from 'react'
import { Layout, Row, Col,Drawer, Dropdown, Icon, Menu, Avatar, BackTop,Button } from 'antd'
const { Header, Content, Footer } = Layout;
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
      menu: ['','','']
    }
  }

  doLink = (link) =>{
    let openid = '236f13a40693f48434e788411b9'
    window.location.replace(`/#${link}?code=${openid}`)
  }

  render() {
    let { menu } = this.state

    return (
      <div className="g-index">
        <div className="g-content">
          {this.props.children}
        </div>
        <div className="g-menu">
          <div className='m-menu m-menu-top'>
            <img src={IMG_KY} alt=""/>
          </div>
          {MENU_MAIN.map((item,j)=>
            <div className='m-menu' key={j}>
              <span><img className='m-menu-more' src={ICON_MORE} alt=""/>{item.title}</span>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default Dashboard
