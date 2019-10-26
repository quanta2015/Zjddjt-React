import React from "react";
import { observer, inject } from "mobx-react";
import { Input, Form, Button, Icon, Table, Modal, message, Select, Upload, Divider } from "antd";
import Highlighter from "react-highlight-words";
import { API_SERVER } from "constant/apis";
import { API_SERV_FILE_ADD } from "constant/urls";
import { formatApdt } from "util/date";
import "./index.less";
import { toJS } from "mobx";

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

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  handleUploadChange = info => {
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      const r = info.file.response;
      if (r && r.code === 200) {
        console.log(r.data)
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
      this.action.setServFile(r.data);
      message.success(r.msg, 0.5);
    }
  };

  handleCancel = e => {
    this.setState({
      showModal: false,
      sel: null
    });
    this.quesForm.props.form.resetFields(["keyword"]);
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
      render: (s) => formatFileSize(s)
    },
    {
      title: "上传日期",
      dataIndex: "apdt",
      key: "apdt",
      width: "200px",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.apdt > b.apdt,
      ...this.getColumnSearchProps("contact"),
      render: (text) => formatApdt(text)
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

  render() {
    const files = toJS(this.store.servFileList);

    const uploadProps = {
      name: "file",
      action: API_SERV_FILE_ADD,
      showUploadList: false,
      onChange: this.handleUploadChange
    };

    return (
      <div className='g-serv'>
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
