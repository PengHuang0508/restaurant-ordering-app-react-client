import React from 'react';
import { useSelector } from 'react-redux';
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
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  order: {
    // paddingTop: theme.spacing(),
  },
}));

const Order = () => {
  const classes = useStyles();
  const { order } = useSelector((state) => ({
    order: state.order.order,
  }));

  return (
    <div className={classes.order}>
      <div className={classes.header}>
        <Typography>Details of your order.</Typography>
        <div>Order Number: Order Placed:</div>
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
