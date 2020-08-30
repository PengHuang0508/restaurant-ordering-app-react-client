import {
  ADD_CART_ITEM,
  DELETE_CART_ITEM,
  REMOVE_CART_ITEM,
  SEND_ORDER_FAILURE,
  SEND_ORDER_SUCCESS,
  SET_ORDER,
  SET_CART_PAYMENT_INFORMATION,
} from '../types';
import { taxRate } from '../../utils/variables';
import { getQueryVariable } from '../../utils/helpers';

/////
// Helper functions
/////
// Round a number to 2 decimals
const roundToTwo = (num) => {
  return Math.round((num + Number.EPSILON) * 100) / 100;
};
// Calculate the GST and total
const priceCalculation = (subtotal) => {
  let priceBreakdown = {
    GST: roundToTwo(subtotal * taxRate.GST),
  };

  priceBreakdown.total = subtotal + priceBreakdown.GST;

  return priceBreakdown;
};

const initialState = {
  type: getQueryVariable('type') ? getQueryVariable('type') : 'PICK-UP',
  table: getQueryVariable('table'),
  // cart: {
  //   itemList: [
  //     {
  //       itemId: 'KsC2JgMm6slql0dtGdm7',
  //       name: 'Garden Tuna Salad Sandwich',
  //       price: 9.99,
  //       thumbnailUrl:
  //         'https://firebasestorage.googleapis.com/v0/b/reacto-9f2d5.appspot.com/o/default.jpg?alt=media',
  //       quantity: 1,
  //       instructions:
  //         'Excepteur sunt elit sint Lorem commodo. Cupidatat adipisicing qui sunt officia labore dolor fugiat ex anim reprehenderit dolore. Eiusmod incididunt Lorem anim ipsum duis enim laboris id eu tempor. Est laboris dolor magna aute cupidatat occaecat ipsum velit id in et ullamco cillum esse.',
  //     },
  //     {
  //       itemId: 'mi7VEjDMyhjLmbbGa0WT',
  //       name: 'Bow-Tie Salad with Tuna',
  //       price: 13.99,
  //       thumbnailUrl:
  //         'https://firebasestorage.googleapis.com/v0/b/reacto-9f2d5.appspot.com/o/default.jpg?alt=media',
  //       quantity: 1,
  //       instructions:
  //         'Commodo minim magna culpa minim qui qui magna adipisicing officia ipsum nostrud.',
  //     },
  //   ],
  //   subtotal: 23.98,
  //   contact: {
  //     email: 'a@b.com',
  //     firstName: 'Paul',
  //     lastName: 'Kim',
  //     phoneNumber: '1234567890',
  //   },
  //   paymentMethod: 'inStore-CASH',
  // },
  cart: {
    itemList: [],
    subtotal: 0,
    contact: {
      email: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
    },
    paymentMethod: '',
  },
  // order: {
  //   orderId: getQueryVariable('orderId'),
  //   status: '',
  //   createdAt: '',
  //   itemList: [],
  //   subtotal: 0,
  // },
  order: {
    senderId: 'PsKHVS0hPDYapfwyDn7JZ1UreZo2',
    status: 'OPEN',
    createdAt: '2020-07-19T00:05:17.869Z',
    itemList: [
      {
        price: 13.99,
        name: 'Bow-Tie Salad with Tuna',
        quantity: 1,
        instructions: '',
        thumbnailUrl:
          'https://firebasestorage.googleapis.com/v0/b/reacto-9f2d5.appspot.com/o/default.jpg?alt=media',
        itemId: 'mi7VEjDMyhjLmbbGa0WT',
      },
      {
        quantity: 3,
        instructions: '',
        thumbnailUrl:
          'https://firebasestorage.googleapis.com/v0/b/reacto-9f2d5.appspot.com/o/default.jpg?alt=media',
        itemId: 'L52zOZ4AtW6MqSrarNkF',
        price: 18.99,
        name: 'Lemony Salmon Piccata',
      },
    ],
    contact: {
      email: 'bob@ross.com',
      phoneNumber: '1234567890',
      firstName: 'Bob',
      lastName: 'Ross',
    },
    orderId: '6ubngtzly7mFpl1uup7u',
    type: 'TAKE-OUT',
    subtotal: 70.96,
  },
  subtotal: 0,
  GST: 0,
  total: 0,
  grandTotal: 0,
};

