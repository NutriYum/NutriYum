import axios from 'axios'

import IP from '../../IP';

const frontEndAxios = axios.create

/**
 * ACTION TYPES
 */

const GET_FOODLOG = 'GET_FOODLOG';
const ADD_TO_FOODLOG = 'ADD_TO_FOODLOG';

/**
 * INITIAL STATE
 */

 const defaultFoodLog = {}

/**
 * ACTION CREATORS
 */

const getFoodLog = foodLog => ({type: GET_FOODLOG, foodLog})
const addToFoodLog = foodLog => ({type: ADD_TO_FOODLOG, foodLog})

/**
 * REDUCER
 */

export default function reducer (state = defaultFoodLog, action) {
  switch (action.type) {

    case GET_FOODLOG:
      return action.foodLog

    case ADD_TO_FOODLOG:
      return Object.assign({}, state, {foodLog: action.foodLog})

    default:
      return defaultFoodLog;
  }
}

/**
 * THUNK CREATORS
 */

 export const getFoodLogThunker = foodLogsId => dispatch =>
   axios.get(`${IP}/api/${foodLogsId}`)
   .then(res => {
    //  console.log("hello from think");
     dispatch(getFoodLog(res.data || defaultFoodLog))
   })
   .catch(err => console.log(err))


 export const addToFoodLogThunker = foodLog => dispatch => {
   axios.post(`${IP}/foodLogs`, foodLog)
   .then(res => dispatch(addToFoodLog(res.config.data || defaultFoodLog)))
   .catch(err => console.log(err))
 }
