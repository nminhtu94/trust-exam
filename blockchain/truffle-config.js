'use strict'
var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = 'tenant wash inside group deposit honey draft math media lunch swing drink';
var rinkebyMnemonic = 'robot lunar grace crazy nerve erode wheel middle actress damp embody measure';

const providerWithMnemonic = (mnemonic, rpcEndpoint) =>
  new HDWalletProvider(mnemonic, rpcEndpoint, 0, 1); //, process.env.PASSWORD);
  
const infuraProvider = network => providerWithMnemonic(
  rinkebyMnemonic,
  `https://${network}.infura.io/V41ku14YR3nX4FYP1Zdx`
);

const rinkebyProvider = process.env.SOLIDITY_COVERAGE
  ? undefined
  : infuraProvider('rinkeby');

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*", // Match any network id
      gas: 8000006,
      gasPrice: 2000000000
    },
    rinkeby: {
      provider: rinkebyProvider,
      network_id: 4, // eslint-disable-line camelcase
      gas: 6900569,
      gasPrice: 5000000000,
    },
    tomotestnet: {
      provider: () => new HDWalletProvider(
        mnemonic,
        "https://testnet.tomochain.com",
        0,
        1,
        true,
        "m/44'/889'/0'/0/",
      ),
      network_id: "89",
      gas: 2000000,
      gasPrice: 10000000000000,
    },
    tomomainnet: {
      provider: () => new HDWalletProvider(
        mnemonic,
        "https://rpc.tomochain.com",
        0,
        1,
        true,
        "m/44'/889'/0'/0/",
      ),
      network_id: "88",
      gas: 2000000,
      gasPrice: 10000000000000,
    }
  }
};