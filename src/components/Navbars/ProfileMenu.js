import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../../redux/actions/userActions';
import clsx from 'clsx';
// MUI
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
// Icons
import AccountBoxRoundedIcon from '@material-ui/icons/AccountBoxRounded';
import AssignmentRoundedIcon from '@material-ui/icons/AssignmentRounded';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import ExpandLessRoundedIcon from '@material-ui/icons/ExpandLessRounded';
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';
import MailOutlineRoundedIcon from '@material-ui/icons/MailOutlineRounded';
import PermContactCalendarRoundedIcon from '@material-ui/icons/PermContactCalendarRounded';
import PhoneAndroidRoundedIcon from '@material-ui/icons/PhoneAndroidRounded';
// Files
import logo from '../../images/logo.png';
import profileMenuBackground from '../../images/profileMenuBackground.jpg';

const useStyles = makeStyles((theme) => ({
  loader: {
    alignItems: 'center',
    backgroundColor: theme.colors.grey[8],
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    minWidth: '20rem',
    width: '100%',
  },
  profileMenu: {
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
  userHandle: {
    fontFamily: 'Grenze Gotisch, Segoe UI, Roboto',
    margin: theme.spacing(2),
  },
  icon: {
    color: theme.palette.common.white,
  },
  list: {
    flexGrow: 2,
    flexShrink: 0,
  },
  profileContent: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.75)',
    color: theme.palette.common.black,
    display: 'flex',
    padding: theme.spacing(1.5, 4),
  },
  profileContentIcon: {
    margin: theme.spacing(0.5, 2, 0.5, 0),
  },
  profileEdit: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row-reverse',
    padding: theme.spacing(1),
  },
  notFound: {
    backgroundColor: 'rgba(255,255,255,0.75)',
    color: theme.palette.text.primary,
    padding: theme.spacing(2, 0),
    textAlign: 'center',
  },
  orderHistory: {
    backgroundColor: 'rgba(255,255,255,0.75)',
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

const ProfileMenu = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { handleClose } = props;
  const {
    loading,
    handle,
    firstName,
    lastName,
    email,
    phoneNumber,
    orders,
  } = useSelector((state) => ({
    loading: state.ui.loading,
    handle: state.user.credentials.handle,
    firstName: state.user.credentials.contact.firstName,
    lastName: state.user.credentials.contact.lastName,
    email: state.user.credentials.email,
    phoneNumber: state.user.credentials.contact.phoneNumber,
    orders: state.user.orders,
  }));
  const [open, setOpen] = useState({
    profile: false,
    orderHistory: false,
    viewMore: false,
  });

  const handleToggle = (target) => {
    setOpen({
      ...open,
      [target]: !open[target],
    });
  };
  const handleSignOut = () => {
    dispatch(signOut());
  };

  return (
    <React.Fragment>
      {loading ? (
        <div className={classes.loader}>
          <CircularProgress />
        </div>
      ) : (
        <div className={classes.profileMenu}>
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
                Welcome back
              </Typography>
              <Typography className={classes.userHandle} variant='h3'>
                {handle}
              </Typography>
            </div>
          </div>

          <List className={classes.list}>
            <Divider className={classes.divider} />

            <ListItem
              button
              className={clsx({ [classes.selected]: open.profile })}
              onClick={() => handleToggle('profile')}
            >
              <ListItemIcon className={classes.icon}>
                <AccountBoxRoundedIcon />
              </ListItemIcon>
              <ListItemText primary='Personal Information' />
              {open.profile ? (
                <ExpandLessRoundedIcon />
              ) : (
                <ExpandMoreRoundedIcon />
              )}
            </ListItem>

            <Collapse in={open.profile}>
              <div>
                <div className={classes.profileContent}>
                  <PermContactCalendarRoundedIcon
                    className={classes.profileContentIcon}
                  />
                  <Typography variant='subtitle1'>
                    {firstName} {lastName}
                  </Typography>
                </div>
                <div className={classes.profileContent}>
                  <MailOutlineRoundedIcon
                    className={classes.profileContentIcon}
                  />
                  <Typography variant='subtitle1'>{email}</Typography>
                </div>
                <div className={classes.profileContent}>
                  <PhoneAndroidRoundedIcon
                    className={classes.profileContentIcon}
                  />
                  <Typography variant='subtitle1'>
                    {phoneNumber
                      ? phoneNumber
                      : '*RING RING* Please add a phone number '}
                  </Typography>
                </div>
                <div className={classes.profileEdit}>
                  <IconButton disabled>
                    <EditRoundedIcon className={classes.icon} />
                  </IconButton>
                  <Typography variant='subtitle1'>Edit</Typography>
                </div>
              </div>
            </Collapse>

            <Divider className={classes.divider} />

            <ListItem
              button
              className={clsx({ [classes.selected]: open.orderHistory })}
              onClick={() => handleToggle('orderHistory')}
            >
              <ListItemIcon className={classes.icon}>
                <AssignmentRoundedIcon />
              </ListItemIcon>
              <ListItemText
                primary='
           Order History'
              />
              {open.orderHistory ? (
                <ExpandLessRoundedIcon />
              ) : (
                <ExpandMoreRoundedIcon />
              )}
            </ListItem>

            <Collapse in={open.orderHistory}>
              {Array.isArray(orders) && orders.length > 0 ? (
                <div>
                  <Table className={classes.orderHistory}>
                    <TableHead>
                      <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Payment Method</TableCell>
                        <TableCell align='right'>Total</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {orders.slice(0, 5).map((order) => (
                        <TableRow key={order.orderId}>
                          <TableCell>{order.createdAt.slice(0, 10)}</TableCell>
                          <TableCell>
                            {order.status === 'CLOSED' ? 'PAID' : 'OPEN'}
                          </TableCell>
                          <TableCell>{order.type}</TableCell>
                          <TableCell>
                            {order.status === 'CLOSED'
                              ? order.paymentInformation.paymentMethod
                              : 'N/A'}
                          </TableCell>
                          <TableCell align='right'>
                            $
                            {order.status === 'CLOSED'
                              ? order.paymentInformation.total.toFixed(2)
                              : order.subtotal.toFixed(2)}
                          </TableCell>
                        </TableRow>
                      ))}

                      {open.viewMore &&
                        orders.slice(5).map((order) => (
                          <TableRow key={order.orderId}>
                            <TableCell>
                              {order.createdAt.slice(0, 10)}
                            </TableCell>
                            <TableCell>
                              {order.status === 'CLOSED' ? 'PAID' : 'OPEN'}
                            </TableCell>
                            <TableCell>{order.type}</TableCell>
                            <TableCell>
                              {order.status === 'CLOSED'
                                ? order.paymentInformation.paymentMethod
                                : 'N/A'}
                            </TableCell>
                            <TableCell align='right'>
                              $
                              {order.status === 'CLOSED'
                                ? order.paymentInformation.total.toFixed(2)
                                : order.subtotal.toFixed(2)}
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                  <div className={classes.buttonContainer}>
                    {orders.length > 5 && open.viewMore ? (
                      <Button
                        className={classes.button}
                        onClick={() => handleToggle('viewMore')}
                      >
                        View less
                      </Button>
                    ) : (
                      <Button
                        className={classes.button}
                        onClick={() => handleToggle('viewMore')}
                      >
                        View more
                      </Button>
                    )}
                  </div>
                </div>
              ) : (
                <Typography className={classes.notFound} variant='subtitle1'>
                  No orders found.
                </Typography>
              )}
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
      )}
    </React.Fragment>
  );
};

export default ProfileMenu;
