import React from "react";
import { observer, inject } from "mobx-react";
import { Input, Tabs, Form, Button, DatePicker,Result,Modal, message, Skeleton } from "antd";
import clone from 'util/clone'
import * as DT  from 'util/date'

import "./index.less";
import moment from "moment";
import { toJS } from "mobx";

const { TextArea } = Input;


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
    }
  }

 
  async UNSAFE_componentWillMount() {
    const params = new URLSearchParams(this.props.location.search)
    this.setState({
      code: params.get("code"),
    })
  }


  doReturn = (link) =>{
    window.location.replace(`/#intr`)
  }

  doApply = (e)=>{
    e.preventDefault();
    this.props.form.validateFields( async (err, values) => {
      if (!err) {
        Modal.confirm({
          title: '确认提交加梯申请?',
          onOk: async ()=> {
            let params = clone(values)
            params.opid = this.state.code
            params.apdt = DT.newDateTime()
            this.setState({ loading: true })
            let r = await this.action.addApply(params)
            if (r && r.code === 200) {
              this.setState({ loading: false, succ: true })
            }
          }
        })
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const {succ} = this.state

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
              {getFieldDecorator('phone', {
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
            extra={
              <Button type="primary" className="input-btn" onClick={this.doReturn} block>
                返 回
              </Button>
            }
          />
          
        </div>}

      </div>
    )
  }
}


export default Form.create()(Appy);
