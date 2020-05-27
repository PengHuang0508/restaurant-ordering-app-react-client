import {
  LOADING_MENU_REQUEST,
  LOADING_MENU_FAILURE,
  LOADING_MENU_SUCCESS,
  SET_MENU,
  SET_MENU_ITEM,
} from '../types';

const initialState = {
  menu: [],
  menuItem: {},
  loading: false,
  errors: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_MENU_REQUEST:
      return {
        ...state,
        errors: null,
        loading: true,
      };
    case LOADING_MENU_SUCCESS:
      return {
        ...state,
        errors: null,
        loading: false,
      };
    case LOADING_MENU_FAILURE:
      return {
        ...state,
        errors: action.payload,
        loading: false,
      };
    case SET_MENU:
      return {
        ...state,
        menu: action.payload,
      };
    case SET_MENU_ITEM:
      return {
        ...state,
        menuItem: action.payload,
      };
    default:
      return state;
  }
}
