import React, { useState } from 'react';
// MUI
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  panelSummary: {},
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '50%',
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  }
}));

const MenuListItem = (props) => {
  const classes = useStyles();
  const {
    item: { name, description, price }
  } = props;

  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <ExpansionPanel expanded={expanded === name} onChange={handleChange(name)}>
      <ExpansionPanelSummary
        className={classes.panelSummary}
        expandIcon={<ExpandMoreIcon />}
      >
        {' '}
        <Typography
          className={classes.heading}
          gutterBottom
          variant='h5'
          component='h2'
        >
          {name}
        </Typography>
        <Typography className={classes.secondaryHeading}>${price}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Typography>{description}</Typography>
        <Tooltip title='Add' aria-label='add'>
          <Fab
            color='primary'
            onClick={() => {
              console.log('CLICKED');
            }}
          >
            <AddIcon />
          </Fab>
        </Tooltip>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default MenuListItem;
