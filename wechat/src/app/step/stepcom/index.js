import React from "react";
import { Skeleton } from "antd";
import { HOUSE_LAYOUT } from "./assets";
import Detail from "./Detail";
import "./index.less";

class Stepcom extends React.Component {

  state = {
    loading: true
  };

  render() {
    return (
      <div className='g-stepcom'>
        {HOUSE_LAYOUT.map((item, index) => (
          <Detail item={item} key={index}/>
        ))}
      </div>
    );
  }
}

export default Stepcom;
