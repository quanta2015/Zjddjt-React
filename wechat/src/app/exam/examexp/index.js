import React from 'react'
import { observer, inject } from 'mobx-react'
import { Input,Tabs,Form,Button,DatePicker,Tag, Select,InputNumber,Modal, message, Skeleton } from 'antd';
import './index.less'
import moment  from 'moment'
import { toJS } from 'mobx'


// 完成案例
@inject('stepActions', 'stepStore')
@observer
class Stepexp extends React.Component {
  constructor(props) {
    super(props)
    this.action = this.props.stepActions
    this.store  = this.props.stepStore
    this.state = {
      loading: false,
    }
  }

  async UNSAFE_componentWillMount() {
    this.setState({ loading: true })
    await this.action.getEleExample()
    this.setState({ loading: false })
  }

  render() {
    let list = toJS(getValue(this.store, 'example', []))
    
    return (
      <div className='g-stepexp'>
        <Skeleton active loading={this.state.loading}>
          {list.map((item,index)=>
            <div className="m-ele-item" key={index}>
              <div className="m-img">
                <img src={item.img}/>
              </div>
              <div className="m-info">
                <div className="m-name">{item.name}</div>
                <div className="m-area"><Tag color='red'>{item.area}</Tag></div>
                <div className="m-detail">
                  <div className="m-btn c-blue">详情</div>
                </div>
              </div>
            </div>
            )}
        </Skeleton>
      </div>
    )
  }
}


export default Stepexp