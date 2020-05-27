import axios from 'axios';
import {
  LOADING_MENU_REQUEST,
  LOADING_MENU_FAILURE,
  LOADING_MENU_SUCCESS,
  SET_MENU,
  SET_MENU_ITEM,
} from '../types';

export const getMenu = () => (dispatch) => {
  dispatch({ type: LOADING_MENU_REQUEST });
  axios
    .get('/menu')
    .then((res) => {
      dispatch({ type: SET_MENU, payload: res.data });
    })
    .then(() => {
      dispatch({ type: LOADING_MENU_SUCCESS });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: LOADING_MENU_FAILURE, payload: err.response.data });
    });
};

export const getMenuItem = (itemId) => (dispatch) => {
  dispatch({ type: LOADING_MENU_REQUEST });
  axios
    .get(`/menu/item/${itemId}`)
    .then((res) => {
      dispatch({ type: SET_MENU_ITEM, payload: res.data });
    })
    .then(() => {
      dispatch({ type: LOADING_MENU_SUCCESS });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: LOADING_MENU_FAILURE, payload: err.response.data });
    });
};
