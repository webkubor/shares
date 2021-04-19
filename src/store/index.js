import {
  createStore
} from 'vuex'


export default createStore({
  // 配置数据
  state: {
    counter: 0,
  },
  mutations: {
    add(state) {
      state.counter++
    },
  },
})