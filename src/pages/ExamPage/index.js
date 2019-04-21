import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import Exam from './Exam'
import Menu from 'components/LayoutComponents/Menu'
import TopBar from 'components/LayoutComponents/TopBar'
import { Layout as AntLayout } from 'antd'
import { dataset } from '../../dataset/'

import qs from 'querystring';
import classes from 'dist/'
import Hasher from './Hasher';
const { Metamask, TrustExam } = classes
const config = require('../../config')

const ADDRESS = require('../../' + config.default.blockchain.addressPath + '/TrustExam.json')

const AntHeader = AntLayout.Header
const AntContent = AntLayout.Content

class ExamPage extends React.Component {
  static defaultProps = {
    pathName: 'Empty Page',
    roles: ['agent', 'administrator'],
  }

  constructor(props) {
    super(props)
    this.metamask = new Metamask()
    this.trustExam = new TrustExam(ADDRESS, this.metamask.web3)

    const params = qs.parse(props.location.search)
    console.log(params)

    this.state = {
      answers: [],
      title: params['?title'] || 'Computer Science',
      finalAnswer: "",
    }
  }

  getAnswer = () => {
    let questions = document.querySelectorAll('article')
    let answers = []
    questions.forEach(question => {
      answers.push(question.getAttribute('answer') || '')
    })
    return answers
  }

  submit = () => {
    const answers = this.getAnswer();
    const answerString = answers.join(',');
    this.setState({finalAnswer: answers});
    const hashAnswer = Hasher(answerString);
    console.log(hashAnswer);
    this.trustExam.submitHashAnswer(hashAnswer)
    .then(hash => {
      this.setState({hash: hash});
    }).catch(error => {
      this.setState({hash: ""});
      console.log(error)
    })
  }

  submitRaw = () => {
    const { finalAnswer } = this.state;
    console.log(finalAnswer)
    this.setState({answers: finalAnswer});
    this.trustExam.submitRawAnswer(finalAnswer.join(','))
    .then(hash => {
      this.setState({hash: hash});
    }).catch(error => {
      this.setState({hash: ""});
      console.log(error)
    });
  }

  componentDidMount() {
    this.onGetStartTime();
    this.onGetEndTime();
    setInterval(() => {
      this.setState({
        answer: this.getAnswer(),
      })
    }, 500)
  }

  render() {
    const props = this.props
    return [
      <Menu answers={this.state.answer} key="menu" />,
      <Page {...props} key="page">
        <AntHeader key="topBar">
          <TopBar onSubmit={this.submit} onSubmitRaw={this.submitRaw} />
          {/* <TopBar onSubmit={this.submitRaw} /> */}
        </AntHeader>
        <Helmet title={this.state.title} />
        <Exam questions={dataset['003XAD']} title={this.state.title} />
      </Page>,
    ]
  }
  onGetStartTime = () => {
    this.trustExam.startTime()
    .then(startTime => {
      this.setstate({startTime: startTime});
    }).catch(error => {
      console.log(error)
      this.setState({startTime: null});
    })
  }
  
  onGetEndTime = () => {
    this.trustExam.endTime()
    .then(endTime => {
      this.setstate({endTime: endTime});
    }).catch(error => {
      console.log(error)
      this.setState({endTime: null});
    })
  }
}


export default ExamPage
