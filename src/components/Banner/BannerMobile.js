import React from 'react';
// MUI
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
// Files
import bannerBg from '../../images/homeBannerMobileBackground.jpg';

const useStyles = makeStyles((theme) => ({
  bannerMobileContainer: {
    padding: theme.spacing(10, 0, 10, 0),

    color: 'rgb(255,255,255)',

    backgroundColor:
      theme.palette.type === 'dark'
        ? theme.palette.grey[900]
        : theme.palette.grey[50],
    backgroundImage: `linear-gradient( rgba(0,0,0,0.4), rgba(0, 0, 0, 0.4) ),url(${bannerBg})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  bannerMobileTitle: {
    fontFamily: 'Dancing Script, cursive',
  },
  bannerMobileSubtitle: {
    fontFamily: 'Playfair Display, serif',
    fontStyle: 'italic',
  },
}));

const BannerMobile = () => {
  const classes = useStyles();

  return (
    <Container className={classes.bannerMobileContainer} maxWidth={false}>
      <Typography
        align='center'
        className={classes.bannerMobileTitle}
        component='h1'
        gutterBottom
        variant='h3'
      >
        Welcome to
        <span> Pome'Lona</span>
      </Typography>
      <Typography
        align='center'
        className={classes.bannerMobileSubtitle}
        variant='subtitle1'
      >
        An oasis of pleasure.
      </Typography>
    </Container>
  );
};

export default BannerMobile;
