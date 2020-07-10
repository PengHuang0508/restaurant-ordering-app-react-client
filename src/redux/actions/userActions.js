import axios from 'axios';
import history from '../../history.js';
import {
  CLEAR_ERRORS,
  LOADING_UI,
  LOADING_UI_SUCCESS,
  SET_AUTHENTICATED,
  SET_ERRORS,
  SET_UNAUTHENTICATED,
  SET_USER,
} from '../types';

// Helper functions
const setAuthorizationHeader = (token) => {
  const FBIdToken = `Bearer ${token}`;

  localStorage.setItem('FBIdToken', FBIdToken);
  axios.defaults.headers.common['Authorization'] = FBIdToken;
};

export const setErrors = (errorData) => (dispatch) => {
  dispatch({ type: SET_ERRORS, payload: errorData });
};

export const getGuestData = () => (dispatch) => {
  dispatch({ type: LOADING_UI });

  axios
    .get('/guest')
    .then((res) => {
      dispatch({ type: SET_USER, payload: res.data });
      dispatch({ type: LOADING_UI_SUCCESS });
      history.push('/');
    })
    .catch((err) =>
      dispatch({
        type: SET_ERRORS,
        payload: err,
      })
    );
};

export const anonymousSignIn = (dispatch) => {
  // axios.get('/anonymous', anonymousSignIn);
};

export const anonymousUpgrade = (dispatch) => {
  // axios.post('/anonymous/upgrade', anonymousUpgrade);
};

export const signUp = (signUpData, history) => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
  dispatch({ type: LOADING_UI });

  axios
    .post('/guest/signUp', signUpData)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch({ type: SET_AUTHENTICATED });
      dispatch({ type: LOADING_UI_SUCCESS });
    })
    .then(() => {
      dispatch(getGuestData());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err,
      });
    });
};

export const signIn = (signInData) => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
  dispatch({ type: LOADING_UI });

  axios
    .post('/signIn', signInData)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch({ type: SET_AUTHENTICATED });
      dispatch({ type: LOADING_UI_SUCCESS });
    })
    .then(() => {
      dispatch(getGuestData());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err,
      });
    });
};

export const signOut = () => (dispatch) => {
  localStorage.removeItem('FBIdToken');
  delete axios.defaults.headers.common['Authorization'];

  axios.post('/signOut').catch((err) => console.log(err));

  dispatch({ type: SET_UNAUTHENTICATED });
};
