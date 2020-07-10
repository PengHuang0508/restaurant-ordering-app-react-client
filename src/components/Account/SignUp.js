import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setErrors, signUp } from '../../redux/actions/userActions';
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
    background: 'rgba(125,125,125,0.1)',
    marginTop: theme.spacing(1),
    paddingBottom: theme.spacing(4),
    paddingTop: theme.spacing(3),
    textAlign: 'right',
  },
  form: {
    width: '100%',
  },
  generalError: {
    color: 'red',
    fontSize: 13,
    margin: theme.spacing(1, 0),
    textAlign: 'center',
  },
  benefitText: {
    textAlign: 'center',
    margin: theme.spacing(2, 0),
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
  const { errors, loading } = useSelector((state) => ({
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
    inputs: userInput,
    bind: bindUserInput,
    reset: resetUserInput,
  } = useInputs(initialState);

  const handleSignUp = (event) => {
    event.preventDefault();

    const signUpData = {
      email: userInput.email,
      password: userInput.password,
      confirmPassword: userInput.confirmPassword,
      contact: {
        email: userInput.email,
        firstName: userInput.firstName,
        lastName: userInput.lastName,
        phoneNumber: userInput.phoneNumber,
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

      dispatch(signUp(signUpData));
    }

    resetUserInput();
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
                value={userInput.email}
                variant='outlined'
                {...bindUserInput}
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
                value={userInput.password}
                variant='outlined'
                {...bindUserInput}
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
                value={userInput.confirmPassword}
                variant='outlined'
                {...bindUserInput}
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
                value={userInput.firstName}
                variant='outlined'
                {...bindUserInput}
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
                value={userInput.lastName}
                variant='outlined'
                {...bindUserInput}
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
                value={userInput.phoneNumber}
                variant='outlined'
                {...bindUserInput}
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
            Sign Up
          </Button>
        </form>
      </Container>
    </Fade>
  );
};

export default SignUp;
