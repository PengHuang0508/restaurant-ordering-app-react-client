import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import history from '../../history';
// MUI
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
// Icons
import AccountCircle from '@material-ui/icons/AccountCircle';
// Components
import AccountMenu from './AccountMenu';
import GuestMenu from './GuestMenu';
import ProfileMenu from './ProfileMenu';
// Files
import logo from '../../images/logo.png';

const useStyles = makeStyles((theme) => ({
  homeButton: {
    marginRight: theme.spacing(2),

    '&:hover': {
      cursor: 'pointer',
    },
  },
  title: {
    flexGrow: 1,
  },
}));

const NavBar = () => {
  const classes = useStyles();
  const { anonymous, authenticated } = useSelector((state) => ({
    anonymous: state.user.anonymous,
    authenticated: state.user.authenticated,
  }));
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  let location = useLocation();

  const handleHome = () => {
    history.push({ pathname: '/', search: location.search });
  };
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <AppBar position='static'>
        <Toolbar>
          <Avatar
            alt="Pome'Lona"
            aria-label='home'
            onClick={handleHome}
            src={logo}
            className={classes.homeButton}
          />
          <Typography className={classes.title} variant='h6'>
            Pome'Lona
          </Typography>
          <div>
            <IconButton
              aria-label='user account'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleMenu}
              color='inherit'
            >
              <AccountCircle />
            </IconButton>
            {authenticated ? (
              <Drawer anchor='right' open={open} onClose={handleClose}>
                {anonymous ? (
                  <GuestMenu handleClose={handleClose} />
                ) : (
                  <ProfileMenu handleClose={handleClose} />
                )}
              </Drawer>
            ) : (
              <Popover
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                id='account-menu'
                keepMounted
                onClose={handleClose}
                open={open}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <AccountMenu handleClose={handleClose} />
              </Popover>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default NavBar;
