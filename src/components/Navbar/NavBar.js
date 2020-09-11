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
  appBar: {
    width: '100%',
    minWidth: '100vw',

    paddingLeft: theme.spacing(9),

    background: 'rgba(0,0,0,0.45)',
  },
  menuButton: {
    marginRight: theme.spacing(2),

    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  homeButton: {
    marginRight: theme.spacing(2),

    '&:hover': {
      cursor: 'pointer',
    },
  },
  title: {
    flexGrow: 1,
  },

  popover: {
    padding: 0,
    margin: 0,
    overflow: 'auto',
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
  const location = useLocation();

  const handleHome = () => {
    history.push({ pathname: '/', search: location.search });
  };
  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar className={classes.appBar} position='absolute'>
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
        <React.Fragment>
          <IconButton
            aria-label='user account'
            aria-controls='menu-appbar'
            aria-haspopup='true'
            onClick={handleOpenMenu}
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
              className={classes.popover}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              disableScrollLock
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
        </React.Fragment>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
