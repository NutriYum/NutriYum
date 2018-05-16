
import IP from '../../IP';

/* -----------------    ACTION TYPES    ------------------ */

const SET_CURRENT_PHOTO = 'SET_CURRENT_PHOTO';
const REMOVE_CURRENT_PHOTO = 'REMOVE_CURRENT_PHOTO';

/* ------------     ACTION CREATORS      ------------------ */

export const setCurrentPhoto = photo => ({ type: SET_CURRENT_PHOTO, photo });
export const removeCurrentPhoto = () => ({ type: REMOVE_CURRENT_PHOTO });

/* ------------          REDUCER         ------------------ */

export default function reducer (currentPhoto = {}, action) {
  switch (action.type) {

    case SET_CURRENT_PHOTO:
      return action.photo;

    case REMOVE_CURRENT_PHOTO:
      return {};

    default:
      return currentPhoto;
  }
}
