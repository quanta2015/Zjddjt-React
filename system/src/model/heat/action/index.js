import { action, runInAction, toJS } from 'mobx'
import BaseActions from 'component/BaseActions'
import * as urls from 'constant/urls'
import { message } from 'antd'
import store from '../store'
import jwt from 'util/token'
import clone from 'util/clone'
import list2JSON from 'util/list2JSON'


class HeatActions extends BaseActions {
  constructor(store) {
    super()
    this.store = store
  }


  @action
  async getHeatList(params) {
    let r = await this.post(urls.API_HEAT_LIST, params, true)
    if (r && r.code === 200) {
      this.store.heat = r.data
    }
    return r
  }

  @action
  async setHeatShow(params) {
    let r = await this.post(urls.API_HEAT_SHOW, params, true)
    if (r && r.code === 200) {
      this.store.heat = r.data
    }
    return r
  }

  @action
  async getHeatComment(params) {
    let r = await this.post(urls.API_HEAT_COMMENT, params, true)
    
    return r
  }
  


  


}

export default new HeatActions(store)