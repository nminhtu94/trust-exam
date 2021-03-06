import React from 'react'
import { connect } from 'react-redux'
import { Menu, Layout } from 'antd'
import { Link, withRouter } from 'react-router-dom'
import { reduce } from 'lodash'
import { setLayoutState } from 'ducks/app'
import { Scrollbars } from 'react-custom-scrollbars'
import { default as menuData } from './menuData'
import './style.scss'

const { Sider } = Layout
const SubMenu = Menu.SubMenu
const Divider = Menu.Divider

const mapStateToProps = ({ app, routing }, props) => {
  const { layoutState } = app
  return {
    pathname: routing.location.pathname,
    collapsed: layoutState.menuCollapsed,
    theme: layoutState.themeLight ? 'light' : 'dark',
    settingsOpened: layoutState.settingsOpened,
  }
}

@connect(mapStateToProps)
@withRouter
class MenuLeft extends React.Component {
  state = {
    pathname: this.props.pathname,
    collapsed: this.props.collapsed,
    theme: this.props.theme,
    selectedKeys: '',
    openKeys: [''],
    settingsOpened: this.props.settingsOpened,
  }

  handleClick = e => {
    const { dispatch, isMobile } = this.props
    if (isMobile) {
      // collapse menu on isMobile state
      dispatch(setLayoutState({ menuMobileOpened: false }))
    }
    if (e.key === 'settings') {
      // prevent click and toggle settings block on theme settings link
      dispatch(setLayoutState({ settingsOpened: !this.state.settingsOpened }))
      return
    }
    // set current selected keys
    this.setState({
      selectedKeys: e.key,
    })
  }

  onOpenChange = openKeys => {
    this.setState({
      openKeys: openKeys,
    })
  }

  getPath(data, id, parents = []) {
    const { selectedKeys } = this.state
    let items = reduce(
      data,
      (result, entry) => {
        if (result.length) {
          return result
        } else if (entry.url === id && selectedKeys === '') {
          return [entry].concat(parents)
        } else if (entry.key === id && selectedKeys !== '') {
          return [entry].concat(parents)
        } else if (entry.children) {
          let nested = this.getPath(entry.children, id, [entry].concat(parents))
          return nested ? nested : result
        }
        return result
      },
      [],
    )
    return items.length > 0 ? items : false
  }

  getActiveMenuItem = (props, items) => {
    const { selectedKeys, pathname } = this.state
    let { collapsed } = props
    let [activeMenuItem, ...path] = this.getPath(items, !selectedKeys ? pathname : selectedKeys)

    if (collapsed) {
      path = ['']
    }

    this.setState({
      selectedKeys: activeMenuItem ? activeMenuItem.key : '',
      openKeys: activeMenuItem ? path.map(entry => entry.key) : [],
      collapsed,
    })
  }

  generateMenuPartitions(items) {
    return items.map(menuItem => {
      if (menuItem.children) {
        let subMenuTitle = (
          <span className="menuLeft__title-wrap" key={menuItem.key}>
            <span className="menuLeft__item-title">{menuItem.title}</span>
            {menuItem.icon && <span className={menuItem.icon + ' menuLeft__icon'} />}
          </span>
        )
        return (
          <SubMenu title={subMenuTitle} key={menuItem.key}>
            {this.generateMenuPartitions(menuItem.children)}
          </SubMenu>
        )
      }
      return this.generateMenuItem(menuItem)
    })
  }

  generateMenuItem(answers) {
    return (
      answers &&
      answers.map((answer, index) => (
        <Menu.Item
          key={Math.random().toString(36)}
          disabled={false}
          onClick={() => document.getElementById('question-cell' + (index + 1)).scrollIntoView()}
        >
          <b className="menuLeft__item-title" style={{ width: 30 }}>
            {index + 1}.{' '}
          </b>
          <span>{answer === '' ? '__' : String.fromCharCode(65 + parseInt(answer))}</span>
        </Menu.Item>
      ))
    )
  }

  onCollapse = (value, type) => {
    const { dispatch } = this.props
    const { collapsed } = this.state
    if (type === 'responsive' && collapsed) {
      return
    }
    dispatch(setLayoutState({ menuCollapsed: !collapsed }))
  }

  componentDidMount() {
    this.getActiveMenuItem(this.props, menuData)
  }

  componentWillReceiveProps(newProps) {
    this.setState(
      {
        selectedKeys: '',
        pathname: newProps.pathname,
        theme: newProps.theme,
        settingsOpened: newProps.settingsOpened,
      },
      () => {
        if (!newProps.isMobile) {
          this.getActiveMenuItem(newProps, menuData)
        }
      },
    )
  }

  render() {
    const { collapsed, selectedKeys, openKeys, theme } = this.state
    const { isMobile } = this.props
    const menuItems = this.generateMenuItem(this.props.answers)
    const paramsMobile = {
      width: 256,
      collapsible: false,
      collapsed: false,
      onCollapse: this.onCollapse,
    }
    const paramsDesktop = {
      width: 200,
      collapsible: false,
      collapsed: false,
      onCollapse: this.onCollapse,
      breakpoint: 'lg',
    }
    const params = isMobile ? paramsMobile : paramsDesktop
    return (
      <Sider {...params} className="menuLeft">
        <Scrollbars
          autoHide
          style={{ height: isMobile ? 'calc(100vh - 30px)' : 'calc(100vh - 30px)' }}
        >
          <Menu
            theme={theme}
            onClick={this.handleClick}
            selectedKeys={[selectedKeys]}
            openKeys={openKeys}
            onOpenChange={this.onOpenChange}
            mode="inline"
            className="menuLeft__navigation"
          >
            {menuItems}
          </Menu>
        </Scrollbars>
      </Sider>
    )
  }
}

export { MenuLeft, menuData }
