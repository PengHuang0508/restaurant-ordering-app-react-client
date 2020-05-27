import axios from 'axios';
import {
  ADD_CART_ITEM,
  REMOVE_CART_ITEM,
  INCREASE_ITEM_QUANTITY,
  REDUCE_ITEM_QUANTITY,
  RESET_CART,
  SUBMIT_ORDER,
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

export const AddToCart = (itemData) => (dispatch) => {
  dispatch({ type: ADD_CART_ITEM, data: itemData });
};
