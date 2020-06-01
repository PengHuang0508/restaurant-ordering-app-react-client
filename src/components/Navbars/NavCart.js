import React, { useState } from 'react';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import {
  AddCartItem,
  RemoveCartItem,
  DeleteCartItem,
  SendOrder,
} from '../../redux/actions/orderActions';
// MUI
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles } from '@material-ui/core/styles';
// Icon
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import ExpandLessRoundedIcon from '@material-ui/icons/ExpandLessRounded';
import RemoveRoundedIcon from '@material-ui/icons/RemoveRounded';
import ShoppingCartRoundedIcon from '@material-ui/icons/ShoppingCartRounded';
// File
import carouselImg1 from '../../images/cart-carousel-img-1.jpg';
import { taxRate } from '../../utils/variables.js';

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
  cartEmpty: {
    padding: theme.spacing(1, 2, 0, 2),
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
  },
  cartFooterButton: {
    marginTop: theme.spacing(3),
  },
  media: {},
}));

const NavCart = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { cart, GST, PST, subtotal, table, total } = useSelector((state) => ({
    table: state.order.table,
    cart: state.order.cart,
    GST: state.order.GST,
    PST: state.order.PST,
    subtotal: state.order.subtotal,
    total: state.order.total,
  }));
  const [drawer, toggleDrawer] = useState(false);

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
    dispatch(DeleteCartItem({ itemId, instructions }));
  };
  const handleDecreaseQuantity = (itemId, instructions) => {
    dispatch(RemoveCartItem({ itemId, instructions }));
  };
  const handleIncreaseQuantity = (itemId, price, instructions) => {
    dispatch(AddCartItem({ itemId, price, instructions, quantity: 1 }));
  };

  const handleSubmitOrder = () => {
    dispatch(SendOrder(table, cart));
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
              <Typography variant='h6'>Current Order ({table})</Typography>

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
                <Typography className={classes.cartEmpty} variant='subtitle1'>
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
                              item.price,
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
                    <ListItemText primary='Subtotal: ' />
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
