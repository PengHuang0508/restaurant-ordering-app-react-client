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
  SET_ANONYMOUS,
  SET_CART_PAYMENT_INFORMATION,
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
      dispatch({
        type: SET_CART_PAYMENT_INFORMATION,
        data: {
          contact: res.data.credentials.contact,
          paymentMethod: 'inStore-CASH',
        },
      });
      dispatch({ type: LOADING_UI_SUCCESS });
    })
    .catch((err) =>
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const anonymousSignIn = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
  dispatch({ type: LOADING_UI });

  axios
    .get('/anonymous')
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch({ type: SET_ANONYMOUS });
      dispatch({ type: LOADING_UI_SUCCESS });
      history.push('/');
    })
    .catch((err) =>
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const anonymousUpgrade = (signUpData) => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
  dispatch({ type: LOADING_UI });

  axios
    .post('/anonymous/upgrade', signUpData)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch({ type: SET_AUTHENTICATED });
      dispatch({ type: LOADING_UI_SUCCESS });
    })
    .then(() => {
      dispatch(getGuestData());
      history.push('/');
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const signUp = (signUpData) => (dispatch) => {
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
      history.push('/');
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
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
      history.push('/');
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const signOut = () => (dispatch) => {
  localStorage.removeItem('FBIdToken');
  delete axios.defaults.headers.common['Authorization'];

  axios.post('/signOut').catch((err) => console.log(err));

  dispatch({ type: SET_UNAUTHENTICATED });
};
