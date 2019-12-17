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
import Main from './../Content/Main'
import DeliveryStatusUpdate from './../StatusUpdate/DeliveryStatusUpdate'
import { Link, BrowserRouter, Route, Router } from 'react-router-dom'

export default function MenuBar() {

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