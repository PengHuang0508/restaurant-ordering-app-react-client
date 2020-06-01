import {
  SET_USER,
  SET_USER_GUEST,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
} from '../types';

const initialState = {
  loading: false,
  authenticated: false,
  handle: '',
  notifications: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    case SET_USER:
      return {
        ...state,
        loading: false,
        authenticated: true,
        ...action.payload,
      };
    case SET_USER_GUEST:
      return {
        ...state,
        loading: false,
        authenticated: true,
        handle: 'Guest',
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
