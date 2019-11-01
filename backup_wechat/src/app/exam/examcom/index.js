import React from "react";
import { Skeleton, Tag } from "antd";
import { HOUSE_LAYOUT } from "./assets";
import Detail from "./Detail";
import "./index.less";

class Examcom extends React.Component {

  state = {
    loading: true,
    more: false,
    cur: 0,
  };

  toggleShowMore = (index)=>{
    this.setState({
      more: !this.state.more,
      cur: index,
    });
  }

  render() {
    let {more,cur} = this.state

    return (
      <div className='g-examcom'>
        {!more &&
          <div className="m-list">
            {HOUSE_LAYOUT.map((item, index) => 
              <div className="m-brief shadow" key={index}>
                <div className="m-img">
                  <img src={item.img}/>
                </div>
                <div className="m-info">
                  <div className="m-name">{item.name}</div>
                  <div className="m-area" onClick={this.toggleShowMore.bind(this,index)}>
                    <span className="m-btn c-blue">详情</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        }

        { more && 
          <div className='m-detail shadow'>
            <div className="m-info">
              <div className="m-name">{HOUSE_LAYOUT[cur].name}</div>
              <div className="m-img">
                <img src={HOUSE_LAYOUT[cur].img}/>
              </div>
              <div className="m-detail-content">
                <Tag color='red'>类型</Tag>
                {HOUSE_LAYOUT[cur].intr}
              </div>
              <div className="m-detail-content">
                <Tag color='red'>说明</Tag>
                {HOUSE_LAYOUT[cur].detail}
              </div>
              <div className="m-area" onClick={this.toggleShowMore.bind(this,0)}>
                <span className="m-btn c-blue">关闭</span>
              </div>
            </div>
          </div>
        }
      </div>
    )}
}

export default Examcom;
