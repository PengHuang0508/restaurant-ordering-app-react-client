import { SET_MENU, SET_ITEM, LOADING_MENU } from '../types';

const initialState = {
  menuData: [],
  itemData: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_MENU:
      return {
        ...state,
        menuData: action.payload,
        loading: false
      };
    case SET_ITEM:
      return {
        loading: false,
        ...action.payload
      };
    case LOADING_MENU:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