export default function (state = initialState, action) {
  let itemData, newCartSubtotal, newSubtotal, newPriceBreakdown;
  switch (action.type) {
    case ADD_CART_ITEM:
      itemData = action.data;

      let itemToAdd = state.cart.itemList.find(
        (cartItem) =>
          cartItem.itemId === itemData.itemId &&
          cartItem.instructions === itemData.instructions
      );
      // If there is item with same instruction in cart, increase the quantity by 1; Otherwise, add the new item to cart
      itemToAdd
        ? (itemToAdd.quantity += itemData.quantity)
        : state.cart.itemList.push(itemData);

      // Recalculate the bill
      newCartSubtotal = roundToTwo(
        state.cart.subtotal + itemData.price * itemData.quantity
      );
      newSubtotal = newCartSubtotal + state.order.subtotal;
      newPriceBreakdown = priceCalculation(newSubtotal);
      // set cart subtotal
      state.cart.subtotal = newCartSubtotal;

      return {
        ...state,
        subtotal: newSubtotal,
        GST: newPriceBreakdown.GST,
        total: newPriceBreakdown.total,
      };
    case REMOVE_CART_ITEM:
      itemData = action.data;

      let itemToRemove = state.cart.itemList.find(
        (cartItem) =>
          cartItem.itemId === itemData.itemId &&
          cartItem.instructions === itemData.instructions
      );
      itemToRemove.quantity > 1
        ? (itemToRemove.quantity -= 1)
        : (state.cart.itemList = state.cart.itemList.filter(
            (cartItem) =>
              cartItem.itemId !== itemData.itemId ||
              cartItem.instructions !== itemData.instructions
          ));

      newCartSubtotal = roundToTwo(state.cart.subtotal - itemToRemove.price);
      newSubtotal = newCartSubtotal + state.order.subtotal;
      newPriceBreakdown = priceCalculation(newSubtotal);
      state.cart.subtotal = newCartSubtotal;

      return {
        ...state,
        subtotal: newSubtotal,
        GST: newPriceBreakdown.GST,
        total: newPriceBreakdown.total,
      };
    case DELETE_CART_ITEM:
      itemData = action.data;

      let itemToDelete = state.cart.itemList.find(
        (cartItem) =>
          cartItem.itemId === itemData.itemId &&
          cartItem.instructions === itemData.instructions
      );
      state.cart.itemList = state.cart.itemList.filter(
        (cartItem) =>
          cartItem.itemId !== itemData.itemId ||
          cartItem.instructions !== itemData.instructions
      );

      newCartSubtotal = roundToTwo(
        state.cart.subtotal - itemToDelete.price * itemToDelete.quantity
      );
      newSubtotal = newCartSubtotal + state.order.subtotal;
      newPriceBreakdown = priceCalculation(newSubtotal);
      state.cart.subtotal = newCartSubtotal;

      return {
        ...state,
        subtotal: newSubtotal,
        GST: newPriceBreakdown.GST,
        total: newPriceBreakdown.total,
      };
    case SET_ORDER:
      const orderDetails = action.payload;

      newSubtotal = state.cart.subtotal + orderDetails.subtotal;
      newPriceBreakdown = priceCalculation(newSubtotal);

      return {
        ...state,
        order: {
          createdAt: orderDetails.createdAt,
          itemList: orderDetails.itemList,
          orderId: orderDetails.orderId,
          status: orderDetails.status,
          subtotal: orderDetails.subtotal,
          table: orderDetails.table,
        },
        subtotal: newSubtotal,
        GST: newPriceBreakdown.GST,
        total: newPriceBreakdown.total,
      };
    case SEND_ORDER_SUCCESS:
      return {
        ...state,
        cart: {
          ...state.cart,
          itemList: [],
          subtotal: 0,
        },
        order: {
          ...state.order,
          orderId: action.payload,
        },
      };
    case SEND_ORDER_FAILURE:
      return state;
    case SET_CART_PAYMENT_INFORMATION:
      return {
        ...state,
        cart: {
          ...state.cart,
          contact: action.data.contact,
          paymentMethod: action.data.paymentMethod,
        },
      };
    default:
      return state;
  }
}
