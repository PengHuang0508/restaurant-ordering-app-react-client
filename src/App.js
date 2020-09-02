import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';
import { SnackbarProvider } from 'notistack';
// Redux
import { Provider } from 'react-redux';
import store from './redux/store';
// MUI
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
// Pages
import Account from './pages/Account';
import Checkout from './pages/Checkout';
import Home from './pages/Home';
import Order from './pages/Order';
// Components
import Cart from './components/Cart/Cart';
import Navbar from './components/Navbar/NavBar';
import Notifier from './components/Snackbar/Notifier';
// Files
import history from './history.js';
import muiTheme from './utils/theme';
import './App.css';

axios.defaults.baseURL =
  'https://us-central1-reacto-9f2d5.cloudfunctions.net/api';

const theme = createMuiTheme(muiTheme);

const Routes = (
  <React.Fragment>
    <Route exact path='/'>
      <Home />
      <Cart />
    </Route>
    <Route exact path='/account'>
      <Account />
    </Route>
    <Route exact path='/checkout'>
      <Checkout />
    </Route>
    <Route path='/order'>
      <Order />
    </Route>
    <Route path='*'>
      <Redirect to='/' />
    </Route>
  </React.Fragment>
);

const App = () => {
  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <SnackbarProvider>
          <Notifier />
          <Router history={history}>
            <Navbar />
            <Switch>{Routes}</Switch>
          </Router>
        </SnackbarProvider>
      </MuiThemeProvider>
    </Provider>
  );
};

export default App;
