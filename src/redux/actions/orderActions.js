import axios from 'axios';
import {
  ADD_CART_ITEM,
  REMOVE_CART_ITEM,
  DELETE_CART_ITEM,
  SEND_ORDER_SUCCESS,
  SEND_ORDER_FAILURE,
} from '../types';

/**
 *   const newOrder = {
    createdAt: new Date().toISOString(),
    itemList: req.body.itemList,
    server: req.user.role < 4 ? req.user.handle : 'Guest',
    status: req.body.status ? req.body.status : 'OPEN',
    table: req.body.table,
  };
 */

export const AddCartItem = (itemData) => (dispatch) => {
  dispatch({ type: ADD_CART_ITEM, data: itemData });
};

export const RemoveCartItem = (itemData) => (dispatch) => {
  dispatch({ type: REMOVE_CART_ITEM, data: itemData });
};

export const DeleteCartItem = (itemData) => (dispatch) => {
  dispatch({ type: DELETE_CART_ITEM, data: itemData });
};

export const SendOrder = (table, itemList) => (dispatch) => {
  console.info('table', table, 'itemList', itemList);

  const orderData = {
    table,
    itemList,
  };

  axios
    .post('/order', orderData)
    .then((res) => {
      dispatch({ type: SEND_ORDER_SUCCESS });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: SEND_ORDER_FAILURE, payload: err.response.data });
    });
};
