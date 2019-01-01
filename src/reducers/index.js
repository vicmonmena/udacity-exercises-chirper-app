// In this file we will export our invocation to combine reducers
/** 
 * We will combine all of these reducers into one main, root reducer, 
 * which will combine the results of calling the tweets reducer, 
 * users reducer, and authedUser reducer into a single state object. 
 * 
 * Remember, we need to do this because the createStore function only accepts a single reducer.
 */
import { combineReducers } from 'redux';
import authedUser from './authedUser';
import users from './users';
import tweets from './tweets';

export default combineReducers({
  authedUser,
  users,
  tweets
});