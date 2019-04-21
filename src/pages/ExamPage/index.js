import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import Exam from './Exam'
import Menu from 'components/LayoutComponents/Menu'
import { dataset } from '../../dataset/'

class ExamPage extends React.Component {
  static defaultProps = {
    pathName: 'Empty Page',
    roles: ['agent', 'administrator'],
  }

  constructor(props) {
    super(props);

    this.state = {
      answers: []
    };
  }

  getAnswer = () => {
    let questions = document.querySelectorAll('article')
    let answers = []
    questions.forEach(question => {
      answers.push(question.getAttribute('answer') || '')
    })
    // const result = answers.join(',')
    return answers;
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        answer: this.getAnswer()
      })
    }, 500);
  }

  render() {
    const props = this.props
    return [
      <Menu answers={this.state.answer} />,
      <Page {...props}>
        <Helmet title="Exam Page" />
        <Exam questions={dataset['003XAD']} />
      </Page>,
    ]
  }
}

export default ExamPage
