import React from "react";
import { observer, inject } from "mobx-react";
import { Input, Tabs, Form, Button, DatePicker, Select, InputNumber, Modal, message, Skeleton, Typography } from "antd";

import "./index.less";
import moment from "moment";
import { toJS } from "mobx";
import INFO from '../../constant/info';
import A01 from './assets/A01.png'
import A02 from './assets/A02.jpg'
import DD_LOGO from './assets/dd-logo.svg'

@Form.create()
@inject("mainActions", "mainStore")
@observer
class Intr extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='g-intr'>

        <div className='bg-wrap'>
          <div className='logo-content'>
            <span><img className='dd-logo' src={DD_LOGO} alt=""/></span>
            <div className='divide'/>
            <h3>{INFO.COM_NAME}</h3>
          </div>
        </div>

        <div className='content-wrap'>

          <br/>
          <p>
            浙江东都建筑设计研究院（原煤炭工业部杭州建筑设计研究院）创建于1958年，是原煤炭部系统唯一一家以工业与民用建筑设计为主的，拥有国家甲级工程设计证书的建筑设计研究院。2008年正式变更为全民所有制国有企业，现拥有各类中、高级专业技术人员80余名，多名国家一级注册建筑师、国家一级注册结构工程师、国家注册设备工程师及国家注册电气工程师。
          </p>

          <p>
            本单位目前拥有建筑工程总承包资质、建筑行业设计甲级资质、建筑装饰工程设计甲级资质、建筑幕墙工程设计甲级资质、轻型钢结构工程设计甲级资质、建筑智能化系统设计甲级资质、照明工程设计甲级资质及消防设施工程设计甲级资质，同时具备浙江省施工图设计文件审查机构认定资格。本单位主要从事规划、建筑、风景园林、室内装饰、智能化、幕墙、施工图审查等设计业务，于2012年通过了ISO9001:2008质量体系认证，荣获浙江省勘察设计行业诚信单位称号。
          </p>

          <div style={{textAlign: "center"}}><img src={A01} alt=""/></div>

          <p>
            本单位为响应杭州市政府“关于既有住宅加装电梯工作的实施意见”的号召，现为广大楼梯房居民提供加装电梯总承包服务。专注于既有住宅加装电梯一站式服务，为广大楼梯房居民实现电梯梦。提供咨询指引、现场勘察、住户协调、方案设计、规划报批、井道施工、电梯安装服务。
          </p>

          <div style={{textAlign: "center"}}><img src={A02} alt=""/></div>

          <p>
            我们至诚欢迎各位楼房业主、同行企业、相关机构与我们交流加装电梯的心得，共同推进杭州市为民加装电梯事业！
          </p>

          <p>
            欢迎随时咨询，留下您的联系方式，我们将24小时内与您交流。
          </p>

          <br/>
        </div>

        <div className='holder'/>
      </div>
    )
  }
}


export default Intr;
