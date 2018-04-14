import { Component, Children } from 'react'
import PropTypes from 'prop-types'

class HttpProvider extends Component {
  static propTypes = {
    httpInstance: PropTypes.object.isRequired
  }
  // 必须要指定context中是什么
  static childContextTypes = {
    httpInstance: PropTypes.object.isRequired
  }
  getChildContext() {
    const { httpInstance } = this.props
    return { httpInstance }
  }
  render() {
    // Children.only使我们不需要为空的组件再添加一个<div />
    return Children.only(this.props.children)
  }
}
export default HttpProvider
