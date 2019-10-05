import React from "react";
import { observer, inject } from "mobx-react";
import { Input, Tabs, Form, Button, DatePicker,Result,Modal, message, Skeleton } from "antd";
import clone from 'util/clone'
import * as DT  from 'util/date'

import "./index.less";
import moment from "moment";
import { toJS } from "mobx";

const { TextArea } = Input;
var _val

// 申请加梯
@inject('appyActions', 'appyStore')
@observer
class Appy extends React.Component {
  constructor(props) {
    super(props);
    this.action = this.props.appyActions
    this.store  = this.props.appyStore
    this.state = {
      code: null,
      loading: false,
      succ: false,
      visible: false,
    }
  }

 
  async UNSAFE_componentWillMount() {
    const params = new URLSearchParams(this.props.location.search)
    this.setState({
      code: params.get("code"),
    })
  }



  render() {
    const {succ,visible, loading} = this.state

    return (
      <div className='g-appy'>
        appy

      </div>
    )
  }
}


export default Form.create()(Appy);
