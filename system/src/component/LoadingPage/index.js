import React from 'react'
import Loading from 'react-loading-spinkit'

class LoadingPage extends React.Component {
  render() {
    return (
      <div style={{ height: '100vh', width: '100%' }}>
        <Loading show={true} />
      </div>
    )
  }
}

export default LoadingPage
