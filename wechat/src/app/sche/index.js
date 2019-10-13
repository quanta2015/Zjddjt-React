import React from "react";
import { observer, inject } from "mobx-react";
import { Input, Form, Button, Icon,Tag, Table, Spin, Divider, Result, Modal, message, Skeleton } from "antd";
import Highlighter from 'react-highlight-words';

import clone from 'util/clone'
import * as DT  from 'util/date'
import { formatStat,getStatFilter}  from 'util/stat'
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
      code: null,
      loading: false,
    }
  }

  async UNSAFE_componentWillMount() {
    const params = new URLSearchParams(this.props.location.search)
    const code   = params.get("code")
    this.setState({ loading: true, code: code })
    await this.action.listSche(params)
    this.setState({ loading: false })
}



  render() {
    const { loading } = this.state
    const sche = toJS(getValue(this.store, 'sche', []))
    const hasApply = (sche.length!==0)?true:false

    console.log(sche)


    return (
      <div className='g-sche'>

        <div className="m-title">工程进度</div>

        {hasApply && sche.map((item,index)=>
          <div className="m-item" key={index}>
            <div className="m-info">
              <div className="m-addr">{item.addr}</div>
              <div className="m-plan-date">
                 <span>申请日期:</span> 
                 <Tag color='red'>{item.apdt}</Tag>
              </div>
              <div className="m-name">
                 <span>申请姓名:</span> 
                 <Tag color='blue'>{item.name}</Tag>
              </div>
              <div className="m-phone">
                 <span>申请电话:</span> 
                 <Tag color='blue'>{item.phon}</Tag>
              </div>
              <div className="m-state">
                 <span>项目状态:</span> 
                 <Tag color={item.stat_color}>{item.stat_name}</Tag>
              </div>
            </div>
            <div className="m-proc">
              {item.proc.map((proc,j)=>
                <div className="m-proc-item" key={j}>
                  <div className="m-proc-dt">{proc.dt}</div>
                  <div className="m-proc-ct">{proc.ct}</div>
                  <div className="m-proc-stat">{proc.stat}</div>
                </div>
  
                )}
            </div>
            <div className="m-fun">
              <Button type="primary" icon="appstore" >评价</Button>
            </div>
          </div>
        )}

        { !hasApply &&  <Result status="info" title="您还未申请加梯！" /> }
        

      </div>
    )
  }
}


export default Sche;
