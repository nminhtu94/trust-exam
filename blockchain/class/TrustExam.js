import ContractAPI from './ContractAPI'
const TRUST_EXAM_ABI = require('../abi/TrustExam.json')

class TrustExam extends ContractAPI {
  constructor(TRUST_EXAM_ADDRESS, web3Instance) {
    super(TRUST_EXAM_ADDRESS, TRUST_EXAM_ABI, web3Instance)
  }

  examName() {
    let self = this
    return new Promise((resolve, reject) => {
      self.contract.instance.examName((error, result) => {
        if (error) reject(error)
        else resolve(result)
      })
    })
  }

  startTime() {
    let self = this
    return new Promise((resolve, reject) => {
      self.contract.instance.startTime((error, result) => {
        if (error) reject(error)
        else resolve(result.toNumber())
      })
    })
  }

  duration() {
    let self = this
    return new Promise((resolve, reject) => {
      self.contract.instance.duration((error, result) => {
        if (error) reject(error)
        else resolve(result.toNumber())
      })
    })
  }

  submissionWindow() {
    let self = this
    return new Promise((resolve, reject) => {
      self.contract.instance.duration((error, result) => {
        if (error) reject(error)
        else resolve(result.toNumber())
      })
    })
  }

  getListExamIDs() {
    let self = this
    return new Promise((resolve, reject) => {
      self.contract.instance.getListExamIDs((error, result) => {
        if (error) reject(error)
        else resolve(result)
      })
    })
  }

  registerParticipant(participantAddress, examId) {
    let self = this
    return new Promise((resolve, reject) => {
      self.contract.instance.registerParticipant(
        participantAddress,
        examId,
        { from: self.web3.eth.coinbase },
        (error, result) => {
          if (error) reject(error)
          else resolve(result)
        },
      )
    })
  }

  submitHashAnswer(hashAnswer) {
    let self = this
    return new Promise((resolve, reject) => {
      self.contract.instance.submitHashAnswer(
        hashAnswer,
        { from: self.web3.eth.coinbase },
        (error, result) => {
          if (error) reject(error)
          else resolve(result)
        },
      )
    })
  }

  submitRawAnswer(rawAnswer) {
    let self = this
    return new Promise((resolve, reject) => {
      self.contract.instance.submitRawAnswer(
        rawAnswer,
        { from: self.web3.eth.coinbase },
        (error, result) => {
          if (error) reject(error)
          else resolve(result)
        },
      )
    })
  }
}

export default TrustExam;
