import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { handleInitialData } from '../actions/shared'
import Dashboard from './Dashboard'
import Error from './Error'
import LoadingBar from 'react-redux-loading'
import NewTweet from './NewTweet'
import TweetPage from './TweetPage'
import Nav from './Nav'

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
      <Router>
        <Fragment>
          <LoadingBar />
          <div className='container'>
            <Nav />
            { this.props.loading === true 
              ? null
              : <div>
                  <Route path='/' exact component={Dashboard} />
                  <Route path='/tweet/:id' component={TweetPage} />
                  <Route path='/new' component={NewTweet}/>
                </div>
            }
          </div>
        </Fragment>
      </Router>
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