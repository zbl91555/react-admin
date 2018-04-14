import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
// import { getHttp, js2xml } from '../../utils'
// import { Route } from 'react-router-dom'
import LoginComponent from '../../components/Login'
// @getHttp
@withRouter
export default class Login extends Component {
  state = {
    isLogin: !!window.sessionStorage.getItem('USER_LOGIN')
  }

  handleLoginSuccess = () => {
    window.sessionStorage.setItem('USER_LOGIN', true)
    this.setState({
      isLogin: true
    })
  }

  render() {
    const { isLogin } = this.state
    // <div>{this.props.children}</div>
    return (
      <div>
        {isLogin ? (
          this.props.children
        ) : (
          <LoginComponent onLoginSuccess={this.handleLoginSuccess} />
        )}
      </div>
    )
  }
}
