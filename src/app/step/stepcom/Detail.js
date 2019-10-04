import React from "react";

export default class Detail extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    showMore: false
  };

  toggleShowMore = () => {
    this.setState({
      showMore: !this.state.showMore
    });
  };

  render() {
    const { item } = this.props;

    return (
      <div className='m-layout-wrap'>
        {
          this.state.showMore ?
            (
              <div className='m-detail shadow'>
                <div className="m-info">
                  <div className="m-name">{item.name}</div>

                  <div className="m-img">
                    <img src={item.img}/>
                  </div>

                  <br/>

                  <div className="m-detail-content">
                    <h4>类型：</h4>
                    {item.intr}
                  </div>

                  <br/>

                  <div className="m-detail-content">
                    <h4>说明：</h4>
                    {item.detail}
                  </div>

                  <div className="m-area" onClick={this.toggleShowMore}>
                    <span>关闭详情</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="m-brief shadow">
                <div className="m-img">
                  <img src={item.img}/>
                </div>
                <div className="m-info">
                  <div className="m-name">{item.name}</div>
                  <div className="m-area" onClick={this.toggleShowMore}>
                    <span>显示详情</span>
                  </div>
                </div>
              </div>
            )
        }
      </div>
    );
  }
}

// export default function Detail() {
//   const [showMore, setShowMore] = useState(false)
//   const [item, setItem] = useState(item)
//
//   useEffect(() => {
//     setItem(props.item);
//   }, [props]);
//
//   function handleClick() {
//     return setShowMore(!showMore);
//   }
//
//   return (
//     <div className="m-ele-item" key={index}>
//       <div className="m-img">
//         <img src={item.img}/>
//       </div>
//       <div className="m-info">
//         <div className="m-name">{item.name}</div>
//         <div >{item.intr}</div>
//         <div className="m-area" onClick={handleClick}>
//           <span>详细信息</span>
//         </div>
//       </div>
//     </div>
//   )
// }
