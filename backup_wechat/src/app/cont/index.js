import React from 'react'
import { observer, inject } from 'mobx-react'
import './index.less'


class Cont extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='g-cont'>
        <div className="m-title">联系咨询</div>
        <div className="m-contact">
          <div className="m-contact-item">
            <li class="m-dep">
              <span>市场部 - 孙工</span>
            </li>
            <li>
              <span class="m-tel">电话：</span>
              <span class="m-num">0571-85117066</span>
            </li>
            <li>
              <span class="m-tel">手机：</span>
              <span class="m-num">15372080427</span>
            </li>
            <li>
              <span class="m-tel">邮箱：</span>
              <span class="m-num">mtybgs@sina.com</span>
            </li>
          </div>

          <div className="m-contact-item">
            <li  class="m-dep">
              <span>综合办公室 - 李工</span>
            </li>
            <li>
              <span class="m-tel">电话：</span>
              <span class="m-num">0571-87051402</span>
            </li>
            <li>
              <span class="m-tel">手机：</span>
              <span class="m-num">13906813283</span>
            </li>
            <li>
              <span class="m-tel">邮箱：</span>
              <span class="m-num">mtybgs@sina.com</span>
            </li>
          </div>
        </div>

        <div className="m-addr">
          <iframe 
            class="contact__map"
            id = "contactMap"
            width='400' 
            height='400'
            frameBorder='0' 
            scrolling='no' 
            marginHeight='0' 
            marginWidth='0' 
            src='https://m.amap.com/navi/?dest=120.151794,30.264233&destName=浙江东都建筑设计研究院有限公司&hideRouteIcon=1&key=9d4281acb32d035f8ea4c3abb136451c'
          ></iframe>
        </div>
      </div>
    )
  }
}


export default Cont