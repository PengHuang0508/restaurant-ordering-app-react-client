import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';
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
import MenuIcon from '@material-ui/icons/Menu';
// Components
import AccountMenu from './AccountMenu';
import GuestMenu from './GuestMenu';
import MenuDrawer from '../MenuDrawer/MenuDrawer';
import ProfileMenu from './ProfileMenu';
// Files
import logo from '../../images/logo.png';

const useStyles = makeStyles((theme) => ({
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${240}px)`,
      marginLeft: 240,
    },
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
}));

const NavBar = () => {
  const classes = useStyles();
  const { anonymous, authenticated } = useSelector((state) => ({
    anonymous: state.user.anonymous,
    authenticated: state.user.authenticated,
  }));
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const open = Boolean(anchorEl);
  const location = useLocation();
  const isMenuPage = location.pathname === '/';

  const handleHome = () => {
    history.push({ pathname: '/', search: location.search });
  };
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDrawerToggle = () => {
    setOpenDrawer(!openDrawer);
  };

  return (
    <React.Fragment>
      <AppBar className={clsx(isMenuPage && classes.appBar)} position='static'>
        <Toolbar>
          {isMenuPage && (
            <IconButton
              color='inherit'
              aria-label='open drawer'
              edge='start'
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
          )}

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
          </React.Fragment>
        </Toolbar>
      </AppBar>
      {isMenuPage && (
        <MenuDrawer
          openDrawer={openDrawer}
          handleDrawerToggle={handleDrawerToggle}
        />
      )}
    </React.Fragment>
  );
};
export default NavBar;
