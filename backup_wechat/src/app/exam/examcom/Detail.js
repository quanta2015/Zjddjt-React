import React from "react";
import { Tag } from "antd";

export default class Detail extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    showMore: false
  };

  toggleShowMore = () => {
    this.setState({
      showMore: !this.state.showMore
    });
  };

  render() {
    const { item } = this.props;

    return (
      <div className='m-layout-wrap'>
        {
          this.state.showMore ?
            (
              <div className='m-detail shadow'>
                <div className="m-info">
                  <div className="m-name">{item.name}</div>
                  <div className="m-img">
                    <img src={item.img}/>
                  </div>
                  <div className="m-detail-content">
                    <Tag color='red'>类型</Tag>
                    {item.intr}
                  </div>
                  <div className="m-detail-content">
                    <Tag color='red'>说明</Tag>
                    {item.detail}
                  </div>
                  <div className="m-area" onClick={this.toggleShowMore}>
                    <span className="m-btn c-blue">关闭</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="m-brief shadow">
                <div className="m-img">
                  <img src={item.img}/>
                </div>
                <div className="m-info">
                  <div className="m-name">{item.name}</div>
                  <div className="m-area" onClick={this.toggleShowMore}>
                    <span className="m-btn c-blue">详情</span>
                  </div>
                </div>
              </div>
            )
        }
      </div>
    );
  }
}
