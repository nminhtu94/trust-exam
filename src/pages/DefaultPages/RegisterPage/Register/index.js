import React from 'react'
import RegisterForm from './RegisterForm'
import './style.scss'

class Register extends React.Component {
  state = {}

  componentDidMount() {
    document.getElementsByTagName('body')[0].style.overflow = 'hidden'
  }

  componentWillUnmount() {
    document.getElementsByTagName('body')[0].style.overflow = ''
  }

  render() {
    return (
      <div className="main-login main-login--fullscreen">
        <div className="main-login__block main-login__block--extended pb-0">
          <div className="row">
            <div className="col-xl-12">
              <div className="main-login__block__inner">
                <div className="main-login__block__form">
                  <RegisterForm email={this.state.restoredEmail} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Register
