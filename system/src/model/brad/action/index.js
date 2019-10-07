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
    let r = await this.get(urls.API_BRAND_LIST, {},true)
    if (r && r.code === 200) {
      runInAction(() => {
        this.store.brandAll = r.data
      })
    }
    return r
  }

  @action
  async addBrand(params) {
    let r = await this.post(urls.API_BRAND_ADD, params,true)
    if (r && r.code === 200) {
      await this.getBrandAll()
    }
    return r
  }

}

export default new BradStore(store)
