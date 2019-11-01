import React from "react";
import { observer, inject } from "mobx-react";
import { Input, Form, Button, Icon,Tag, Table, Spin, Divider, Result, Modal, message, Skeleton } from "antd";
import Highlighter from 'react-highlight-words';

import clone from 'util/clone'
import * as DT  from 'util/date'
import { formatStat,getStatFilter}  from 'util/stat'
import {initCode} from 'util/openid'
import { API_SERVER } from 'constant/apis'

import "./index.less";
import moment from "moment";
import { toJS } from "mobx";

const { TextArea } = Input;

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
      code: null,
      loading: false,
    }
  }

  async UNSAFE_componentWillMount() {
    var params = initCode(this.props.location.search)
    
    this.setState({ loading: true, code: params.code })
    await this.action.listHeat(params)
    this.setState({ loading: false })
}



  render() {
    const { loading } = this.state
    var heat = toJS(this.store.heat)
    heat=(typeof(heat)==='undefined')?[]:heat

    return (
      <div className='g-heat'>

        <div className="m-title">用户心声</div>
        <div className="m-heat">
          {heat.map((item,index)=>
            <div className="m-item" key={index}>
              <div className="m-info">
                <div className="m-addr">{item.addr}</div>
                <div className="m-comment">用户评价: {item.comm}</div>
                
                {item.url && 
                <div className="m-video">
                  <video src={`${API_SERVER}/${item.url}`} controls="controls">
                  您的浏览器不支持 video 标签。
                  </video>
                </div>
                }
              </div>
            </div>
          )}
        </div>


      </div>
    )
  }
}


export default Heat;
