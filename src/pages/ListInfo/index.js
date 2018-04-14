import React, { Component } from 'react'
import { getHttp, js2xml } from 'utils'

@getHttp
export default class ListInfo extends Component {
  componentDidMount() {
    this.getAuthorization()
  }

  async getAuthorization() {
    const { http } = this.props
    const reqBodyObj = {
      Packet: {
        $: { type: 'REQUEST', version: '1.0' },
        Head: {
          RequestType: 'V215',
          User: 'XXX'
        },
        Body: {
          BasePart: {
            RescueNo: '2112000010812000024',
            CaseType: '1',
            DestoryDate: '1',
            ServiceFee: '1'
          }
        }
      }
    }
    const res = await http.post(
      '/tpaicwebservice/axaInvokeSend.do',
      js2xml(reqBodyObj)
    )
    console.error(res)
  }

  render() {
    return (
      <div className="listinfo-container">
        <h1>sahiodjaskjdasjdajs;</h1>
      </div>
    )
  }
}
