import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import { useSelector } from 'react-redux';
// MUI
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles, useTheme } from '@material-ui/core/styles';
// Icons
import BlurOnRoundedIcon from '@material-ui/icons/BlurOnRounded';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerTitle: {
    fontWeight: '700',
    color: theme.colors.rose[2],
  },
  drawerTitleIcon: {
    color: theme.colors.rose[2],
  },
  drawerLink: {
    textDecoration: 'none',
  },
  drawerLinkText: {
    fontWeight: '700',
    color: theme.colors.grey[2],
  },
}));
const MenuDrawer = (props) => {
  const { window, openDrawer, handleDrawerToggle } = props;
  const classes = useStyles();
  const theme = useTheme();
  const { menu } = useSelector((state) => ({
    menu: state.menu.menu,
  }));

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const drawerContent = (
    <React.Fragment>
      <div className={classes.toolbar} />
      <Divider />
      <List>
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
        {menu.map((category) => (
          <Link
            key={`MenuDrawer-${category.settings.categoryId}`}
            className={classes.drawerLink}
            to={`#${category.settings.categoryId}`}
            smooth
          >
            <ListItem button>
              <ListItemText
                className={classes.drawerLinkText}
                primary={category.settings.name}
                primaryTypographyProps={{ variant: 'h6', component: 'h3' }}
              />
            </ListItem>
          </Link>
        ))}
      </List>
    </React.Fragment>
  );

  // TODO: Add expand cart icon

  return (
    <nav>
      <Hidden smUp implementation='css'>
        <Drawer
          container={container}
          variant='temporary'
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={openDrawer}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawerContent}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation='css'>
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant='permanent'
          open
        >
          {drawerContent}
        </Drawer>
      </Hidden>
    </nav>
  );
};

export default MenuDrawer;
