// import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
// // MUI
// import Checkbox from '@material-ui/core/Checkbox';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Grid from '@material-ui/core/Grid';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
// import Typography from '@material-ui/core/Typography';
// import { makeStyles } from '@material-ui/core/styles';
// // Files
// import { taxRate } from '../../utils/variables';

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

// const Summary = () => {
//   const classes = useStyles();
//   const { contact, GST, total } = useSelector((state) => ({
//     contact: state.user.contact,

//     GST: state.order.GST,
//     total: state.order.total,
//   }));
//   const [select, setSelect] = useState(true);

//   const handleSelectChange = () => {
//     setSelect(!select);
//   };

//   return (
//     <React.Fragment>
//       <Typography variant='h6' gutterBottom>
//         Order summary
//       </Typography>
//       <List disablePadding>
//         <ListItem>
//           <ListItemText
//             primary={
//               <div>
//                 <Typography display='inline'>GST </Typography>
//                 <Typography
//                   color='textSecondary'
//                   display='inline'
//                 >{`(${parseInt(taxRate.GST * 100, 10)}%):`}</Typography>
//               </div>
//             }
//           />
//           <Typography variant='subtitle1'>${GST.toFixed(2)}</Typography>
//         </ListItem>

//         <ListItem>
//           <ListItemText primary='Total:' />
//           <Typography variant='h6'>${total.toFixed(2)}</Typography>
//         </ListItem>
//         {/* {products.map((product) => (
//           <ListItem className={classes.listItem} key={product.name}>
//             <ListItemText primary={product.name} secondary={product.desc} />
//             <Typography variant='body2'>{product.price}</Typography>
//           </ListItem>
//         ))}
//         <ListItem className={classes.listItem}>
//           <ListItemText primary='Total' />
//           <Typography variant='subtitle1' className={classes.total}>
//             $34.06
//           </Typography>
//         </ListItem> */}
//       </List>
//       <Grid container spacing={2}>
//         <Grid item xs={12} sm={6}>
//           <Typography variant='h6' gutterBottom className={classes.title}>
//             Contact
//           </Typography>
//           <Typography gutterBottom>
//             {contact.firstName} {contact.lastName}
//           </Typography>
//           <Typography gutterBottom>{contact.email}</Typography>
//           <Typography gutterBottom>{contact.phoneNumber}</Typography>
//         </Grid>
//         <Grid item container direction='column' xs={12} sm={6}>
//           <Typography variant='h6' gutterBottom className={classes.title}>
//             Payment method - In store
//           </Typography>
//           <Grid container spacing={3}>
//             <Grid item xs={6}>
//               <FormControlLabel
//                 control={
//                   <Checkbox
//                     color='primary'
//                     name='cash'
//                     value='yes'
//                     checked={select}
//                     onChange={handleSelectChange}
//                   />
//                 }
//                 label='Cash'
//               />
//             </Grid>
//             <Grid item xs={6}>
//               <FormControlLabel
//                 control={
//                   <Checkbox
//                     color='primary'
//                     name='card'
//                     value='yes'
//                     checked={!select}
//                     onChange={handleSelectChange}
//                   />
//                 }
//                 label='Credit/Debit Card'
//               />
//             </Grid>
//           </Grid>

//           {/* <Typography variant='h6' gutterBottom className={classes.title}>
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
//           </Grid> */}
//         </Grid>
//       </Grid>
//     </React.Fragment>
//   );
// };

// export default Summary;
import React from 'react';

function Summary() {
  return <div>SUMMARY</div>;
}

export default Summary;
