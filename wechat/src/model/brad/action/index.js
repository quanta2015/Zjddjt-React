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
    let url = urls.API_BRAND_ALL

    console.log(url)
    let r = await this.get(url, {},true)
    if (r && r.code === 200) {
      runInAction(() => {
        this.store.brandAll = r.data
      })
    }
    return r
  }
}

export default new BradStore(store)
