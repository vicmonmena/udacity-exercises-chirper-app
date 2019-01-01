import React, { Component } from 'react'
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared'
import Dashboard from './Dashboard'

class App extends Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <div>
        { this.props.loading === true 
          ? null 
          : <Dashboard /> 
        }
      </div>
    )
  }
}

/**
 * Adding loading property to App component. 
 * It allows to render UI just when initial data have been loaded.
 * It requires to hook our component by using "connect".
 * @param {*} authedUser
 */
const mapStateToProps = ({ authedUser }) => {
  return {
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App)