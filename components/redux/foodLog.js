import axios from 'axios'

import IP from '../../IP'

const frontEndAxios = axios.create

/**
 * ACTION TYPES
 */

const GET_FOODLOG = 'GET_FOODLOG'
const ADD_TO_FOODLOG = 'ADD_TO_FOODLOG'

/**
 * INITIAL STATE
 */

const defaultFoodLog = []

/**
 * ACTION CREATORS
 */

const getFoodLog = foodLog => ({ type: GET_FOODLOG, foodLog })
const addToFoodLog = foodLog => ({ type: ADD_TO_FOODLOG, foodLog })

/**
 * REDUCER
 */

export default function reducer(state = defaultFoodLog, action) {
  switch (action.type) {
    case GET_FOODLOG:
      return action.foodLog

    case ADD_TO_FOODLOG:
    return [...state, ...action.foodLog]


    default:
      return defaultFoodLog
  }
}

/**
 * THUNK CREATORS
 */

export const getFoodLogThunker = foodLogsId => dispatch =>
  axios
    .get(`${IP}/api/foodlogs/${foodLogsId}`)
    .then(res => {
      dispatch(getFoodLog(res.data || defaultFoodLog))
    })
    .catch(err => console.log(err))

export const addToFoodLogThunker = food => dispatch => {
  axios
    .post(`${IP}/api/foodLogs`, food)
    .then(res => {
      const dispatchData = Array.isArray(res.data) ? res.data : [res.data]
      return dispatch(addToFoodLog(dispatchData || defaultFoodLog))
    })
    .catch(err => console.log(err))
}

export const getFoodLogIntervalThunker = (foodLogsId, interval) => dispatch =>
  axios
    .get(`${IP}/api/foodlogs/${foodLogsId}/${interval}`)
    .then(res => {
      dispatch(getFoodLog(res.data || defaultFoodLog))
    })
    .catch(err => console.log(err))