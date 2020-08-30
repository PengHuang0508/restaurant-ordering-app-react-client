import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import menuReducer from './reducers/menuReducer';
import uiReducer from './reducers/uiReducer';
import userReducer from './reducers/userReducer';
import orderReducer from './reducers/orderReducer';

const initialState = {};

const middleware = [thunk];

const reducers = combineReducers({
  menu: menuReducer,
  order: orderReducer,
  ui: uiReducer,
  user: userReducer,
});

const store = createStore(
  reducers,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
