import React from 'react';
// MUI
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// Component
import MenuCardItem from './MenuCardItem';

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  }
  // menuContainer: {
  //   paddingTop: '4rem'
  // },
  // toggleContainer: {
  //   //backgroundColor: 'red',
  //   maxHeight: 70,
  //   padding: 10
  // }
}));

const MenuCard = (props) => {
  const classes = useStyles();
  const {
    category: { categoryId, itemList }
  } = props;

  let menuItems = itemList.map((item, i) => {
    return <MenuCardItem key={i} item={item} />;
  });

  return (
    <Container className={classes.cardGrid}>
      <Typography variant={'h4'} color='primary'>
        {categoryId}
      </Typography>
      <Grid container spacing={4}>
        {menuItems}
      </Grid>
    </Container>
  );

  // return (
  //   <Container>
  //     <Typography variant={'h4'} color='primary'>
  //       {categoryId}
  //     </Typography>
  //     <Grid container spacing={2}>
  //       {menuItems}
  //     </Grid>
  //   </Container>
  // );
};

export default MenuCard;
