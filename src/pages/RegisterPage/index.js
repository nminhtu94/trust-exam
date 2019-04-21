import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import Register from './Register'

class RegisterPage extends React.Component {
  static defaultProps = {
    pathName: 'Register Participant',
    roles: ['agent', 'administrator'],
  }

  render() {
    const props = this.props
    console.log(props)
    return (
      <Page {...props}>
        <Helmet title="Register Participant" />
        <Register />
      </Page>
    )
  }
}

export default RegisterPage
