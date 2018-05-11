import { combineReducers } from 'redux';

import currentUser from './auth';
import currentPhoto from './photo';

export default combineReducers({
  currentUser,
  currentPhoto
});
