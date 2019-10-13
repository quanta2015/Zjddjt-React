import { action, runInAction, toJS } from 'mobx'
import BaseActions from 'component/BaseActions'
import * as urls from 'constant/urls'
import { message } from 'antd'
import store from '../store'

import jwt      from 'util/token'
import clone    from 'util/clone'
import * as DT  from 'util/date'
import stat     from 'util/state'

function list2JSON(list) {
  list.forEach((item,index)=>{
    let ret = []

    if ((item.name_list!==null)||(item.url_list!==null)) {
      let nameList = item.name_list.split(',')
      let urlList  = item.url_list.split(',')
      nameList.forEach((obj,i)=>{
        ret.push({ name: obj, url: urlList[i] })
      })
    }
    
    item.files = ret
    item.apdt = DT.formatApdt(item.apdt,true);
    [item.stat_name, item.stat_color] = stat(item.stat)
  })
}


class PlanActions extends BaseActions {
  constructor(store) {
    super()
    this.store = store
  }


  @action
  async listPlan(params) {
    let r = await this.post(urls.API_PLAN_LIST, params, true)
    
    if (r.data.length>0) {
      list2JSON(r.data)
    }
    
    console.log(r)
    if ((r && r.code === 200)) {
      this.store.plan = r.data
    }
  }


}

export default new PlanActions(store)