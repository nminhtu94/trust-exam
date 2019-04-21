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
                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
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
                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
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
                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
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
                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
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
              <div className="row" style={{ marginTop: '30px' }}>
                <div className="col-md-3">
                  <Card
                    style={{ width: '100%' }}
                    cover={
                      <img
                        alt="example"
                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
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
                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
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
                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
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
                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
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
