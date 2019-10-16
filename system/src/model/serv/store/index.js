import { observable } from 'mobx'

class Store {
  @observable servFileList = null
}

export default new Store()
