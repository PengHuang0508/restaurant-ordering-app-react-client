import axios from 'axios';
import history from '../../history.js';
import {
  ADD_CART_ITEM,
  DELETE_CART_ITEM,
  REMOVE_CART_ITEM,
  SEND_ORDER_FAILURE,
  SEND_ORDER_SUCCESS,
  SET_ORDER,
  SET_ORDER_DINE_IN,
} from '../types';

export const addCartItem = (itemData) => (dispatch) => {
  dispatch({ type: ADD_CART_ITEM, data: itemData });
};

export const removeCartItem = (itemData) => (dispatch) => {
  dispatch({ type: REMOVE_CART_ITEM, data: itemData });
};

export const deleteCartItem = (itemData) => (dispatch) => {
  dispatch({ type: DELETE_CART_ITEM, data: itemData });
};

export const getOrder = (orderId) => (dispatch) => {
  axios
    .get(`/order/${orderId}`)
    .then((res) => {
      dispatch({ type: SET_ORDER, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getDineInOrder = (orderId) => (dispatch) => {
  console.info('retrieving data');
  axios
    .get(`/order/dine-in/${orderId}`)
    .then((res) => {
      console.log('successful', res.data);
      dispatch({ type: SET_ORDER_DINE_IN, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const sendOrder = (orderData) => (dispatch) => {
  axios
    .post('/order', orderData)
    .then((res) => {
      dispatch({ type: SEND_ORDER_SUCCESS });
      history.push({
        search: `?orderId=${res.data.orderId}`,
      });
      dispatch(getOrder(res.data.orderId));
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: SEND_ORDER_FAILURE, payload: err.response.data });
    });
};

export const sendDineInOrder = (orderData) => (dispatch) => {
  axios
    .post('/order/dine-in', orderData)
    .then((res) => {
      dispatch({ type: SEND_ORDER_SUCCESS });
      history.push({
        search: `?table=${orderData.table}&orderId=${res.data.orderId}`,
      });
      dispatch(getDineInOrder(res.data.orderId));
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: SEND_ORDER_FAILURE, payload: err.response.data });
    });
};

// For dine-in only
export const addToOrder = (orderId, orderData) => (dispatch) => {
  axios
    .post(`/order/dine-in/update/${orderId}`, orderData)
    .then(() => {
      dispatch({ type: SEND_ORDER_SUCCESS });
      dispatch(getDineInOrder(orderId));
    })
    .catch((err) => {
      console.log(err);
    });
};
