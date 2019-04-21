import React from 'react'
import { withRouter } from 'react-router-dom'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import { Card, Icon, Avatar } from 'antd'
import { throws } from 'assert'
const { Meta } = Card

@withRouter
class HomePage extends React.Component {
  static defaultProps = {
    pathName: 'Home Page',
    roles: ['agent', 'administrator'],
  }

  handleOnclick = () => {
    const { history } = this.props
    history.push('/exam')
  }

  render() {
    const props = this.props
    return (
      <Page {...props}>
        <div
          className="utils__content"
          style={{
            position: 'fixed',
            top: '64px',
            bottom: '0',
            left: '0',
            right: '0',
            overflowY: 'auto',
          }}
        >
          <section className="card">
            <div className="card-header">
              <div className="utils__title">
                <strong>Home Page</strong>
              </div>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-3">
                  <Card
                    style={{ width: '100%' }}
                    cover={
                      <img
                        alt="example"
                        src="https://sabakuchsocial.files.wordpress.com/2018/03/physics.jpg?w=930&h=450&crop=1"
                      />
                    }
                    actions={[
                      <span onClick={this.handleOnclick}>
                        <Icon type="edit" />
                      </span>,
                    ]}
                  >
                    <Meta
                      avatar={
                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                      }
                      title="Card title"
                      description="This is the description"
                    />
                  </Card>
                </div>
                <div className="col-md-3">
                  <Card
                    style={{ width: '100%' }}
                    cover={
                      <img
                        alt="example"
                        src="https://tuitionphysics.com/wp-content/uploads/2013/10/physics-exam-preparation.jpg"
                      />
                    }
                    actions={[
                      <span onClick={this.handleOnclick}>
                        <Icon type="edit" />
                      </span>,
                    ]}
                  >
                    <Meta
                      avatar={
                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                      }
                      title="Card title"
                      description="This is the description"
                    />
                  </Card>
                </div>
                <div className="col-md-3">
                  <Card
                    style={{ width: '100%' }}
                    cover={
                      <img
                        alt="example"
                        src="https://1.bp.blogspot.com/-NCqCEIMP4ps/UOl8KQt4_II/AAAAAAAABg8/REjaQIfYhno/s1600/Physics%2BKo%2BExam-753239.jpg"
                      />
                    }
                    actions={[
                      <span onClick={this.handleOnclick}>
                        <Icon type="edit" />
                      </span>,
                    ]}
                  >
                    <Meta
                      avatar={
                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                      }
                      title="Card title"
                      description="This is the description"
                    />
                  </Card>
                </div>
                <div className="col-md-3">
                  <Card
                    style={{ width: '100%' }}
                    cover={
                      <img
                        alt="example"
                        src="https://akm-img-a-in.tosshub.com/indiatoday/images/story/201603/physics-647_030316125329.jpg"
                      />
                    }
                    actions={[
                      <span onClick={this.handleOnclick}>
                        <Icon type="edit" />
                      </span>,
                    ]}
                  >
                    <Meta
                      avatar={
                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                      }
                      title="Card title"
                      description="This is the description"
                    />
                  </Card>
                </div>
              </div>
            </div>
          </section>
        </div>
      </Page>
    )
  }
}

export default HomePage
