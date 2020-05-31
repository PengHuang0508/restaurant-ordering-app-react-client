import React, { useState } from 'react';
// Redux
import { useSelector } from 'react-redux';
// MUI
import AddIcon from '@material-ui/icons/Add';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListSubheader from '@material-ui/core/ListSubheader';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import useMediaQuery from '@material-ui/core/useMediaQuery';

// Icon
import ExpandLessRoundedIcon from '@material-ui/icons/ExpandLessRounded';
import ShoppingCartRoundedIcon from '@material-ui/icons/ShoppingCartRounded';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import RemoveRoundedIcon from '@material-ui/icons/RemoveRounded';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
// File
import { taxRate } from '../../utils/variables.js';
import carouselImg1 from '../../images/cart-carousel-img-1.jpg';

// TODO: fix price breakdown
// TODO: cart item count
const useStyles = makeStyles((theme) => ({
  button: {
    color: '#fff',
  },
  appBar: {
    bottom: 0,
    top: 'auto',
  },
  appBarPrice: {
    marginLeft: 'auto',
  },
  cart: {
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '80%',
    overflow: 'auto',
    width: '100%',
  },
  cartHeader: {
    alignItems: 'center',
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
    display: 'flex',
    justifyContent: 'space-between',
    minHeight: '3rem',
    padding: theme.spacing(0, 2),
  },
  cartItemList: {
    '& li:nth-child(odd)': {
      backgroundColor: '#f5f5f5',
    },
    minHeight: '5rem',
    overflow: 'auto',
  },
  cartItemListItem: {
    '& > *': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
    },
    alignItems: 'stretch',
    display: 'flex',
  },
  cartItemListHeader: {
    alignItems: 'center',
  },
  cartItemListItemBody: {
    padding: theme.spacing(0, 1),
  },
  cartItemListItemBodyInstructions: {
    maxHeight: '10rem',
    overflow: 'auto',
  },
  cartItemListFooter: {
    alignItems: 'center',
    flexShrink: 0,
    marginLeft: 'auto',
  },
  cartItemListFooterButton: {
    '& > *': {
      padding: theme.spacing(0.5),
    },
    alignItems: 'center',
    display: 'flex',
  },
  cartFooter: {
    backgroundColor: '#f1f1f1',
    display: 'flex',
    flexShrink: 0,
    justifyContent: 'flex-end',
    padding: theme.spacing(2, 2, 4, 2),
  },
  cartFooterImage: {
    backgroundImage: `url(${carouselImg1})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    flexGrow: 2,
  },
  cartFooterSummary: {
    flexShrink: 0,
    minWidth: '10rem',
    textAlign: 'right',
    // display: 'flex',
    // flexDirection: 'column',
    // justifyContent: 'space-between',
  },
  cartFooterButton: {
    marginTop: theme.spacing(3),
  },
  media: {},
}));

// TODO: Test on low-end mobile devices, expect 60 FPS
const NavCart = () => {
  const classes = useStyles();
  const { cart, GST, PST, subtotal, total } = useSelector((state) => ({
    cart: state.order.cart,
    GST: state.order.GST,
    PST: state.order.PST,
    subtotal: state.order.subtotal,
    total: state.order.total,
  }));
  const [drawer, toggleDrawer] = useState(true);

  const handleToggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    toggleDrawer(open);
  };
  const handleDelete = (itemId, instructions) => {
    console.info('DELETE ITEM');
  };
  const handleDecreaseQuantity = (itemId, instructions) => {
    console.info('DECREASE QUANTITY');
    // console.info('id', itemId);
    // console.info('Ins', instructions);
  };
  const handleIncreaseQuantity = (itemId, instructions) => {
    // prepare with the same instruction?
    console.info('INCREASE QUANTITY');
    // console.info('id', itemId);
    // console.info('Ins', instructions);
  };

  const handleSubmitOrder = () => {
    console.info('SUBMIT ORDER');
  };

  return (
    <AppBar className={classes.appBar} color='secondary' position='fixed'>
      <Toolbar>
        <IconButton className={classes.button} edge='start'>
          <ShoppingCartRoundedIcon />
        </IconButton>
        <Typography className={classes.appBarPrice} variant='subtitle1'>
          Subtotal: ${subtotal}
        </Typography>
        <IconButton
          color='inherit'
          edge='end'
          onClick={handleToggleDrawer(true)}
        >
          <ExpandLessRoundedIcon />
        </IconButton>

        <SwipeableDrawer
          anchor='bottom'
          onClose={handleToggleDrawer(false)}
          onOpen={handleToggleDrawer(true)}
          open={drawer}
        >
          <Container
            className={classes.cart}
            disableGutters
            onKeyDown={handleToggleDrawer(false)}
          >
            <div className={classes.cartHeader}>
              <Typography variant='h6'>Current Order</Typography>
              <IconButton
                aria-label='close cart'
                className={classes.button}
                onClick={handleToggleDrawer(false)}
              >
                <CloseRoundedIcon />
              </IconButton>
            </div>
            <Divider />
            <List className={classes.cartItemList} disablePadding>
              {cart.length === 0 ? (
                <Typography variant='subtitle1'>
                  Your cart is currently empty.
                </Typography>
              ) : (
                cart.map((item, index) => (
                  <ListItem
                    className={classes.cartItemListItem}
                    key={`NavCart-ListItem-${item.itemId}-${index}`}
                  >
                    <div className={classes.cartItemListHeader}>
                      <Avatar
                        alt={`${item.name} thumbnail`}
                        src={item.thumbnailUrl}
                      />
                      <IconButton
                        aria-label='delete item'
                        color='inherit'
                        onClick={() =>
                          handleDelete(item.itemId, item.instructions)
                        }
                      >
                        <DeleteRoundedIcon />
                      </IconButton>
                    </div>
                    <div className={classes.cartItemListItemBody}>
                      <Typography variant='h6'>{item.name}</Typography>

                      {item.instructions ? (
                        <Typography
                          className={classes.cartItemListItemBodyInstructions}
                          paragraph
                          variant='body1'
                        >
                          {item.instructions}
                        </Typography>
                      ) : (
                        <Typography variant='body1' color='textSecondary'>
                          No special instructions
                        </Typography>
                      )}
                    </div>
                    <div className={classes.cartItemListFooter}>
                      <Typography variant='button'>
                        ${item.price.toFixed(2)}
                      </Typography>
                      <div className={classes.cartItemListFooterButton}>
                        <IconButton
                          aria-label='decrease item quantity'
                          onClick={() =>
                            handleDecreaseQuantity(
                              item.itemId,
                              item.instructions
                            )
                          }
                        >
                          <RemoveRoundedIcon />
                        </IconButton>
                        <Typography variant='inherit'>
                          {item.quantity}
                        </Typography>
                        <IconButton
                          aria-label='increase item quantity'
                          onClick={() =>
                            handleIncreaseQuantity(
                              item.itemId,
                              item.instructions
                            )
                          }
                        >
                          <AddRoundedIcon />
                        </IconButton>
                      </div>
                    </div>
                  </ListItem>
                ))
              )}
            </List>
            <Divider />
            <Container className={classes.cartFooter} disableGutters>
              {useMediaQuery('(min-width:600px)') && (
                <div className={classes.cartFooterImage} />
              )}
              <div className={classes.cartFooterSummary}>
                <List disablePadding>
                  <ListItem>
                    <ListItemText primary='Subtotal:' />
                    <Typography variant='subtitle1'>
                      ${subtotal.toFixed(2)}
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary={
                        <div>
                          <Typography display='inline'>GST </Typography>
                          <Typography
                            color='textSecondary'
                            display='inline'
                          >{`(${parseInt(
                            taxRate.GST * 100,
                            10
                          )}%):`}</Typography>
                        </div>
                      }
                    />
                    <Typography variant='subtitle1'>
                      ${GST.toFixed(2)}
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary={
                        <div>
                          <Typography display='inline'>PST </Typography>
                          <Typography
                            color='textSecondary'
                            display='inline'
                          >{`(${parseInt(
                            taxRate.PST * 100,
                            10
                          )}%):`}</Typography>
                        </div>
                      }
                    />
                    <Typography variant='subtitle1'>
                      ${PST.toFixed(2)}
                    </Typography>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText primary='Total:' />
                    <Typography variant='h6'>${total.toFixed(2)}</Typography>
                  </ListItem>
                </List>
                <Button
                  className={classes.cartFooterButton}
                  color='secondary'
                  onClick={handleSubmitOrder}
                  variant='contained'
                >
                  Place Order
                </Button>
              </div>
            </Container>
          </Container>
        </SwipeableDrawer>
      </Toolbar>
    </AppBar>
  );
};

export default NavCart;
