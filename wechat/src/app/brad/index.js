import React from "react";
import { observer, inject } from "mobx-react";
import "./index.less";
import { Skeleton, message, Icon, Tag } from "antd";
import { toJS } from "mobx";

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
    
    console.log(list)

    return (
      <div className='g-brad'>
        <Skeleton active loading={this.state.loading}>
          {list && list.map((item, index) => (
              <div className='m-detail-wrap' key={index}>
                <div className="info">
                  <div className="m-tl">
                    <div className='m-logo'>
                      <img src={item.icon} alt=""/>
                    </div>
                    <div className='title'>
                      {item.name}
                    </div>
                  </div>
                  <div className="m-type">
                    {item.type.split(' ').map((t,i)=> <Tag color='red'>{t}</Tag> )}
                  </div>
                  <div className='m-cnt'>
                    <div className="m-person">
                      <Icon type="user" />
                      {item.contact}
                    </div>
                    <div className="m-phone">
                      <Icon type="phone" />
                      <div className="m-phone-list">
                        {item.phone.split(" ").map((p, i) =>
                          <li key={`phone-${i}`}>
                            {p}
                          </li>
                        )}
                      </div>
                    </div>
                  </div>

                  
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
