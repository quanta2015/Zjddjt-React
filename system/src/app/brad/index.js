import React from "react";
import { observer, inject } from "mobx-react";
import { Input, Tabs, Form, Button, Icon, Tag, Table, Divider, Result, Modal, message, Skeleton, Select } from "antd";
import Highlighter from "react-highlight-words";
import BradForm from "./BradForm";
import "./index.less";
import { msgRet } from "util/msgRet";
import { toJS } from "mobx";

const { Option } = Select;

// 品牌指定
@inject("bradActions", "bradStore")
@observer
class Brad extends React.Component {
  constructor(props) {
    super(props);
    this.action = this.props.bradActions;
    this.store = this.props.bradStore;
    this.state = {
      loading: false,
      searchText: "",
      showModal: false,
      submitLoading: false,
      editItem: null
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    await this.action.getBrandAll();
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
    this.setState({ searchText: "" });
  };

  submitAdd = async (data) => {
    data.type = data.type.join(" ");
    this.setState({ submitLoading: true });
    this.action.addBrand(data)
      .then((r) => {
        if (r.code === 200) {
          message.success(r.msg, 0.5);
          this.setState({
            showModal: false,
            submitLoading: false
          });
          this.bradForm.props.form.resetFields();
        }
      });
  };

  submitEdit = async (id, data) => {
    data.type = data.type.join(" ");
    data.id = id;
    this.setState({ submitLoading: true });
    this.action.updateBrand(data)
      .then((r) => {
        if (r.code === 200) {
          message.success(r.msg, 0.5);
          this.setState({
            showModal: false,
            submitLoading: false,
            editItem: null
          });
          this.bradForm.props.form.resetFields();
        }
      });
  };

  handleCancel = () => {
    this.setState({
      showModal: false,
      editItem: null
    });
  }

  handleSubmit = () => {
    // const data = this.bradForm.props.form.getFieldsValue();

    console.log(this.bradForm.props.form.validateFields((err, val) => {
      if (!err) {
        if (this.state.editItem) {
          console.log("edit", val);
          this.submitEdit(this.state.editItem.id, val)
            .catch(e => console.log(e))
        } else {
          console.log("add", val);
          this.submitAdd(val)
            .catch(e => console.log(e))
        }
      }
    }))

    // if (this.state.editItem) {
    //   console.log("edit", data);
    //   this.submitEdit(this.state.editItem.id, data);
    // } else {
    //   console.log("add", data);
    //   this.submitAdd(data);
    // }
  };

  handleDelete = (record) => {
    this.action.delBrand(record)
      .then(r => {
        msgRet(r);
      });
  };

  handleEdit = (record) => {
    this.setState({
      showModal: true,
      editItem: record
    });
  };

  loadForm = (form) => {
    this.bradForm = form;
  };

  columns = [
    {
      title: "名称",
      dataIndex: "name",
      key: "name",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.name > b.name,
      ...this.getColumnSearchProps("name")
    },
    {
      title: "图片",
      dataIndex: "icon",
      render: url => (
        <img src={url} style={{ height: "48px", width: "auto" }} alt=""/>
      )
    },
    {
      title: "种类",
      dataIndex: "type",
      key: "type",
      sorter: (a, b) => a.name > b.name,
      render: types => (
        types.split(" ").join(" ")
      ),
      ...this.getColumnSearchProps("type")
    },
    {
      title: "联系人",
      dataIndex: "contact",
      key: "contact",
      ...this.getColumnSearchProps("contact")
      // render: phones => (
      //   phones.split(' ').json(',')
      // )
    },
    {
      title: "联系电话",
      dataIndex: "phone",
      key: "phone",
      ...this.getColumnSearchProps("phone"),
      render: phones => (
        phones.split(" ").join(" ")
      )
    }, {
      title: "功能",
      key: "action",
      width: '152px',
      render: (text, record) => (
        <div>
          <Button type="primary" onClick={() => this.handleEdit(record)}>修改</Button>
          <Button onClick={() => this.handleDelete(record)}>删除</Button>
        </div>
      )
    }
  ];

  render() {
    const brand = toJS(this.store.brandAll);

    return (
      <div className='g-appy'>
        <div className="m-brad-menu">
          <Button type="primary" onClick={() => this.setState({ showModal: true })}>添加品牌</Button>
        </div>
        <Table size='small' dataSource={brand} columns={this.columns} rowkey={(item) => `key${item.id}`}/>

        <Modal
          title=''
          visible={this.state.showModal}
          confirmLoading={this.state.submitLoading}
          onCancel={this.handleCancel}
          onOk={this.handleSubmit}
        >
          <BradForm
            className='brand-form'
            wrappedComponentRef={(data) => {
              this.loadForm(data);
            }}
            init={this.state.editItem}
          />
        </Modal>

      </div>
    );
  }
}

export default Form.create({})(Brad);
