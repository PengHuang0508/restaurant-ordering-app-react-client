import axios from 'axios';
import { SET_MENU, SET_ITEM, LOADING_MENU } from '../types';

export const getMenuData = () => (dispatch) => {
  dispatch({ type: LOADING_MENU });
  axios
    .get('/menu')
    .then((res) => {
      dispatch({ type: SET_MENU, payload: res.data });
    })
    .catch((err) => console.log(err));
};

export const getItemData = (itemId) => (dispatch) => {
  dispatch({ type: LOADING_MENU });
  axios
    .get(`/menu:${itemId}`)
    .then((res) => {
      dispatch({ type: SET_ITEM, payload: res.data });
    })
    .catch((err) => console.log(err));
};
