import React from 'react'
import { observer, inject } from 'mobx-react'
import { Input,Tabs,Form,Button,DatePicker,Select,InputNumber,Modal, message, Skeleton } from 'antd';
import './index.less'
import moment  from 'moment'
import { toJS } from 'mobx'


@Form.create()
@inject('mainActions', 'mainStore')
@observer
class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      msg:[]
    }
  }

  render() {
    return (
      <div className='g-main'>
            main


      </div>
    )
  }
}


export default Main