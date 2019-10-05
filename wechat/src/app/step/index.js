import React from 'react'
import { observer, inject } from 'mobx-react'
import { Input,Tabs,Form,Button,DatePicker,Select,InputNumber,Modal, message, Skeleton } from 'antd';
import './index.less'
import moment  from 'moment'
import { toJS } from 'mobx'

import StepExp from 'app/step/stepexp'
import StepCom from 'app/step/stepcom'

class Step extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      type: 0
    }
  }

  setType = (type,e)=>{
    this.setState({ type: type })
  }

  render() {
    let { type } = this.state

    return (
      <div className='g-step'>
        <div className='m-step-menu'>
          <Button className="m-type-btn c-blue" onClick={this.setType.bind(this,0)}>完成案例</Button>
          <Button className="m-type-btn c-blue" onClick={this.setType.bind(this,1)}>常见户型</Button>
        </div>
        { (type === 0)? <StepExp/>:<StepCom/> }
      </div>
    )
  }
}


export default Step