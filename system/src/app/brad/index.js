import React from "react";
import { observer, inject } from "mobx-react";
import { Input, Tabs, Form, Button, Icon, Tag, Table, Divider, Result, Modal, message, Skeleton } from "antd";
import Highlighter from "react-highlight-words";
import "./index.less";
import { toJS } from "mobx";

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
      searchText: ""
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
        <img src={url} style={{height: '48px', width: 'auto'}} alt=""/>
      )
    },
    {
      title: "种类",
      dataIndex: "type",
      key: "type",
      sorter: (a, b) => a.name > b.name,
      render: types => (
        types.split(' ').join(' ')
      ),
      ...this.getColumnSearchProps("type")
    },
    {
      title: "联系人",
      dataIndex: "contact",
      key: "contact",
      ...this.getColumnSearchProps("contact"),
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
        phones.split(' ').join(' ')
      )
    }, {
      title: "功能",
      key: "action",
      render: (text, record) => (
        <div>
          <Button type="primary">修改</Button>
          <Button>删除</Button>
        </div>
      )
    }
  ]

  render() {
    // const { loading } = this.state;
    const brand = toJS(this.store.brandAll);

    console.log(brand);

    return (
      <div className='g-appy'>
        <div className="m-brad-menu">
          <Button type="primary">导出Excel</Button>
          <Button type="primary">添加品牌</Button>
        </div>
        <Table size='small' dataSource={brand} columns={this.columns}/>
      </div>
    );
  }
}


export default Form.create()(Brad);
