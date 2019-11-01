import { action, runInAction, toJS } from 'mobx'
import BaseActions from 'component/BaseActions'
import * as urls from 'constant/urls'
import { message } from 'antd'
import store from '../store'
import jwt from 'util/token'
import clone from 'util/clone'




class StepActions extends BaseActions {
  constructor(store) {
    super()
    this.store = store
  }


  @action
  async getEleExample() {
    let r = await this.post(urls.API_ELE_EXAMPLE, null, true)
    if (r && r.code === 200) {
      this.store.example = r.data
    }
    return r
  }


}

export default new StepActions(store)