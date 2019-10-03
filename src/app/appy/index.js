import React from "react";
import { observer, inject } from "mobx-react";
import { Input, Tabs, Form, Button, DatePicker, Select, InputNumber, Modal, message, Skeleton, Typography } from "antd";

import "./index.less";
import moment from "moment";
import { toJS } from "mobx";

var code 

class Appy extends React.Component {
  constructor(props) {
    super(props);
    

    this.state = {
      code: code
    }
  }

  async UNSAFE_componentWillMount() {
    const params = new URLSearchParams(this.props.location.search)
    code = params.get("code")
    this.setState({
      code: code
    })
  }

  render() {

    let {code} = this.state
    console.log(code)

    return (
      <div className='g-appy'>
        apply
        <div className="">{code}</div>

        
      </div>
    )
  }
}


export default Appy;
