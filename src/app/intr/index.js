import React from 'react'
import { observer, inject } from 'mobx-react'
import { Input,Tabs,Form,Button,DatePicker,Select,InputNumber,Modal, message, Skeleton } from 'antd';
import './index.less'
import moment  from 'moment'
import { toJS } from 'mobx'


@Form.create()
@inject('mainActions', 'mainStore')
@observer
class Intr extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='g-intr'>
        Intr
      </div>
    )
  }
}


export default Intr