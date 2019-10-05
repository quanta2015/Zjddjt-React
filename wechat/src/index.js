import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import { configure } from 'mobx'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import 'moment/locale/zh-cn'


import getValue from 'util/getValue'

import injects from 'constant/injects'
import App from './App';
import 'less/global.less'


window.getValue = getValue

configure({ enforceActions: 'observed' })

ReactDOM.render(
  <Provider {...injects}>
    <ConfigProvider locale={zhCN}>
      <App />
    </ConfigProvider>
  </Provider>,
  document.getElementById('root')
)











