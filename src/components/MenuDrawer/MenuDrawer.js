import React, { useState } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import { useSelector } from 'react-redux';
// Hooks
import { useWindowSize } from '../../hooks/useWindowSize';
// MUI
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { makeStyles } from '@material-ui/core/styles';
// Icons
import BlurOnRoundedIcon from '@material-ui/icons/BlurOnRounded';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import MenuBookRoundedIcon from '@material-ui/icons/MenuBookRounded';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  drawerButton: {
    position: 'fixed',
    top: '50%',
    left: '0',
    zIndex: 1101,

    padding: theme.spacing(2),

    fontSize: '2em',
    color: '#fff',

    backgroundColor: 'rgba(0,0,0,0.75)',
    borderRadius: '0 5px 5px 0',

    transform: 'translate(0, 40%)',

    '&:hover': {
      backgroundColor: '#000',
    },

    [theme.breakpoints.down('xs')]: {
      padding: 0,

      borderRadius: '5px 5px 0 0',

      transform: 'rotate(90deg) translate(0, 90%)',
    },
  },
  menuIcon: {
    transform: 'rotate(90deg) translate(0, 90%)',
  },
  menuDrawer: {
    display: 'flex',
    flexDirection: 'column',
    width: 250,
    height: '100%',
    padding: 0,
  },
  drawerTitle: {
    fontWeight: 'bold',
    color: theme.colors.rose[2],
  },
  drawerTitleIcon: {
    color: theme.colors.rose[2],
  },
  loader: {
    margin: '30px 0 0 90px',
  },
  drawerCategories: {
    flex: '1 0 auto',
  },
  drawerCategory: {
    textDecoration: 'none',
  },
  drawerCategoryText: {
    paddingLeft: theme.spacing(1),

    fontWeight: '700',
    color: theme.colors.grey[2],
  },
  drawerFooter: {
    padding: theme.spacing(2, 0),
  },
  drawerFooterExitIcon: {
    marginLeft: 'auto',

    '&:hover': {
      cursor: 'pointer',
    },
  },
}));
const MenuDrawer = () => {
  const classes = useStyles();
  const { loading, menu } = useSelector((state) => ({
    loading: state.menu.loading,
    menu: state.menu.menu,
  }));
  const [open, setOpen] = useState(false);
  const windowSize = useWindowSize();
  const isSmallViewport = windowSize.width < 600;

  const toggleDrawer = (event, isOpen) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setOpen(isOpen);
  };

  const menuCategoryList = () => (
    <List
      className={classes.menuDrawer}
      onClick={(e) => toggleDrawer(e, false)}
      onKeyDown={(e) => toggleDrawer(e, false)}
    >
      <ListItem className={classes.drawerTitle}>
        <ListItemIcon className={classes.drawerTitleIcon}>
          <BlurOnRoundedIcon />
        </ListItemIcon>
        <ListItemText
          primary='MENU'
          primaryTypographyProps={{ variant: 'h5', component: 'h2' }}
        />
      </ListItem>
      <Divider />
      <div className={classes.drawerCategories}>
        <ListSubheader>Categories</ListSubheader>
        {loading && <CircularProgress className={classes.loader} />}
        {menu.map((category) => (
          <Link
            key={`MenuDrawer-${category.settings.categoryId}`}
            className={classes.drawerCategory}
            to={`#${category.settings.categoryId}`}
            smooth
          >
            <ListItem button>
              <ListItemText
                className={classes.drawerCategoryText}
                primary={category.settings.name}
                primaryTypographyProps={{ variant: 'h6', component: 'h3' }}
              />
            </ListItem>
          </Link>
        ))}
      </div>

      <Divider />
      <ListItem className={classes.drawerFooter}>
        <ListItemIcon
          className={classes.drawerFooterExitIcon}
          onClick={(e) => toggleDrawer(e, false)}
        >
          <ExitToAppRoundedIcon />
        </ListItemIcon>
      </ListItem>
    </List>
  );

  return (
    <React.Fragment>
      <Button
        className={classes.drawerButton}
        onClick={(e) => toggleDrawer(e, true)}
        aria-label='open drawer'
      >
        {isSmallViewport ? <MenuIcon /> : <MenuBookRoundedIcon />}
      </Button>

      <Drawer
        open={open}
        onClose={(e) => toggleDrawer(e, false)}
        disableScrollLock
      >
        {menuCategoryList()}
      </Drawer>
    </React.Fragment>
  );
};

export default MenuDrawer;
