import React, { Component } from 'react';
import './productStyle.css'
import { Card, AppBar, Grid, Paper, Typography, Container } from '@material-ui/core'
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

export default class Product extends Component {
  render() {
    function numberWithCommas(x) {
      return String(x).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return (
      <Card style={{ minHeight: "15em" }}>
        <CardHeader
          title="Thông tin sản phẩm"
        >
        </CardHeader>
        <CardContent>
        {this.props.products.map((product, index) => {
          return (
            <div key={index} >
              <h4>{product.name}</h4>
              <p>Đơn giá: {numberWithCommas(product.price)}</p>
              <p>Số lượng: x{product.quantity}</p>
            </div>)
        })
        }
        </CardContent>
      </Card>
    );
  }
}