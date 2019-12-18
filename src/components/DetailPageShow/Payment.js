import React, { Component } from 'react';
import './detailStyle.css'
import { Card, AppBar, Grid, Paper, Typography, Container } from '@material-ui/core'
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


export default class Payment extends Component {
    render() {
        function numberWithCommas(x) {
            return String(x).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          }
        return (
            <Card style={{ minHeight: "22em" }}>
                <CardHeader
                    title="Thanh toán"
                >
                </CardHeader>
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <Table>
                                <TableRow>
                                    <TableCell>Tổng tiền hàng :</TableCell>
                                    <TableCell>{numberWithCommas(this.props.value.subTotal)}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Phí vận chuyển :</TableCell>
                                    <TableCell>{numberWithCommas(this.props.value.shipping)}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Giảm giá :</TableCell>
                                    <TableCell>-{numberWithCommas(this.props.value.discount)}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><h3>Tổng số tiền :</h3></TableCell>
                                    <TableCell><h3>{numberWithCommas(this.props.value.totalValue)}</h3></TableCell>
                                </TableRow>
                            </Table>
                            {/* <p>Tổng tiền hàng : {this.props.value.subTotal}</p>
                            <p>Phí vận chuyển : {this.props.value.shipping}</p>
                            <p>Giảm giá : -{this.props.value.discount}</p>
                            <p>Tổng số tiền : {this.props.value.totalValue}</p> */}
                        </Grid>
                        <Grid item xs={6}>
                            <p>Phương thức thanh toán : {this.props.payment.type}</p>
                            <p>Tình trạng thanh toán: {this.props.payment.status}</p>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        );
    }
}