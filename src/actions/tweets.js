import { saveLikeToggle, saveTweet } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_TWEETS = 'RECEIVE_TWEETS';
export const TOGGLE_TWEET = 'TOGGLE_TWEET';
export const ADD_TWEET = 'ADD_TWEET';

/**
 * This is an ACTION CREATOR
 *
 * @export
 * @returns
 */
export function receiveTweets(tweets) {
  return {
    type: RECEIVE_TWEETS,
    tweets,
  }
}

export function toggleTweet({ id, authedUser, hasLiked }) {
  return {
    type: TOGGLE_TWEET,
    id,
    authedUser,
    hasLiked
  }
}

export function addTweet({tweet}) {
  return {
    type: ADD_TWEET,
    tweet
  }
}

/**
 * Asynchronous action creator
 * @param {object} info 
 */
export function handleToggleTweet(info) {
  return (dispatch) => {
    dispatch(toggleTweet(info))

    return saveLikeToggle(info)
      .catch((e) => {
        console.warn('Error in handleToggleTweet: ', e)
        dispatch(toggleTweet(info))
        alert('There wasn an error linking tweet. Try again.')
      })
  }
}

/**
 * Asynchronous action creator
 * @param {string} text 
 * @param {string} replyingTo
 */
export function handleAddTweet(text, replyingTo) {
  return (dispatch, getState) => {
    const { authedUser } = getState()
    dispatch(showLoading())
    return saveTweet( {
      text,
      author: authedUser,
      replyingTo
    })
      .then((tweet) => dispatch(addTweet(tweet)))
      .then(() => dispatch(hideLoading()))
      .catch((e) => {
        console.warn('Error in handleAddTweet: ', e)
        alert('There wasn an error adding tweet. Try again.')
      })
  }
}