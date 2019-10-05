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
  async addApply(params) {
    let r = await this.post(urls.API_ADD_APPLY, params, true)
    if (r && r.code === 200) {
      this.store.apply = r.data
    }
    return r
  }


}

export default new AppyActions(store)