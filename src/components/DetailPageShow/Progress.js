import React, { Component } from 'react';
import './progressStyle.css'
import { Card, AppBar, Grid, Paper, Typography, Container } from '@material-ui/core'
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

export default class Progress extends Component {
    state = {  }
    render() {
      const title = "Mã đơn hàng: " + this.props.id 
        return (
          <div>
          <br/>
          <br/>
          <br/>

          <Card>
              <CardHeader 
              title={title}
              subheader={this.props.status}
              >
                {this.props.id} | {this.props.status}

                </CardHeader>
              <CardContent>
              <div className="progress">
                <ul className="progressbar">
                </ul>
              </div>
              </CardContent>
            </Card>
            </div>
        );
    }
}