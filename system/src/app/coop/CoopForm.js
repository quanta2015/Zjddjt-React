import React from "react";
import { Divider, Form, Icon, Input } from "antd";

const {TextArea} = Input

class CoopForm extends React.Component {

  render() {
    const getVal = (item, key) => {
      return item && item[key] ? item[key] : null
    }

    const item = this.props.selectedItem;

    return (
      <Form layout='horizontal' className='g-brad-form'>
        <Form.Item label='合作对象' key={`合作对象`}>
          <Input
            prefix={<Icon type="database" style={{ color: "rgba(0,0,0,.25)" }}/>}
            value={getVal(item, 'name')}
          />
        </Form.Item>

        <Form.Item label='合作类型' key={`合作类型`}>
          <Input
            prefix={<Icon type="database" style={{ color: "rgba(0,0,0,.25)" }}/>}
            value={getVal(item, 'type')}
          />
        </Form.Item>

        <Form.Item label='主要描述' key={`主要描述`}>
          <TextArea
            value={getVal(item, 'des')}
            autosize={{ minRows: 3, maxRows: 5 }}
          />
        </Form.Item>

        <div className='form-row'>
          <Form.Item label='联系人姓名' key={`联系人姓名`}>
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }}/>}
              value={getVal(item, 'contact')}
            />
          </Form.Item>

          <span>
            <Divider type={"vertical"}/>
          </span>

          <Form.Item label='联系人电话' key={`联系人电话`}>
            <Input
              prefix={<Icon type="phone" style={{ color: "rgba(0,0,0,.25)" }}/>}
              value={getVal(item, 'phone')}
            />
          </Form.Item>
        </div>

      </Form>
    );
  }
}

export default Form.create({})(CoopForm);
