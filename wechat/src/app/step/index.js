import React from 'react'
import { observer, inject } from 'mobx-react'
import './index.less'
import procImg from "./assets/process.svg";


class Step extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='g-step'>
        <div className="m-title">装梯流程</div>
        <div className="m-proc">
          <img src={procImg} alt=""/>
        </div>
      </div>
    )
  }
}


export default Step