import React from 'react'
import { Form, Icon, Input, Select } from "antd";

class BradForm extends React.Component {

  state = {
    selected: []
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    const handleChange = (value) => {
      console.log(`selected ${value}`);
    };

    const type = ["井道加电梯", "一体机"];

    return (
      <Form layout='horizontal' onSubmit={this.handleSubmit}>
        <Form.Item label='名称'>
          {
            getFieldDecorator("name", {
              rules: [{ required: true, message: "请输入品牌名称！" }]
            })(
              <Input
                prefix={<Icon type="database" style={{ color: "rgba(0,0,0,.25)" }}/>}
                placeholder="请填写名称..."
              />
            )
          }
        </Form.Item>

        <Form.Item label='图片'>
          {
            getFieldDecorator("icon", {})(
              <Input
                placeholder="图片url"
              />
            )
          }
        </Form.Item>

        <Form.Item label='可提供电梯类别'>
          {
            getFieldDecorator("type", {
              rules: [{ required: true, message: "请提供电梯类别！" }]
            })(
              <Select mode="tags" placeholder="选择或自定义" onChange={handleChange}>
                {type.map((item, i) => (
                  <Option key={item}>{item}</Option>
                ))}
              </Select>
            )
          }
        </Form.Item>

        <Form.Item label='联系人姓名'>
          {
            getFieldDecorator("contact", {
              rules: [{ required: true, message: "请输入联系人姓名！" }]
            })(
              <Input
                prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }}/>}
                placeholder="请输入联系人姓名"
              />
            )
          }
        </Form.Item>

        <Form.Item label='联系人电话'>
          {
            getFieldDecorator("phone", {
              rules: [{ required: true, message: "请输入联系人电话！" }]
            })(
              <Input
                prefix={<Icon type="phone" style={{ color: "rgba(0,0,0,.25)" }}/>}
                placeholder="请输入联系人电话"
              />
            )
          }
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create({})(BradForm);
