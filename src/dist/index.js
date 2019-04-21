/**
 * Client JS library
 */
import Metamask from "./lib/class/Metamask";
import TrustExam from "./lib/class/TrustExam";
// var TrustExam = require("./lib/class/TrustExam");

/**
 * ABIs
 */

var TrustExamABI = require("./lib/abi/TrustExam");

export default {
  Metamask: Metamask,
  TrustExam: TrustExam,
  ABI: {
    TrustExam: TrustExamABI,
  }
};
