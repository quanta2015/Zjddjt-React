import { observable } from 'mobx'

class Store {
  @observable servFileList = null
  @observable servQuesList = null
}

export default new Store()
