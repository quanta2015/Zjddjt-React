import React from "react";
import { observer, inject } from "mobx-react";
import { Input, Tabs, Form, Button, Icon, Tag, Table, Divider, Result, Modal, message, Skeleton, Select } from "antd";
import Highlighter from "react-highlight-words";
import "./index.less";
import { msgRet } from "util/msgRet";
import { toJS } from "mobx";

// 品牌指定
@inject("coopActions", "coopStore")
@observer
class Coop extends React.Component {
  constructor(props) {
    super(props);
    this.action = this.props.coopActions;
    this.store = this.props.coopStore;
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
    await this.action.listCoop();
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

  handleCancel = () => {
    this.setState({
      showModal: false,
      editItem: null
    });
  };

  showDetail = (record) => {
    console.log(record);
  };

  doExport = async () => {
    this.setState({ loading: true });
    let r = await this.action.exportCoop();
    console.log('开始导出Excel')
    let url = r.data;

    var win = window.open(url, "_blank");
    win.focus();
    this.setState({ loading: false });
  };

  columns = [
    {
      title: "合作对象",
      dataIndex: "name",
      key: "name",
      width: "400px",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.name > b.name,
      ...this.getColumnSearchProps("name")
    },
    {
      title: "合作类型",
      dataIndex: "type",
      key: "type",
      width: "200px",
      sorter: (a, b) => a.name > b.name,
      render: types => (
        types.split(" ").join(" ")
      ),
      filters: [
        { text: "加梯材料", value: "加梯材料" },
        { text: "加梯服务", value: "加梯服务" },
        { text: "特务推广", value: "特务推广" },
        { text: "其它", value: "其它" }
      ],
      onFilter: (value, record) => record.type === value
    },
    {
      title: "主要描述",
      dataIndex: "des",
      key: "des",
      ...this.getColumnSearchProps("phone"),
      render: (text) => <span className="col-des">{text}</span>
    }, {
      title: "功能",
      key: "action",
      width: "200px",
      render: (text, record) => (
        <div>
          <Button type="primary" onClick={() => this.showDetail(record)}>详情</Button>
        </div>
      )
    }
  ];

  render() {
    const coop = toJS(this.store.coopAll);

    return (
      <div className='g-coop'>
        <div className="m-coop-menu">
          <Button type="primary" onClick={this.doExport}>导出Excel</Button>
        </div>

        <Table
          size='small'
          dataSource={coop}
          columns={this.columns}
          rowKey="id"
        />
      </div>
    );
  }
}

export default Form.create({})(Coop);
