import { combineReducers } from 'redux';

import foodLog from './foodLog';

import currentUser from './auth';

export default combineReducers({
  currentUser,
  foodLog,
});
