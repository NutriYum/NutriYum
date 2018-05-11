
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

/* ------------       THUNK CREATORS     ------------------ */

// export const login = (credentials, navigation) => dispatch => {
//   console.log(IP, credentials)
//   axios.post(`${IP}/auth/login`, credentials)
//     .then(res => setUserAndRedirect(res.data, navigation, dispatch))
//     .catch(() => navigation.navigate('SignedOut', {error: 'Login failed.'}));
// };

// export const signup = (credentials, navigation) => dispatch => {
//   axios.post(`${IP}/auth/signup`, credentials)
//     .then(res => setUserAndRedirect(res.data, navigation, dispatch))
//     .catch(() => navigation.navigate('SignedOut', {error: 'Signup failed.'}));
// };

// export const logout = navigation => dispatch => {
//   axios.delete(`${IP}/auth/logout`)
//     .then(() => {
//       dispatch(removeCurrentUser());
//       navigation.navigate('SignedOut', {error: 'Logout successful.'});
//     })
//     .catch((error) => console.error('Logout successful:  ', error));
// };

/* ------------      HELPER FUNCTIONS     ------------------ */

// function setUserAndRedirect (user, navigation, dispatch) {
//   // console.log(user)
//   dispatch(setCurrentUser(user));
//   navigation.navigate('SignedIn');
// }
