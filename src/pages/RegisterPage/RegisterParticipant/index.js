import React from 'react'
import { connect } from 'react-redux'
import './style.scss'
import { doUpdateTimer } from '../../../ducks/app'
import { Table, Button, Form, Input, Select } from 'antd'
import classes from 'dist/'
import moment from 'moment'
const Option = Select.Option
const { Metamask, TrustExam } = classes

const config = require('../../../config')

const ADDRESS = require('../../../' + config.default.blockchain.addressPath + '/TrustExam.json')

const mapStateToProps = state => ({})

const mapDispatchToProps = {
  doUpdateTimerAction: doUpdateTimer,
}

@connect(
  mapStateToProps,
  mapDispatchToProps,
)
class Exam extends React.Component {
  constructor(props) {
    super(props)
    this.metamask = new Metamask()
    this.trustExam = new TrustExam(ADDRESS, this.metamask.web3)
    this.state = {
      examIDs: [],
      selectedExamID: '',
      participantAddress: '0xD7ED16c081630415aDdE3E31a46C6893C69eaAD9',
    }

    this.onLoadExamIds = this.onLoadExamIds.bind(this)
    this.registerParticipant = this.registerParticipant.bind(this)
  }
  componentDidMount() {
    const { doUpdateTimerAction } = this.props
    doUpdateTimerAction(true)
    this.onLoadExamIds()
    this.onLoadStartTime()
    setTimeout(() => doUpdateTimerAction(false), 5000)
  }

  render() {
    const { examIDs, startTime } = this.state
    return (
      <div
        className="utils__content"
        style={{
          position: 'fixed',
          top: '64px',
          bottom: '200',
          overflowY: 'auto',
          left: '300px',
          right: '300px',
          padding: '100px',
          background: '#ffffff',
          borderRadius: '15px'
        }}
      >
        <div>
          <h1 style={{marginBottom: 30}}><b> Register </b></h1>
          <span><p> (*) End time for register participant: {startTime}</p></span>
          <section className="card" style={{ width: '100%' }}>
            <div className="ant-row ant-form-item">
              <label class="ant-form-item-required" title="participantAddress">Participant Address:</label>
              <Input
                value={this.state.participantAddress}
                onChange={this.handleTextChange}
                name="participantAddress"
                placeholder="Participant address"
                className="ant-input"
              />
            </div>

            <div className="ant-row ant-form-item">
              <label class="ant-form-item-required" title="ExamID">Exam ID:</label>
              <Select style={{ width: '100%' }} onChange={index => this.onSelectExamID(index)} className="ant-input">
                <Option key={0}>---Select exam id---</Option>
                {examIDs.map((examIdD, index) => {
                  return <Option key={index + 1}>{examIdD}</Option>
                })}
              </Select>
            </div>

            <Button onClick={this.registerParticipant} className="ant-btn width-100p mr-4 ant-btn-primary"><span>Register participant</span></Button>
          </section>
        </div>
      </div>
    )
  }

  handleTextChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  onSelectExamID(index) {
    const { examIDs } = this.state
    if (index === 0) {
      return this.setState({ selectedExamID: '' })
    }
    return this.setState({ selectedExamID: examIDs[index - 1] })
  }

  onLoadExamIds() {
    this.trustExam
      .getListExamIDs()
      .then(examIDs => {
        this.setState({ examIDs: examIDs })
      })
      .catch(error => {
        // this.setState({examIDs: []});
        console.log(error)
      })
  }

  onLoadStartTime() {
    this.trustExam
      .startTime()
      .then(startTime => {
        console.log(startTime)
        this.setState({ startTime: moment(startTime * 1000).format('MMMM Do YYYY, h:mm:ss a') })
        // this.setState({ examIDs: examIDs })
      })
      .catch(error => {
        // this.setState({examIDs: []});
        console.log(error)
      })
  }

  registerParticipant() {
    const { selectedExamID, participantAddress } = this.state

    this.trustExam
      .registerParticipant(participantAddress, selectedExamID)
      .then(hash => {
        this.setState({ result: hash })
        console.log(hash)
        // this.setState({examIDs: examIDs});
      })
      .catch(error => {
        console.log(error)
      })
  }
}

export default Exam
