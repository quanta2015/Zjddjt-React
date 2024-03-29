import React from "react";
import { observer, inject } from "mobx-react";
import { Input, Tabs, Form, Button, Tag, Icon, Result, DatePicker,Modal, message, Skeleton } from "antd";
import clone from 'util/clone'
import * as DT  from 'util/date'

import "./index.less";
import moment from "moment";
import { toJS } from "mobx";
import { API_SERVER } from 'constant/apis'
import {initCode} from 'util/openid'


// 申请加梯
@Form.create()
@inject('planActions', 'planStore')
@observer
class Plan extends React.Component {
  constructor(props) {
    super(props);
    this.action = this.props.planActions
    this.store  = this.props.planStore
    this.state = {
      code: null,
      loading: false,
    }
  }

 
  async UNSAFE_componentWillMount() {
    var params = initCode(this.props.location.search)
    this.setState({ loading: true, code: params.code })
    await this.action.listPlan(params)

    console.log(params)
    this.setState({ loading: false })
  }


  render() {
    const { loading } = this.state
    const plan = toJS(this.store.plan)
    const hasApply = (typeof(plan)!=='undefined')?true:false

    console.log(plan)

    return (
      <div className='g-plan'>
        <div className="m-title">申请方案</div>

        {hasApply && plan.map((item,index)=>
          <div className="m-plan-item" key={index}>
            <div className="m-plan-info">
              <div className="m-plan-addr">{item.addr}</div>
              <div className="m-plan-date">
                 <span>申请日期:</span> 
                 <Tag color='red'>{item.apdt}</Tag>
              </div>
              <div className="m-plan-name">
                 <span>申请姓名:</span> 
                 <Tag color='blue'>{item.name}</Tag>
              </div>
              <div className="m-plan-phone">
                 <span>申请电话:</span> 
                 <Tag color='blue'>{item.phon}</Tag>
              </div>
              <div className="m-plan-state">
                 <span>项目状态:</span> 
                 <Tag color={item.stat_color}>{item.stat_name}</Tag>
              </div>
            </div>
            <div className="m-plan-file">

              {item.files.map((file,j)=>
                <a href={`${API_SERVER}/${file.url}`} target="_blank" className="m-file-item" key={j}>
                  <p>{file.name}</p>
                </a>  
              )}

              {(item.files.length===0) && <div className="m-file-none">加梯设计文件尚未交付！</div>}
            </div>
            
          </div>
        )}

        { !hasApply &&  <Result status="info" title="您还未申请加梯！" /> }
      </div>
    )
  }
}


export default Plan;
