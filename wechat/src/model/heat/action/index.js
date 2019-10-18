import { action, runInAction, toJS } from 'mobx'
import BaseActions from 'component/BaseActions'
import * as urls from 'constant/urls'
import { message } from 'antd'
import store from '../store'

import list2JSON from 'util/list2JSON'


class HeatActions extends BaseActions {
  constructor(store) {
    super()
    this.store = store
  }


  @action
  async listHeat(params) {
    let r = await this.post(urls.API_HEAT_LIST_S, params, true)
    if ((r && r.code === 200)) {
      if (r.data.length>0) {
        list2JSON(r.data,'heat')
      }
      this.store.heat = r.data
    }
  }



  


}

export default new HeatActions(store)