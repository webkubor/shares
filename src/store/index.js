import {
  createStore
} from 'vuex'
import getWeb3 from '../utils/getWeb'

export default createStore({
  // 配置数据
  state: {
    counter: 0,
    web3: {
      isInjected: false,
      web3Instance: null,
      networkId: null,
      coinbase: null,
      balance: null,
      error: null
    },
    contractInstance: null
  },
  mutations: {
    add(state) {
      state.counter++
    },
    registerWeb3Instance(state, payload) {
      console.log('web3参数变更', payload)
      let result = payload
      let web3Copy = state.web3
      web3Copy.coinbase = result.coinbase
      web3Copy.networkId = result.networkId
      web3Copy.balance = parseInt(result.balance, 10)
      web3Copy.isInjected = result.injectedWeb3
      web3Copy.web3Instance = result.web3
      state.web3 = web3Copy
    }
  },
  actions: {
    registerWeb3({
      commit
    }) {
      console.log('registerWeb3 Action being executed')
      getWeb3.then(result => {
        console.log('committing result to registerWeb3Instance mutation')
        commit('registerWeb3Instance', result)
      }).catch(e => {
        console.error('error in action registerWeb3', e)
      })
    }
  }
})