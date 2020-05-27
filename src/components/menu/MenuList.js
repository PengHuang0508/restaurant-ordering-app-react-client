import React from 'react';
import { useSelector } from 'react-redux';
// MUI
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
// Component
import MenuListItem from './MenuListItem';

const useStyles = makeStyles((theme) => ({
  panelContainer: {
    marginBottom: 20,
  },
}));

const MenuList = () => {
  const classes = useStyles();

  const { menu } = useSelector((state) => ({
    menu: state.menu.menu,
  }));

  return (
    <div>
      {menu.map((category) => (
        <Container className={classes.panelContainer}>
          <Typography>{category.settings.name}</Typography>
          {category.itemList.map((item) => (
            <MenuListItem
              key={`MenuList-MenuListItem-${item.itemId}`}
              item={item}
            />
          ))}
        </Container>
      ))}
    </div>
  );
};

export default MenuList;
