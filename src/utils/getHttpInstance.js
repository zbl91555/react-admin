import React, { Component } from 'react'
import PropTypes from 'prop-types'

const getHttpInstance = ComponentToWrap => {
  return class getHttpInstanceComponent extends Component {
    static contextTypes = {
      httpInstance: PropTypes.object.isRequired
    }

    render() {
      const { httpInstance } = this.context
      return <ComponentToWrap {...this.props} http={httpInstance} />
    }
  }
}

export default getHttpInstance
