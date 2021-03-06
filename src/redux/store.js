import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import menuReducer from './reducers/menuReducer';
import uiReducer from './reducers/uiReducer';
import userReducer from './reducers/userReducer';
import orderReducer from './reducers/orderReducer';
import snackbarReducer from './reducers/snackbarReducer';

const initialState = {};

const middleware = [thunk];

const reducers = combineReducers({
  menu: menuReducer,
  order: orderReducer,
  ui: uiReducer,
  user: userReducer,
  snackbar: snackbarReducer,
});

const store = createStore(
  reducers,
  initialState,
  compose(applyMiddleware(...middleware))
);

export default store;
