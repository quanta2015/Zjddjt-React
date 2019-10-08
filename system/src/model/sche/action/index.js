import { action, runInAction, toJS } from 'mobx'
import BaseActions from 'component/BaseActions'
import * as urls from 'constant/urls'
import { message } from 'antd'
import store from '../store'
import jwt from 'util/token'
import clone from 'util/clone'


class AppyActions extends BaseActions {
  constructor(store) {
    super()
    this.store = store
  }



  @action
  async getSchedule(params) {
    let r = await this.post(urls.API_SCHE_LIST, params, true)
    if (r && r.code === 200) {
      this.store.sche = r.data
    }
    return r
  }

  @action
  async getDetail(params) {
    let r = await this.post(urls.API_SCHE_DETL, params, true)
    if (r && r.code === 200) {
      this.store.detail = r.data
    }
    return r
  }

  @action
  async finishDetail(params) {
    let r = await this.post(urls.API_SCHE_FINISH, params, true)
    if (r && r.code === 200) {
      this.store.detail = r.data
    }
    return r
  }


  

  


}

export default new AppyActions(store)