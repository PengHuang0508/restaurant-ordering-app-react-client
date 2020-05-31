import React, { useState } from 'react';
import clsx from 'clsx';
// Redux
import { useDispatch } from 'react-redux';
import { AddToCart } from '../../redux/actions/orderActions';
// MUI
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Collapse from '@material-ui/core/Collapse';
import Grid from '@material-ui/core/Grid';
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
    height: '100%',
  },
  itemCardMedia: {
    height: 200,
    width: 200,
    margin: 'auto',
  },
  itemCardHeader: {
    paddingBottom: 0,
  },
  itemCardDescription: {
    paddingTop: theme.spacing(1),
  },
  itemCardAction: {
    marginBottom: theme.spacing(1),
  },
  itemCardActionBadge: {
    marginLeft: theme.spacing(1),
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
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'space-around',
  },
  itemInstruction: {
    width: '100%',
  },
  itemCardCustomizeButton: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
}));

// TODO: add anchors
// TODO: for mobile, top right corner show last category(anchor for quick scroll)
// TODO: add snack bars (after add to cart)
// TODO: clicked away listener?
const MenuItem = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    itemData: { itemId, name, description, price, thumbnailUrl },
  } = props;
  const [expanded, setExpanded] = useState(false);
  const [counter, setCounter] = useState(0);
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
    dispatch(AddToCart(itemToBeAdded));
    setCounter(counter + itemToBeAdded.quantity);
    setExpanded(false);
    setItemToBeAdded(initialState);
  };

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card className={classes.itemCard}>
        <CardMedia
          className={classes.itemCardMedia}
          image={thumbnailUrl}
          title={name}
        />
        <CardHeader
          className={clsx(classes.itemCardHeader, classes.itemCardBackground)}
          title={name}
          subheader={`$${price}`}
        ></CardHeader>

        <Collapse in={!expanded} timeout='auto' unmountOnExit>
          <CardContent
            className={clsx(
              classes.itemCardDescription,
              classes.itemCardBackground
            )}
          >
            <Typography variant='body2' color='textSecondary' component='p'>
              {description}
            </Typography>
          </CardContent>
        </Collapse>
        <CardActions className={classes.itemCardAction} disableSpacing>
          {counter > 0 && (
            <Badge
              badgeContent={counter}
              className={classes.itemCardActionBadge}
              color='primary'
            >
              <ShoppingCartRoundedIcon />
            </Badge>
          )}
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
        </CardActions>
        <Collapse in={expanded} timeout='auto' unmountOnExit>
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
              <div className={classes.quantityCounter}>
                <IconButton
                  aria-label='decrease item quantity'
                  onClick={() => {
                    handleEdit(
                      'quantity',
                      Math.max(itemToBeAdded.quantity - 1, 1)
                    );
                  }}
                >
                  <RemoveRoundedIcon />
                </IconButton>
                <Typography variant='inherit'>
                  {itemToBeAdded.quantity}
                </Typography>
                <IconButton
                  aria-label='increase item quantity'
                  onClick={() => {
                    handleEdit('quantity', itemToBeAdded.quantity + 1);
                  }}
                >
                  <AddRoundedIcon />
                </IconButton>
              </div>
              <Button color='secondary' onClick={handleExpandClick}>
                Cancel
              </Button>
            </div>
          </CardActions>
        </Collapse>
      </Card>
    </Grid>
  );
};

export default MenuItem;
