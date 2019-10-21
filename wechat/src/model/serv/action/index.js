import { action, observable, runInAction, toJS } from "mobx";
import BaseActions from 'component/BaseActions'
import * as urls from 'constant/urls'
import store from '../store'

class ServAction extends BaseActions {
  constructor(store) {
    super()
    this.store = store
  }

  @action
  setServFile(params) {
    this.store.servFileList = params
  }

  @action
  async listServFile(params=0) {
    let r = await this.post(urls.API_SERV_FILE_LIST, params, true)
    if (r && r.code === 200) {
      runInAction(() => {
        this.store.servFileList = r.data
      })
    }
    return r
  }

  @action
  async getUser(openid) {
    let url = `http://www.zjddd.com/userinfoByOpenid?openid=${openid}`
    console.log(url)
    let r = await this.get(url, {}, true)
    console.log('===========', r)
    if (r && r.errcode === undefined) {
      runInAction(() => {
        this.store.currUser = r
      })
    }
    return r
  }
}

export default new ServAction(store)
