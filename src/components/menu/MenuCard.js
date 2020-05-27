import React from 'react';
import { useSelector } from 'react-redux';
// MUI
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// Icons
import BlurOnRoundedIcon from '@material-ui/icons/BlurOnRounded';
// Component
import MenuCardItem from './MenuCardItem';

const useStyles = makeStyles((theme) => ({
  menuCardCategoryContainer: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
  },
  menuCardCategoryHeader: {
    color: theme.palette.primary.dark,
    paddingBottom: theme.spacing(1),
  },
}));

const MenuCard = () => {
  const classes = useStyles();
  const { menu } = useSelector((state) => ({
    menu: state.menu.menu,
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
              />
            ))}
          </Grid>
        </div>
      ))}
    </Container>
  );
};

export default MenuCard;
