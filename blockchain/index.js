/**
 * Client JS library
 */
var Metamask = require("./lib/class/metamask");
var TrustExam = require("./lib/class/TrustExam");

/**
 * ABIs
 */

var TrustExamABI = require("./lib/abi/TrustExam");

module.exports = {
  Metamask: Metamask,
  TrustExam: TrustExam,
  ABI: {
    TrustExam: TrustExamABI,
  }
};
