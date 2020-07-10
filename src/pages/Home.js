import React, { useEffect } from 'react';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { getMenu } from '../redux/actions/menuActions';
import { getDineInOrder } from '../redux/actions/orderActions';
// MUI
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
// Components
import MenuCard from '../components/Menu/MenuCard';
// Files
import headerBg from '../images/homeHeaderBackground.jpg';

const useStyles = makeStyles((theme) => ({
  headerContainer: {
    backgroundColor:
      theme.palette.type === 'dark'
        ? theme.palette.grey[900]
        : theme.palette.grey[50],
    backgroundImage: `linear-gradient( rgba(0,0,0,0.4), rgba(0, 0, 0, 0.4) ),url(${headerBg})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    color: 'rgb(255,255,255)',
    padding: theme.spacing(10, 0, 10, 0),
  },
  homeTitle: {
    fontFamily: 'Dancing Script, cursive',
  },
  homeSubtitle: {
    fontFamily: 'Playfair Display, serif',
    fontStyle: 'italic',
  },
}));

const Home = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { table, orderId } = useSelector((state) => ({
    table: state.order.table,
    orderId: state.order.order.orderId,
  }));

  useEffect(() => {
    dispatch(getMenu());
    if (table && orderId) {
      dispatch(getDineInOrder(orderId));
    }
  }, [dispatch, table, orderId]);

  return (
    <React.Fragment>
      <main>
        <div className={classes.headerContainer}>
          <Container maxWidth='sm'>
            <Typography
              className={classes.homeTitle}
              variant='h3'
              align='center'
              gutterBottom
            >
              Welcome to Pome'Lona
            </Typography>
            <Typography
              className={classes.homeSubtitle}
              variant='subtitle1'
              align='center'
            >
              An oasis of pleasure.
            </Typography>
          </Container>
        </div>
        <MenuCard />
      </main>
    </React.Fragment>
  );
};

export default Home;
