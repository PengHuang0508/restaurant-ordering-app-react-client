import React from 'react';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import {
  setErrors,
  signUp,
  anonymousUpgrade,
} from '../../redux/actions/userActions';
// Hooks
import { useInputs } from '../../hooks/useInputs';
// MUI
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
// Icons
import LockRoundedIcon from '@material-ui/icons/LockRounded';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import AddShoppingCartRoundedIcon from '@material-ui/icons/AddShoppingCartRounded';
import AccessTimeRoundedIcon from '@material-ui/icons/AccessTimeRounded';
// Validators
import { validateSignUpData } from '../../utils/validators';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(4),
    marginTop: theme.spacing(1),

    textAlign: 'right',

    background: 'rgba(125,125,125,0.1)',
  },
  form: {
    width: '100%',
  },
  generalError: {
    margin: theme.spacing(1, 0),

    fontSize: 13,
    color: 'red',
    textAlign: 'center',
  },
  benefitText: {
    margin: theme.spacing(2, 0),

    textAlign: 'center',
  },
  benefit: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
  },
  submit: {
    marginTop: theme.spacing(4),
  },
}));

const SignUp = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { anonymous, errors, loading } = useSelector((state) => ({
    anonymous: state.user.anonymous,
    errors: state.ui.errors ? state.ui.errors : '',
    loading: state.ui.loading,
  }));
  const initialState = {
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
  };
  const {
    inputs: userInputs,
    bind: bindUserInputs,
    reset: resetUserInputs,
  } = useInputs(initialState);

  const handleSignUp = (event) => {
    event.preventDefault();

    const signUpData = {
      email: userInputs.email,
      password: userInputs.password,
      confirmPassword: userInputs.confirmPassword,
      contact: {
        email: userInputs.email,
        firstName: userInputs.firstName,
        lastName: userInputs.lastName,
        phoneNumber: userInputs.phoneNumber,
      },
    };
    const { valid, errors } = validateSignUpData(signUpData);

    if (!valid) {
      dispatch(setErrors(errors));
    } else {
      signUpData.contact.firstName = signUpData.contact.firstName.replace(
        /\s/g,
        ''
      );
      signUpData.contact.lastName = signUpData.contact.lastName.replace(
        /\s/g,
        ''
      );

      anonymous
        ? dispatch(anonymousUpgrade(signUpData))
        : dispatch(signUp(signUpData));
    }

    resetUserInputs();
  };

  return (
    <Fade in timeout={300}>
      <Container className={classes.container} maxWidth='xs'>
        <form className={classes.form} noValidate onSubmit={handleSignUp}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                error={errors.signUpEmail ? true : false}
                fullWidth
                helperText={errors.signUpEmail}
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
                error={errors.signUpPassword ? true : false}
                fullWidth
                helperText={errors.signUpPassword}
                id='password'
                label='Password'
                name='password'
                required
                type='password'
                value={userInputs.password}
                variant='outlined'
                {...bindUserInputs}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={errors.confirmPassword ? true : false}
                fullWidth
                helperText={errors.confirmPassword}
                id='confirmPassword'
                label='Confirm Password'
                name='confirmPassword'
                required
                type='password'
                value={userInputs.confirmPassword}
                variant='outlined'
                {...bindUserInputs}
              />
            </Grid>
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
            <Grid item xs={12}>
              {errors.general && (
                <Typography className={classes.generalError} variant='body2'>
                  {errors.signUpGeneral}
                </Typography>
              )}
            </Grid>
          </Grid>
          <Typography className={classes.benefitText}>
            Create an account with us today, so you can ..
          </Typography>
          <Grid container spacing={2}>
            <Grid className={classes.benefit} item sm={4} xs={12}>
              <AddShoppingCartRoundedIcon />
              <Typography variant='caption'>Place order online</Typography>
            </Grid>
            <Grid className={classes.benefit} item sm={4} xs={12}>
              <FavoriteRoundedIcon color='secondary' />
              <Typography variant='caption'>Save to favorites</Typography>
            </Grid>
            <Grid className={classes.benefit} item sm={4} xs={12}>
              <AccessTimeRoundedIcon />
              <Typography variant='caption'>Access order history</Typography>
            </Grid>
          </Grid>
          <Button
            className={classes.submit}
            color='primary'
            fullWidth
            type='submit'
            variant='contained'
            disabled={loading}
            startIcon={<LockRoundedIcon />}
          >
            {anonymous ? 'Upgrade' : 'Sign Up'}
          </Button>
        </form>
      </Container>
    </Fade>
  );
};

export default SignUp;
