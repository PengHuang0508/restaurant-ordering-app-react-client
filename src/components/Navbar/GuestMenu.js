import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signOut } from '../../redux/actions/userActions';
import clsx from 'clsx';
// MUI
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
// Icons
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import ExpandLessRoundedIcon from '@material-ui/icons/ExpandLessRounded';
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';
import PersonAddRoundedIcon from '@material-ui/icons/PersonAddRounded';
import PermIdentityRoundedIcon from '@material-ui/icons/PermIdentityRounded';
// Components
import SignUp from '../Account/SignUp';
// Files
import logo from '../../images/logo.png';
import profileMenuBackground from '../../images/profileMenuBackground.jpg';

const useStyles = makeStyles((theme) => ({
  anonymousMenu: {
    backgroundColor:
      theme.palette.type === 'dark'
        ? theme.palette.grey[900]
        : theme.palette.grey[50],
    backgroundImage: `linear-gradient( rgba(0,0,0,0.75), rgba(0, 0, 0, 0.75) ),url(${profileMenuBackground})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    color: theme.palette.common.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    maxWidth: '25rem',
    minHeight: '100%',
    minWidth: '20rem',
    overflow: 'auto',
    width: '100%',

    [theme.breakpoints.down('xs')]: {
      height: '100vh',
      width: '100vw',
    },
  },
  header: {
    marginBottom: theme.spacing(1),
  },
  headerBanner: {
    alignItems: 'center',
    color: theme.palette.common.white,
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(1, 2, 1, 3),
  },
  closeButton: {
    color: theme.palette.common.white,
  },
  headerContent: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: theme.spacing(1, 2, 3, 2),
    textAlign: 'center',
  },
  welcomeMessage: {
    fontFamily: 'Crimson Text, serif',
  },
  icon: {
    color: theme.palette.common.white,
  },
  list: {
    flexGrow: 2,
    flexShrink: 0,
  },
  upgrade: {
    color: theme.palette.text.primary,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  buttonContainer: {
    margin: theme.spacing(3, 0),
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'rgba(255,255,255,0.75)',
    border: '1px solid',
    borderColor: theme.palette.common.white,
    color: theme.palette.common.black,
    width: '75%',

    '&:hover': {
      color: theme.palette.common.white,
    },
  },
  divider: {
    backgroundColor: theme.palette.common.white,
  },
  selected: {
    backgroundColor: theme.palette.common.black,

    '&:hover': {
      backgroundColor: theme.palette.common.black,
    },
  },
}));

const GuestMenu = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { handleClose } = props;
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleSignOut = () => {
    dispatch(signOut());
  };

  return (
    <div className={classes.anonymousMenu}>
      <div className={classes.header}>
        <div className={classes.headerBanner}>
          <Avatar alt="Pome'Lona" src={logo} />
          <IconButton className={classes.closeButton} onClick={handleClose}>
            <CloseRoundedIcon />
          </IconButton>
        </div>
        <div className={classes.headerContent}>
          <Typography
            align='left'
            className={classes.welcomeMessage}
            variant='h5'
          >
            Hello there
          </Typography>
          <PermIdentityRoundedIcon fontSize='large' />
          <Typography>
            Looks like you are currently signed in as a guest.
          </Typography>
        </div>
      </div>

      <List className={classes.list}>
        <Divider className={classes.divider} />
        <ListItem
          button
          className={clsx({ [classes.selected]: open })}
          onClick={() => handleToggle('profile')}
        >
          <ListItemIcon className={classes.icon}>
            <PersonAddRoundedIcon />
          </ListItemIcon>
          <ListItemText primary='Upgrade your account' />
          {open ? <ExpandLessRoundedIcon /> : <ExpandMoreRoundedIcon />}
        </ListItem>

        <Collapse className={classes.upgrade} in={open}>
          <SignUp />
        </Collapse>
        <Divider className={classes.divider} />
      </List>
      <div className={classes.buttonContainer}>
        <Button
          className={classes.button}
          onClick={() => {
            handleSignOut();
            handleClose();
          }}
          variant='outlined'
        >
          LOG OUT
        </Button>
      </div>
    </div>
  );
};

export default GuestMenu;
