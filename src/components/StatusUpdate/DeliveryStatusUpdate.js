import React, { Component } from 'react';
import './../App.css';
import axios from 'axios';
import SearchBar from './SearchBar'
import callApi from '../../utils/apiCaller'
import orderBy from "lodash/orderBy";
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import EditableTable from './EditableTable';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';



class DeliveryStatusUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headCells: [
        { id: 'order_id', numeric: false, disablePadding: true, label: 'Mã hóa đơn' },
        { id: 'created_at', numeric: false, disablePadding: false, label: 'Ngày tạo' },
        { id: 'unit_name', numeric: false, disablePadding: false, label: 'Đơn vị giao hàng' },
        { id: 'shipper_name', numeric: false, disablePadding: false, label: 'Người giao hàng' },
        { id: 'total_cost', numeric: true, disablePadding: false, label: 'Giá trị HĐ' },
        // { id: 'need_collect', numeric: false, disablePadding: false, label: 'Cần thu hộ' },
        // { id: 'money_collected', numeric: false, disablePadding: false, label: 'Tiền thu hộ' },
        { id: 'status_name', numeric: false, disablePadding: false, label: 'Trạng thái' },
        { id: 'action', numeric: false, disablePadding: false, label: '' },
      ],
      status: [
        {
          name: "Đang xử lý",
          value: "Pending"
        },
        {
          name: "Đã xác nhận",
          value: "Confirmed"
        },
        {
          name: "Đang giao",
          value: "Shipping"
        },
        {
          name: "Đã giao",
          value: "Shipped"
        },
        {
          name: "Đã hủy",
          value: "Canceled"
        }
      ],
      shippers: [],
      delivery_units: [],
      changed: 0,
      rows: [],
      order: 'asc',
      orderBy: 'calories',
      selected: [],
      page: 0,
      dense: false,
      rowsPerPage: 5,
      editIdx: -1,
      query: "",
      columnToQuery: "", isloading: true
    };
  };

  getUnits = async () => {
    return await axios.get('https://online-selling-website.herokuapp.com/delivery_units');
  }

  getShippers = async () => {
    return await axios.get('https://online-selling-website.herokuapp.com/shippers');
  }

  getDeliveries = async () => {
    return await axios.get('https://online-selling-website.herokuapp.com/deliveries');
  }

  componentDidMount() {
    this.setState({
      isloading: true
    });
    axios.all([this.getUnits(), this.getShippers(), this.getDeliveries()])
      .then(axios.spread((units, shippers, deliveries) => {
        this.setState({
          delivery_units: units.data.delivery_units,
          shippers: shippers.data.shippers,
          rows: deliveries.data.deliveries
        })
        this.state.rows.forEach((row) => {
          this.state.delivery_units.forEach((unit) => {
            let name2 = 'unit_name'
            if (unit.id === row.delivery_unit_id) {
              this.setState({
                rows: this.state.rows.map(
                  (r, j) => (r === row ? { ...r, [name2]: unit.name } : r)
                )
              })
            }
          })
        })

        this.state.rows.forEach((row) => {
          this.state.shippers.forEach((shipper) => {
            let name1 = 'shipper_name'
            if (shipper.id === row.shipper_id) {
              this.setState({
                rows: this.state.rows.map(
                  (r, j) => (r === row ? { ...r, [name1]: shipper.name } : r)
                )
              })
            }
          })
        })

        this.state.rows.forEach((row) => {
          this.state.status.forEach((st) => {
            let name1 = 'status_name'
            if (st.value === row.status) {
              this.setState({
                rows: this.state.rows.map(
                  (r, j) => (r === row ? { ...r, [name1]: st.name } : r)
                )
              })
            }
          })
        })

        this.setState({
          isloading: false
        });

      }));

  }

  handleRemove = (i) => {
    this.setState(state => ({
      rows: state.data.filter((row, j) => j !== i),
    }));
  }

  startEditing = (i) => {
    this.setState({ editIdx: i });
  }

  stopEditing = () => {
    this.setState({ editIdx: -1 });
  }

  // handleChange = (e, name, i) => {
  //   const { value } = e.target;
  //   this.setState(state => ({
  //     rows: state.rows.map(
  //       (row, j) => (j === i ? { ...row, [name]: value } : row)
  //     )
  //   }));
  // this.state.rows.map((row,j)=>{
  //   if (j === i) {
  //     this.updateStatus(value,row)
  //   }
  // })
  // };

  handleSave = (i, x) => {

    this.setState(state => ({
      rows: state.rows.map((r, j) => (r.order_id === x.order_id ? x : r))
    }));


    this.state.rows.map((row, index) => {
      if (row.order_id === x.order_id) {
        this.updateStatus(x.status_name, row)
      }
    });
    this.stopEditing();
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);

  }

  handleReset = (e) => {
    e.setDefault();
    console.log(this.state);

  }

  handleRequestSort = (event, property) => {
    const isDesc = this.state.orderBy === property && this.state.order === 'desc';
    this.setState({
      order: isDesc ? 'asc' : 'desc'
    });
    this.setState({
      orderBy: property
    });
  };

  handleChangePage = (event, newPage) => {
    this.setState({
      page: newPage
    });
  };

  handleChangeRowsPerPage = event => {
    this.setState({
      rowsPerPage: parseInt(event.target.value, 10)
    });
    this.setState({
      page: 0
    });
  };

  handleQuery = (e) => {
    this.setState({
      query: e.target.value
    })
  }

  handleColumnSearch = (e, index, value) => {
    this.setState({
      columnToQuery: e.target.value
    });
    console.log(this.state);
  }

  updateStatus = (value, row) => {
    this.state.status.forEach(st => {
      if (st.name === value) {

        let jsonfile = {
          "status": st.value
        };
        let endpoint = 'deliveries/' + row.order_id + '/status';
        callApi(endpoint, 'PATCH',
          jsonfile).then(res => {
            console.log(res);
          });

      }
    });
  }


  render() {

    const lowerCaseQuery = this.state.query.toLowerCase();

    let submitButton = () => {
      if (this.state.changed === 0) {
        return "Lưu lại";
      } else {
        return "Lưu lại (" + this.state.changed + " thay đổi)";
      }
    }

    const useToolbarStyles = makeStyles(theme => ({
      root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
      },
      highlight:
        theme.palette.type === 'light'
          ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
          : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
      title: {
        flex: '1 1 100%',
        color: 'green',
      },
    }));

    const EnhancedTableToolbar = props => {
      const classes = useToolbarStyles();
      const { numSelected } = props;

      return (
        <Toolbar
          className={clsx(classes.root, {
            [classes.highlight]: numSelected > 0,
          })}
        >
          {numSelected > 0 ? (
            <Typography className={classes.title} color="inherit" variant="subtitle1">
              {numSelected} selected
            </Typography>
          ) : (
              <Typography variant="h5" color="primary" id="tableTitle">
                Cập nhật tình trạng giao hàng
            </Typography>
            )}
        </Toolbar>
      );
    };

    EnhancedTableToolbar.propTypes = {
      numSelected: PropTypes.number.isRequired,
    };

    const classes = makeStyles(theme => ({
      root: {
        width: '100%',
      },
      paper: {
        padding: theme.spacing(2),
        width: '100%',
        marginBottom: theme.spacing(2),
      },
      table: {
        minWidth: 750,
      },
      tableWrapper: {
        overflowX: 'auto',
      },
      visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
      },
    }));

    return (
      <div>
        <Container>
          <div className="mt-50">
            <div className={classes.root}>
              <Paper className={classes.paper}>
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <EnhancedTableToolbar numSelected={this.state.selected.length} />
                  </Grid>
                  <Grid item xs={6}>

                    <SearchBar
                      query={this.state.query}
                      handleQuery={this.handleQuery}
                      columnToQuery={this.state.columnToQuery}
                      handleColumnSearch={this.handleColumnSearch}
                      headCells={this.state.headCells}
                    >

                    </SearchBar>
                  </Grid>
                </Grid>
                <div className="mt-30">
                  <div className={classes.tableWrapper}>
                    <form onSubmit={this.handleSubmit} onReset={this.handleReset}>
                      <EditableTable
                        rows={orderBy(
                          this.state.query
                            ? this.state.rows.filter(x =>
                              String(x[this.state.columnToQuery]).toLowerCase().includes(lowerCaseQuery)
                            )
                            : this.state.rows
                        )}
                        headCells={this.state.headCells}
                        delivery_units={this.state.delivery_units}
                        shippers={this.state.shippers}
                        rowsPerPage={this.state.rowsPerPage}
                        page={this.state.page}
                        dense={this.state.dense}
                        selected={this.state.selected}
                        order={this.state.order}
                        orderBy={this.state.orderBy}
                        handleRequestSort={this.handleRequestSort}
                        editIdx={this.state.editIdx}
                        handleRemove={this.handleRequestSort}
                        startEditing={this.startEditing}
                        handleSave={this.handleSave}
                        stopEditing={this.stopEditing}
                        status={this.state.status}

                        handleChangePage={this.handleChangePage}
                        handleChangeRowsPerPage={this.handleChangeRowsPerPage}

                      >

                      </EditableTable>
                    </form>
                  </div>
                </div>

              </Paper>
            </div>
          </div>
        </Container>
      </div>
    );
  }

}



export default DeliveryStatusUpdate