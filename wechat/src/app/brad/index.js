import React from "react";
import { observer, inject } from "mobx-react";
import "./index.less";
import { Skeleton, message, Icon, Tag } from "antd";
import { toJS } from "mobx";
import { API_SERVER } from "constant/apis";

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
                      <img src={`${API_SERVER}/${item.icon}`} alt=""/>
                      {console.log(`${API_SERVER}/${item.icon}`)}
                    </div>
                    <div className='title'>
                      {item.name}
                    </div>
                  </div>
<<<<<<< HEAD
                  
=======
                  <div className="m-type">
                    {item.type.split(' ').map((t,i)=> <Tag color='red' key={`tag-${i}`}>{t}</Tag> )}
                  </div>
>>>>>>> 9e6ef5a7a1a84c5c97665d5b5b765613a0e2b479
                  <div className='m-cnt'>
                    <div className="m-person">
                      <Icon type="user" />
                      {item.contact}
                    </div>
                    <div className="m-type">
                      <Icon type="project" />
                      {item.type.split(' ').map((t,i)=> <Tag color='red'>{t}</Tag> )}
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
