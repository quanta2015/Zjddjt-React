import React from "react";
import { observer, inject } from "mobx-react";
import { Input, Tabs, Form, Button, DatePicker,Result,Modal, message, Skeleton } from "antd";
import clone from 'util/clone'
import * as DT  from 'util/date'
import {initCode} from 'util/openid'

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
    var params = initCode(this.props.location.search)
    // console.log(params)
    this.setState({ code: params.code })
  }


  doReturn = (link) =>{
    window.location.replace(`/#intr`)
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  doApply = (e)=>{
    e.preventDefault()
    this.props.form.validateFields( async (err, values) => {
      if (!err) {
        this.setState({ visible: true, values: values });
      }
    })
  }

  handleOk = async () => {
    let params = clone(this.state.values)
    params.opid = this.state.code
    params.apdt = DT.newDateTime()

    // alert(params)
    this.setState({ loading: true })
    let r = await this.action.addApply(params)
    if (r && r.code === 200) {
      this.setState({ loading: false, succ: true, visible: false })
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const {succ,visible, loading} = this.state

    return (
      <div className='g-appy'>
        <div className="m-appy-tl">申请加梯</div>

        {(!succ)&&
        <div className="m-appy">
          <Form className="m-appy-form">
            <Form.Item label="申请人姓名">
              {getFieldDecorator('name', {
                rules: [{ required: true, message: '请输入姓名！' }],
                initialValue:''
              })(<Input className="input-text" placeholder="请输入姓名..." />)}
            </Form.Item>
            <Form.Item label="申请人电话">
              {getFieldDecorator('phon', {
                rules: [{ required: true, message: '请输入电话！' }],
                initialValue: '' 
              })(<Input className="input-text" placeholder="请输入电话..."/>)}
            </Form.Item>
            <Form.Item label="申请加梯楼房地址">
              {getFieldDecorator('addr', {
                rules: [{ required: true, message: '请输入楼房地址！' }],
                initialValue: '' 
              })(<TextArea rows={4} placeholder="请输入楼房地址..."/>)}
            </Form.Item>
            <Form.Item>
              <Button type="primary" className="input-btn" htmlType="submit" onClick={this.doApply} block>提 交</Button>
            </Form.Item>
          </Form>
        </div>}
        
        {(succ)&&
        <div className="m-ret">
          <Result
            title="您的加梯申请提交成功，请等待工作人员回复"
            extra={ <Button type="primary" className="input-btn" onClick={this.doReturn} block>返 回</Button> }
          />
        </div>}


        <Modal
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={loading}
          onCancel={this.handleCancel}

        ><p>确认提交加梯申请?</p></Modal>

      </div>
    )
  }
}


export default Form.create()(Appy);
