import React from 'react'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
  isRunning: state.app.isTimerRunning
});

@connect(mapStateToProps)
class Timer extends React.Component {

  _timer = null

  state = {
    duration: 0
  }

  calculate = () => {
    const { duration } = this.state;

    const s = duration % 60;
    const sstr = s >= 10 ? `${s}` : `0${s}`;

    const m = parseInt(duration / 60);
    const mstr = m >= 10 ? `${m}` : `0${m}`;

    return `${mstr}:${sstr}`;
  }

  tick = () => {
    const { duration } = this.state;
    this.setState({
      duration: duration + 1
    });
  }

  componentDidMount() {
    console.log('componentDidMount', this.props);
    const { isRunning } = this.props;
    if (isRunning) {
      if (this._timer) clearInterval(this._timer);
      this._timer = setInterval(this.tick, 1000);
    }
  }

  componentWillReceiveProps(next) {
    console.log('componentWillReceiveProps', next);
    const { isRunning } = next;
    if (isRunning) {
      this.setState({ duration: 0 });
      if (this._timer) clearInterval(this._timer);
      this._timer = setInterval(this.tick, 1000);
    } else {
      if (this._timer) clearInterval(this._timer);
    }
  }

  componentWillUnmount() {
    if (this._timer) clearInterval(this._timer);
  }

  render() {
    const time = this.calculate();
    return (
      <div className="d-inline-block mr-4" style={{ fontSize: '18px' }}>
        Timer:
        <span style={{ margin: '0 8px', fontWeight: 'bold' }}>
          {time}
        </span>
      </div>
    )
  }
}

export default Timer
