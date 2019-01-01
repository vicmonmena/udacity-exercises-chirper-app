export const RECEIVE_TWEETS = 'RECEIVE_TWEETS';

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