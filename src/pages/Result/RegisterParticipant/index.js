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
      result: null,
      participantAddress: "0xD7ED16c081630415aDdE3E31a46C6893C69eaAD9"
    }

  }
  componentDidMount() {
    const { doUpdateTimerAction } = this.props
    doUpdateTimerAction(true)
    // this.onLoadResult()
    setTimeout(() => doUpdateTimerAction(false), 5000)
  }

  render() {
    const { result, startTime } = this.state
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
          <h1 style={{marginBottom: 30}}><b> Result </b></h1>
          <section className="card" style={{ width: '100%' }}>
          <Input
            value={this.state.participantAddress}
            onChange={this.handleTextChange}
            name="participantAddress"
            placeholder="Participant address"
            className="ant-input"
          />
          <Button onClick={this.onLoadResult} className="ant-btn width-100p mr-4 ant-btn-primary"><span>Get result</span></Button>
          {result && <div>
            <div>
              hash: {result.hash}
            </div>
            <div>
              raw: {result.raw}
            </div>
          </div>}
          </section>
        </div>
      </div>
    )
  }




  handleTextChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  onLoadResult = ()=> {
    const {participantAddress} = this.state;
    this.trustExam.results(participantAddress)
      .then(result => {
        this.setState({ result: result});
      })
      .catch(error => {
        // this.setState({examIDs: []});
        console.log(error)
      })
  }
}

export default Exam
