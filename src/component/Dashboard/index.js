import React from 'react'
import { Layout, Row, Col,Drawer, Dropdown, Icon, Menu, Avatar, BackTop,Button } from 'antd'
const { Header, Content, Footer } = Layout;
import { NavLink } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

import { MENU_MAIN }  from 'constant/data'
import './index.less'
import IMG_KY from './keyboard.svg'

@inject('mainActions', 'mainStore')
@observer
class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      menu: ['','','']
    }
  }

  hideMenu = (e)=>{
    this.setState({
      menu: ['','','']
    })
  }

  showMenu = (index,e)=>{
    e.stopPropagation()
    let menu = ['','','']
    menu[index] = 'fn-show'
    this.setState({
      menu: menu
    })
  }

  render() {
    let { menu } = this.state

    return (
      <div className="g-index" onClick={this.hideMenu}>
        <div className="g-content">
          {this.props.children}
        </div>
        <div className="g-menu">
          <div className='m-menu m-menu-top'>
            <img src={IMG_KY} alt=""/>
          </div>
          {MENU_MAIN.map((item,j)=>
            <div className='m-menu' key={j}  onClick={this.showMenu.bind(this,j)}>
              <span>{item.title}</span>
              <div  className={`m-menu-cnt ${menu[j]}`}>
                {(item.submenu)&& item.submenu.map((subitem,i)=>
                  <div className="m-submenu" key={i}>{subitem.title}</div>
                )} 
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default Dashboard
