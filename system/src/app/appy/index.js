import React from "react";
import { observer, inject } from "mobx-react";
import { Input, Form, Button, Icon,Tag, Table, Divider, Result, Modal, message, Skeleton } from "antd";
import Highlighter from 'react-highlight-words';

import clone       from 'util/clone'
import * as DT     from 'util/date'
import { formatStat,getStatFilter}  from 'util/stat'
import { API_SERVER } from 'constant/apis'

import "./index.less";
import moment from "moment";
import { toJS } from "mobx";


// 申请加梯
@Form.create()
@inject('appyActions', 'appyStore')
@observer
class Appy extends React.Component {
  constructor(props) {
    super(props);
    this.action = this.props.appyActions
    this.store  = this.props.appyStore
    this.state = {
      loading: false,
      searchText: '',
    }
  }

 
  async UNSAFE_componentWillMount() {
    let params = {}

    this.setState({ loading: true })
    await this.action.getApply(params)
    this.setState({ loading: false })
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
          style={{ width: 188, marginBottom: 8, display: 'block' }}
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
      <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
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
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    ),
  });

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  doAgree = async (params)=>{
    this.setState({ loading: true })
    params.proc_dt = DT.newDateTime()
    await this.action.agreeApply(params)
    this.setState({ loading: false })
  }

  doExport = async ()=>{
    this.setState({ loading: true })
    let r = await this.action.exportApply()
    let url = `${API_SERVER}${r.data}`

    var win = window.open(url, '_blank');
    win.focus();
    this.setState({ loading: false })
  }



  render() {
    const {loading} = this.state
    const apply = toJS(this.store.apply)
    const columns = [{
        title: '状态',
        dataIndex: 'stat',
        filters: getStatFilter(),
        onFilter: (value, record) => record.stat_name  === value,
        render: d =>
          <Tag color={formatStat(d)[1]}>
            {formatStat(d)[0]}
          </Tag>
      },{
        title: '时间',
        dataIndex: 'apdt',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.apdt - b.apdt,
        render: d => <span className="m-date">{DT.formatApdt(d,true)}</span>
      },{
        title: '申请人',
        dataIndex: 'name',
        key: 'name',
        ...this.getColumnSearchProps('name'),
      },{
        title: '联系电话',
        dataIndex: 'phon',
        key: 'phon',
        ...this.getColumnSearchProps('phon'),
      },{
        title: '加梯地址',
        dataIndex: 'addr',
        key: 'addr',
        ...this.getColumnSearchProps('addr'),
      },{
        title: '功能',
        key: 'action',
        render: (text, record, index) => (
          (record.stat===0)&&
          <Button type="primary" icon="check" onClick={this.doAgree.bind(this,record)}>同意加梯</Button>
        
        ),
      },
    ];

    return (
      <div className='g-appy'>
        <div className="m-appy-menu">
          <Button type="primary" icon="export" onClick={this.doExport}>导出Excel</Button>
        </div>
        <Table size='small' dataSource={apply} columns={columns} />;
      </div>
    )
  }
}


export default Appy;
