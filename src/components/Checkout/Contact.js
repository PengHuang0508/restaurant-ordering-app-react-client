import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPaymentInformation } from '../../redux/actions/orderActions';
// Hooks
import { useInputs } from '../../hooks/useInputs';
// MUI
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
// Validators
import { validateContactData } from '../../utils/validators';

const useStyles = makeStyles((theme) => ({
  section: {
    width: '100%',
    margin: theme.spacing(1, 0, 4, 0),
  },
  sectionTitle: {
    padding: theme.spacing(1),
    marginBottom: theme.spacing(2),

    color: theme.palette.common.white,

    backgroundColor: theme.palette.common.black,
  },
  type: {
    width: '100%',
  },
  typeRadio: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  optionContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  options: {
    width: '100%',
  },
  optionsTitle: {
    marginBottom: theme.spacing(1),

    color: theme.palette.primary,
  },
}));

const Contact = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { contact, paymentMethod, type } = useSelector((state) => ({
    contact: state.order.cart.contact,
    paymentMethod: state.order.cart.paymentMethod,
    type: state.order.type,
  }));
  const initialState = {
    email: contact.email,
    firstName: contact.firstName,
    lastName: contact.lastName,
    phoneNumber: contact.phoneNumber ? contact.phoneNumber : '',
  };
  const { inputs: userInputs, bind: bindUserInputs } = useInputs(initialState);
  const [newPaymentMethod, setPaymentMethod] = useState(paymentMethod);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const { valid, errors } = validateContactData(userInputs);

    if (!valid) setErrors(errors);

    return () => {
      setErrors({});

      dispatch(
        setPaymentInformation({
          contact: userInputs,
          paymentMethod: newPaymentMethod,
        })
      );
    };
  }, [dispatch, newPaymentMethod, userInputs]);

  const handleSelect = (event) => {
    setPaymentMethod(event.target.value);
  };

  return (
    <React.Fragment>
      <Container className={classes.section}>
        <Typography className={classes.sectionTitle} variant='h6'>
          How should we serve you today?
        </Typography>

        <FormControl className={classes.type} component='fieldset'>
          <RadioGroup
            aria-label='order-type'
            className={classes.typeRadio}
            name='orderType'
            value={type}
          >
            <FormControlLabel
              value='PICK-UP'
              control={<Radio color='primary' />}
              label='Pick up'
            />
            <FormControlLabel
              value='DELIVERY'
              disabled
              control={<Radio />}
              label='Delivery'
            />
          </RadioGroup>
        </FormControl>

        <Typography variant='caption'>
          *Delivery is currently unavailable. Sorry for the inconvenience.*
        </Typography>
      </Container>

      <Container className={classes.section}>
        <Typography className={classes.sectionTitle} variant='h6'>
          Contact Information
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete='fname'
              error={errors.firstName ? true : false}
              fullWidth
              helperText={errors.firstName}
              id='firstName'
              label='First Name'
              name='firstName'
              required
              value={userInputs.firstName}
              variant='outlined'
              {...bindUserInputs}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete='lname'
              error={errors.lastName ? true : false}
              fullWidth
              helperText={errors.lastName}
              id='lastName'
              label='Last Name'
              name='lastName'
              required
              value={userInputs.lastName}
              variant='outlined'
              {...bindUserInputs}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={errors.email ? true : false}
              fullWidth
              helperText={errors.email}
              id='email'
              label='Email Address'
              name='email'
              required
              value={userInputs.email}
              variant='outlined'
              {...bindUserInputs}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={errors.phoneNumber ? true : false}
              helperText={errors.phoneNumber}
              autoComplete='tel'
              fullWidth
              id='phoneNumber'
              label='Phone Number'
              name='phoneNumber'
              type='tel'
              value={userInputs.phoneNumber}
              variant='outlined'
              {...bindUserInputs}
            />
          </Grid>
        </Grid>
      </Container>

      <Container className={classes.section}>
        <Typography className={classes.sectionTitle} variant='h6'>
          Payment Method
        </Typography>

        <div className={classes.optionContainer}>
          <FormControl className={classes.options} component='fieldset'>
            <FormLabel className={classes.optionsTitle} component='legend'>
              <Typography variant='h6'>In Store</Typography>
            </FormLabel>
            <RadioGroup
              aria-label='in-store-payment-methods'
              name='in-store-payment-methods'
              value={newPaymentMethod}
              onChange={handleSelect}
            >
              <FormControlLabel
                value='inStore-CASH'
                control={<Radio />}
                label='Cash'
              />
              <FormControlLabel
                value='inStore-CARD'
                control={<Radio />}
                label='Debit/Credit Card'
              />
            </RadioGroup>
          </FormControl>

          <FormControl className={classes.options} component='fieldset'>
            <FormLabel className={classes.optionsTitle} component='legend'>
              <Typography variant='h6'>Online</Typography>
            </FormLabel>
            <RadioGroup
              aria-label='online-payment-methods'
              name='online-payment-methods'
              value={newPaymentMethod}
              onChange={handleSelect}
            >
              <FormControlLabel
                value='online-CARD'
                disabled
                control={<Radio />}
                label='Credit card'
              />
              <FormControlLabel
                value='online-PAYPAL'
                disabled
                control={<Radio />}
                label='Paypal'
              />
              <FormControlLabel
                value='online-WECHATPAY'
                disabled
                control={<Radio />}
                label='WeChat Pay'
              />
              <FormControlLabel
                value='online-ALIPAY'
                disabled
                control={<Radio />}
                label='AliPay'
              />
            </RadioGroup>
            <Typography variant='caption'>
              *Online payment is currently unavailable. Sorry for the
              inconvenience.*
            </Typography>
          </FormControl>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default Contact;
