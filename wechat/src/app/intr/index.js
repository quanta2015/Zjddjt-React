import React from "react";
import "./index.less";
// import assets from './assets'

class Intr extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='g-intr'>
        <div className='bg-wrap'>
          <div className='logo-content'>
            <span><img className='dd-logo' src={assets.DD_LOGO} alt=""/></span>
            <div className='divide'/>
            <h3>{assets.INFO.COM_NAME}</h3>
          </div>
        </div>

        <div className='intr-wrap'>
          <div className='title'>
            <div className="divide-row"/>
            <h3>单 位 简 介</h3>
            <div className="divide-row"/>
          </div>

          <div className='content-wrap'>
            <div className='about-us'>
              {assets.INFO.ABOUT_US}
            </div>
          </div>
        </div>

        <div className='reason-warp'>
          <div className='title'>
            <div className="divide-row"/>
            <h3>选择我们的理由</h3>
            <div className="divide-row"/>
          </div>

          <div className='reason-desc'>
            <p>自主研发产品拥有多项国家级专利</p>
            <p>产品通过ISO9001质量管理体系认证</p>
          </div>

          <div className='content-wrap'>

            <h3 className='center'>服务</h3>
            <div className='reason-text center'>定制加装电梯一站式服务 环节清晰 价格亲民</div>

            <h3 className='center'>设计</h3>
            <div className='reason-text center'>建筑工程设计甲级与总承包资质</div>

            <h3 className='center'>采购</h3>
            <div className='reason-text center'>任意选择心仪的电梯品牌</div>

            <h3 className='center'>施工</h3>
            <div className='reason-text center'>有丰富经验施工团队，安全可靠</div>

          </div>

        </div>

        <div className='holder'/>
      </div>
    )
  }
}


export default Intr;
