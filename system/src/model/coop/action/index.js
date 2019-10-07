import { action, observable, runInAction, toJS } from "mobx";
import BaseActions from 'component/BaseActions'
import * as urls from 'constant/urls'
import store from '../store'

class CoopAction extends BaseActions {
  constructor(store) {
    super()
    this.store = store
  }

  @action
  async addCoop(params) {
    let r = await this.post(urls.API_ADD_COOP, params, true)
    if (r && r.code === 200) {
      this.store.coop = r.data
    }
    console.log(r)
    return r
  }
}

export default new CoopAction(store)
