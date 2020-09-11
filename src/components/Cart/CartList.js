import React from 'react';
import clsx from 'clsx';
// Redux
import { useDispatch } from 'react-redux';
import {
  addCartItem,
  deleteCartItem,
  removeCartItem,
} from '../../redux/actions/orderActions';
import { enqueueSnackbar } from '../../redux/actions/snackbarActions';
// MUI
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
// Icon
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import RemoveRoundedIcon from '@material-ui/icons/RemoveRounded';

const useStyles = makeStyles((theme) => ({
  orderItemList: {
    maxHeight: '50rem',
    overflow: 'auto',
  },
  cartItemList: {
    minHeight: '5rem',
    overflow: 'auto',

    '& li:nth-child(odd)': {
      backgroundColor: '#f5f5f5',
    },
  },
  orderTitle: {
    padding: theme.spacing(2, 0, 2, 4),

    color: theme.palette.common.white,

    backgroundColor: theme.palette.secondary.main,
  },
  cartTitle: {
    padding: theme.spacing(2, 0, 2, 4),

    color: theme.palette.common.white,

    backgroundColor: theme.palette.primary.main,
  },
  cartEmpty: {
    padding: theme.spacing(2, 0, 2, 4),

    backgroundColor: '#f5f5f5',
  },
  cartItemListItem: {
    display: 'flex',
    alignItems: 'stretch',
    minHeight: '7rem',
    padding: theme.spacing(2, 3, 0, 2),

    '& > *': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
    },
  },
  cartItemListHeader: {
    alignItems: 'center',
  },
  cartItemListItemBody: {
    paddingLeft: theme.spacing(2),
  },
  cartItemListItemBodyInstructions: {
    maxHeight: '10rem',
    overflow: 'auto',
  },
  cartItemListFooter: {
    flexShrink: 0,
    alignItems: 'flex-end',
    marginLeft: 'auto',
  },
  cartItemListFooterPrice: {
    paddingRight: theme.spacing(1),
  },
  cartItemListFooterButton: {
    '& > *': {
      padding: theme.spacing(0.5),
    },

    display: 'flex',
    alignItems: 'center',
  },
  cartItemListFooterQuantity: {
    paddingRight: theme.spacing(1),
  },
  cartSubtotal: {
    padding: theme.spacing(2, 4, 2, 0),

    textAlign: 'right',
  },
}));

const CartList = (props) => {
  const {
    title,
    component: { orderId, itemList, subtotal },
  } = props;
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleDelete = (itemId, instructions) => {
    dispatch(deleteCartItem({ itemId, instructions }));
    dispatch(
      enqueueSnackbar({
        message: 'Item removed from the cart.',
        options: {
          key: new Date().getTime() + Math.random(),
          variant: 'info',
        },
      })
    );
  };
  const handleDecreaseQuantity = (itemId, instructions) => {
    dispatch(removeCartItem({ itemId, instructions }));
  };
  const handleIncreaseQuantity = (itemId, price, instructions) => {
    dispatch(addCartItem({ itemId, price, instructions, quantity: 1 }));
  };

  return (
    <List
      className={clsx(orderId ? classes.orderItemList : classes.cartItemList)}
      disablePadding
      subheader={
        title && (
          <Typography
            className={clsx(orderId ? classes.orderTitle : classes.cartTitle)}
            variant='h5'
          >
            {title}
          </Typography>
        )
      }
    >
      {itemList.length === 0 ? (
        <Typography className={classes.cartEmpty} variant='subtitle1'>
          Your cart is currently empty.
        </Typography>
      ) : (
        <React.Fragment>
          {itemList.map((item, index) => (
            <ListItem
              className={classes.cartItemListItem}
              key={`CartList-ListItem-${title}-${item.itemId}-${index}`}
            >
              <div className={classes.cartItemListHeader}>
                <Avatar
                  alt={`${item.name} thumbnail`}
                  src={item.thumbnailUrl}
                />
                {!orderId && (
                  <IconButton
                    aria-label='delete item'
                    color='inherit'
                    onClick={() => handleDelete(item.itemId, item.instructions)}
                  >
                    <DeleteRoundedIcon />
                  </IconButton>
                )}
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
                <Typography
                  className={classes.cartItemListFooterPrice}
                  variant='button'
                >
                  ${item.price.toFixed(2)}
                </Typography>
                {orderId ? (
                  <Typography
                    className={classes.cartItemListFooterQuantity}
                    variant='inherit'
                  >
                    Quantity: {item.quantity}
                  </Typography>
                ) : (
                  <div className={classes.cartItemListFooterButton}>
                    Quantity:
                    <IconButton
                      aria-label='decrease item quantity'
                      onClick={() =>
                        handleDecreaseQuantity(item.itemId, item.instructions)
                      }
                    >
                      <RemoveRoundedIcon />
                    </IconButton>
                    <Typography variant='inherit'>{item.quantity}</Typography>
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
                )}
              </div>
            </ListItem>
          ))}
          <Divider />
          <Typography className={classes.cartSubtotal} variant='h6'>
            Subtotal: ${subtotal.toFixed(2)}
          </Typography>
        </React.Fragment>
      )}
    </List>
  );
};

export default CartList;
