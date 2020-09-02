import React from 'react';
import { useSelector } from 'react-redux';
// MUI
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
// Files
import { taxRate } from '../../utils/variables';

const useStyles = makeStyles((theme) => ({
  cartSummary: {
    paddingBottom: theme.spacing(1.5),
  },
  priceSummary: {
    backgroundColor: '#ddd',
  },
  sectionTitle: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    padding: theme.spacing(1),
  },
  itemInformation: {
    maxWidth: '90%',

    [theme.breakpoints.down('sm')]: {
      maxWidth: '80%',
    },
  },
  quantityContainer: {
    minWidth: '2.5rem',
    textAlign: 'center',
  },
  quantity: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    width: '60%',
  },
  price: {
    minWidth: '4rem',
    textAlign: 'right',
  },
}));

const OrderSummary = () => {
  const classes = useStyles();
  const { cart, GST, total } = useSelector((state) => ({
    cart: state.order.cart,
    GST: state.order.GST,
    total: state.order.total,
  }));

  return (
    <React.Fragment>
      <Typography className={classes.sectionTitle} variant='h6'>
        Details of your order
      </Typography>
      <List className={classes.cartSummary} disablePadding>
        {cart.itemList.map((item, i) => (
          <React.Fragment key={item.itemId + i}>
            <Divider variant='middle' component='li' />

            <ListItem>
              <div className={classes.quantityContainer}>
                <Typography className={classes.quantity}>
                  {item.quantity}
                </Typography>
              </div>
              <ListItemText
                className={classes.itemInformation}
                primary={<Typography variant='h6'>{item.name}</Typography>}
                secondary={
                  <Typography variant='body2'>{item.instructions}</Typography>
                }
              />
              <ListItemSecondaryAction>
                <Typography className={classes.price}>${item.price}</Typography>
              </ListItemSecondaryAction>
            </ListItem>
          </React.Fragment>
        ))}
      </List>

      <List className={classes.priceSummary} disablePadding>
        <ListItem>
          <ListItemText primary='Subtotal: ' />
          <Typography variant='subtitle1'>
            ${cart.subtotal.toFixed(2)}
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
                >{`(${parseInt(taxRate.GST * 100, 10)}%):`}</Typography>
              </React.Fragment>
            }
          />
          <Typography variant='subtitle1'>${GST.toFixed(2)}</Typography>
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText primary='Total:' />
          <Typography variant='h6'>${total.toFixed(2)}</Typography>
        </ListItem>
      </List>
    </React.Fragment>
  );
};

export default OrderSummary;
