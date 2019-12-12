import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid, Typography, Button } from '@material-ui/core';
import MaterialTable from 'material-table';
import { hidden } from 'ansi-colors';
import { Link, BrowserRouter, Route, Router } from 'react-router-dom'
import { getRequest, postRequest, deleteRequest } from '../.././API/FetchData'
import DetailUnit from '../DetailUnit/DetailUnit';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        marginTop: 50,
        marginLeft: 70,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: 385
    },
    button: {
        marginLeft: 300,
        marginRight: 10,
    }
}));

export default function Main() {

    const classes = useStyles();
    const [state, setState] = React.useState({
        columns: [
            
        ],
        data: [
            
        ],
        actions: [{
            hidden: true,
            disabled: true,
            isFreeAction: true,
            onClick: (event, rowData) => {
                console.log("aaaa")
            }
        }]

    });

    const fetchingData = async () => {
        const data = await getRequest('delivery_units');
        console.log("result", data);
        const newState = {}
        newState.data = data
        newState.columns = [
            { title: 'Mã đối tác', field: 'id' },
            { title: 'Tên đối tác', field: 'name', render: (rowData) => (
                    <>                    
                        <Link to={`/detail_unit/${rowData.id}`} style={{ textDecoration: 'none' }} >
                            {rowData.name}
                        </Link>
                        
                        <Route path="/detail_unit/:unitId" component={DetailUnit}  />
             
                    </>
                )
            },
            { title: 'Phí giao hàng', field: 'base_fee' },
            { title: 'Tổng số đơn hàng', field: 'delivery_time' },
        ]
        newState.actions= [{
            hidden: true,
            disabled: true,
            isFreeAction: true,
            onClick: (event, rowData) => {
                console.log("aaaa")
            }
        }]
        setState(newState);
      };
    
    React.useEffect(() => {
        fetchingData();
    }, []);

    console.log('STATE:', state);

    return (
        <div className={classes.root}>
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
            <Grid container spacing={10}>
                <Grid item xs={10}>
                    <Typography variant="h4" component="h2" style={{ marginBottom: 10 }}>
                        Đối tác giao hàng
                        <Button variant="contained" className={classes.button}>
                            + Đối tác giao hàng
                        </Button>
                        <Button variant="contained" >
                            -> Xuất file
                        </Button>
                    </Typography>
                    <MaterialTable
                        title="Editable Example"
                        columns={state.columns}
                        data={state.data}
                        actions={state.actions}
                        editable={{
                            onRowAdd: async (newData) => {
                                await postRequest('delivery_units', newData)
                                new Promise(resolve => {
                                    setTimeout(() => {
                                        resolve();
                                        setState(prevState => {
                                            const data = [...prevState.data];
                                            data.push(newData);
                                            return { ...prevState, data };
                                        });
                                    }, 600);
                                })},
                            onRowUpdate: (newData, oldData) =>
                                new Promise(resolve => {
                                    setTimeout(() => {
                                        resolve();
                                        if (oldData) {
                                            setState(prevState => {
                                                const data = [...prevState.data];
                                                data[data.indexOf(oldData)] = newData;
                                                return { ...prevState, data };
                                            });
                                        }
                                    }, 600);
                                }),
                            onRowDelete: async(oldData) => {
                                await deleteRequest('delivery_units', oldData)
                                new Promise(resolve => {
                                    setTimeout(() => {
                                        resolve();
                                        setState(prevState => {
                                            const data = [...prevState.data];
                                            data.splice(data.indexOf(oldData), 1);
                                            return { ...prevState, data };
                                        });
                                    }, 600);
                                })},
                        }}
                    />
                </Grid>
            </Grid>
        </div>
    );
}