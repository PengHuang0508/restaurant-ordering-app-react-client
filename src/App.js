import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
// Redux
import { Provider } from 'react-redux';
import store from './redux/store';
// MUI
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
// Pages
import Home from './pages/Home';
import Testing from './pages/Testing';
// Components
import Navbar from './components/layout/NavBar';
// Files
import './App.css';
import muiTheme from './util/theme';

const theme = createMuiTheme(muiTheme);

const App = () => {
  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route exact path='/testing'>
              <Testing />
            </Route>
            <Route path='*'>
              <Redirect to='/' />
            </Route>
          </Switch>
        </Router>
      </MuiThemeProvider>
    </Provider>
  );
};

export default App;
