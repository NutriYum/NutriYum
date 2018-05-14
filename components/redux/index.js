import { combineReducers } from 'redux';

import foodLog from './foodLog';
import currentUser from './auth';
import currentPhoto from './photo';
import currentMatch from './foodmatch'
import currentNutrition from './nutrition'

export default combineReducers({
  currentUser,
  foodLog,
  currentPhoto,
  currentMatch,
  currentNutrition,
});
