import React, { Component } from 'react';
import './detailStyle.css'
import { Card, AppBar, Grid, Paper, Typography, Container } from '@material-ui/core'
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';


export default class Detail extends Component {
  render() {
    return (
      <Card style={{ minHeight: "22em" }}>
        <CardHeader
          title="Địa chỉ nhận hàng"
        >
        </CardHeader>
        <CardContent>
          <p>Họ tên : {this.props.user.name}</p>
          <p>Số điện thoại : {this.props.user.phone}</p>
          <p>Địa chỉ : {this.props.user.address}</p>
          
        </CardContent>
      </Card>
    );
  }
}