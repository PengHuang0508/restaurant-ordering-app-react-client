import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// MUI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
// MUI icons
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
// Components
import NavProfile from './NavProfile';
// Files
//import AppLogo from "../../images/logo.png";

class NavBar extends Component {
  render() {
    return (
      <AppBar position='fixed'>
        <Toolbar className='nav-container'>
          {/* <Button className="nav-logo">
            <img src={AppLogo} alt="Reacto" />
          </Button> */}
          <IconButton edge='start' color='inherit' aria-label='menu'>
            <MenuRoundedIcon />
          </IconButton>
          <IconButton color='inherit' component={Link} to='/'>
            <HomeRoundedIcon />
          </IconButton>
          <IconButton
            aria-label='account of current user'
            aria-controls='menu-appbar'
            aria-haspopup='true'
            color='inherit'
          >
            <AccountCircleRoundedIcon component={NavProfile} />
          </IconButton>
        </Toolbar>
      </AppBar>
    );
  }
}

export default NavBar;

/* <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
          <Button color="inherit" component={Link} to="/signup">
            Signup
          </Button> */
