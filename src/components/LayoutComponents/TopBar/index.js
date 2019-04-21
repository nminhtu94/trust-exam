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
  render() {
    const { fullName, idNumber, location } = this.props
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
          {isExamPage && <Timer />}
          {isExamPage && (
            <div className="d-inline-block mr-8" style={{ fontSize: '18px' }}>
              <Button type="primary" size="large" onClick={this.props.onSubmit}>
                Submit
              </Button>
              <Button type="primary" size="large" onClick={this.props.onSubmitRaw} style={{marginLeft: "10px"}}>
                Submit Final
              </Button>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default TopBar
