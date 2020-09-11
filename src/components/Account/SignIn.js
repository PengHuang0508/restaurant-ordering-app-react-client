import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setErrors, signIn } from '../../redux/actions/userActions';
// MUI
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
import Fade from '@material-ui/core/Fade';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
// Icons
import LockRoundedIcon from '@material-ui/icons/LockRounded';
// Hooks
import { useInput } from '../../hooks/useInput';
// Validators
import { validateSignInData } from '../../utils/validators';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(1),
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
  checkbox: {
    marginTop: theme.spacing(3),
  },
  submit: {
    marginTop: theme.spacing(1),
  },
}));

const SignIn = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { errors, loading } = useSelector((state) => ({
    errors: state.ui.errors ? state.ui.errors : '',
    loading: state.ui.loading,
  }));
  const { value: email, bind: bindEmail } = useInput('');
  const {
    value: password,
    bind: bindPassword,
    reset: resetPassword,
  } = useInput('');

  const handleSignIn = (event) => {
    event.preventDefault();

    const signInData = {
      email,
      password,
    };
    const { valid, errors } = validateSignInData(signInData);

    if (!valid) {
      dispatch(setErrors(errors));
    } else {
      dispatch(signIn(signInData));
    }

    resetPassword();
  };

  return (
    <Fade in timeout={300}>
      <Container className={classes.container} maxWidth='xs'>
        <form className={classes.form} noValidate onSubmit={handleSignIn}>
          <Grid container>
            <Grid item xs={12}>
              <TextField
                autoComplete='email'
                error={errors.email || errors.general ? true : false}
                fullWidth
                helperText={errors.email}
                id='email'
                label='Email Address'
                margin='normal'
                name='email'
                required
                variant='outlined'
                {...bindEmail}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete='current-password'
                error={errors.password || errors.general ? true : false}
                fullWidth
                helperText={errors.password}
                id='password'
                label='Password'
                margin='normal'
                name='password'
                required
                type='password'
                variant='outlined'
                {...bindPassword}
              />
            </Grid>
            <Grid item xs={12}>
              {errors.general && (
                <Typography className={classes.generalError} variant='body2'>
                  {errors.general}
                </Typography>
              )}
            </Grid>
          </Grid>
          <React.Fragment>
            <FormControlLabel
              className={classes.checkbox}
              control={<Checkbox value='remember' color='primary' />}
              label='Remember me'
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              disabled={loading}
              className={classes.submit}
              startIcon={<LockRoundedIcon />}
            >
              Sign In
            </Button>
          </React.Fragment>
        </form>
      </Container>
    </Fade>
  );
};

export default SignIn;
