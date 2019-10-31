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

  // ios 设备执行如下函数才能激活 active 伪类
  componentDidMount() {
    document.body.addEventListener('touchstart', function () { });
  }

  // 显示二级菜单
  showMenu = (index, ele) => {
    ele.stopPropagation()

    let menu = ['', '', '']
    menu[index] = 'fn-show menu-slide-in'
    this.setState({menu})
  }

  // 隐藏二级菜单
  hideMenu = (menu) => {
    // console.log(menu)
    let newMenu = menu.map((item) => {
      return item.length > 0 ? 'fn-show menu-slide-out' : ''
    })
    this.setState({
      menu: newMenu
    })
  }

  doLink = (link) =>{
    // let openid = 'oMQQY1HIEcLlk0_fC81KaDiys79s'
    // window.location.replace(`/#${link}?code=${openid}`)

    if (link==='/hist'){
      window.location.replace(`https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzU1ODM0MzcyOQ==#wechat_redirect`)
    }else{
      window.location.replace(`/#${link}`)
    }
    
  }

  render() {
    let { menu } = this.state

    return (
      <div className="g-index" onClick={this.hideMenu.bind(this, menu)}>
        <div className="g-content">
          {this.props.children}
        </div>
        <div className="g-menu">
          <div className='m-menu m-menu-top'>
            <img src={IMG_KY} alt=""/>
          </div>
          {MENU_MAIN.map((item,j)=>
            <div className='m-menu' key={j}  onClick={this.showMenu.bind(this,j)}>
              <span><img className='m-menu-more' src={ICON_MORE} alt=""/>{item.title}</span>
            </div>
          )}
        </div>
        <div className="g-menu-wrap">
          <div className="m-menu m-menu-top"></div>
          {MENU_MAIN.map((item,j)=>
            <div className='m-menu' key={j}>
              <div  className={`m-menu-cnt ${menu[j]}`}>
                {(item.submenu)&& item.submenu.map((subitem,i)=>
                  <div className="m-submenu" key={i}>
                    <div className="m-link" onClick={this.doLink.bind(this,subitem.path)}>
                    <span>{subitem.title}</span>

                    </div>
                  </div>
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
