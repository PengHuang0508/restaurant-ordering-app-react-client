import React, { useState } from 'react';
// Redux
import { useSelector } from 'react-redux';
// MUI
import AddIcon from '@material-ui/icons/Add';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListSubheader from '@material-ui/core/ListSubheader';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
// Icon
import ExpandLessRoundedIcon from '@material-ui/icons/ExpandLessRounded';
import ShoppingCartRoundedIcon from '@material-ui/icons/ShoppingCartRounded';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import RemoveRoundedIcon from '@material-ui/icons/RemoveRounded';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';

// TODO: fix price breakdown
// TODO: cart item count
const useStyles = makeStyles((theme) => ({
  appBar: {
    bottom: 0,
    top: 'auto',
  },
  cart: {
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '80vh',
    overflow: 'auto',
    width: '100%',
  },
  cartHeader: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
    paddingLeft: theme.spacing(2),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cartItemList: {
    backgroundColor: '#eee',
    //flexBasis: '40%,
    maxHeight: '40%',
    overflow: 'auto',
    paddingLeft: theme.spacing(2),
  },
  cartSummary: {
    //margin: '0.5rem 0',
  },
  priceText: {
    flexGrow: 1,
    paddingRight: '1rem',
    textAlign: 'right',
  },
  cartButton: {
    '& > *': {
      margin: theme.spacing(1),
    },
    textAlign: 'right',
  },
}));

// TODO: Test on low-end mobile devices, expect 60 FPS
const NavCart = () => {
  const classes = useStyles();
  const { cart, GST, PST, subtotal, total } = useSelector((state) => ({
    cart: state.order.cart,
    GST: state.order.GST,
    PST: state.order.PST,
    subtotal: state.order.subtotal,
    total: state.order.total,
  }));
  const [drawer, toggleDrawer] = useState(true);

  const handleToggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    toggleDrawer(open);
  };

  console.log(cart);

  return (
    <AppBar position='fixed' color='secondary' className={classes.appBar}>
      <Toolbar>
        <IconButton edge='start' disabled style={{ color: '#fff' }}>
          <ShoppingCartRoundedIcon />
        </IconButton>
        <Typography className={classes.priceText}>
          Subtotal: ${subtotal}
        </Typography>
        <IconButton color='inherit' onClick={handleToggleDrawer(true)}>
          <ExpandLessRoundedIcon />
        </IconButton>
        <SwipeableDrawer
          anchor='bottom'
          open={drawer}
          onClose={handleToggleDrawer(false)}
          onOpen={handleToggleDrawer(true)}
        >
          <div className={classes.cart} onKeyDown={handleToggleDrawer(false)}>
            <div className={classes.cartHeader}>
              <Typography variant='h6'>Current Order</Typography>
              <IconButton aria-label='close-cart'>
                <CloseRoundedIcon />
              </IconButton>
            </div>
            <Divider />
            <List className={classes.cartItemList}>
              {cart.length === 0 ? (
                <Typography variant='subtitle1'>
                  Your cart is currently empty.
                </Typography>
              ) : (
                cart.map((item, index) => (
                  <ListItem key={`NavCart-ListItem-${item.itemId}-${index}`}>
                    <IconButton edge='start' aria-label='delete item'>
                      <DeleteRoundedIcon />
                    </IconButton>
                    <Avatar alt='Food thumbnail' src={item.thumbnailUrl} />
                    <ListItemText
                      primary={item.name}
                      secondary={item.price.toFixed(2)}
                    />
                    <ListItemSecondaryAction>
                      <IconButton aria-label='decrease-item-quantity'>
                        <RemoveRoundedIcon />
                      </IconButton>
                      <Typography variant='inherit'>{item.quantity}</Typography>
                      <IconButton aria-label='increase-item-quantity'>
                        <AddRoundedIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))
              )}
            </List>
            <Divider />
            <div className={classes.cartSummary}>
              <div className={classes.priceText}>
                <Typography>{`Subtotal: ${subtotal.toFixed(2)}`}</Typography>
                <Typography>{`GST: ${GST.toFixed(2)}`}</Typography>
                <Typography>{`PST: ${PST.toFixed(2)}`}</Typography>
                <Typography>{`Total: ${total.toFixed(2)}`}</Typography>
              </div>
            </div>
            {/* <List className={classes.cartSummary}>
              <ListItem className={classes.priceText}>
                <ListItemText
                  primary={`Subtotal: ${subtotal.toFixed(2)}`}
                  secondary={`GST: ${GST.toFixed(2)}
                      PST: ${PST.toFixed(2)}`}
                />
              </ListItem>
              <ListItem className={classes.priceText}>
                <ListItemText primary={<div>`Total: ${total.toFixed(2)}`</div>} />
              </ListItem>
            </List> */}
            <div className={classes.cartButton}>
              <Button
                variant='contained'
                color='primary'
                onClick={() => console.log(cart)}
              >
                CALL SERVER
              </Button>
              <Button variant='contained' color='secondary'>
                SEND
              </Button>
            </div>
          </div>
        </SwipeableDrawer>
      </Toolbar>
    </AppBar>
  );
};

