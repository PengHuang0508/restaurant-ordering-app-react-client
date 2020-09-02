import React, { useState } from 'react';
import history from '../../history';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { addToOrder, sendDineInOrder } from '../../redux/actions/orderActions';
// MUI
import AppBar from '@material-ui/core/AppBar';
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
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import ExpandLessRoundedIcon from '@material-ui/icons/ExpandLessRounded';
import ShoppingCartRoundedIcon from '@material-ui/icons/ShoppingCartRounded';
// Components
import CartList from './CartList';
// File
import carouselImg1 from '../../images/cart-carousel-img-1.jpg';
import { taxRate } from '../../utils/variables';

const useStyles = makeStyles((theme) => ({
  button: {
    color: theme.palette.common.white,
  },
  appBar: {
    bottom: 0,
    top: 'auto',
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${240}px)`,
      marginLeft: 240,
    },
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
    backgroundColor: theme.palette.secondary.dark,
    color: theme.palette.common.white,
    display: 'flex',
    justifyContent: 'space-between',
    minHeight: '3rem',
    padding: theme.spacing(0, 2, 0, 4),
    marginBottom: -1,
  },
  cartFooter: {
    backgroundColor: '#f1f1f1',
    display: 'flex',
    flexShrink: 0,
    justifyContent: 'center',
    padding: theme.spacing(2),
  },
  cartFooterImage: {
    backgroundImage: `url(${carouselImg1})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    flexGrow: 5,
  },
  cartFooterSummary: {
    flexGrow: 1,
    flexShrink: 0,
    minWidth: '10rem',
    textAlign: 'right',
  },
  cartFooterButton: {
    padding: theme.spacing(1, 1, 0, 0),
  },
}));

const Cart = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    authenticated,
    order,
    type,
    table,
    cart,
    subtotal,
    GST,
    total,
  } = useSelector((state) => ({
    authenticated: state.user.authenticated,
    order: state.order.order,
    type: state.order.type,
    table: state.order.table,
    cart: state.order.cart,
    subtotal: state.order.subtotal,
    GST: state.order.GST,
    total: state.order.total,
  }));

  const [drawer, toggleDrawer] = useState(false);

  const handleDrawerToggle = (open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    toggleDrawer(open);
  };
  const handleSubmitOrder = () => {
    if (type === 'DINE-IN') {
      if (order.table === table && order.status === 'OPEN') {
        dispatch(
          addToOrder(order.orderId, { subtotal, itemList: cart.itemList })
        );
      } else {
        dispatch(sendDineInOrder({ table, subtotal, itemList: cart.itemList }));
      }
    } else if (authenticated) {
      history.push('/checkout');
    } else {
      history.push('/account');
    }
  };

  return (
    <AppBar className={classes.appBar} color='secondary' position='fixed'>
      <Toolbar>
        <IconButton className={classes.button} edge='start'>
          <ShoppingCartRoundedIcon />
        </IconButton>
        <Typography className={classes.appBarPrice} variant='subtitle1'>
          Subtotal: ${subtotal.toFixed(2)}
        </Typography>
        <IconButton
          color='inherit'
          edge='end'
          onClick={handleDrawerToggle(true)}
        >
          <ExpandLessRoundedIcon />
        </IconButton>

        <SwipeableDrawer
          anchor='bottom'
          onClose={handleDrawerToggle(false)}
          onOpen={handleDrawerToggle(true)}
          open={drawer}
        >
          <Container
            className={classes.cart}
            disableGutters
            maxWidth={false}
            onKeyDown={handleDrawerToggle(false)}
          >
            <div className={classes.cartHeader}>
              <Typography variant='subtitle1'>
                {table ? `Table Number: ${table}` : "Welcome to Pome'Lona"}
              </Typography>

              <IconButton
                aria-label='close cart'
                className={classes.button}
                onClick={handleDrawerToggle(false)}
              >
                <CloseRoundedIcon />
              </IconButton>
            </div>
            <Divider />

            {order.orderId &&
              order.table === table &&
              order.status === 'OPEN' && (
                <CartList title='Placed Order' component={order} />
              )}

            <CartList title='Current Order' component={cart} />
            <Divider />
            <Container
              className={classes.cartFooter}
              disableGutters
              maxWidth={false}
            >
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
                        <React.Fragment>
                          <Typography display='inline'>GST </Typography>
                          <Typography
                            color='textSecondary'
                            display='inline'
                          >{`(${parseInt(
                            taxRate.GST * 100,
                            10
                          )}%):`}</Typography>
                        </React.Fragment>
                      }
                    />
                    <Typography variant='subtitle1'>
                      ${GST.toFixed(2)}
                    </Typography>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText primary='Total:' />
                    <Typography variant='h6'>${total.toFixed(2)}</Typography>
                  </ListItem>
                </List>
                <div className={classes.cartFooterButton}>
                  <Button
                    color='secondary'
                    onClick={handleSubmitOrder}
                    variant='contained'
                  >
                    Place Order
                  </Button>
                </div>
              </div>
            </Container>
          </Container>
        </SwipeableDrawer>
      </Toolbar>
    </AppBar>
  );
};

export default Cart;
