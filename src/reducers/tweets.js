/** 
 * A Reducer describes how an application's state changes. 
 * You’ll often see the Object Spread Operator (...) used inside of a reducer 
 * because a reducer must return a new object instead of mutating the old state. 
 * If you need a refresher on the spread operator, check out this ES6 lesson.
 */

import { RECEIVE_TWEETS } from '../actions/tweets';

export default function tweets (state = {}, action) {
  switch (action.type) {
    case RECEIVE_TWEETS:
      return {
        ...state,
        ...action.tweets
      };
    default:
      return state;
  }
}