export default NavCart;
// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
// import Button from '@material-ui/core/Button';
// import List from '@material-ui/core/List';
// import Divider from '@material-ui/core/Divider';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import MailIcon from '@material-ui/icons/Mail';

// const useStyles = makeStyles({
//   list: {
//     width: 250,
//   },
//   fullList: {
//     width: 'auto',
//   },
// });

// export default function SwipeableTemporaryDrawer() {
//   const classes = useStyles();
//   const [state, setState] = React.useState({
//     top: false,
//     left: false,
//     bottom: false,
//     right: false,
//   });

//   const toggleDrawer = (anchor, open) => (event) => {
//     if (
//       event &&
//       event.type === 'keydown' &&
//       (event.key === 'Tab' || event.key === 'Shift')
//     ) {
//       return;
//     }

//     setState({ ...state, [anchor]: open });
//   };

//   const list = (anchor) => (
//     <div
//       // className={clsx(classes.list, {
//       //   [classes.fullList]: anchor === 'top' || anchor === 'bottom',
//       // })}
//       role='presentation'
//       onClick={toggleDrawer(anchor, false)}
//       onKeyDown={toggleDrawer(anchor, false)}
//     >
//       <List>
//         {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
//           <ListItem button key={text}>
//             <ListItemIcon>
//               {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//             </ListItemIcon>
//             <ListItemText primary={text} />
//           </ListItem>
//         ))}
//       </List>
//       <Divider />
//       <List>
//         {['All mail', 'Trash', 'Spam'].map((text, index) => (
//           <ListItem button key={text}>
//             <ListItemIcon>
//               {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//             </ListItemIcon>
//             <ListItemText primary={text} />
//           </ListItem>
//         ))}
//       </List>
//     </div>
//   );

//   return (
//     <div>
//       {['left', 'right', 'top', 'bottom'].map((anchor) => (
//         <React.Fragment key={anchor}>
//           <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
//           <SwipeableDrawer
//             anchor={anchor}
//             open={state[anchor]}
//             onClose={toggleDrawer(anchor, false)}
//             onOpen={toggleDrawer(anchor, true)}
//           >
//             {list(anchor)}
//           </SwipeableDrawer>
//         </React.Fragment>
//       ))}
//     </div>
//   );
// }

// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import IconButton from '@material-ui/core/IconButton';
// import Paper from '@material-ui/core/Paper';
// import Fab from '@material-ui/core/Fab';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemAvatar from '@material-ui/core/ListItemAvatar';
// import ListItemText from '@material-ui/core/ListItemText';
// import ListSubheader from '@material-ui/core/ListSubheader';
// import Avatar from '@material-ui/core/Avatar';
// import MenuIcon from '@material-ui/icons/Menu';
// import AddIcon from '@material-ui/icons/Add';
// import SearchIcon from '@material-ui/icons/Search';
// import MoreIcon from '@material-ui/icons/MoreVert';

