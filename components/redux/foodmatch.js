
import IP from '../../IP';

/* -----------------    ACTION TYPES    ------------------ */

const SET_FOOD_MATCH = 'SET_FOOD_MATCH';
const REMOVE_FOOD_MATCH = 'REMOVE_FOOD_MATCH';

/* ------------     ACTION CREATORS      ------------------ */

export const setCurrentMatch = match => ({ type: SET_FOOD_MATCH, match });
export const removeCurrentMatch = () => ({ type: REMOVE_FOOD_MATCH });

/* ------------          REDUCER         ------------------ */

export default function reducer (currentMatch = {}, action) {
  switch (action.type) {

    case SET_FOOD_MATCH:
      return action.match;

    case REMOVE_FOOD_MATCH:
      return {};

    default:
      return currentMatch;
  }
}