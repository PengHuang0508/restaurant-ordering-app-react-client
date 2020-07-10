import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { updateContact } from '../../redux/actions/userActions';
import { useInput } from '../../hooks/useInput';
// MUI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({}));

const Contact = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { contact } = useSelector((state) => ({ contact: state.user.contact }));
  const [newContact, setNewContact] = useState(contact);

  useEffect(() => {
    // dispatch(updateContact(newContact));
  }, [dispatch, newContact]);

  const handleContactChange = (event) => {
    setNewContact({
      ...newContact,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className={classes.container}>
      <div>
        <Typography variant='h6' gutterBottom>
          Contact
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id='firstName'
              name='firstName'
              label='First name'
              fullWidth
              autoComplete='given-name'
              value={newContact.firstName}
              onChange={handleContactChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id='lastName'
              name='lastName'
              label='Last name'
              fullWidth
              autoComplete='family-name'
              value={newContact.lastName}
              onChange={handleContactChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id='email'
              name='email'
              label='Email'
              fullWidth
              autoComplete='email'
              value={newContact.email}
              onChange={handleContactChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id='phoneNumber'
              name='phoneNumber'
              label='Phone number'
              fullWidth
              autoComplete='tel'
              value={newContact.phoneNumber}
              onChange={handleContactChange}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
export default Contact;
