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

  render() {
    const props = this.props
    return [
      <Menu />,
      <Page {...props}>
        <Helmet title="Exam Page" />
        <Exam questions={dataset['003XAD']} />
      </Page>
    ]
  }
}

export default ExamPage
