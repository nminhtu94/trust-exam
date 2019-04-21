import React from 'react'
import { connect } from 'react-redux'
import { Collapse } from 'antd'
import QuestionCell from './QuestionCell'

import './style.scss'
import { doUpdateTimer } from '../../../ducks/app'

import QuestionObject from './QuestionObject'

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
    super(props);
  }

  componentDidMount() {
    console.log('componentDidMount Exam')
    const { doUpdateTimerAction } = this.props
    doUpdateTimerAction(true)

    setTimeout(() => doUpdateTimerAction(false), 5000)
  }

  getAnswer = () => {
    let questions = document.querySelectorAll('article');
    let answers = [];
    questions.forEach(question => { answers.push(question.getAttribute('answer') || '') })
    const result = answers.join(',')
    return result;
  }

  render() {
    return (
      <div
        className="utils__content"
        style={{ position: 'fixed', top: '64px', bottom: '0', overflowY: 'auto' }}
      >
        <section className="card">
          <div className="card-header">
            <div className="utils__title">
              <strong>Empty Page</strong>
            </div>
          </div>
          <div className="card-body">
            {this.props.questions.map((question, index) => (
              <QuestionCell
                questionNumber={index + 1}
                question={QuestionObject.fromJSON(question)}
                key={Math.random().toString(36)}
              />
            ))}
          </div>
        </section>
      </div>
    )
  }
}

export default Exam
