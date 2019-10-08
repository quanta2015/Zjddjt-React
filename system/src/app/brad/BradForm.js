import React from "react";
import { Button, Divider, Form, Icon, Input, Select, Upload, message } from "antd";
import * as urls from "constant/urls";
import "./index.less";

const { Option } = Select;

function beforeUpload(file) {

  console.log("getfile", file);

  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  console.log(isJpgOrPng && isLt2M);
  return isJpgOrPng && isLt2M;
}

class BradForm extends React.Component {
  state = {
    selected: [],
    loading: false,
    iconUrl: null
  };

  initBradForm = () => {
    this.setState({
      selected: [],
      iconUrl: this.props.init ? this.props.init.icon : null,
      loading: false
    });
  }

  componentDidMount() {
    this.initBradForm()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.init !== prevProps.init) {
      this.initBradForm()
    }
  }

  resetIconVal = () => {
    console.log('resetIconVal', this.state.iconUrl)
    this.props.form.setFieldsValue({
      icon: this.state.iconUrl,
    });
  }

  handleUploadChange = info => {
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      const r = info.file.response;

      if (r && r.code === 200) {
        let iconUrl = r.data.path;
        message.success(r.msg, 0.5);
        this.setState({
          iconUrl
        }, this.resetIconVal);
      }
    }
  };

  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? "loading" : "plus"}/>
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { iconUrl } = this.state;

    const { getFieldDecorator } = this.props.form;

    const handleChange = (value) => {
      console.log(`selected ${value}`);
    };

    const type = ["井道加电梯", "一体机"];

    const init = this.props.init;

    const setVal = (init, key, initVal = null, isArr = false, splitChar = " ") => {
      return init ?
        isArr ? init[key].split(splitChar) : init[key]
        :
        initVal;
    };

    return (
      <Form layout='horizontal' className='g-brad-form'>
        <Form.Item label='名称'>
          {
            getFieldDecorator("name", {
              rules: [{ required: true, message: "请输入品牌名称！" }],
              initialValue: setVal(init, "name")
            })(
              <Input
                prefix={<Icon type="database" style={{ color: "rgba(0,0,0,.25)" }}/>}
                placeholder="请填写名称..."
              />
            )
          }
        </Form.Item>

        <Form.Item label='可提供电梯类别'>
          {
            getFieldDecorator("type", {
              rules: [{ required: true, message: "请提供电梯类别！" }],
              initialValue: setVal(init, "type", [], true)
            })(
              <Select mode="tags" placeholder="选择或自定义" onChange={handleChange}>
                {type.map((item, i) => (
                  <Option key={item}>{item}</Option>
                ))}
              </Select>
            )
          }
        </Form.Item>

        <Form.Item label='图片'>
          {
            getFieldDecorator("icon", {
            })(
              <div className='upload-wrap'>
                <Upload
                  name="file"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  action={urls.API_BRAND_ICON}
                  beforeUpload={beforeUpload}
                  onChange={this.handleUploadChange}
                >
                  {iconUrl ? <img src={iconUrl} alt="icon" style={{maxHeight: 64}}/> : uploadButton}
                </Upload>
              </div>
            )
          }
        </Form.Item>

        <div className='form-row'>
          <Form.Item label='联系人姓名'>
            {
              getFieldDecorator("contact", {
                rules: [{ required: true, message: "请输入联系人姓名！" }],
                initialValue: setVal(init, "contact")
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }}/>}
                  placeholder="请输入联系人姓名"
                />
              )
            }
          </Form.Item>

          <span>
            <Divider type={"vertical"}/>
          </span>

          <Form.Item label='联系人电话'>
            {
              getFieldDecorator("phone", {
                rules: [{ required: true, message: "请输入联系人电话！" }],
                initialValue: setVal(init, "phone")
              })(
                <Input
                  prefix={<Icon type="phone" style={{ color: "rgba(0,0,0,.25)" }}/>}
                  placeholder="请输入联系人电话"
                />
              )
            }
          </Form.Item>
        </div>
      </Form>
    );
  }
}

export default Form.create({})(BradForm);
