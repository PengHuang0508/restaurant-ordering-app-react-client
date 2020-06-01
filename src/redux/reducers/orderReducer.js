import {
  ADD_CART_ITEM,
  REMOVE_CART_ITEM,
  DELETE_CART_ITEM,
  UPDATE_CART_ITEM,
  SEND_ORDER_SUCCESS,
  SEND_ORDER_FAILURE,
} from '../types';

import { taxRate } from '../../utils/variables.js';
import { orders1, orders2 } from '../../utils/orders.js';

// Helper functions
// To get variable/params from URL
// Eg. getQueryVariable("table") retrieves "A1" form "localhost:3000/?table=A1&status=open"
const getQueryVariable = (variable) => {
  var query = window.location.search.substring(1);
  var vars = query.split('&');
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=');
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return 'TAKE OUT';
};
// Round a number to 2 decimals
const roundToTwo = (num) => {
  return Math.round((num + Number.EPSILON) * 100) / 100;
};
// Calculate the GST, PST and total
const priceCalculation = (subtotal) => {
  let priceBreakdown = {
    GST: roundToTwo(subtotal * taxRate.GST),
    PST: roundToTwo(subtotal * taxRate.PST),
  };

  priceBreakdown.total = subtotal + priceBreakdown.GST + priceBreakdown.PST;

  return priceBreakdown;
};

// const initialState = {
//   table: 'A1',
//   cart: orders2,
//   orderedItem: [],
//   subtotal: 35.97,
//   GST: 1.8,
//   PST: 2.52,
//   total: 40.29,
// };

const initialState = {
  table: getQueryVariable('table'),
  cart: [],
  ordered: {},
  subtotal: 0,
  GST: 0,
  PST: 0,
  total: 0,
};

// TODO: Delete later
/**
 *   const newOrder = {
    createdAt: new Date().toISOString(),
    itemList: req.body.itemList,
    server: req.user.role < 4 ? req.user.handle : 'Guest',
    status: req.body.status ? req.body.status : 'OPEN',
    table: req.body.table,
    type: req.body.type ? req.body.type : 'DINE-IN',
  };
 */

// {
//   itemId: 'mi7VEjDMyhjLmbbGa0WT',
//   name: 'Bow-Tie Salad with Tuna',
//   price: 13.99,
//   quantity: 1,
//   thumbnailUrl:
//     'https://firebasestorage.googleapis.com/v0/b/reacto-9f2d5.appspot.com/o/default.png?alt=media',
// },
export default function (state = initialState, action) {
  let itemData, newSubtotal, newPriceBreakdown;
  switch (action.type) {
    case ADD_CART_ITEM:
      itemData = action.data;
      let itemToAdd = state.cart.find(
        (cartItem) =>
          cartItem.itemId === itemData.itemId &&
          cartItem.instructions === itemData.instructions
      );
      // If it's the new item with same instructions, quantity increase by 1; Otherwise, add new item to cart
      itemToAdd
        ? (itemToAdd.quantity += itemData.quantity)
        : state.cart.push(itemData);
      // Recalculate the price breakdown
      newSubtotal = roundToTwo(
        state.subtotal + itemData.price * itemData.quantity
      );
      newPriceBreakdown = priceCalculation(newSubtotal);

      return {
        ...state,
        subtotal: newSubtotal,
        GST: newPriceBreakdown.GST,
        PST: newPriceBreakdown.PST,
        total: newPriceBreakdown.total,
      };
    case REMOVE_CART_ITEM:
      itemData = action.data;
      let itemToRemove = state.cart.find(
        (cartItem) =>
          cartItem.itemId === itemData.itemId &&
          cartItem.instructions === itemData.instructions
      );
      itemToRemove.quantity > 1
        ? (itemToRemove.quantity -= 1)
        : (state.cart = state.cart.filter(
            (cartItem) =>
              cartItem.itemId !== itemData.itemId ||
              cartItem.instructions !== itemData.instructions
          ));
      newSubtotal = roundToTwo(state.subtotal - itemToRemove.price);
      newPriceBreakdown = priceCalculation(newSubtotal);

      return {
        ...state,
        subtotal: newSubtotal,
        GST: newPriceBreakdown.GST,
        PST: newPriceBreakdown.PST,
        total: newPriceBreakdown.total,
      };
    case DELETE_CART_ITEM:
      itemData = action.data;
      let itemToDelete = state.cart.find(
        (cartItem) =>
          cartItem.itemId === itemData.itemId &&
          cartItem.instructions === itemData.instructions
      );

      state.cart = state.cart.filter(
        (cartItem) =>
          cartItem.itemId !== itemData.itemId ||
          cartItem.instructions !== itemData.instructions
      );
      newSubtotal = roundToTwo(
        state.subtotal - itemToDelete.price * itemToDelete.quantity
      );
      newPriceBreakdown = priceCalculation(newSubtotal);

      return {
        ...state,
        subtotal: newSubtotal,
        GST: newPriceBreakdown.GST,
        PST: newPriceBreakdown.PST,
        total: newPriceBreakdown.total,
      };
    case UPDATE_CART_ITEM:
      return state;

    case SEND_ORDER_SUCCESS:
      return {
        ...state,
        ordered: state.cart,
        cart: [],
      };
    case SEND_ORDER_FAILURE:
      return state;
    default:
      return state;
  }
}
