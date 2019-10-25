import React from "react";
import { Form, Input, Select } from "antd";

const { TextArea } = Input;

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
          <Form.Item label='模块名'>
            {
              getFieldDecorator("title", {
                initialValue: sel && sel.title
              })(
                <Input disabled={true}/>
              )
            }
          </Form.Item>

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

          <Form.Item label='描述'>
            {
              getFieldDecorator("des", {
                initialValue: sel && sel.des
              })(
                <TextArea
                  autosize={{minRows: 2, maxRows: 6}}
                />
              )
            }
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Form.create({})(ServQuesForm);
