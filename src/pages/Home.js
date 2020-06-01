import React, { useEffect } from 'react';
// Redux
import { useDispatch } from 'react-redux';
import { guestLogin } from '../redux/actions/userActions';
import { getMenu } from '../redux/actions/menuActions';
// MUI
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
// import Switch from '@material-ui/core/Switch';
// Components
// import MenuList from '../components/Menu/MenuList';
import MenuCard from '../components/Menu/MenuCard';
// File
import headerBg from '../images/homeHeaderBg.jpg';

const useStyles = makeStyles((theme) => ({
  headerContainer: {
    //backgroundColor: theme.palette.background.paper,
    backgroundImage: `linear-gradient( rgba(0,0,0,0.4), rgba(0, 0, 0, 0.4) ),url(${headerBg})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'dark'
        ? theme.palette.grey[900]
        : theme.palette.grey[50],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
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

  useEffect(() => {
    dispatch(guestLogin());
    dispatch(getMenu());
  }, [dispatch]);

  // // Toggle menu views
  // const [toggle, setToggle] = useState(false);
  // let menuMarkup = toggle ? <MenuList /> : <MenuCard />;

  // const handleChange = (event) => {
  //   setToggle(event.target.checked);
  // };

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
            {/* <div>
              <Grid container spacing={2} alignItems='center' justify='center'>
                <Grid item>List View</Grid>
                <Grid item>
                  <Switch
                    checked={toggle}
                    onChange={handleChange}
                    value='toggleView'
                  />
                </Grid>
                <Grid item>Photo View</Grid>
              </Grid>
            </div> */}
          </Container>
        </div>
        <MenuCard />
      </main>
    </React.Fragment>
  );
};

export default Home;
