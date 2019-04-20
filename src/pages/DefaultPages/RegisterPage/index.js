import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import Register from './Register'

class RegisterPage extends React.Component {
  render() {
    const { match, ...props } = this.props
    return (
      <div className="utils__content">
        <Page {...props}>
          <Helmet title="Register" />
          <Register match={match} />
        </Page>
      </div>
    )
  }
}

export default RegisterPage
