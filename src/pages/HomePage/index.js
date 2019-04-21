import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'

class HomePage extends React.Component {
  static defaultProps = {
    pathName: 'Home Page',
    roles: ['agent', 'administrator'],
  }

  render() {
    const props = this.props
    return (
      <Page {...props}>
        <p>Ahihi</p>
      </Page>
    )
  }
}

export default HomePage
