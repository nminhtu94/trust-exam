let EventEmitter = require('events')
class Emitter extends EventEmitter {}
const INSTANCE_ERROR = 'Cannot create the instance'

class ContractAPI {
  constructor(contractAdress, contractABI, web3Instance) {
    this.emitter = new Emitter()

    if (!web3Instance) return false
    this.web3 = web3Instance

    if (!contractABI) return false
    if (!contractAdress || !this.web3.isAddress(contractAdress)) return false
    let contractInstance = this.web3.eth.contract(contractABI).at(contractAdress)
    this.contract = {
      ABI: contractABI,
      address: contractAdress,
      instance: contractInstance,
    }
  }

  static get ABI() {
    if (this.contract) {
      return this.contract.contractABI
    }
    return false
  }

  /**
   * Watch any changes
   */
  watch() {
    const self = this
    return new Promise((resolve, reject) => {
      if (!self.contract) return reject(INSTANCE_ERROR)
      const watcher = self.contract.instance.allEvents()
      watcher.watch((er, event) => {
        if (er) return self.emitter.emit('error', er)
        return self.emitter.emit('data', event)
      })

      const stopWatching = function() {
        watcher.stopWatching()
        self.emitter.removeAllListeners()
      }

      return resolve({ stopWatching: stopWatching, event: self.emitter })
    })
  }

  /**
   * Get all data logs of an event from blockchain
   */

  getEventLogs(eventName, eventFilter, fromBlock = 0, toBlock = 'latest') {
    let self = this
    let web3Filter = { fromBlock: fromBlock, toBlock: toBlock }
    return new Promise((resolve, reject) => {
      if (!self.TOKEN) return reject(INSTANCE_ERROR)
      var getter = self.TOKEN.INSTANCE[eventName](eventFilter, web3Filter)
      getter.get((er, eventLogs) => {
        if (er) return self.emitter.emit('error', er)
        const args = eventLogs.map(logs => logs.args)
        return self.emitter.emit(eventName, args)
      })

      var stopWatching = function() {
        getter.stopWatching()
        self.emitter.removeAllListeners()
      }

      return resolve({ stopWatching: stopWatching, event: self.emitter })
    })
  }
}

export default ContractAPI
