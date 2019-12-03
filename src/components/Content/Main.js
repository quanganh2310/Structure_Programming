import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid, Typography, Button } from '@material-ui/core';
import MaterialTable from 'material-table';
import { hidden } from 'ansi-colors';
import { Link } from 'react-router-dom'
import { fetchData } from '../.././API/FetchData'

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
            { title: 'Mã đối tác', field: 'code' },
            {
                title: 'Tên đối tác', field: 'name', render: (rowData) => (
                    <Link to='abc' style={{ textDecoration: 'none' }}>
                        {rowData.name}
                    </Link>
                )
            },
            { title: 'Điện thoại', field: 'phone' },
            { title: 'Tổng số đơn hàng', field: 'product' },
            { title: 'Nợ cần trả hiện tại', field: 'debt' },
            { title: 'Tổng phí giao hàng cần trả', field: 'fee' }
        ],
        data: [
            { code: 'AH123235', name: 'Nguyễn Địch Long', phone: '0245362258', product: 12, debt: '254,000', fee: '110,000' },
            { code: 'AH166254', name: 'Nguyễn Quang Anh', phone: '0246309819', product: 8, debt: '54,000', fee: '0' },
            { code: 'GB996584', name: 'Nguyễn Quang Hùng', phone: '063547891', product: 18, debt: '435,000', fee: '43,000' },
            { code: 'NF653226', name: 'Phùng Văn Tùng', phone: '089654784', product: 13, debt: '235,000', fee: '35,000' },
            { code: 'VF457812', name: 'Kim Khắc Luân', phone: '023569865', product: 30, debt: '662,000', fee: '0' },
            { code: 'BH164389', name: 'Lê Thị Lan', phone: '099685263', product: 6, debt: '41,000', fee: '11,000' },
            { code: 'CX245986', name: 'Võ Hắc Hạnh Quyên', phone: '087456912', product: 25, debt: '684,000', fee: '54,000' },
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
        const data = await fetchData();
        console.log("result", data);
        const newState = {}
        newState.data = data
        newState.columns = [
            { title: 'Mã đối tác', field: 'order_id' },
            {
                title: 'Tên đối tác', field: 'delivery_unit_id', render: (rowData) => (
                    <Link to='abc' style={{ textDecoration: 'none' }}>
                        {rowData.delivery_unit_id}
                    </Link>
                )
            },
            { title: 'Điện thoại', field: 'shipper_id' },
            { title: 'Tổng số đơn hàng', field: 'receiver_phone' },
            { title: 'Nợ cần trả hiện tại', field: 'receiving_address' },
            { title: 'Tổng phí giao hàng cần trả', field: 'total_cost' }
        ]
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
                            onRowAdd: newData =>
                                new Promise(resolve => {
                                    setTimeout(() => {
                                        resolve();
                                        setState(prevState => {
                                            const data = [...prevState.data];
                                            data.push(newData);
                                            return { ...prevState, data };
                                        });
                                    }, 600);
                                }),
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
                            onRowDelete: oldData =>
                                new Promise(resolve => {
                                    setTimeout(() => {
                                        resolve();
                                        setState(prevState => {
                                            const data = [...prevState.data];
                                            data.splice(data.indexOf(oldData), 1);
                                            return { ...prevState, data };
                                        });
                                    }, 600);
                                }),
                        }}
                    />
                </Grid>
            </Grid>
        </div>
    );
}