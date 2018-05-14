
import IP from '../../IP';

/* -----------------    ACTION TYPES    ------------------ */

const SET_NUTRITION = 'SET_NUTRITION';
const REMOVE_NUTRITION = 'REMOVE_NUTRITION';

/* ------------     ACTION CREATORS      ------------------ */

export const setNutrition = nutrition => ({ type: SET_NUTRITION, nutrition });
export const removeNutrition = () => ({ type: REMOVE_NUTRITION });

/* ------------          REDUCER         ------------------ */

export default function reducer (currentNutrition = [], action) {
  switch (action.type) {

    case SET_NUTRITION:
      return action.nutrition;

    case REMOVE_NUTRITION:
      return [];

    default:
      return currentNutrition;
  }
}