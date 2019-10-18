import React from "react";
import { observer, inject } from "mobx-react";
import { Input, Form, Button, Upload, Icon,Tag, Table, Spin, Divider, Result, Modal, message, Skeleton } from "antd";
import Highlighter from 'react-highlight-words';

import clone from 'util/clone'
import * as DT  from 'util/date'
import * as urls from 'constant/urls'
import { formatStat,getStatFilter}  from 'util/stat'
import { API_SERVER } from 'constant/apis'

import "./index.less";
import moment from "moment";
import { toJS } from "mobx";


// 申请加梯
@Form.create()
@inject('heatActions', 'heatStore')
@observer
class Heat extends React.Component {
  constructor(props) {
    super(props);
    this.action = this.props.heatActions
    this.store  = this.props.heatStore
    this.state = {
      loading: false,
      searchText: '',
      visible: false,
    }
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


  async UNSAFE_componentWillMount() {
    this.setState({ loading: true })
    await this.action.getHeatList()
    this.setState({ loading: false })
  }

  doShow = async (params,type,pass)=>{
    this.setState({ loading: true })
    params.type = type
    params.pass = pass
    await this.action.setHeatShow(params)
    this.setState({ loading: false })
  }
  
  doShowComment = async (params)=>{
    this.setState({ loading: true })
    let r = await this.action.getHeatComment(params)
    if (r && r.code === 200) {
      let comment = (r.data.length===0)?'':r.data[0].content
      Modal.info({
        title: '用户评价',
        content: comment,
      });
    }
    this.setState({ loading: false })
  }

  doClose =  (params)=>{
    this.setState({
      visible: false,
    });
  }

  doUpload=(info)=>{
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} 视频上传成功`)
      this.action.updateHeadList(info.file.response.data)
      this.setState({ loading: false });
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 视频上传失败.`)
    }
  }


  render() {
    const {loading,show} = this.state
    const heat = toJS(getValue(this.store, 'heat', []))

    const uploadProps = {
      name: 'file',
      action: urls.API_HEAT_UPLOAD,
      showUploadList: false,
      onChange: this.doUpload,
    };

    const columnsHeat = [{
        title: '申请时间',
        dataIndex: 'apdt',
        width: '160px',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.apdt - b.apdt,
        render: d => <span className="m-date">{ DT.formatApdt(d,true) }</span>
      },{
        title: '项目名称',
        dataIndex: 'addr',
        key: 'addr',
        ...this.getColumnSearchProps('addr'),
      },{
        title: '状态',
        dataIndex: 'stat',
        width: '120px',
        filters: getStatFilter(),
        onFilter: (value, record) => record.stat_name  === value,
        render: d =>
          <Tag color={formatStat(d)[1]}>
            {formatStat(d)[0]}
          </Tag>
      },{
        title: '视频',
        dataIndex: 'filename',
        width: '120px',
        render: (text, record, index) =>
          <Tag>
            <a href={`${API_SERVER}/${record.url}`} target="_blank">{record.filename}</a>
          </Tag>
      },{
        title: '功能',
        key: 'action',
        width: '270px',
        render: (text, record, index) => (
          <div className="m-fun-wrap">
            { (record.stat==2||record.stat==5) && <Button type="danger"  size="small" icon="eye" onClick={this.doShow.bind(this,record,1,0)} >上架</Button> }

            { (record.stat==3) && <Button type="primary" size="small" icon="profile" onClick={this.doShowComment.bind(this,record)} >查看评价</Button> }
            { (record.stat==3) && <Button type="danger"  size="small" icon="close" onClick={this.doShow.bind(this,record,1,0)} >不通过</Button> }
            { (record.stat==3) && <Button type="danger"  size="small" icon="check" onClick={this.doShow.bind(this,record,1,1)}>通过</Button> }
            
            { (record.stat==4) && 
              <Upload data={record} {...uploadProps} >
                <Button type="default"  size="small" icon="upload" className="c-green">上传视频</Button>
              </Upload> }
            { (record.stat==4) && <Button type="default"  size="small" icon="eye-invisible" className="c-black" onClick={this.doShow.bind(this,record,0,0)}>下架</Button> }
          </div>
        ),
      },
    ];


    return (
      <div className='g-sche'>
        {(loading) &&
        <div className="m-loader"><Spin size="large" /></div>}
        
        <div className="m-sche">
          <div className="m-appy-menu">
            <Button type="primary" icon="export" onClick={this.doExport}>导出Excel</Button>
          </div>
          <Table size='small' dataSource={heat} columns={columnsHeat}/>
        </div>
        
      </div>
    )
  }
}


export default Heat;
