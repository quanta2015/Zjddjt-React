import { observable } from 'mobx'

class Store {
  @observable user = null
  @observable isLogin = null
}

export default new Store()