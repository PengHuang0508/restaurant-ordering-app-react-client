import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
// MUI
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
// Components
import OrderSummary from './OrderSummary';
// Files
import { storeInformation } from '../../utils/variables';

const useStyles = makeStyles((theme) => ({
  contact: {
    margin: theme.spacing(0, 0, 2, 1),
  },
  message: {
    marginBottom: theme.spacing(1),
  },
  footer: {
    marginTop: theme.spacing(1),
  },
}));

const Review = () => {
  const classes = useStyles();
  const { contact } = useSelector((state) => ({
    contact: state.order.cart.contact,
  }));

  return (
    <React.Fragment>
      <div className={classes.contact}>
        <Typography className={classes.message} variant='subtitle1'>
          Just to make sure we got it right. Please review your order and
          information again.
        </Typography>

        <Typography className={classes.contacts} paragraph>
          Looks like Mr/Mrs <b>{contact.lastName}</b> is going to pick up the
          order. Confirmation will be sent to <b>{contact.email}</b>.{' '}
          {contact.phoneNumber && (
            <span>
              We will call <b>{contact.phoneNumber}</b> to reach you, if
              necessary.
            </span>
          )}
        </Typography>
      </div>

      <OrderSummary />

      <div className={classes.footer}>
        <Typography variant='subtitle1'>
          {"If you have any questions or concerns, don't hesitate to call us, " +
            [storeInformation.telephoneNumber] +
            '.'}
        </Typography>
      </div>
    </React.Fragment>
  );
};

export default Review;
