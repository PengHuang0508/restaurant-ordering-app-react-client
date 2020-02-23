import React from 'react';
// MUI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
// Component
//import MenuDetail from './MenuDetail';

const useStyles = makeStyles((theme) => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  cardMedia: {
    paddingTop: '56.25%' // 16:9
  },
  cardContent: {
    flexGrow: 1
  }
}));

const MenuItem = (props) => {
  const classes = useStyles();
  const {
    item: { name, description, price, thumbnailUrl }
  } = props;

  return (
    <Grid item xs={12} sm={4} md={3}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.cardMedia}
          image={thumbnailUrl}
          title={`${name} thumbnail`}
        />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant='h5' component='h2'>
            {name}
          </Typography>
          <Typography>${price}</Typography>
          <Typography>{description}</Typography>
        </CardContent>
        <CardActions>
          <Button size='small' color='primary'>
            View
          </Button>
          <Button size='small' color='primary'>
            Add
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
  // return (
  //   <Grid item sm={3} xs={6}>
  //     <Card className={classes.root}>
  //       <CardActionArea>
  //         <CardMedia
  //           className={classes.image}
  //           image={thumbnailUrl}
  //           title={name}
  //         />
  //         <CardContent>
  //           <Typography gutterBottom variant='h5' component='h2'>
  //             {name}
  //           </Typography>
  //           <Typography variant='body2' color='textSecondary' component='p'>
  //             ${price}
  //           </Typography>
  //         </CardContent>
  //       </CardActionArea>
  //       <CardActions>
  //         <CardContent>
  //           <Button size='small' color='primary'>
  //             Learn More
  //           </Button>
  //         </CardContent>
  //       </CardActions>
  //     </Card>
  //   </Grid>
  // );
};

export default MenuItem;
