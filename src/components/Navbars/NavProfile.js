import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../redux/actions/userActions';
// MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
// import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
// MUI icons
//import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';

const styles = (theme) => ({
  paper: {},
});

const NavProfile = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Admin   = 0
  // Owner   = 1
  // Manager = 2
  // Server  = 3
  // Guest   = 4
  const checkUserRole = (role) => {
    let roles = ['Admin', 'Owner', 'Manager', 'Server', 'Guest'];
    return roles[role] ? roles[role] : null;
  };

  const {
    classes,
    user: {
      credentials: { handle, role },
      loading,
      authenticated,
    },
  } = props;

  let profileMarkup = !loading ? (
    authenticated ? (
      <Paper className={classes.paper}>
        <Typography variant='body2'>Welcome {handle}</Typography>
        <hr />
        {checkUserRole(role)}
        <MenuItem
          onClick={() => {
            props.logoutUser();
            handleClose();
          }}
        >
          Logout
        </MenuItem>
      </Paper>
    ) : (
      <Paper className={classes.paper}>
        <Typography variant='body2' align='center'>
          No Profile found.
          <MenuItem component={Link} to='/login' onClick={handleClose}>
            Login
          </MenuItem>
          <MenuItem component={Link} to='/signUp' onClick={handleClose}>
            signUp
          </MenuItem>
        </Typography>
      </Paper>
    )
  ) : (
    <p>loading...</p>
  );

  return (
    <div>
      {/* <IconButton
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <AccountCircleRoundedIcon />
      </IconButton> */}
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {profileMarkup}
        {/* <MenuItem component={Link} to="/login" onClick={handleClose}>
          Login
        </MenuItem>
        <MenuItem component={Link} to="/signUp" onClick={handleClose}>
          signUp
        </MenuItem> */}
      </Menu>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = {
  logoutUser,
};

NavProfile.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(NavProfile));
// class NavProfile extends Component {
//   constructor() {
//     super();
//     this.state = {
//       anchorEl: null,
//       setAnchorEl: null
//     };
//   }

//   handleClick = (event) => {
//     this.setState({ AnchorEl: event.currentTarget });
//   };

//   handleClose = () => {
//     this.setState({ AnchorEl: null });
//   };
//   render() {
//     return (
//       <div>
//         <Button
//           aria-controls="simple-menu"
//           aria-haspopup="true"
//           onClick={this.handleClick}
//         >
//           Open Menu
//         </Button>
//         <Menu
//           id="simple-menu"
//           anchorEl={this.anchorEl}
//           keepMounted
//           open={Boolean(this.anchorEl)}
//           onClose={this.handleClose}
//         >
//           <MenuItem onClick={this.handleClose}>Profile</MenuItem>
//           <MenuItem onClick={this.handleClose}>My account</MenuItem>
//           <MenuItem onClick={this.handleClose}>Logout</MenuItem>
//         </Menu>
//       </div>
//     );
//   }
// }
