import React from 'react';

// MUI
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  footer: {
    padding: theme.spacing(6, 0),
    marginTop: theme.spacing(8),

    color: '#fff',

    backgroundColor: '#000',
  },
  footerTitle: {
    fontFamily: 'Dancing Script, cursive',
  },
  footerSubtitle: {
    fontFamily: 'Playfair Display, serif',
    fontStyle: 'italic',
  },
  footerNote: {
    margin: '50px 0 25px 0',
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Container maxWidth='lg'>
        <Typography
          className={classes.footerTitle}
          variant='h4'
          align='center'
          gutterBottom
        >
          Pome'Lona
        </Typography>
        <Typography
          className={classes.footerSubtitle}
          variant='subtitle2'
          align='center'
          component='p'
        >
          An oasis of pleasure.
        </Typography>
        <Typography
          className={classes.footerNote}
          variant='body2'
          align='center'
        >
          {'Present to you by '}
          <Link
            color='inherit'
            href='https://github.com/PengHuang0508/restaurant-ordering-app-react-client/'
          >
            Reacto
          </Link>
          {'.'}
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
