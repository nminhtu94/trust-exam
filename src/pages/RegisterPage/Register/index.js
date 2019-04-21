import React, { PureComponent, Component } from 'react';

import { Table, Button, Form, Input } from 'antd';
import { Metamask, TrustExam } from 'dist/';

console.log(TrustExam)
const config = require('config');
console.log('../../' + config.default.blockchain.addressPath + '/TrustExam.json')
const ADDRESS = require('../../' + config.default.blockchain.addressPath + '/TrustExam.json');
class RegisterParticipant extends Component {
  constructor(props) {
    super(props);
    this.metamask = new Metamask();
    this.trustExam = new TrustExam(ADDRESS, this.metamask.web3);
    this.state = {
      examIDs: [],
      selectedExamID: "",
      participantAddress: ""
    }
  }

  render() {
    return <div>Register participant</div>
  }

  onLoadExamIDs() {
    
  }
}

export default RegisterParticipant;