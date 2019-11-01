import { action, observable, runInAction, toJS } from "mobx";
import BaseActions from 'component/BaseActions'
import * as urls from 'constant/urls'
import store from '../store'

class BradStore extends BaseActions {
  constructor(store) {
    super()
    this.store = store
  }

  @action
  async getBrandAll() {
    let r = await this.get(urls.API_BRAND_ALL, {},true)
    if (r && r.code === 200) {
      runInAction(() => {
        this.store.brandAll = r.data
      })
    }
    return r
  }
}

export default new BradStore(store)
