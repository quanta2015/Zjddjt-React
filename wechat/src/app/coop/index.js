import React from "react";
import { observer, inject } from "mobx-react";
import { Input, Tabs, Form, Button, DatePicker, Result, Modal, message, Skeleton, Select } from "antd";
import clone from "util/clone";
import * as DT from "util/date";
import REG from "constant/reg";
import "./index.less";

const { TextArea } = Input;
const { Option } = Select;

// 品牌指定
@inject("coopActions", "coopStore")
@observer
class Coop extends React.Component {
  constructor(props) {
    super(props);
    this.action = this.props.coopActions;
    this.store = this.props.coopStore;
    this.state = {
      code: null,
      loading: false,
      succ: false,
      visible: false,
      selectType: null,
      typeList: ["加梯材料", "加梯服务", "特务推广", "其它"]
    };
  }

  handleChange = (value) => {
    this.setState({
      selectType: value
    });
  };

  componentDidMount() {
    const params = new URLSearchParams(this.props.location.search);
    this.setState({
      code: params.get("code")
    });

    console.log("did mount", this.store, this.action);
  }

  doReturn = (link) => {
    window.location.replace(`/#intr`);
  };

  handleCancel = () => {
    this.setState({
      visible: false
    });
  };

  doApply = (e) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        this.setState({ visible: true, values: values });
      }
    });
  };

  handleOk = async () => {
    let params = clone(this.state.values);
    params.opid = this.state.code;
    params.apdt = DT.newDateTime();
    this.setState({ loading: true });
    let r = await this.action.addCoop(params);
    if (r && r.code === 200) {
      this.setState({ loading: false, succ: true, visible: false });
    }
  };

  validateType = (rule, value, callback) => {
    value === "请选择服务类型" ? callback("请选择服务类型!") : callback();
  };

  validatePhone = (rule, value, callback) => {
    value === "" || (REG.PHONE.test(value)) || (REG.TEL.test(value)) ? callback() : callback("请输入正确的电话/手机");
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { succ, visible, loading, typeList } = this.state;

    return (
      <div className='g-coop'>
        <div className="m-coop-tl">商务合作</div>

        {(!succ) &&
        <div className="m-coop">
          <Form className="m-coop-form">
            <Form.Item label="单位名称">
              {getFieldDecorator("name", {
                rules: [{ required: true, message: "请输入单位名称！" }],
                initialValue: ""
              })(<Input className="input-text" placeholder="请输入单位名称..."/>)}
            </Form.Item>

            <Form.Item label="服务类型">
              {getFieldDecorator("type", {
                rules: [
                  { required: true, message: "请选择服务类型！" },
                  { validator: this.validateType }
                ],
                initialValue: "请选择服务类型"
              })(
                <Select onChange={this.handleChange}>
                  {typeList.map((item, index) => (
                    <Option value={item} key={index}>{item}</Option>
                  ))}
                </Select>
              )}
            </Form.Item>

            <Form.Item label="单位地址">
              {getFieldDecorator("addr", {
                // rules: [{ required: true, message: "请输入单位地址！" }],
                initialValue: ""
              })(<TextArea rows={2} placeholder="请输入单位地址..."/>)}
            </Form.Item>

            <Form.Item label="联系人姓名">
              {getFieldDecorator("contact", {
                rules: [{ required: true, message: "请输入联系人姓名！" }],
                initialValue: ""
              })(<Input className="input-text" placeholder="请输入联系人姓名..."/>)}
            </Form.Item>

            <Form.Item label="联系人电话/手机">
              {getFieldDecorator("phone", {
                rules: [
                  { required: true, message: "请输入联系人电话/手机！" },
                  { validator: this.validatePhone }
                ],
                initialValue: ""
              })(<Input className="input-text" placeholder="请输入联系人电话..."/>)}
            </Form.Item>

            <Form.Item label="合作内容">
              {getFieldDecorator("des", {
                initialValue: ""
              })(<TextArea rows={4} placeholder="请输入合作内容..."/>)}
            </Form.Item>

            <Form.Item>
              <Button type="primary" className="input-btn" htmlType="submit" onClick={this.doApply} block>提 交</Button>
            </Form.Item>
          </Form>
        </div>}

        {(succ) &&
        <div className="m-ret">
          <Result
            title="您的加梯申请提交成功，请等待工作人员回复"
            extra={<Button type="primary" className="input-btn" onClick={this.doReturn} block>返 回</Button>}
          />
        </div>}

        <Modal
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={loading}
          onCancel={this.handleCancel}

        ><p>确认提交加梯申请?</p></Modal>

      </div>
    );
  }
}

export default Form.create()(Coop);
