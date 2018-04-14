import axios from 'axios'
import store from '../store'
import { portKey } from '../contants'
import xml2js from 'xml2js'
const parseStr = xml2js.parseString

// xml2js
const parseString = function(xml) {
  return new Promise((resolve, reject) => {
    parseStr(xml, (err, result) => {
      if (err) reject(err)
      resolve(result)
    })
  })
}

axios.interceptors.request.use(
  config => {
    config.headers['Content-Type'] = 'text/xml'
    store.changeLoading(true)
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  async response => {
    store.changeLoading(false)
    const { Packet } = await parseString(response.data)
    return { ...response, parseData: Packet }
  },
  error => {
    store.changeLoading(false)
    return Promise.reject(error)
  }
)

export default {
  get(url, params, config) {
    return axios.get(url, { params, ...config })
  },
  post(url, params, portId = '002', config) {
    return axios.post(
      `${url}?portId=${portId}&portKey=${portKey}'`,
      params,
      config
    )
  }
}
