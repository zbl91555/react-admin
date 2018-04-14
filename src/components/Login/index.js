import React, { Component } from 'react'
import { Form, Input, Icon, Button, message } from 'antd'
import userInfo from '../../userInfo'
import './index.scss'

const FormItem = Form.Item

@Form.create()
export default class LoginForm extends Component {
  singUp = () => {
    this.props.form.validateFields((err, values) => {
      if (err) return
      if (this.validateUserInfo(values)) {
        message.error('用户名密码错误' + JSON.stringify(userInfo))
      } else {
        message.success('登陆成功')
        this.props.onLoginSuccess()
      }
    })
  }
  hanleKeyPress = e => {
    if (e.key === 'Enter') {
      this.singUp()
    }
  }
  validateUserInfo = values => {
    return Object.keys(values).some(key => values[key] !== userInfo[key])
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div className="login-container">
        <Form className="login-form">
          {/* <h3 className="login">安盛太平</h3> */}
          <div size="60" className="lock-icon-container">
            <svg viewBox="0 0 24 24" className="lock-icon">
              <path d="M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM8.9 6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1v2H8.9V6zM18 20H6V10h12v10z" />
            </svg>
          </div>
          <FormItem>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: '请输入用户名！' }]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder="Username"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码！' }]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                onKeyPress={this.hanleKeyPress}
                type="password"
                placeholder="Password"
              />
            )}
          </FormItem>
          <Button type="primary" className="sing-up-btn" onClick={this.singUp}>
            登陆
          </Button>
        </Form>
      </div>
    )
  }
}
