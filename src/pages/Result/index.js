import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import RegisterParticipant from './RegisterParticipant'

class ExamPage extends React.Component {
  static defaultProps = {
    pathName: 'Result Page',
    roles: ['agent', 'administrator'],
  }

  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title="Result" />
        <RegisterParticipant />
      </Page>
    )
  }
}

export default ExamPage
