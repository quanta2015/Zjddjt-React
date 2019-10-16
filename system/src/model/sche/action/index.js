import { action, runInAction, toJS } from 'mobx'
import BaseActions from 'component/BaseActions'
import * as urls from 'constant/urls'
import { message } from 'antd'
import store from '../store'
import jwt from 'util/token'
import clone from 'util/clone'
import list2JSON from 'util/list2JSON'


class ScheActions extends BaseActions {
  constructor(store) {
    super()
    this.store = store
  }



  @action
  async getSchedule(params) {
    let r = await this.post(urls.API_SCHE_LIST, params, true)
    if (r && r.code === 200) {
      if (r.data.length>0) {
        list2JSON(r.data,'sche')
      }
      this.store.sche = r.data
    }
    return r
  }

  @action
  async getDetail(params) {
    
    let r = await this.post(urls.API_SCHE_DETL, params, true)
    let s = await this.post(urls.API_SCHE_FILE, params, true)
    if ((r && r.code === 200)&&(s && s.code === 200)) {
      this.store.detail = r.data
      this.store.files  = s.data
    }
    // return r
  }

  @action
  async finishDetail(params) {
    let r = await this.post(urls.API_SCHE_FINISH, params, true)
    if (r && r.code === 200) {
      this.store.detail = r.data
    }
    return r
  }

  @action
  async cancelDetail(params) {
    let r = await this.post(urls.API_SCHE_CANCEL, params, true)
    if (r && r.code === 200) {
      this.store.detail = r.data
    }
    return r
  }

  @action
  async exportSche() {
    let r = await this.post(urls.API_SCHE_EXPORT, null, true)
    if (r && r.code === 200) {
      this.store.applyfile = r.data
    }
    return r
  }
  
  @action
  async uploadFile(file,id) {
    let forms = new FormData()
    forms.append('file',file)
    forms.append('id', id)
    let r = await this.post(urls.API_SCHE_UPLOAD, forms, true)
    if (r && r.code === 200) {
      this.store.files = r.data
    }
    return r
  }

  @action
  async deleteFile(params) {
    let r = await this.post(urls.API_SCHE_DELETE, params, true)
    if (r && r.code === 200) {
      this.store.files = r.data
    }
    return r
  }

  @action
  async stopSche(params) {
    let r = await this.post(urls.API_SCHE_STOP, params, true)
    if (r && r.code === 200) {
      this.store.sche = r.data
    }
    return r
  }


  

}

export default new ScheActions(store)