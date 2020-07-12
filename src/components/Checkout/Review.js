// import React from 'react';
// import { useSelector } from 'react-redux';
// // MUI
// import Grid from '@material-ui/core/Grid';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
// import Typography from '@material-ui/core/Typography';
// import { makeStyles } from '@material-ui/core/styles';

// const products = [
//   { name: 'Product 1', desc: 'A nice thing', price: '$9.99' },
//   { name: 'Product 2', desc: 'Another thing', price: '$3.45' },
//   { name: 'Product 3', desc: 'Something else', price: '$6.51' },
//   { name: 'Product 4', desc: 'Best thing of all', price: '$14.11' },
//   { name: 'Shipping', desc: '', price: 'Free' },
// ];
// const addresses = [
//   '1 Material-UI Drive',
//   'Reactville',
//   'Anytown',
//   '99999',
//   'USA',
// ];
// const payments = [
//   { name: 'Card type', detail: 'Visa' },
//   { name: 'Card holder', detail: 'Mr John Smith' },
//   { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
//   { name: 'Expiry date', detail: '04/2024' },
// ];

// const useStyles = makeStyles((theme) => ({
//   listItem: {
//     padding: theme.spacing(1, 0),
//   },
//   total: {
//     fontWeight: 700,
//   },
//   title: {
//     marginTop: theme.spacing(2),
//   },
// }));

// export default function Review() {
//   const classes = useStyles();
//   const { cart } = useSelector((state) => ({
//     cart: state.order.cart,
//   }));
//   return (
//     <div>
//       <Typography variant='h6' gutterBottom>
//         Order summary
//       </Typography>
//       <List disablePadding>
//         {cart.itemList.map((item) => (
//           <ListItem className={classes.listItem} key={item.name}>
//             <ListItemText primary={item.name} secondary={item.instructions} />
//             <div>
//               <Typography variant='body2'>${item.price} </Typography>
//               <Typography variant='body2'>x {item.quantity}</Typography>
//             </div>
//           </ListItem>
//         ))}
//         <ListItem className={classes.listItem}>
//           <ListItemText
//             primary='Subtotal'
//             primaryTypographyProps={{ variant: 'h6' }}
//           />
//           <Typography variant='subtitle1' className={classes.total}>
//             ${cart.subtotal.toFixed(2)}
//           </Typography>
//         </ListItem>
//       </List>
//       {/* <Grid container spacing={2}>
//         <Grid item xs={12} sm={6}>
//           <Typography variant='h6' gutterBottom className={classes.title}>
//             Shipping
//           </Typography>
//           <Typography gutterBottom>John Smith</Typography>
//           <Typography gutterBottom>{addresses.join(', ')}</Typography>
//         </Grid>
//         <Grid item container direction='column' xs={12} sm={6}>
//           <Typography variant='h6' gutterBottom className={classes.title}>
//             Payment details
//           </Typography>
//           <Grid container>
//             {payments.map((payment) => (
//               <React.Fragment key={payment.name}>
//                 <Grid item xs={6}>
//                   <Typography gutterBottom>{payment.name}</Typography>
//                 </Grid>
//                 <Grid item xs={6}>
//                   <Typography gutterBottom>{payment.detail}</Typography>
//                 </Grid>
//               </React.Fragment>
//             ))}
//           </Grid>
//         </Grid>
//       </Grid> */}
//     </div>
//   );
// }

import React from 'react';

function Review() {
  return <div>REVIEWS</div>;
}

export default Review;
