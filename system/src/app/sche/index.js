import React from "react";
import { observer, inject } from "mobx-react";
import { Input, Form, Button, Icon,Tag, Table, Spin, Divider, Result, Modal, message, Skeleton } from "antd";
import Highlighter from 'react-highlight-words';

import clone from 'util/clone'
import * as DT  from 'util/date'
import { API_SERVER } from 'constant/apis'

import "./index.less";
import moment from "moment";
import { toJS } from "mobx";


// 申请加梯
@Form.create()
@inject('scheActions', 'scheStore')
@observer
class Sche extends React.Component {
  constructor(props) {
    super(props);
    this.action = this.props.scheActions
    this.store  = this.props.scheStore
    this.state = {
      loading: false,
      searchText: '',
      show: 0,
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
    await this.action.getSchedule()
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

  doDetail = async (params)=>{
    this.setState({ loading: true, show: 1})
    await this.action.getDetail(params)
    this.setState({ loading: false })
  }

  doReturn =()=>{
    this.setState({ show: 0})
  }


  doFinish = async (params)=>{
    this.setState({ loading: true})
    await this.action.finishDetail(params)
    this.setState({ loading: false })
  }

  doCancel = async (params)=>{
    this.setState({ loading: true})
    await this.action.cancelDetail(params)
    this.setState({ loading: false })
  }

  doExport = async ()=>{
    this.setState({ loading: true })
    let r = await this.action.exportSche()
    let url = `${API_SERVER}${r.data}`

    var win = window.open(url, '_blank');
    win.focus();
    this.setState({ loading: false })
  }

  doUpload = async (record, e)=>{
    if (e.currentTarget.files.length < 1) return;
    let file = e.currentTarget.files[0]
    let id   = record.pid
    this.setState({ loading: true})
    let r = await this.action.uploadFile(file,id)
    this.setState({ loading: false })
  }

  doDelete = async (params,e)=>{
    e.preventDefault()
    this.setState({ loading: true})
    await this.action.deleteFile(params)
    this.setState({ loading: false })
  }

  doStop = async (params,e)=>{
    this.setState({ loading: true})
    await this.action.stopSche(params)
    this.setState({ loading: false })
  }



  render() {
    const {loading,show} = this.state
    const sche = toJS(getValue(this.store, 'sche', []))
    const detl = toJS(getValue(this.store, 'detail', []))
    const files = toJS(getValue(this.store, 'files', []))

    const columnsSche = [{
        title: '申请时间',
        dataIndex: 'apdt',
        width: '160px',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.apdt - b.apdt,
        render: d => {
          // let year  = d.toString().substr(0,4)
          // let month = d.toString().substr(4,2)
          // let day   = d.toString().substr(6,2)
          // let hour  = d.toString().substr(8,2)
          // let min   = d.toString().substr(10,2)
          // let sec   = d.toString().substr(12,2)
          let ret  = DT.formatApdt(d,true)
          return (
            <span className="m-date">{ret}</span>
          )}
      },{
        title: '项目名称',
        dataIndex: 'addr',
        key: 'addr',
        ...this.getColumnSearchProps('addr'),
      },{
        title: '状态',
        dataIndex: 'stat_name',
        width: '120px',
        filters: [
          {
            text: '已审查',
            value:'已审查',
          },{
            text: '申请中',
            value: '申请中',
          },{
            text: '已终止',
            value: '已终止',
          }
        ],
        onFilter: (value, record) => record.stat_name  === value,
        render: d =>{
          let color
          if (d==='申请中') {
            color = 'red'
          }else if (d==='已审查') {
            color = 'blue'
          }else {
            color = 'black'
          }
          return (
            <Tag color={color}>
              {d}
            </Tag>)
        }
      },{
        title: '功能',
        key: 'action',
        width: '200px',
        render: (text, record, index) => (
          (record.stat!==-1) &&
          <div>
            <Button type="primary" icon="appstore" onClick={this.doDetail.bind(this,record)}>详情</Button>
            <Button type="danger"  icon="close" onClick={this.doStop.bind(this,record)}>终止</Button>
          </div>
        ),
      },
    ];

    const columnsDetail = [{
        title: '时间',
        dataIndex: 'proc_dt',
        width: '160px',
        render: d => {
          let year  = d.toString().substr(0,4)
          let month = d.toString().substr(4,2)
          let day   = d.toString().substr(6,2)
          let hour  = d.toString().substr(8,2)
          let min   = d.toString().substr(10,2)
          let sec   = d.toString().substr(12,2)
          let ret  = `${year}-${month}-${day} ${hour}:${min}:${sec}`
          return (
            <span className="m-date">{ret}</span>
          )}
      },{
        title: '工程内容',
        dataIndex: 'proc_ct_name',
        key: 'proc_ct'
      },{
        title: '工程状态',
        width: '120px',
        dataIndex: 'proc_stat',
        key: 'proc_stat',
        render: d =>{
          let color = (d==='已完成')?'red':'blue'
          return (
            <Tag color={color}>
              {d}
            </Tag>)
        }
      },{
        title: '功能',
        key: 'action',
        width: '300px',
        render: (text, record, index) => (
          (record.proc_stat==='执行中')&&
          <div>
            <Button type="primary" icon="appstore" onClick={this.doFinish.bind(this,record)}>完成</Button>
            { (record.proc_ct!==2)&& <Button type="danger"  icon="close" onClick={this.doCancel.bind(this,record)}>撤回</Button> }
            { (record.proc_ct===3)&& 
              <div className="m-upload">
                <input type="file" className="m-upload-btn" accept="" onChange={this.doUpload.bind(this,record)}/>
                <Button type="default" icon="upload">上传文件</Button>
              </div> }
          </div>
        ),
      },
    ];


    return (
      <div className='g-sche'>
        {(loading) &&
        <div className="m-loader"><Spin size="large" /></div>}
        
        {(show===0)&&
        <div className="m-sche">
          <div className="m-appy-menu">
            <Button type="primary" icon="export" onClick={this.doExport}>导出Excel</Button>
          </div>
          <Table size='small' dataSource={sche} columns={columnsSche}/>
        </div>
        }
        
        {(show===1)&&
        <div className="m-detail">
          <div className="m-appy-menu">
            <Button type="primary" icon="rollback" onClick={this.doReturn}>返回</Button>
          </div>
          <Table size='small' dataSource={detl} columns={columnsDetail} />
          <div className="m-files">
            {files.map((item,index)=>
              <a href={`${API_SERVER}/${item.url}`} target="_blank" className="m-file-item" key={index}>
                <div className="m-del" onClick={this.doDelete.bind(this,item)}></div>
                <Icon type="file" />
                <p>{item.name}</p>
              </a>  
             )}
          </div>
        </div>
        }
      </div>
    )
  }
}


export default Sche;
