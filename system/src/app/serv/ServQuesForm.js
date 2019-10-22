import React from "react";
import { Form, Select } from "antd";

class ServQuesForm extends React.Component {
  state = {
    sel: this.props.sel
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { sel } = this.state;

    return (
      <div>
        <Form>
          <Form.Item label='关键词设置'>
            {
              getFieldDecorator("keyword", {
                initialValue: (sel && sel.keyword) ? sel.keyword.split(" ") : []
              })(
                <Select mode="tags" placeholder="选择或自定义">
                </Select>
              )
            }
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Form.create({})(ServQuesForm);
