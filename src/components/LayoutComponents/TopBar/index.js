import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Button } from 'antd'
import ProfileMenu from './ProfileMenu'
import IssuesHistory from './IssuesHistory'
import ProjectManagement from './ProjectManagement'
import BitcoinPrice from './BitcoinPrice'
import HomeMenu from './HomeMenu'
import LiveSearch from './LiveSearch'
import Timer from './Timer'
import './style.scss'
import classes from 'dist/'
const { Metamask, TrustExam } = classes
const config = require('../../../config')

const ADDRESS = require('../../../' + config.default.blockchain.addressPath + '/TrustExam.json')

const mapStateToProps = ({ app }) => {
  const { userState } = app
  return {
    fullName: userState.email,
    idNumber: userState.id,
  }
}

@withRouter
@connect(mapStateToProps)
class TopBar extends React.Component {
  constructor() {
    super();
    this.metamask = new Metamask()
    this.trustExam = new TrustExam(ADDRESS, this.metamask.web3);
    this.state = {
      startTime: 0,
      endTime: 0,
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.forceUpdate()
    }, 1000)
    this.onGetEndTime();
    this.onGetStartTime();
  }

  render() {
    const { fullName, idNumber, location } = this.props
    const { startTime, endTime } = this.state;

    const startLeft = parseInt((startTime - new Date().getTime()/1000))
    const endLeft = parseInt((endTime - new Date().getTime()/1000))
    const isExamPage = location.pathname === '/exam'
    return (
      <div className="topbar">
        <div className="topbar__left">
          <div className="d-inline-block mr-4" style={{ fontSize: '18px' }}>
            Full name:
            <span style={{ margin: '0 8px', fontWeight: 'bold' }}>{fullName}</span>
          </div>
          <div className="d-inline-block mr-4" style={{ fontSize: '18px' }}>
            ID number:
            <span style={{ margin: '0 8px', fontWeight: 'bold' }}>{idNumber}</span>
          </div>
        </div>
        <div className="topbar__right">
          {isExamPage && startLeft < 0 && endLeft >0  && <Timer />}
          {isExamPage && (
            <div className="d-inline-block mr-8" style={{ fontSize: '18px' }}>

              {startLeft < 0 && endLeft >0 &&<Button type="primary" size="large" onClick={this.props.onSubmit}>
                Submit
              </Button>}
              {endLeft < 0 && <Button type="primary" size="large" onClick={this.props.onSubmitRaw} style={{marginLeft: "10px"}}>
                Submit Final
              </Button>}
            </div>
          )}
        </div>
      </div>
    )
  }


  onGetStartTime = () => {
    this.trustExam.startTime()
    .then(startTime => {
      this.setState({startTime: startTime});
    }).catch(error => {
      console.log(error)
    });
  }

  onGetEndTime = () => {
    this.trustExam.endTime()
    .then(endTime => {
      console.log(endTime)
      this.setState({endTime: endTime});
    }).catch(error => {
      console.log(error)
    });
  }
}

export default TopBar
