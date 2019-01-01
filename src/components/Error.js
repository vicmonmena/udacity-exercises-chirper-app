import React, { Component } from 'react'

class Error extends Component {
  render() {
    const { message } = this.props
    return (
      <div>
        <h3>An error occurred loading content!</h3>
        <p>{message}</p>
      </div>
    )
  }
}

export default Error