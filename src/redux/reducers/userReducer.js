import {
  SET_ANONYMOUS,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  SET_USER,
} from '../types';

const initialState = {
  authenticated: false,
  anonymous: false,
  credentials: {
    handle: '',
    contact: {},
    email: '',
  },
  orders: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        anonymous: false,
        authenticated: true,
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    case SET_USER:
      return {
        ...state,
        ...action.payload,
        authenticated: true,
      };
    case SET_ANONYMOUS:
      return {
        ...state,
        anonymous: true,
        authenticated: true,
      };
    default:
      return state;
  }
}
