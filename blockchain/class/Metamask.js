var Web3 = require('web3')
var EventEmitter = require('events')

const NETWORK_CHANGED = 'network'
const ACCOUNT_CHANGED = 'account'
const BALANCE_CHANGED = 'balance'
const ACCOUNT_ERROR = 'Cannot get account'
const ADDRESS_ERROR = 'Invalid address'

const STATUS = {
  INIT: {
    loggedIn: false,
    code: 404,
    status: 'INIT',
    message: 'Initialing',
  },
  NO_METAMASK_INSTALLED: {
    loggedIn: false,
    code: 400,
    status: 'NO_METAMASK_INSTALLED',
    message: 'Metamask was not installed',
  },
  METAMASK_FOUND_NO_LOGGED_IN: {
    loggedIn: false,
    code: 401,
    status: 'METAMASK_FOUND_NO_LOGGED_IN',
    message: 'Metamask was not logged in',
  },
  METAMASK_FOUND_LOGGED_IN_NETWORK_INVALID: {
    loggedIn: false,
    code: 402,
    status: 'METAMASK_FOUND_LOGGED_IN_NETWORK_INVALID',
    message: 'Network is invalid',
  },
  METAMASK_FOUND_NO_ACCOUND: {
    loggedIn: false,
    code: 403,
    status: 'METAMASK_FOUND_NO_ACCOUND',
    message: 'Has no account',
  },
  NETWORK_ERROR: {
    loggedIn: false,
    code: 404,
    status: 'NETWORK_ERROR',
    message: 'Has no connection',
  },
  METAMASK_LOGGED_IN: {
    loggedIn: true,
    code: 200,
    status: 'METAMASK_LOGGED_IN',
    message: 'Success',
  },
}

class Metamask {
  constructor() {
    class Emitter extends EventEmitter {}
    this.emitter = new Emitter()

    this.USER = {
      NETWORK: null,
      ACCOUNT: null,
      BALANCE: null,
      CHANGED: null,
    }
    if (!window.web3 || !window.web3.currentProvider) return false
    this.web3 = new Web3(window.web3.currentProvider)
  }

  /**
   * Check metamask totally
   * @param {*} netcode - optional
   */
  metaStatus(netcode = 0) {
    var self = this
    return new Promise((resolve, reject) => {
      if (!window.web3 || !window.web3.currentProvider) return reject(STATUS.NO_METAMASK_INSTALLED)
      self
        .getNetwork()
        .then(net => {
          self
            .getAccount()
            .then(acc => {
              if (netcode && netcode !== net)
                return reject(STATUS.METAMASK_FOUND_LOGGED_IN_NETWORK_INVALID)
              return resolve(STATUS.METAMASK_LOGGED_IN)
            })
            .catch(er => {
              if (er) reject(STATUS.METAMASK_FOUND_NO_LOGGED_IN)
            })
        })
        .catch(er => {
          if (er) reject(STATUS.NETWORK_ERROR)
        })
    })
  }

  /**
   * Check valid address
   * @param {*} address
   */
  isAddress(address) {
    return this.web3.isAddress(address)
  }

  /**
   * Get network id
   */
  getNetwork() {
    var self = this
    return new Promise((resolve, reject) => {
      self.web3.version.getNetwork((er, re) => {
        if (er) return reject(er)
        return resolve(re)
      })
    })
  }

  /**
   * Get account info
   */
  getAccount() {
    var self = this
    self.web3 = new Web3(window.web3.currentProvider)
    return new Promise((resolve, reject) => {
      var re = self.web3.eth.coinbase
      if (!re || !self.isAddress(re)) return reject(ACCOUNT_ERROR)
      return resolve(re)
    })
  }

  /**
   * Get account balance
   * @param {*} address
   */
  getBalance(address) {
    var self = this
    return new Promise((resolve, reject) => {
      if (!self.isAddress(address)) return reject(ADDRESS_ERROR)
      self.web3.eth.getBalance(address, (er, re) => {
        if (er) return reject(er)
        return resolve(Number(re))
      })
    })
  }

  /**
   * Fetch info of USER
   */
  fetch() {
    var self = this
    return new Promise((resolve, reject) => {
      self
        .getNetwork()
        .then(re => {
          self.USER.NETWORK = re
          return self.getAccount()
        })
        .then(re => {
          self.USER.ACCOUNT = re
          if (!self.USER.ACCOUNT) return reject(ACCOUNT_ERROR)
          return self.getBalance(self.USER.ACCOUNT)
        })
        .then(re => {
          self.USER.BALANCE = re
          let data = JSON.parse(JSON.stringify(self.USER))
          return resolve(data)
        })
        .catch(er => {
          return reject(er)
        })
    })
  }

  /**
   * Watch any changes of provider
   */
  watch() {
    var self = this
    return new Promise(resolve => {
      var watchCurrentAccount = setInterval(() => {
        // if(self.USER) console.log(self.USER.ACCOUNT);
        // Watch switching network event
        self
          .getNetwork()
          .then(re => {
            if (self.USER.NETWORK !== re) {
              self.USER.NETWORK = re
              self.USER.CHANGED = NETWORK_CHANGED
              let data = JSON.parse(JSON.stringify(self.USER))
              return self.emitter.emit('data', data)
            }
          })
          .catch(er => {
            return self.emitter.emit('error', er)
          })
        // Watch switching account event
        self
          .getAccount()
          .then(re => {
            if (self.USER.ACCOUNT !== re) {
              self.USER.ACCOUNT = re
              self.USER.CHANGED = ACCOUNT_CHANGED
              let data = JSON.parse(JSON.stringify(self.USER))
              return self.emitter.emit('data', data)
            }
          })
          .catch(er => {
            self.USER.ACCOUNT = ''
            self.USER.CHANGED = ''
            return self.emitter.emit('error', er)
          })
        // Watch changing balance event
        self
          .getBalance(self.USER.ACCOUNT)
          .then(re => {
            if (self.USER.BALANCE !== re) {
              self.USER.BALANCE = re
              self.USER.CHANGED = BALANCE_CHANGED
              let data = JSON.parse(JSON.stringify(self.USER))
              return self.emitter.emit('data', data)
            }
          })
          .catch(er => {
            self.USER.BALANCE = ''
            self.USER.CHANGED = ''
            return self.emitter.emit('error', er)
          })
      }, 2000)

      var stopWatching = function() {
        clearInterval(watchCurrentAccount)
        self.emitter.removeAllListeners()
      }

      return resolve({ stopWatching: stopWatching, event: self.emitter })
    })
  }
}

export default Metamask
