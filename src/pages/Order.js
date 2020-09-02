import React from 'react';
// import { useSelector } from 'react-redux';
// MUI
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({}));

// TODO: WIP

const Order = () => {
  const classes = useStyles();
  // const { order } = useSelector((state) => ({
  //   order: state.order.order,
  // }));

  return (
    <div className={classes.order}>
      <div className={classes.header}>
        <Typography>Details of your order.</Typography>
        <p>Order Number: Order Placed:</p>
      </div>

      <Grid container>
        <Grid item xs={12} md={4} lg={3}>
          <Paper>ORDER DETAILS</Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <Paper>ORDER DETAILS</Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Order;
