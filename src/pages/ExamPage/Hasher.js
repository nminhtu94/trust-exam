
var ethAbi = require('ethereumjs-abi');
var ethUtil = require('ethereumjs-util');

// user, value, unlockTimestamp, entropy
const TYPES = ['string'];

export default function(...args) {
  var encodedMsg = ethAbi.rawEncode(TYPES, args);
  return '0x' + ethUtil.keccak256(encodedMsg).toString('hex');
}
