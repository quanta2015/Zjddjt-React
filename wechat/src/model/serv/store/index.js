import { observable } from 'mobx'

class Store {
  @observable servFileList = null
  @observable currUser = null
}

export default new Store()
