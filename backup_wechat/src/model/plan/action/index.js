import { action, runInAction, toJS } from 'mobx'
import BaseActions from 'component/BaseActions'
import * as urls from 'constant/urls'
import { message } from 'antd'
import store from '../store'

import list2JSON from 'util/list2JSON'


class PlanActions extends BaseActions {
  constructor(store) {
    super()
    this.store = store
  }


  @action
  async listPlan(params) {
    let r = await this.post(urls.API_PLAN_LIST, params, true)
    if ((r && r.code === 200)) {
      //转换日期和状态信息
      if (r.data.length>0) {
        list2JSON(r.data,'plan')
      }
      this.store.plan = r.data
    }
  }


}

export default new PlanActions(store)