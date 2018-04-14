import { observable, action } from 'mobx'

class Store {
  @observable loading = false

  @action
  changeLoading(state) {
    console.error(state)
    this.loading = state
  }
}

export default new Store()
