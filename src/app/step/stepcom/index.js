import React from 'react'
import { observer, inject } from 'mobx-react'
import { Input,Tabs,Form,Button,DatePicker,Select,InputNumber,Modal, message, Skeleton } from 'antd';
import './index.less'
import moment  from 'moment'
import { toJS } from 'mobx'


class Stepcom extends React.Component {
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
    return (
      <div className='g-stepcom'>
        g-stepcom
      </div>
    )
  }
}


export default Stepcom