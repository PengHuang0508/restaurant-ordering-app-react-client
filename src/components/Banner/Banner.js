import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';
// MUI
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
// Icons
import DoubleArrowRoundedIcon from '@material-ui/icons/DoubleArrowRounded';
// Files
import videoSrc from '../../videos/banner-video.mp4';

const useStyles = makeStyles((theme) => ({
  banner: {
    margin: 0,
    padding: 0,
  },
  bannerVideo: {
    width: '100%',
    maxWidth: '100vw',
    height: '100vh',
    maxHeight: '100%',

    objectFit: 'fill',
  },
  bannerCaption: {
    position: 'absolute',
    top: '50%',
    left: '50%',

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',

    color: '#fff',

    backgroundColor: 'rgba(0,0,0,0.3)',

    transform: 'translate(-50%, -50%)',
  },
  captionTitle: {
    fontFamily: 'Dancing Script, cursive',
  },
  captionSubtitle: {
    fontFamily: 'Playfair Display, serif',
    fontStyle: 'italic',
  },
  storeName: {
    color: theme.palette.primary.light,
  },
  storeNameFirstHalf: {
    color: theme.palette.primary.main,
  },
  storeNameSecondHalf: {
    color: theme.palette.secondary.main,
  },
  exploreMore: {
    position: 'absolute',
    bottom: '3%',
    left: '50%',

    display: 'flex',
    alignItems: 'center',

    color: '#fff',
    textDecoration: 'none',

    transform: 'translate(-50%, -50%)',

    '&:hover': {
      opacity: '0.75',
    },
  },
  exploreMoreText: {
    fontFamily: 'Indie Flower, cursive',
  },
  downArrow: {
    display: 'inline',
    color: '#fff',
    animation: 'hoveringEffect 2s infinite',
  },
}));
const Banner = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <figure className={classes.banner}>
        <video
          className={classes.bannerVideo}
          width='960'
          height='540'
          autoPlay
          loop
          muted
        >
          <source src={videoSrc} type='video/mp4' />
          Sorry, your browser doesn't support embedded videos.
        </video>
        <figcaption className={classes.bannerCaption}>
          <Typography
            align='center'
            className={classes.captionTitle}
            component='h1'
            gutterBottom
            variant='h1'
          >
            Welcome to
            <span className={classes.storeName}>
              <span className={classes.storeNameFirstHalf}> Pome</span>'
              <span className={classes.storeNameSecondHalf}>Lona</span>
            </span>
          </Typography>
          <Typography
            align='center'
            className={classes.captionSubtitle}
            component='h3'
            variant='h5'
          >
            An oasis of pleasure.
          </Typography>
        </figcaption>
      </figure>
      <Link className={classes.exploreMore} to='#homePage-menu' smooth>
        <Typography
          className={classes.exploreMoreText}
          component='h4'
          variant='h4'
        >
          menu
        </Typography>
        <IconButton>
          <DoubleArrowRoundedIcon className={classes.downArrow} />
        </IconButton>
      </Link>
    </React.Fragment>
  );
};

export default Banner;
