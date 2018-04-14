import React, { Component } from 'react'
import './assets/css/reset.css'
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from './routes'
import Login from './pages/Login'
import store from './store'
import { Provider } from 'mobx-react'
import HttpProvider from './components/Provider/HttpProvider'
import httpInstance from './common/httpMidware'
import Layout from './components/Layout'

export default class App extends Component {
  render() {
    return (
      <Router>
        <HttpProvider httpInstance={httpInstance}>
          <Provider store={store}>
            <Login>
              <Layout>
                <Routes />
              </Layout>
            </Login>
          </Provider>
        </HttpProvider>
      </Router>
    )
  }
}
