import {
  CLEAR_ERRORS,
  LOADING_UI,
  LOADING_UI_SUCCESS,
  SET_ERRORS,
} from '../types';

const initialState = {
  loading: false,
  errors: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_UI:
      return { ...state, loading: true };
    case LOADING_UI_SUCCESS:
      return { ...state, loading: false };
    case SET_ERRORS:
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        errors: null,
      };
    default:
      return state;
  }
}
