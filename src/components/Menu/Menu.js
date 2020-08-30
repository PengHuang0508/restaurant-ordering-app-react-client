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
import MenuItem from './MenuItem';

const useStyles = makeStyles((theme) => ({
  menuContainer: {
    marginBottom: theme.spacing(5),
  },
  menuCategory: {
    padding: theme.spacing(5, 2),
  },
  menuCategoryTitle: {
    backgroundColor: '#414141',
    backgroundImage: 'linear-gradient(315deg, #414141 0%, #000000 74%)',
    borderRadius: '7px',
    boxShadow: '3px 5px #ddd',
    color: '#fff',
    fontFamily: 'Indie Flower, cursive',
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2, 3, 1.5),
  },
}));

const Menu = () => {
  const classes = useStyles();
  const { menu, cartItemList } = useSelector((state) => ({
    menu: state.menu.menu,
    cartItemList: state.order.cart.itemList,
  }));

  return (
    <Container className={classes.menuContainer}>
      {menu.map((category) => (
        <div
          className={classes.menuCategory}
          key={`Menu-${category.settings.categoryId}`}
          id={category.settings.categoryId}
        >
          <Typography
            className={classes.menuCategoryTitle}
            variant='h3'
            component='h2'
          >
            {category.settings.name}
          </Typography>
          <Grid container spacing={4}>
            {category.itemList.map((item) => (
              <MenuItem
                key={`Menu-MenuItem-${item.itemId}`}
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

export default Menu;
