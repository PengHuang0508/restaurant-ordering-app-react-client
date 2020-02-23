import React from 'react';
// MUI
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
// Component
import MenuListItem from './MenuListItem';

const useStyles = makeStyles((theme) => ({
  panelContainer: {
    marginBottom: 20
  }
}));

const MenuList = (props) => {
  const classes = useStyles();

  const {
    category: { categoryId, itemList }
  } = props;

  let itemPanel = itemList.map((item, i) => (
    <MenuListItem key={i} item={item} />
  ));

  return (
    <Container className={classes.panelContainer}>
      <Typography>{categoryId}</Typography>
      {itemPanel}
    </Container>
  );
};
export default MenuList;
