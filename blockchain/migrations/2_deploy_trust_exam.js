const TrustExam = artifacts.require("TrustExam");
// const startTime = Date.now()/1000 + 1 * 60;
const startTime = Date.now()/1000 + 60;
// const duration = 1 * 60;
const duration = 50;
const submissionWindow = 10 * 60;
console.log(web3.sha3('1'));
console.log(web3.sha3('2'));
console.log(web3.sha3('3'));
const examIds = [
  web3.sha3('1'),
  web3.sha3('2'),
  web3.sha3('3'),
]

module.exports = function(deployer) {
  deployer.deploy(TrustExam, "Trust exam", startTime, duration, submissionWindow, examIds);
};
