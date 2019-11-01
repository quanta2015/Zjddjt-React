import { observable } from 'mobx'

class Store {
  @observable coop = null
}

export default new Store()
