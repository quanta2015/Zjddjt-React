import React from "react";
import { Drawer, List, Avatar, Divider, Col, Row, Icon, Skeleton, message } from "antd";
import "./index.less";
import { API_SERVER } from "constant/apis";
import { initCode } from "util/openid";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";

// 用户服务
@inject("servActions", "servStore")
@observer
class Serv extends React.Component {
  action = this.props.servActions;
  store = this.props.servStore;
  state = {
    visible: false,
    container: null,
    loading: true
  };

  async componentDidMount() {
    // this.setState({ loading: true });
    let openid = initCode(this.props.location.search);
    let hasUser = await this.action.getUser(openid.code);
    if (hasUser && hasUser.errcode) {
      message.error(hasUser.errmsg, 0.5);
    }
    await this.action.listServFile();
    this.setState({ loading: false });
  }

  getContainer = () => {
    return this.state.container;
  };

  saveContainer = (container) => {
    this.setState({ container });
  };

  constructor(props) {
    super(props);
  }

  showDrawer = () => {
    this.setState({
      visible: true
    });
  };

  onClose = () => {
    this.setState({
      visible: false
    });
  };

  render() {
    const currUser = toJS(this.store.currUser) || {};
    const files = toJS(this.store.servFileList) || [];

    return (
      <div className='g-serv' ref={this.saveContainer}>

        <div className="user-wrap card-shadow">
          {
            Object.getOwnPropertyNames(currUser).length === 0 ?
              <div className='no-login'>尚未登录</div>
              :
              <Skeleton active loading={this.state.loading}>
                <div className="avatar">
                  <img src={currUser.headimgurl} style={{ width: 64 }} alt=""/>
                </div>
                <div className="info">
                  <div className="username">{currUser.nickname}</div>
                  <div className="area"><span>地区: {`${currUser.country} ${currUser.province} ${currUser.city}`}</span>
                  </div>
                </div>
              </Skeleton>
          }
        </div>

        <div className="file-wrap card-shadow" onClick={this.showDrawer}>
          <span><Icon type="download"/>常用文件模板</span>
        </div>

        <Drawer
          title="常用文件模板"
          placement="right"
          className='serv-drawer'
          width='100vw'
          closable={true}
          onClose={this.onClose}
          visible={this.state.visible}
          getContainer={false}
        >

          <div className='file-card'>
            {
              files.map((item, index) => (
                <div className="m-plan-file" key={`file-${index}`}>
                  <a href={`${API_SERVER}/${item.url}`} target="_blank"
                     className="m-file-item">
                    <p>{item.name}</p>
                  </a>
                </div>
              ))
            }
          </div>
        </Drawer>

      </div>
    );
  }
}


export default Serv;
