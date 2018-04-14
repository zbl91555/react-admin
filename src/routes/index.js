import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import ListInfo from '../pages/ListInfo'
export default class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/listmanger/listinfo" component={ListInfo} />
        <Route render={() => <Redirect to="/listmanger/listinfo" />} />
      </Switch>
    )
  }
}
