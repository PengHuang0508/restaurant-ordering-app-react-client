import React from 'react';
import { useSelector } from 'react-redux';
// MUI
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// Icons
import BlurOnRoundedIcon from '@material-ui/icons/BlurOnRounded';
// Components
import MenuCardItem from './MenuCardItem';

const useStyles = makeStyles((theme) => ({
  menuCardCategoryContainer: {
    padding: theme.spacing(5, 2),
    // paddingBottom: theme.spacing(5),
  },
  menuCardCategoryHeader: {
    color: theme.palette.primary.dark,
    paddingBottom: theme.spacing(1),
  },
}));

const MenuCard = () => {
  const classes = useStyles();
  const { menu, cartItemList } = useSelector((state) => ({
    menu: state.menu.menu,
    cartItemList: state.order.cart.itemList,
  }));

  return (
    <Container>
      {menu.map((category) => (
        <div
          className={classes.menuCardCategoryContainer}
          key={`MenuCard-${category.settings.categoryId}`}
        >
          <Typography className={classes.menuCardCategoryHeader} variant={'h3'}>
            <BlurOnRoundedIcon fontSize='large' />
            {category.settings.name}
          </Typography>
          <Grid container spacing={4}>
            {category.itemList.map((item) => (
              <MenuCardItem
                key={`MenuCard-MenuCardItem-${item.itemId}`}
                itemData={item}
                isInCart={
                  cartItemList.find(
                    (cartItem) => cartItem.itemId === item.itemId
                  )
                    ? true
                    : false
                }
              />
            ))}
          </Grid>
        </div>
      ))}
    </Container>
  );
};

export default MenuCard;
