import { saveLikeToggle } from '../utils/api'

export const RECEIVE_TWEETS = 'RECEIVE_TWEETS';
export const TOGGLE_TWEET = 'TOGGLE_TWEET';

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

/**
 * Asynchronous action creator
 * @param {object} param0 
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