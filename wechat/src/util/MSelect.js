import React from 'react'
import { Select } from "antd";

const Option = Select.Option;


class MSelect extends Select {

  disableInput() {
    const selects = document.getElementsByClassName(`ant-select-search__field`);
    for (let el of selects) {
      el.setAttribute(`readonly`, "readonly");
    }
  }
  
  componentDidMount() {
    this.disableInput();
  }


  render () {
    var { data, ...rest } = this.props;
    return(
      <Select mode="multiple" {...rest}>
        {data.map((item,index)=>{
          return(
            <Option value={item.val} key ={index}>{item.txt}</Option>
          )
        })}
      </Select>
    )
  }
}

export default MSelect