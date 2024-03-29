import React from "react";
import { Drawer, List, Avatar, Divider, Col, Row, Icon, Skeleton, message, Input, Select, Spin, Button } from "antd";
import "./index.less";
import { API_SERVER } from "constant/apis";
import { initCode } from "util/openid";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
import debounce from "lodash/debounce";

const { Option } = Select;
const { Search } = Input;

// 用户服务
@inject("servActions", "servStore")
@observer
class Serv extends React.Component {
  action = this.props.servActions;
  store = this.props.servStore;
  state = {
    inputVal: undefined,
    visible: false,
    container: null,
    loading: true,
    quesList: []
  };

  async UNSAFE_componentWillMount() {
    this.setState({ loading: true });
    let openid = initCode(this.props.location.search);
    let hasUser = await this.action.getUser(openid.code);
    if (hasUser && hasUser.errcode) {
      message.error(hasUser.errmsg, 0.5);
    }
    await this.action.listServFile();
    this.setState({ loading: false });
  }

  constructor(props) {
    super(props);
  }

  showDrawer = () => {
    this.setState({
      visible: true
    });
  };

  handleChange = inputVal => {
    this.setState({
      inputVal,
      quesList: [],
      fetching: false
    });
  };

  handleSearch = (value) => {
    if (value === "") {
      value = null;
    }

    this.setState({ quesList: [], fetching: true });
    this.action.servQues({ keyword: value })
      .then(r => {
        if (r && r.code === 200) {
          this.setState({
            quesList: r.data,
            fetching: false
          });
        }
      });
  };

  doLink = (link) => {
    if (link === "/step") {
      window.location.replace(`https://mp.weixin.qq.com/s?__biz=MzU1ODM0MzcyOQ==&mid=2247483703&idx=1&sn=088984a3653d87a8aaa1a4e7ffb03333&chksm=fc26b269cb513b7f8d45ecb8427f28669c6c45d8f4ecba28f1b9c6a751dba237d425bb73edde&token=1031499802&lang=zh_CN#rd`);
    } else if (link === "/hist") {
      window.location.replace(`https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzU1ODM0MzcyOQ==#wechat_redirect`);
    } else {
      window.location.replace(`/#${link}`);
    }
  };

  render() {
    const currUser = toJS(this.store.currUser) || {};
    const files = toJS(this.store.servFileList) || [];
    const { loading, quesList, inputVal } = this.state;

    const options = this.state.quesList.map((item, index) =>
      <Option key={`ques-${index}`} onClick={this.doLink.bind(this, item.path)}>
        <div className='ques-row'>
          <div className='title'>{item.title}</div>
          <div className='des'>{item.des}</div>
          <div className='icon'><Icon type="right"/></div>
        </div>
      </Option>
    );

    const debounceSearch = debounce(this.handleSearch, 800);

    return (
      <div className='g-serv'>

        <div className="user-wrap card-border">
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
                  <div className="area"><span>地区：{`${currUser.province} ${currUser.city}`}</span>
                  </div>
                </div>
              </Skeleton>
          }
        </div>

        <div className="search-wrap card-border">
          <Select
            size={'large'}
            showSearch
            value={inputVal}
            placeholder="请输入您需要咨询解答的关键词"
            defaultActiveFirstOption={false}
            filterOption={false}
            showArrow={true}
            onSearch={debounceSearch}
            onChange={this.handleChange}
            notFoundContent={loading ? <Spin size="small"/> : null}
            suffixIcon={<Icon type="search"/>}
          >
            {options}
          </Select>
        </div>

        <div className="file-wrap card-border" onClick={this.showDrawer}>
          <span className="m-tl"><Icon type="download"/>常用文件模板</span>
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
        </div>

        <Drawer
        >
          <div className='ques-wrap'>
            <Search
              placeholder="输入关键词"
              enterButton="搜索"
              size="large"
              allowClear={true}
              onSearch={this.handleSearch}
            />

            {
              quesList.length === 0 ? null :
                <div className='ques-list'>
                  {quesList.map((item, index) => {
                    return (
                      <div key={`ques-${index}`} className='ques-row' onClick={this.doLink.bind(this, item.path)}>
                        <h1 className='title tag-color'>{item.title}</h1>
                        <Divider className='divider' type="vertical"/>
                        <div className='des'>{item.des}</div>
                        <div className='icon'><Icon type="right"/></div>
                      </div>
                    );
                  })}quesList
                </div>
            }
          </div>
        </Drawer>

      </div>
    );
  }
}


export default Serv;
