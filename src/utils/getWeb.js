import Web3 from 'web3'

// web3.version.getNetwork() 会返回我们连接的网络ID。

// web3.eth.coinbase() 返回我们节点属于的地址，当使用Metamask的时候这会是我们选择的账户。

// web3.eth.getBalance(<address>) 返回我们作为参数传过去的地址的balance。
/*
* 1. Check for injected web3 (mist/metamask)
* 2. If metamask/mist create a new web3 instance and pass on result
* 3. Get networkId - Now we can check the user is connected to the right network to use our dApp
* 4. Get user account from metamask
* 5. Get user balance
*/

let getWeb3 = new Promise(function (resolve, reject) {
  // 检查插件matemask
 
  if (typeof window.ethereum === "undefined") {
    alert("Consider installing MetaMask!");
    resolve({
      injectedWeb3: web3.isConnected(),
      web3 () {
        return web3
      }
    })
  } else {
    //如果用户安装了MetaMask，你可以要求他们授权应用登录并获取其账号
		ethereum.enable()
    // web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545')) 
    // GANACHE FALLBACK
    reject(new Error('Unable to connect to Metamask'))
  }
}).then(result => {
  return new Promise( (resolve, reject) => {
    // Retrieve network ID
    result.web3().version.getNetwork((err, networkId) => {
      if (err) {
        // If we can't find a networkId keep result the same and reject the promise
        reject(new Error('Unable to retrieve network ID'))
      } else {
        // Assign the networkId property to our result and resolve promise
        result = Object.assign({}, result, {networkId})
        resolve(result)
      }
    })
  })
})
.then(result => {
  return new Promise( (resolve, reject)=> {
    // Retrieve coinbase
    result.web3().eth.getCoinbase((err, coinbase) => {
      if (err) {
        reject(new Error('Unable to retrieve coinbase'))
      } else {
        result = Object.assign({}, result, { coinbase })
        resolve(result)
      }
    })
  })
})
.then(result => {
  return new Promise( (resolve, reject)=> {
    // Retrieve balance for coinbase
    result.web3().eth.getBalance(result.coinbase, (err, balance) => {
      if (err) {
        reject(new Error('Unable to retrieve balance for address: ' + result.coinbase))
      } else {
        result = Object.assign({}, result, { balance })
        resolve(result)
      }
    })
  })
})

export default getWeb3