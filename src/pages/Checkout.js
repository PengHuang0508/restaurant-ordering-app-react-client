// import React, { useState } from 'react';
// // import { useSelector } from 'react-redux';
// // MUI
// import { makeStyles } from '@material-ui/core/styles';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import Paper from '@material-ui/core/Paper';
// import Stepper from '@material-ui/core/Stepper';
// import Step from '@material-ui/core/Step';
// import StepLabel from '@material-ui/core/StepLabel';
// import Button from '@material-ui/core/Button';
// import Link from '@material-ui/core/Link';
// import Typography from '@material-ui/core/Typography';
// // Components
// import Review from '../components/Checkout/Review';
// import Contact from '../components/Checkout/Contact';
// import Summary from '../components/Checkout/Summary';
// // Files
// import checkoutBackground from '../images/checkoutBackground.jpg';

// function Copyright() {
//   return (
//     <Typography variant='body2' color='textSecondary' align='center'>
//       {'Copyright © '}
//       <Link color='inherit' href='/'>
//         Pome'Lona
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

// const useStyles = makeStyles((theme) => ({
//   checkout: {
//     zIndex: -1,
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     height: '100%',
//     width: '100%',
//     paddingTop: theme.spacing(15),
//     [theme.breakpoints.up('sm')]: {
//       backgroundImage: `linear-gradient( rgba(0,0,0,0.4), rgba(0, 0, 0, 0.4) ),url(${checkoutBackground})`,
//       backgroundRepeat: 'no-repeat',
//       backgroundColor:
//         theme.palette.type === 'dark'
//           ? theme.palette.grey[900]
//           : theme.palette.grey[50],
//       backgroundSize: 'cover',
//       backgroundPosition: 'center',
//     },
//   },
//   appBar: {
//     position: 'relative',
//   },
//   layout: {
//     backgroundColor: '#fff',
//     width: 'auto',
//     marginLeft: theme.spacing(2),
//     marginRight: theme.spacing(2),
//     [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
//       width: 600,
//       marginLeft: 'auto',
//       marginRight: 'auto',
//     },

//     padding: theme.spacing(10, 5),
//     position: 'relative',
//   },
//   paper: {
//     marginTop: theme.spacing(3),
//     marginBottom: theme.spacing(3),
//     padding: theme.spacing(2),
//     [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
//       marginTop: theme.spacing(6),
//       marginBottom: theme.spacing(6),
//       padding: theme.spacing(3),
//     },
//   },
//   stepper: {
//     padding: theme.spacing(3, 0, 5),
//   },
//   buttons: {
//     display: 'flex',
//     justifyContent: 'flex-end',
//   },
//   button: {
//     marginTop: theme.spacing(3),
//     marginLeft: theme.spacing(1),
//   },
// }));

// const steps = ['Contact Information', 'Review your order'];

// function getStepContent(step) {
//   switch (step) {
//     case 0:
//       return <Contact />;
//     case 1:
//       return <Summary />;
//     default:
//       throw new Error('Unknown step');
//   }
// }

// const Checkout = () => {
//   const classes = useStyles();
//   const [activeStep, setActiveStep] = useState(0);

//   const handleNext = () => {
//     setActiveStep(activeStep + 1);
//   };

//   const handleBack = () => {
//     setActiveStep(activeStep - 1);
//   };

//   return (
//     <div className={classes.checkout}>
//       <CssBaseline />
//       {/* <AppBar position='absolute' color='default' className={classes.appBar}>
//         <Toolbar>
//           <Typography variant='h6' color='inherit' noWrap>
//             Company name
//           </Typography>
//         </Toolbar>
//       </AppBar> */}
//       <main className={classes.layout}>
//         <Review />
//         <Paper className={classes.paper}>
//           <Typography component='h1' variant='h4' align='center'>
//             Checkout
//           </Typography>
//           <Stepper activeStep={activeStep} className={classes.stepper}>
//             {steps.map((label) => (
//               <Step key={label}>
//                 <StepLabel>{label}</StepLabel>
//               </Step>
//             ))}
//           </Stepper>
//           <React.Fragment>
//             {activeStep === steps.length ? (
//               <React.Fragment>
//                 <Typography variant='h5' gutterBottom>
//                   Thank you for your order.
//                 </Typography>
//                 <Typography variant='subtitle1'>
//                   Your order number is #2001539. We have emailed your order
//                   confirmation, and will send you an update when your order has
//                   shipped.
//                 </Typography>
//               </React.Fragment>
//             ) : (
//               <React.Fragment>
//                 {getStepContent(activeStep)}
//                 <div className={classes.buttons}>
//                   {activeStep !== 0 && (
//                     <Button onClick={handleBack} className={classes.button}>
//                       Back
//                     </Button>
//                   )}
//                   <Button
//                     variant='contained'
//                     color='primary'
//                     onClick={handleNext}
//                     className={classes.button}
//                   >
//                     {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
//                   </Button>
//                 </div>
//               </React.Fragment>
//             )}
//           </React.Fragment>
//         </Paper>
//         <Copyright />
//       </main>
//     </div>
//   );
// };

