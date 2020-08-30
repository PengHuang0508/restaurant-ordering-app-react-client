import axios from 'axios';
import history from '../../history.js';
import {
  ADD_CART_ITEM,
  DELETE_CART_ITEM,
  LOADING_UI,
  LOADING_UI_SUCCESS,
  REMOVE_CART_ITEM,
  SEND_ORDER_FAILURE,
  SEND_ORDER_SUCCESS,
  SET_CART_PAYMENT_INFORMATION,
  SET_ORDER,
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

export const setPaymentInformation = (paymentData) => (dispatch) => {
  dispatch({ type: SET_CART_PAYMENT_INFORMATION, data: paymentData });
};

export const getOrder = (orderId) => (dispatch) => {
  dispatch({ type: LOADING_UI });

  axios
    .get(`/order/${orderId}`)
    .then((res) => {
      dispatch({ type: SET_ORDER, payload: res.data });
      dispatch({ type: LOADING_UI_SUCCESS });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getDineInOrder = (orderId) => (dispatch) => {
  dispatch({ type: LOADING_UI });

  axios
    .get(`/order/dine-in/${orderId}`)
    .then((res) => {
      dispatch({ type: SET_ORDER, payload: res.data });
      dispatch({ type: LOADING_UI_SUCCESS });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const sendOrder = (orderData) => (dispatch) => {
  dispatch({ type: LOADING_UI });

  axios
    .post('/order', orderData)
    .then((res) => {
      const orderId = res.data.orderId;

      dispatch({ type: SEND_ORDER_SUCCESS, payload: orderId });
      history.push({
        search: `?orderId=${orderId}`,
      });
      dispatch({ type: LOADING_UI_SUCCESS });

      return orderId;
    })
    .then((orderId) => dispatch(getOrder(orderId)))
    .catch((err) => {
      console.log(err);
      dispatch({ type: SEND_ORDER_FAILURE, payload: err.response.data });
    });
};

export const sendDineInOrder = (orderData) => (dispatch) => {
  dispatch({ type: LOADING_UI });

  axios
    .post('/order/dine-in', orderData)
    .then((res) => {
      const orderId = res.data.orderId;

      dispatch({ type: SEND_ORDER_SUCCESS, payload: orderId });
      history.push({
        search: `?type=DINE-IN&table=${orderData.table}&orderId=${orderId}`,
      });
      dispatch({ type: LOADING_UI_SUCCESS });

      return orderId;
    })
    .then((orderId) => dispatch(getOrder(orderId)))
    .catch((err) => {
      console.log(err);
      dispatch({ type: SEND_ORDER_FAILURE, payload: err.response.data });
    });
};

// For dine-in only
export const addToOrder = (orderId, orderData) => (dispatch) => {
  dispatch({ type: LOADING_UI });

  axios
    .post(`/order/dine-in/update/${orderId}`, orderData)
    .then(() => {
      dispatch({ type: SEND_ORDER_SUCCESS, payload: orderId });
      dispatch({ type: LOADING_UI_SUCCESS });
    })
    .then(() => dispatch(getDineInOrder(orderId)))
    .catch((err) => {
      console.log(err);
    });
};
