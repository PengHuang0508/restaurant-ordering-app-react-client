import axios from 'axios';
import {
  SET_USER,
  SET_USER_GUEST,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  LOADING_USER,
  SET_UNAUTHENTICATED,
} from '../types';

import { guestCredentials } from '../../utils/variables.js';

// Helper functions
const setAuthorizationHeader = (token) => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem('FBIdToken', FBIdToken);
  axios.defaults.headers.common['Authorization'] = FBIdToken;
};
export const guestLogin = () => (dispatch) => {
  axios
    .post('/user/login', guestCredentials)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch({ type: SET_USER_GUEST });
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};
export const signupUser = (signupData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post('/signup', signupData)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push('/');
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const loginUser = (loginData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post('/login', loginData)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push('/');
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const getUserData = () => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .get('/user')
    .then((res) => {
      dispatch({ type: SET_USER, payload: res.data });
    })
    .catch((err) => console.log(err));
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('FBIdToken');
  delete axios.defaults.headers.common['Authorization'];
  dispatch({ type: SET_UNAUTHENTICATED });
};
