import React from 'react'
import { observer, inject } from 'mobx-react'
import { Input,Tabs,Form,Button,DatePicker,Select,InputNumber,Modal, message, Skeleton } from 'antd';
import './index.less'
import moment  from 'moment'
import { toJS } from 'mobx'
import { Redirect } from 'react-router'

var code,app

class Main extends React.Component {
  constructor(props) {
    super(props)
    // const params = new URLSearchParams(this.props.location.search)
    // code = params.get("code")

    // code = window.localStorage.getItem('ZJDDJT_CODE')
    // app  = window.localStorage.getItem('ZJDDJT_APP')
    // window.location.replace(`/zjddjt/#${app}`)
    // this.
  }

  render() {
    return (
      <div className='g-main'>
         <div>main</div>
      </div>
    )
  }
}


export default Main