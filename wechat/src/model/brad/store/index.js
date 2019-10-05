import { observable } from 'mobx'

class Store {
  // 所有品牌
  @observable brandAll = null
}

export default new Store()
