import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendDineInOrder, sendOrder } from '../redux/actions/orderActions';
// MUI
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
// Components
import Contact from '../components/Checkout/Contact';
import Review from '../components/Checkout/Review';
// Files
import checkoutBackground from '../images/checkoutBackground.jpg';

const useStyles = makeStyles((theme) => ({
  loader: {
    textAlign: 'center',
  },
  container: {
    alignItems: 'center',
    backgroundColor:
      theme.palette.type === 'dark'
        ? theme.palette.grey[900]
        : theme.palette.grey[50],
    backgroundImage: `linear-gradient( rgba(0,0,0,0.4), rgba(0, 0, 0, 0.4) ),url(${checkoutBackground})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    display: 'flex',
    height: '100%',
    minHeight: '100vh',
    padding: theme.spacing(6, 0, 3, 0),
    width: '100%',
  },
  layout: {
    backgroundColor: 'rgba(255,255,255,0.5)',
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(0, 5),
    width: '100%',

    [theme.breakpoints.down('sm')]: {
      padding: 0,
    },
  },
  paper: {
    maxWidth: '75%',
    padding: theme.spacing(5, 3),

    [theme.breakpoints.down('sm')]: {
      maxWidth: '100%',
    },
  },
  title: {
    fontFamily: 'Dancing Script, cursive',
    fontWeight: 'bold',
  },
  stepper: {
    padding: theme.spacing(3, 0, 5, 0),
    width: '100%',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
  },
}));

const steps = ['Contact Information', 'Review your order'];

const getStepContent = (step) => {
  switch (step) {
    case 0:
      return <Contact />;
    case 1:
      return <Review />;
    default:
      throw new Error('Unknown step');
  }
};

const Checkout = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { orderId, subtotal, table, cart, loading, type } = useSelector(
    (state) => ({
      cart: state.order.cart,
      loading: state.ui.loading,
      orderId: state.order.order.orderId,
      subtotal: state.order.subtotal,
      table: state.order.table,
      type: state.order.type,
    })
  );
  const [activeStep, setActiveStep] = useState(type === 'DINE-IN' ? 1 : 0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handlePlaceOrder = () => {
    if (type === 'DINE-IN') {
      dispatch(sendDineInOrder({ table, subtotal, itemList: cart.itemList }));
    } else {
      dispatch(sendOrder(cart));
    }
    setActiveStep(2);
  };

  return (
    <div className={classes.container}>
      <CssBaseline />

      <div className={classes.layout}>
        <Paper className={classes.paper} elevation={3}>
          <Typography
            className={classes.title}
            component='h1'
            variant='h3'
            align='center'
          >
            Checkout
          </Typography>

          {activeStep !== steps.length ? (
            <Typography variant='subtitle1' align='center'>
              We are almost ready to cook. But first, we just need a way to
              contact you once everything is ready.
            </Typography>
          ) : (
            <Typography variant='subtitle1' align='center'>
              See you in a bit.
            </Typography>
          )}

          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {activeStep === steps.length ? (
            <React.Fragment>
              {loading ? (
                <div className={classes.loader}>
                  <CircularProgress />
                </div>
              ) : (
                <React.Fragment>
                  <Typography variant='h5' gutterBottom>
                    Thank you for your order.
                  </Typography>
                  <Typography variant='subtitle1'>
                    Your order number is {orderId}. We have emailed your order
                    confirmation, and will send you an update when your order is
                    ready for pick-up.
                  </Typography>
                </React.Fragment>
              )}
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <div className={classes.buttons}>
                {activeStep !== 0 && (
                  <Button className={classes.button} onClick={handleBack}>
                    Back
                  </Button>
                )}

                {activeStep === steps.length - 1 ? (
                  <Button
                    className={classes.button}
                    color='primary'
                    onClick={handlePlaceOrder}
                    variant='contained'
                  >
                    Place order
                  </Button>
                ) : (
                  <Button
                    className={classes.button}
                    color='primary'
                    onClick={handleNext}
                    variant='contained'
                  >
                    Next
                  </Button>
                )}
              </div>
            </React.Fragment>
          )}
        </Paper>
      </div>
    </div>
  );
};

export default Checkout;