// export default Checkout;

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
// MUI
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
// Components
import Contact from '../components/Checkout/Contact';
import Review from '../components/Checkout/Review';
import Summary from '../components/Checkout/Summary';
// Files
import checkoutBackground from '../images/checkoutBackground.jpg';

const useStyles = makeStyles((theme) => ({
  // checkout: {
  //   zIndex: -1,
  //   position: 'absolute',
  //   top: 0,
  //   left: 0,
  //   height: '100%',
  //   width: '100%',
  //   paddingTop: theme.spacing(15),
  //   [theme.breakpoints.up('sm')]: {
  //     backgroundImage: `linear-gradient( rgba(0,0,0,0.4), rgba(0, 0, 0, 0.4) ),url(${checkoutBackground})`,
  //     backgroundRepeat: 'no-repeat',
  //     backgroundColor:
  //       theme.palette.type === 'dark'
  //         ? theme.palette.grey[900]
  //         : theme.palette.grey[50],
  //     backgroundSize: 'cover',
  //     backgroundPosition: 'center',
  //   },
  // },

  container: {
    backgroundColor:
      theme.palette.type === 'dark'
        ? theme.palette.grey[900]
        : theme.palette.grey[50],
    backgroundImage: `linear-gradient( rgba(0,0,0,0.4), rgba(0, 0, 0, 0.4) ),url(${checkoutBackground})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height: '100%',
    minHeight: '100vh',
    padding: theme.spacing(6, 0, 3, 0),
    width: '100%',

    alignItems: 'center',
    display: 'flex',
    // justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      // alignItems: 'center',
      // flexDirection: 'column',
      // justifyContent: 'flex-start',
    },
  },
  layout: {
    backgroundColor: 'rgba(255,255,255,0.5)',
    width: '100%',
    padding: theme.spacing(0, 5),
  },
  paper: {
    // background: 'red',
    // margin: theme.spacing(0, 5),
    padding: theme.spacing(5, 2),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  stepper: {
    padding: theme.spacing(3, 0, 5, 0),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
  },
}));

const steps = ['Contact Information', 'Review your order'];

const getStepContent = (step) => {
  switch (step) {
    case 0:
      return <Contact />;
    case 1:
      return <Summary />;
    default:
      throw new Error('Unknown step');
  }
};

const Checkout = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <div className={classes.container}>
      <CssBaseline />
      <div className={classes.layout}>
        <Paper className={classes.paper} elevation={3}>
          <Typography component='h1' variant='h4' align='center'>
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant='h5' gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant='subtitle1'>
                Your order number is #1234567890. We have emailed your order
                confirmation, and will send you an update when your order has
                shipped.
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <div className={classes.buttons}>
                {activeStep !== 0 && (
                  <Button className={classes.button} onClick={handleBack}>
                    Back
                  </Button>
                )}
                <Button
                  className={classes.button}
                  color='primary'
                  onClick={handleNext}
                  variant='contained'
                >
                  {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                </Button>
              </div>
            </React.Fragment>
          )}
        </Paper>
      </div>
    </div>
  );
};

export default Checkout;

{
  /* <div className={classes.container}>
<CssBaseline />
<div className={classes.layout}>
  <Paper className={classes.paper} elevation={3}>
    <Typography component='h1' variant='h4' align='center'>
      We are ready when you are
    </Typography>
    <Stepper activeStep={activeStep} className={classes.stepper}>
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
    {activeStep === steps.length ? (
      <React.Fragment>
        <Typography variant='h5' gutterBottom>
          Thank you for your order.
        </Typography>
        <Typography variant='subtitle1'>
          Your order number is #1234567890. We have emailed your order
          confirmation, and will send you an update when your order has
          shipped.
        </Typography>
      </React.Fragment>
    ) : (
      <React.Fragment>
        {getStepContent(activeStep)}
        <div className={classes.buttons}>
          {activeStep !== 0 && (
            <Button className={classes.button} onClick={handleBack}>
              Back
            </Button>
          )}
          <Button
            className={classes.button}
            color='primary'
            onClick={handleNext}
            variant='contained'
          >
            {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
          </Button>
        </div>
      </React.Fragment>
    )}
  </Paper>
</div>
</div> */
}
