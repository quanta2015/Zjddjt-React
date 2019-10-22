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
  async delServFile(params) {
    let r = await this.post(urls.API_SERV_FILE_DELETE, params, true)
    if (r && r.code === 200) {
      this.listServQues()
    }
    return r
  }

  @action
  async updateServQues(params) {
  let r = await this.post(urls.API_SERV_QUES_UPDATE, params, true)
    if (r && r.code === 200) {
      this.listServQues()
    }
    return r
  }

  @action
  async listServQues() {
    let r = await this.post(urls.API_SERV_QUES_LIST, {}, true)
    if (r && r.code === 200) {
      runInAction(() => {
        this.store.servQuesList = r.data
      })
    }
    return r
  }
}

export default new ServAction(store)
