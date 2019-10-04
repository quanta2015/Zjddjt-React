import React from "react";
import { observer, inject } from "mobx-react";
import Clipboard from "react-clipboard.js";
import "./index.less";
import { Skeleton, message } from "antd";
import { toJS } from "mobx";
import ICON_COPY from "./copy.svg";

@inject("bradActions", "bradStore")
@observer
class Brad extends React.Component {
  constructor(props) {
    super(props);
    this.action = this.props.bradActions;
    this.store = this.props.bradStore;
    this.state = {
      loading: true
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    await this.action.getBrandAll();
    this.setState({ loading: false });
  }

  msgCopy = () => {
    message.success("复制成功", 0.5);
  };

  render() {
    let list = toJS(getValue(this.store.store, "brandAll", []));

    return (
      <div className='g-brad'>
        <Skeleton active loading={this.state.loading}>
          {list && list.map((item, index) => (
              <div className='m-detail-wrap'>
                <div className="info">
                  <div className='title'>{item.name}</div>
                  <div className='content'>
                    <h4>联系人:</h4>
                    {item.contact}</div>
                  <div className='content'>
                    <h4>联系方式:</h4>
                    {item.phone.split(" ").map((p, i) =>
                      <li key={`phone-${i}`}>
                        {p}

                        <Clipboard data-clipboard-text={p} onClick={this.msgCopy}>
                          <img className='icon-copy' src={ICON_COPY} alt=""/>
                        </Clipboard>
                      </li>
                    )
                    }</div>
                  <div className='content'>
                    <h4>可提供电梯类别:</h4>
                    {item.type}
                  </div>
                </div>

                <div className='icon-wrap'>
                  <img src={item.icon} alt=""/>
                </div>
              </div>
            )
          )}
        </Skeleton>
      </div>
    );
  }
}

export default Brad;
