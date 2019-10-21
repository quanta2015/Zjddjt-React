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
      detail: false,
      cur: 0,
    }
  }

  async UNSAFE_componentWillMount() {
    this.setState({ loading: true })
    await this.action.getEleExample()
    this.setState({ loading: false })
  }

  showDetail = (index)=>{
    this.setState( { detail: true, cur: index})
  }

  closeDetail = (index)=>{
    this.setState( {detail: false })
  }

  render() {
    let list = toJS(getValue(this.store, 'example', []))
    let { detail,cur } = this.state
    console.log(list)
    
    return (
      <div className='g-examexp'>
        <Skeleton active loading={this.state.loading}>
          
          {!detail &&
            <div className="m-list">
            {list.map((item,index)=>
              <div className="m-ele-item" key={index}>
                <div className="m-img">
                  <img src={item.img}/>
                </div>
                <div className="m-info">
                  <div className="m-name">{item.name}</div>
                  <div className="m-area"><Tag color='red'>{item.area}</Tag></div>
                  <div className="m-detail">
                    <div className="m-btn c-blue" onClick={this.showDetail.bind(this,index)}>详情</div>
                  </div>
                </div>
              </div>
              )}
            </div>
          }

          {detail &&
            <div className="m-wrap">
              <div className="m-title">{list[cur].name}</div>
              <div className="m-img">
                <img src={list[cur].img}/>
                <div className="m-area"><Tag color='red'>{list[cur].area}</Tag></div>
              </div>
              <div className="m-info">
                {list[cur].desc.map((item,i)=>
                  <span key={i}>{item}</span>
                  )}
              </div>
              <div className="m-detail">
                  <div className="m-btn c-blue" onClick={this.closeDetail}>关闭</div>
              </div>
            </div>
          }

        </Skeleton>
      </div>
    )
  }
}


export default Stepexp