import React, { Component } from 'react'
import loading from './SVKl.gif'

export default class Loading extends Component {
  render() {
    return (
      <div className="text-center">
        <img className="text-center" style={{height:"400px"}} src={loading} alt="LOading" />
      </div>
    )
  }
}
