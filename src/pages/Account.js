import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { anonymousSignIn } from '../redux/actions/userActions';
import { useLocation } from 'react-router-dom';
import history from '../history';
// MUI
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/core/styles';
// Icons
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import SecurityIcon from '@material-ui/icons/Security';
// Components
import SignIn from '../components/Account/SignIn';
import SignUp from '../components/Account/SignUp';
// Files
import signInBackground from '../images/signInBackground.jpg';

const StyledTabs = withStyles({
  indicator: {
    backgroundColor: 'transparent',
    display: 'flex',
    justifyContent: 'center',
    '& > div': {
      backgroundColor: '#635ee7',
      maxWidth: 40,
      width: '100%',
    },
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <div /> }} />);

const StyledTab = withStyles((theme) => ({
  root: {
    color: '#000',
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightBold,
    marginRight: theme.spacing(1),
    textTransform: 'none',
    '&:focus': {
      opacity: 1,
    },
  },
}))((props) => <Tab disableRipple {...props} />);

const useStyles = makeStyles((theme) => ({
  accountContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    minHeight: '100vh',
    padding: theme.spacing(6, 0, 3, 0),

    backgroundColor:
      theme.palette.type === 'dark'
        ? theme.palette.grey[900]
        : theme.palette.grey[50],
    backgroundImage: `linear-gradient( rgba(0,0,0,0.4), rgba(0, 0, 0, 0.4) ),url(${signInBackground})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',

    color: theme.palette.text.primary,

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(2, 0),

    backgroundImage:
      ' linear-gradient(to right bottom, #d6e7ff, #ccf2fe, #d0f9f5, #e3fee8, #feffe1)',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: theme.spacing(2),
  },
  avatar: {
    marginBottom: theme.spacing(1),

    backgroundColor: theme.colors.primary[3],
  },
  loadingProgress: {
    width: '100%',
    height: 7,

    borderRadius: '5px',
  },
  middle: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(0, 7),

    color: theme.palette.common.white,

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'row',
      padding: theme.spacing(5, 0),
    },
  },
  divider: {
    borderTop: '7rem solid #bbb',
    borderRadius: '15px',

    [theme.breakpoints.down('sm')]: {
      borderLeft: '7rem solid #bbb',
      borderTop: 0,
    },
  },
  middleText: {
    padding: theme.spacing(2, 0),

    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0, 2),
    },
  },
  altButton: {
    backgroundColor: theme.colors.grey[4],

    '&:hover ': {
      color: theme.colors.success[0],

      backgroundColor: theme.palette.common.white,
    },
  },
}));

const Account = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => ({
    loading: state.ui.loading,
  }));

  let query = new URLSearchParams(useLocation().search);
  let userType = query.get('action');
  let initialState = userType === 'register' ? 1 : 0;
  const [isNewUser, setIsNewUser] = useState(initialState);

  useEffect(() => {
    setIsNewUser(initialState);
  }, [initialState]);

  const handleSwitchTab = (event, newValue) => {
    newValue === 1
      ? history.push({ search: '?action=register' })
      : history.push({ search: '' });

    setIsNewUser(newValue);
  };

  const handleAnonymousSignIn = () => {
    dispatch(anonymousSignIn());
  };

  return (
    <div className={classes.accountContainer}>
      <CssBaseline />
      <Slide in timeout={500}>
        <Paper className={classes.paper} elevation={3}>
          <div className={classes.header}>
            <Avatar className={classes.avatar}>
              <AccountCircleRoundedIcon />
            </Avatar>
            <React.Fragment>
              <StyledTabs
                aria-label='styled tabs'
                onChange={handleSwitchTab}
                value={isNewUser}
              >
                <StyledTab label='Sign in' />
                <StyledTab label='Create new account' />
              </StyledTabs>
              <Typography className={classes.padding} />
            </React.Fragment>
          </div>

          {isNewUser ? <SignUp /> : <SignIn />}

          {loading && <LinearProgress className={classes.loadingProgress} />}
        </Paper>
      </Slide>

      <div className={classes.middle}>
        <hr className={classes.divider} />
        <Typography className={classes.middleText} variant='h6'>
          OR
        </Typography>
        <hr className={classes.divider} />
      </div>

      <Paper>
        <Button
          className={classes.altButton}
          startIcon={<SecurityIcon />}
          onClick={handleAnonymousSignIn}
          size='large'
          variant='outlined'
        >
          Continue as Guest
        </Button>
      </Paper>
    </div>
  );
};

export default Account;
