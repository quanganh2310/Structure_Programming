import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import {BrowserRouter as Router,Route,
  Redirect,Switch} from 'react-router-dom';
import Main from './../Content/Main'
import DeliveryStatus from './../StatusUpdate/DeliveryStatusUpdate'
import { Link } from 'react-router-dom'

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function MenuBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Link to='/'>
        <Button
          aria-controls="customized-menu"
          aria-haspopup="true"
          variant="contained"
          color="primary"
          //onClick={}
          style={{marginLeft: 200, marginTop: 20}}
        >
          Quản lý giao hàng
        </Button>
      </Link>
      <Link to='/delivery_units'>
        <Button
          aria-controls="customized-menu"
          aria-haspopup="true"
          variant="contained"
          color="primary"
          //onClick={}
          style={{marginLeft: 5, marginTop: 20}}
        >
          Quản lý đối tác giao hàng
        </Button>
      </Link>
    </div>
  );
}