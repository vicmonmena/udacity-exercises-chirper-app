import React, { Component } from 'react'
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared'
import Error from './Error'
import LoadingBar from 'react-redux-loading'
import NewTweet from './NewTweet'
import TweetPage from './TweetPage'
class App extends Component {

  state = {
    hasError: false
  }

  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    // TODO: You can also log the error to an error reporting service
  }


  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (<div><Error message="There is a problem trying to load tweets" /></div>);
    }
    return (
      <div>
          <LoadingBar />
          { this.props.loading === true 
            ? null
            : <TweetPage match={{params: {id: '8xf0y6ziyjabvozdd253nd'}}}/>
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