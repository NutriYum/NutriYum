
import IP from '../../IP';

/* -----------------    ACTION TYPES    ------------------ */

const SET_AMAZON_URL = 'SET_AMAZON_URL';
const REMOVE_AMAZON_URL = 'REMOVE_AMAZON_URL';

/* ------------     ACTION CREATORS      ------------------ */

export const setCurrentUrl = url => ({ type: SET_AMAZON_URL, url });
export const removeCurrentUrl = () => ({ type: REMOVE_AMAZON_URL });

/* ------------          REDUCER         ------------------ */

export default function reducer (amazonUrl = {}, action) {
  switch (action.type) {

    case SET_AMAZON_URL:
      return action.url;

    case REMOVE_AMAZON_URL:
      return {};

    default:
      return amazonUrl;
  }
}
