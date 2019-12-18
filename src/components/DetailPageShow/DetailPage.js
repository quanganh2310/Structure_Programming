import React, { Component } from 'react';
import { AppBar, Grid, Paper, Typography, Container } from '@material-ui/core'
import './DetailPageStyle.css';
import Progress from './Progress'
import Detail from './Detail'
import Product from './Product'
import Payment from './Payment'
import axios from 'axios';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.apiId = this.props.match.params.deliveryId
    this.state = {
      id: 0,
      user: [],
      products: [],
      payment: [],
      warranty: '',
      status: '',
      value: [],
    };
  }

  componentDidMount() {
    const url='https://sp-04-order.herokuapp.com/api/order/' + this.apiId
    axios.get(url).then((response) => {
      // handle success

      this.setState({

        id: response.data.id,
        user: response.data.user,
        products: response.data.products,
        payment: response.data.payment,
        warranty: response.data.warranty,
        status: response.data.status,
        value: response.data.value,
      })
    })
  }

  render() {
    console.log(this.state);
    return (
      <Container>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Progress status={this.state.status} id={this.state.id} />
          </Grid>
          <Grid item xs={6}>
            <Detail user={this.state.user} />
          </Grid>
          <Grid item xs={6}>
            <Payment payment={this.state.payment} value={this.state.value} />
          </Grid>
          <Grid item xs={12}>
            <Product id={this.state.id} products={this.state.products} value={this.state.value} />
          </Grid>
        </Grid>
      </Container>
    );
  }
}
