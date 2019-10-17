import React from "react";
import { Drawer, List, Avatar, Divider, Col, Row, Icon, Skeleton } from "antd";
import "./index.less";
import { API_SERVER } from "constant/apis";
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
    currUser: {
      nickName: "Hytonight云息",
      area: "浙江 杭州 仓前"
    },
    loading: true
  };

  async componentDidMount() {
    // this.setState({ loading: true });
    await this.action.listServFile();
    this.setState({ loading: false });
  }

  getContainer = () => {
    return this.state.container;
  };

  saveContainer = (container) => {
    console.log(container);
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
    const { currUser } = this.state;
    const files = toJS(this.store.servFileList) || [];

    return (
      <div className='g-serv' ref={this.saveContainer}>
        <div className="user-wrap card-shadow">
          <Skeleton active loading={this.state.loading}>
            <div className="avatar">
              <img src="https://picsum.photos/64/64" alt=""/>
            </div>
            <div className="info">
              <div className="username">{currUser.nickName}</div>

              <div className="area"><span>地区: {currUser.area}</span></div>
            </div>
          </Skeleton>
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
              files.map((item) => (
                <div className="m-plan-file">
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
