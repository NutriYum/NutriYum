import axios from 'axios'

import IP from '../../IP'

const frontEndAxios = axios.create

/**
 * ACTION TYPES
 */

const GET_FOODLOG = 'GET_FOODLOG'
const ADD_TO_FOODLOG = 'ADD_TO_FOODLOG'
const DELETE_FROM_FOODLOG = 'DELETE_FROM_FOODLOG'

/**
 * INITIAL STATE
 */

const defaultFoodLog = []

/**
 * ACTION CREATORS
 */

const getFoodLog = foodLog => ({ type: GET_FOODLOG, foodLog })
const addToFoodLog = foodLog => ({ type: ADD_TO_FOODLOG, foodLog })
const eliminateFoodFromLog = food => ({ type: DELETE_FROM_FOODLOG, food })

/**
 * REDUCER
 */

export default function reducer(state = defaultFoodLog, action) {
  switch (action.type) {
    case GET_FOODLOG:
      return action.foodLog

    case ADD_TO_FOODLOG:
      return [...state, ...action.foodLog]

    case DELETE_FROM_FOODLOG:
      return [...state]

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

export const addToFoodLogThunker = (food, url) => dispatch => {
  axios
    .post(`${IP}/api/foodLogs`, food, url)
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

export const deleteFromFoodLogThunker = (food) => dispatch => {
  axios
    .delete(`${IP}/api/foodLogs/${food}`, food)
    .then(res => {
      // const dispatchData = Array.isArray(res.data) ? res.data : [res.data]
      return dispatch(eliminateFoodFromLog(res.data || defaultFoodLog))
    })
    .catch(err => console.log(err))
}
