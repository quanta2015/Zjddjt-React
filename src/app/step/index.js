import React from 'react'
import { observer, inject } from 'mobx-react'
import { Input,Tabs,Form,Button,DatePicker,Select,InputNumber,Modal, message, Skeleton } from 'antd';
import './index.less'
import moment  from 'moment'
import { toJS } from 'mobx'


@Form.create()
@inject('mainActions', 'mainStore')
@observer
class Step extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='g-step'>
        Intr
      </div>
    )
  }
}


export default Step