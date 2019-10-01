import { action, runInAction, toJS } from 'mobx'
import BaseActions from 'component/BaseActions'
import * as urls from 'constant/urls'
import { message } from 'antd'
import store from '../store'
import jwt from 'util/token'
import clone from 'util/clone'




class UserActions extends BaseActions {
  constructor(store) {
    super()
    this.store = store
  }


  @action
  async login(params) {
    let r = await this.post(urls.API_USER_LOGIN, params, true)
    if (r && r.code === 200) {
      this.saveData(r, this.store)
    }
    return r
  }


}

export default new UserActions(store)