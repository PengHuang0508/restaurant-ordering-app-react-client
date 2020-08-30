import React from 'react';
import history from '../../history';
// MUI
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
// Icons
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import AddShoppingCartRoundedIcon from '@material-ui/icons/AddShoppingCartRounded';
import AccessTimeRoundedIcon from '@material-ui/icons/AccessTimeRounded';
// Files
import accountMenuBackground from '../../images/accountMenuBackground.jpg';

const useStyles = makeStyles((theme) => ({
  accountMenu: {
    alignContent: 'center',
    backgroundColor:
      theme.palette.type === 'dark'
        ? theme.palette.grey[900]
        : theme.palette.grey[50],
    backgroundImage: `linear-gradient( rgba(0,0,0,0.7), rgba(0, 0, 0, 0.4) ),url(${accountMenuBackground})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'space-between',
    maxWidth: '25rem',
    minHeight: '15rem',
    minWidth: '20rem',
    paddingBottom: theme.spacing(2),
    width: '100%',

    [theme.breakpoints.down('xs')]: {
      background: theme.palette.background.paper,
      justifyContent: 'center',
      maxWidth: '15rem',
      minHeight: '10rem',
      minWidth: '15rem',
    },
  },
  arrowDown: {
    borderLeft: '10px solid transparent',
    borderRight: '10px solid transparent',
    borderTop: '10px solid rgb(115, 205, 185)',
    height: 0,
    marginLeft: 'auto',
    marginRight: '0.9rem',
    width: 0,
  },
  benefitContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: theme.spacing(3, 2),
    textAlign: 'center',

    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2, 3, 0, 3),
    },
  },
  benefitText: {
    marginBottom: theme.spacing(1),
  },
  benefitIcon: {
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  buttonContainer: {
    textAlign: 'center',

    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(1),
    },
  },
  button: {
    height: '100%',
    width: '90%',

    [theme.breakpoints.down('xs')]: {
      height: 'auto',
      marginTop: theme.spacing(2),
    },
  },
}));

const AccountMenu = (props) => {
  const classes = useStyles();
  const { handleClose } = props;

  return (
    <Container className={classes.accountMenu} disableGutters>
      <div className={classes.arrowDown} onClick={handleClose} />
      <Grid className={classes.benefitContainer} container>
        <Grid className={classes.benefitText} item xs={12}>
          <Typography variant='caption'>
            Sign in to place order online, save to favorites and access order
            history.
          </Typography>
        </Grid>
        <Grid className={classes.benefitIcon} item sm={4} xs={12}>
          <AddShoppingCartRoundedIcon fontSize='small' />
        </Grid>
        <Grid className={classes.benefitIcon} item sm={4} xs={12}>
          <FavoriteBorderRoundedIcon color='secondary' fontSize='small' />
        </Grid>
        <Grid className={classes.benefitIcon} item sm={4} xs={12}>
          <AccessTimeRoundedIcon fontSize='small' />
        </Grid>
      </Grid>

      <Grid className={classes.buttonContainer} container>
        <Grid item sm={6} xs={12}>
          <Button
            className={classes.button}
            color='primary'
            onClick={() => {
              handleClose();
              history.push('/account');
            }}
            variant='contained'
          >
            SIGN IN
          </Button>
        </Grid>
        <Grid item sm={6} xs={12}>
          <Button
            className={classes.button}
            color='primary'
            onClick={() => {
              handleClose();
              history.push('/account?action=register');
            }}
            variant='outlined'
          >
            CREATE AN ACCOUNT
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AccountMenu;
