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
  async listCoop(params=0) {
    let r = await this.post(urls.API_COOP_LIST, params, true)
    if (r && r.code === 200) {
      runInAction(() => {
        this.store.coopAll = r.data
      })
    }
    return r
  }

  @action
  async exportCoop(params=0) {
    return await this.post(urls.API_COOP_EXPORT, params, true)
  }
}

export default new CoopAction(store)
