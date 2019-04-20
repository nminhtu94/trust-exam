import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'antd'
import ProfileMenu from './ProfileMenu'
import IssuesHistory from './IssuesHistory'
import ProjectManagement from './ProjectManagement'
import BitcoinPrice from './BitcoinPrice'
import HomeMenu from './HomeMenu'
import LiveSearch from './LiveSearch'
import './style.scss'

const mapStateToProps = ({ app }) => {
  const { userState } = app;
  return {
    fullName: userState.email,
    idNumber: userState.id
  };
};

@connect(mapStateToProps)
class TopBar extends React.Component {
  render() {
    const { fullName, idNumber } = this.props;
    return (
      <div className="topbar">
        <div className="topbar__left">
          <div className="d-inline-block mr-4" style={{ fontSize: '18px' }}>
            Full name:
            <span style={{ margin: '0 8px', fontWeight: 'bold' }}>
              {fullName}
            </span>
          </div>
          <div className="d-inline-block mr-4" style={{ fontSize: '18px' }}>
            ID number:
            <span style={{ margin: '0 8px', fontWeight: 'bold' }}>
              {idNumber}
            </span>
          </div>
        </div>
        <div className="topbar__right">
          <div className="d-inline-block mr-4" style={{ fontSize: '18px' }}>
            <Button type="primary" size="large">Submit</Button>
          </div>
          {/* <a
            href="https://themeforest.net/item/clean-ui-admin-template-react-redux-ant-design-fully-responsive-freebies/21938700"
            target="_blank"
            rel="noopener noreferrer"
            className="mr-4 d-none d-sm-inline"
          >
            <Button type="danger">Buy Now 25$</Button>
          </a> */}
          {/* <BitcoinPrice />
          <HomeMenu />
          <ProfileMenu /> */}
        </div>
      </div>
    )
  }
}

export default TopBar
