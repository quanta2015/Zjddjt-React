import React from "react";
import { observer, inject } from "mobx-react";
import { Input, Form, Button, Icon, Table, Modal, message, Select, Upload, Divider } from "antd";
import Highlighter from "react-highlight-words";
import { API_SERVER } from "constant/apis";
import { API_SERV_FILE_ADD } from "constant/urls";
import { formatApdt } from "util/date";
import ServQuesForm from './ServQuesForm'
import "./index.less";
import { toJS } from "mobx";

const { Option } = Select;

// 用户服务管理
@inject("servActions", "servStore")
@observer
class Serv extends React.Component {
  constructor(props) {
    super(props);
    this.action = this.props.servActions;
    this.store = this.props.servStore;
    this.state = {
      loading: false,
      searchText: "",
      showModal: false,
      submitLoading: false,
      sel: null
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    await this.action.listServFile();
    await this.action.listServQues();
    this.setState({ loading: false });
  }

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? "#1890ff" : undefined }}/>
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text => (
      <Highlighter
        highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    )
  });

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleUploadChange = info => {
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      const r = info.file.response;
      if (r && r.code === 200) {
        this.action.setServFile(r.data);
        message.success(r.msg, 0.5);
      }
    }
  };

  downloadFile = (record) => {
    let url = `${API_SERVER}/${record.url}`;
    var win = window.open(url, "_blank");
    win.focus();
    this.setState({ loading: false });
  };

  delFile = async (record) => {
    let r = await this.action.delServFile({ id: record.id });
    if (r.code === 200) {
      message.success(r.msg, 0.5);
    }
  };

  updateQues = (record) => {
    this.setState({
      showModal: true,
      sel: record
    });
  };

  handleOk = () => {
    this.quesForm.props.form.validateFields((err, val) => {
      if (!err) {
        let params = { id: this.state.sel.id, keyword: val.keyword.join(" ") };
        this.action.updateServQues(params)
          .then(r => {
            console.log(r);
            if (r && r.code === 200) {
              message.success(r.msg, 0.5);
              this.setState({
                showModal: false,
                sel: null
              });
            }
          })
          .catch(e => message.error(r.msg, 0.5));
      }
    });
    this.quesForm.props.form.resetFields(['keyword']);
  };

  handleCancel = e => {
    this.setState({
      showModal: false,
      sel: null
    });
    this.quesForm.props.form.resetFields(['keyword']);
  };

  loadForm = (form) => {
    this.quesForm = form;
  };

  columns = [
    {
      title: "文件名",
      dataIndex: "name",
      key: "name",
      width: "400px",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.name > b.name,
      ...this.getColumnSearchProps("name")
    },
    {
      title: "文件类型",
      dataIndex: "type",
      key: "type",
      width: "200px",
      sorter: (a, b) => a.name > b.name,
      filters: [
        { text: "docx", value: "docx" },
        { text: "jpg", value: "jpg" },
        { text: "pptx", value: "pptx" },
        { text: "exlx", value: "exlx" }
      ],
      onFilter: (value, record) => record.type === value
    },
    {
      title: "文件大小",
      dataIndex: "size",
      key: "size",
      width: "200px",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.size > b.size,
      ...this.getColumnSearchProps("size"),
      render: (s) => formatFileSize(s)
    },
    {
      title: "上传日期",
      dataIndex: "apdt",
      key: "apdt",
      width: "150px",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.contact > b.contact,
      ...this.getColumnSearchProps("contact"),
      render: (text) => formatApdt(text)
    },
    {
      title: "说明",
      dataIndex: "des",
      key: "des",
      render: (text) => <span className="col-des">{text}</span>
    },
    {
      title: "功能",
      key: "action",
      width: "250px",
      render: (text, record) => (
        <div>
          <Button type="primary" onClick={() => this.downloadFile(record)}>
            <span><Icon type='download' style={{ marginRight: 5 }}/>下载</span>
          </Button>

          <Button type="danger" onClick={() => this.delFile(record)}>
            <span><Icon type='delete' style={{ marginRight: 5 }}/>删除</span>
          </Button>
        </div>
      )
    }
  ];

  col_ques = [
    {
      title: "模块名",
      dataIndex: "title",
      key: "title",
      width: "200px",
      sorter: (a, b) => a.title > b.title,
      ...this.getColumnSearchProps("title")
    },
    {
      title: "路径",
      dataIndex: "path",
      key: "path",
      width: "200px",
      defaultSortOrder: "path",
      sorter: (a, b) => a.path > b.path,
      ...this.getColumnSearchProps("path")
    },
    {
      title: "关键词",
      dataIndex: "keyword",
      key: "keyword"
    },
    {
      title: "功能",
      key: "action",
      width: "150px",
      render: (text, record) => (
        <div>
          <Button type="primary" onClick={() => this.updateQues(record)}>
            <span><Icon type='edit' style={{ marginRight: 5 }}/>修改</span>
          </Button>
        </div>
      )
    }
  ];

  render() {
    const files = toJS(this.store.servFileList);
    const ques = toJS(this.store.servQuesList);

    const uploadProps = {
      name: "file",
      action: API_SERV_FILE_ADD,
      showUploadList: false,
      onChange: this.handleUploadChange
    };

    return (
      <div className='g-serv'>
        <Divider orientation='left'>常用文件管理</Divider>
        <div className="m-serv-menu">
          <Upload
            {...uploadProps}
          >
            <Button type="primary"><Icon type="upload"/>添加文件</Button>
          </Upload>
        </div>

        <Table
          size='small'
          dataSource={files}
          columns={this.columns}
          rowKey="id"
        />

        <Divider orientation='left'>咨询数据管理</Divider>
        <div className="m-serv-menu">
          {/*<Button type="primary" onClick={this.addKeyword}>添加咨询数据</Button>*/}
        </div>

        <Table
          size='small'
          dataSource={ques}
          columns={this.col_ques}
          rowKey="id"
          pagination={{ defaultPageSize: 4 }}
        />

        <Modal
          title="Basic Modal"
          visible={this.state.showModal}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          destroyOnClose = {true}
        >
          <div>
            <ServQuesForm
              sel={this.state.sel}
              wrappedComponentRef={(data) => {
                this.loadForm(data);
              }}
            />
          </div>

        </Modal>

      </div>
    );
  }
}



/**
 * 文件大小转换
 */
function formatFileSize(size) {
  let i = Math.floor(Math.log(size) / Math.log(1024));
  return (size / Math.pow(1024, i)).toFixed(2) * 1 + " " + ["B", "kB", "MB", "GB", "TB"][i];
}


export default Serv;
