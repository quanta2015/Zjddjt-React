import React from "react";
import { Skeleton } from "antd";
import { HOUSE_LAYOUT } from "./assets";
import Detail from "./Detail";
import "./index.less";

class Examcom extends React.Component {

  state = {
    loading: true
  };

  render() {
    return (
      <div className='g-examcom'>
        {HOUSE_LAYOUT.map((item, index) => (
          <Detail item={item} key={index}/>
        ))}
      </div>
    );
  }
}

export default Examcom;
