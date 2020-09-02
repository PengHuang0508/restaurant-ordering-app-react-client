import React, { useState } from 'react';
import clsx from 'clsx';
// Redux
import { useDispatch } from 'react-redux';
import { addCartItem } from '../../redux/actions/orderActions';
import { enqueueSnackbar } from '../../redux/actions/snackbarActions';
// MUI
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
// Icons
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import ExpandLessRoundedIcon from '@material-ui/icons/ExpandLessRounded';
import RemoveRoundedIcon from '@material-ui/icons/RemoveRounded';
import ShoppingCartRoundedIcon from '@material-ui/icons/ShoppingCartRounded';

const useStyles = makeStyles((theme) => ({
  itemCard: {
    backgroundColor: 'rgb(240,235,230)',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    marginBottom: theme.spacing(5),
  },
  itemCardMedia: {
    height: 200,
    margin: '0 auto',
    width: '100%',
  },
  itemCardAction: {
    backgroundColor: 'rgb(225,220,215)',
    marginTop: 'auto',
    padding: theme.spacing(2),
  },
  itemCardActionButton: {
    margin: theme.spacing(0, 1),
    marginLeft: 'auto',
  },
  expandIcon: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandIconOpen: {
    transform: 'rotate(180deg)',
  },
  itemCardCustomize: {
    alignItems: 'flex-start',
    backgroundColor: 'rgb(225,220,215)',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'space-around',
  },
  itemCardCustomizeButton: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
}));

const MenuItem = (props) => {
  const {
    itemData: { itemId, name, description, price, thumbnailUrl },
    isInCart,
  } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);
  const initialState = {
    itemId,
    name,
    price,
    thumbnailUrl,
    quantity: 1,
    instructions: '',
  };
  const [itemToBeAdded, setItemToBeAdded] = useState(initialState);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleEdit = (target, value) => {
    setItemToBeAdded({ ...itemToBeAdded, [target]: value });
  };
  const handleAddToCart = () => {
    dispatch(addCartItem(itemToBeAdded));
    dispatch(
      enqueueSnackbar({
        message: 'Added to the cart.',
        options: {
          key: new Date().getTime() + Math.random(),
          variant: 'success',
        },
      })
    );
    setExpanded(false);
    setItemToBeAdded(initialState);
  };

  const cardActionButtons = (
    <React.Fragment>
      <Button
        aria-expanded={expanded}
        aria-label='add to cart'
        className={classes.itemCardActionButton}
        color={expanded ? 'secondary' : 'primary'}
        endIcon={
          <ExpandLessRoundedIcon
            className={clsx(classes.expandIcon, {
              [classes.expandIconOpen]: expanded,
            })}
          />
        }
        onClick={handleExpandClick}
        variant='contained'
      >
        Customize
      </Button>
      <Button color='primary' onClick={handleAddToCart} variant='contained'>
        Add
      </Button>
    </React.Fragment>
  );

  const instructionTextField = (
    <CardActions className={classes.itemCardCustomize} disableSpacing>
      <TextField
        defaultValue={itemToBeAdded.instruction}
        fullWidth
        label='Instructions'
        multiline
        rows={5}
        variant='outlined'
        onChange={(e) => handleEdit('instructions', e.target.value)}
        value={itemToBeAdded.instructions}
      />
      <div className={classes.itemCardCustomizeButton}>
        <React.Fragment>
          <IconButton
            aria-label='decrease item quantity'
            onClick={() => {
              handleEdit('quantity', Math.max(itemToBeAdded.quantity - 1, 1));
            }}
          >
            <RemoveRoundedIcon />
          </IconButton>
          <Typography variant='inherit'>{itemToBeAdded.quantity}</Typography>
          <IconButton
            aria-label='increase item quantity'
            onClick={() => {
              handleEdit('quantity', itemToBeAdded.quantity + 1);
            }}
          >
            <AddRoundedIcon />
          </IconButton>
        </React.Fragment>
        <Button color='secondary' onClick={handleExpandClick}>
          Cancel
        </Button>
      </div>
    </CardActions>
  );

  return (
    <Card className={classes.itemCard}>
      <CardMedia
        className={classes.itemCardMedia}
        image={thumbnailUrl}
        title={name}
      />
      <CardHeader title={name} subheader={`$${price}`} />
      <CardContent>
        <Typography variant='body2' color='textSecondary' component='p'>
          {description}
        </Typography>
      </CardContent>
      <CardActions className={classes.itemCardAction} disableSpacing>
        {isInCart && <ShoppingCartRoundedIcon color='primary' />}
        {cardActionButtons}
      </CardActions>
      <Collapse in={expanded} timeout='auto' unmountOnExit>
        {instructionTextField}
      </Collapse>
    </Card>
  );
};

export default MenuItem;