// const messages = [
//   {
//     id: 1,
//     primary: 'Brunch this week?',
//     secondary: "I'll be in the neighbourhood this week. Let's grab a bite to eat",
//     person: '/static/images/avatar/5.jpg',
//   },
//   {
//     id: 2,
//     primary: 'Birthday Gift',
//     secondary: `Do you have a suggestion for a good present for John on his work
//       anniversary. I am really confused & would love your thoughts on it.`,
//     person: '/static/images/avatar/1.jpg',
//   },
//   {
//     id: 3,
//     primary: 'Recipe to try',
//     secondary: 'I am try out this new BBQ recipe, I think this might be amazing',
//     person: '/static/images/avatar/2.jpg',
//   },
//   {
//     id: 4,
//     primary: 'Yes!',
//     secondary: 'I have the tickets to the ReactConf for this year.',
//     person: '/static/images/avatar/3.jpg',
//   },
//   {
//     id: 5,
//     primary: "Doctor's Appointment",
//     secondary: 'My appointment for the doctor was rescheduled for next Saturday.',
//     person: '/static/images/avatar/4.jpg',
//   },
//   {
//     id: 6,
//     primary: 'Discussion',
//     secondary: `Menus that are generated by the bottom app bar (such as a bottom
//       navigation drawer or overflow menu) open as bottom sheets at a higher elevation
//       than the bar.`,
//     person: '/static/images/avatar/5.jpg',
//   },
//   {
//     id: 7,
//     primary: 'Summer BBQ',
//     secondary: `Who wants to have a cookout this weekend? I just got some furniture
//       for my backyard and would love to fire up the grill.`,
//     person: '/static/images/avatar/1.jpg',
//   },
// ];

// const useStyles = makeStyles((theme) => ({
//   text: {
//     padding: theme.spacing(2, 2, 0),
//   },
//   paper: {
//     paddingBottom: 50,
//   },
//   list: {
//     marginBottom: theme.spacing(2),
//   },
//   subheader: {
//     backgroundColor: theme.palette.background.paper,
//   },
//   appBar: {
//     top: 'auto',
//     bottom: 0,
//   },
//   grow: {
//     flexGrow: 1,
//   },
//   fabButton: {
//     position: 'absolute',
//     zIndex: 1,
//     top: -30,
//     left: 0,
//     right: 0,
//     margin: '0 auto',
//   },
// }));

// export default function BottomAppBar() {
//   const classes = useStyles();

//   return (
//     <React.Fragment>
//       <CssBaseline />
//       <Paper square className={classes.paper}>
//         <Typography className={classes.text} variant="h5" gutterBottom>
//           Inbox
//         </Typography>
//         <List className={classes.list}>
//           {messages.map(({ id, primary, secondary, person }) => (
//             <React.Fragment key={id}>
//               {id === 1 && <ListSubheader className={classes.subheader}>Today</ListSubheader>}
//               {id === 3 && <ListSubheader className={classes.subheader}>Yesterday</ListSubheader>}
//               <ListItem button>
//                 <ListItemAvatar>
//                   <Avatar alt="Profile Picture" src={person} />
//                 </ListItemAvatar>
//                 <ListItemText primary={primary} secondary={secondary} />
//               </ListItem>
//             </React.Fragment>
//           ))}
//         </List>
//       </Paper>
//       <AppBar position="fixed" color="primary" className={classes.appBar}>
//         <Toolbar>
//           <IconButton edge="start" color="inherit" aria-label="open drawer">
//             <MenuIcon />
//           </IconButton>
//           <Fab color="secondary" aria-label="add" className={classes.fabButton}>
//             <AddIcon />
//           </Fab>
//           <div className={classes.grow} />
//           <IconButton color="inherit">
//             <SearchIcon />
//           </IconButton>
//           <IconButton edge="end" color="inherit">
//             <MoreIcon />
//           </IconButton>
//         </Toolbar>
//       </AppBar>
//     </React.Fragment>
//   );
// }
