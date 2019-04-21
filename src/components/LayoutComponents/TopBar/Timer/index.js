import React from 'react'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
  isRunning: state.app.isTimerRunning,
})

@connect(mapStateToProps)
class Timer extends React.Component {
  _timer = null

  state = {
    duration: 0,
  }

  calculate = () => {
    const { duration } = this.state

    const s = duration % 60
    const sstr = s >= 10 ? `${s}` : `0${s}`

    const m = parseInt(duration / 60)
    const mstr = m >= 10 ? `${m}` : `0${m}`

    return `${mstr}:${sstr}`
  }

  tick = () => {
    const { duration } = this.state
    this.setState({
      duration: duration + 1,
    })
  }

  componentDidMount() {
    console.log('componentDidMount', this.props)
    const { isRunning } = this.props
    // if (isRunning) {
    //   if (this._timer) clearInterval(this._timer)
    //   this._timer = setInterval(this.tick, 1000)
    // }
    this.interval = setInterval(() => {
      this.forceUpdate()
    }, 1000)
  }

  componentWillReceiveProps(next) {
    console.log('componentWillReceiveProps', next)
    const { isRunning } = next
    if (isRunning) {
      this.setState({ duration: 0 })
      if (this._timer) clearInterval(this._timer)
      this._timer = setInterval(this.tick, 1000)
    } else {
      if (this._timer) clearInterval(this._timer)
    }
  }

  componentWillUnmount() {
    if (this._timer) clearInterval(this._timer)
    if (this.interval) clearInterval(this.interval)
  }

  formatExpiresTime = seconds => {
    let _seconds = seconds
    let text = ''
    const secondInHour = 60 * 60
    const secondInMinute = 60

    text += `${
      parseInt(_seconds / secondInHour) >= 10
        ? parseInt(_seconds / secondInHour)
        : `0${parseInt(_seconds / secondInHour)}`
      }:`
    _seconds %= secondInHour

    text += `${
      parseInt(_seconds / secondInMinute) >= 10
        ? parseInt(_seconds / secondInMinute)
        : `0${parseInt(_seconds / secondInMinute)}`
      }:`
    _seconds %= secondInMinute

    text += _seconds >= 10 ? _seconds : `0${_seconds}`
    return text
  }

  render() {
    const time = this.calculate()
    const timeUpAt = 1555825126392
    const timeLeft = parseInt((timeUpAt - new Date().getTime()) / 1000)
    const isExpired = timeLeft < 0

    return (
      <div className="d-inline-block mr-4" style={{ fontSize: '18px' }}>
        Time left:
        <span style={{ margin: '0 8px', fontWeight: 'bold' }}>
          {this.formatExpiresTime(timeLeft)}
        </span>
      </div>
    )
  }
}

export default Timer
