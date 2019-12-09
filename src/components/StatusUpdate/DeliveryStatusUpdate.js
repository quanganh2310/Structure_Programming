import React, { Component } from 'react';
import './../App.css';
import SearchBar from './SearchBar'
import callApi from '../../utils/apiCaller'
import orderBy from "lodash/orderBy";
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import TablePagination from '@material-ui/core/TablePagination';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import EditableTable from './EditableTable';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headCells: [
        { id: 'order_id', numeric: false, disablePadding: true, label: 'Mã hóa đơn' },
        { id: 'created_at', numeric: false, disablePadding: false, label: 'Ngày tạo' },
        { id: 'delivery_unit_id', numeric: false, disablePadding: false, label: 'Đơn vị giao hàng' },
        { id: 'shipper_id', numeric: false, disablePadding: false, label: 'Người giao hàng' },
        { id: 'total_cost', numeric: true, disablePadding: false, label: 'Giá trị HĐ' },
        { id: 'need_collect', numeric: false, disablePadding: false, label: 'Cần thu hộ' },
        { id: 'money_collected', numeric: false, disablePadding: false, label: 'Tiền thu hộ' },
        { id: 'status', numeric: false, disablePadding: false, label: 'Trạng thái' },
        { id: 'action', numeric: false, disablePadding: false, label: '' },
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
      columnToQuery: "order_id", isloading: true
    };
  };

  componentDidMount() {
    callApi('deliveries', 'GET', null).then(res => {
      this.setState({
        rows: res.data.deliveries
      });
    });
    callApi('delivery_units', 'GET', null).then(res => {
      this.setState({
        delivery_units: res.data.delivery_units
      });
    });
    callApi('shippers', 'GET', null).then(res => {
      this.setState({
        shippers: res.data.shippers
      });
    });
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

  handleChange = (e, name, i) => {
    const { value } = e.target;
    this.setState(state => ({
      rows: state.rows.map(
        (row, j) => (j === i ? { ...row, [name]: value } : row)
      )
    }));
    this.setState({
      changed: this.state.changed + 1
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    // this.updateStatus(e);
    this.setState({
      changed: 0
    });
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

  updateStatus = (e) => {
    this.state.rows.forEach(row => {
      const endpoint = "deliveries/" + row.order_id + "/status";
      callApi(endpoint, 'PATCH',
        {},
        { status: row.status }).then(res => {
          console.log(res);
        });
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
              <Typography className={classes.title} variant="h4" id="tableTitle">
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
        <div className="row"></div>

        <div className="row">
          <div className="col s1"></div>
          <div className="col s10">

            <div className={classes.root}>
              <Paper className={classes.paper}>
                <div className="row">
                  <div className="col s6">
                    <EnhancedTableToolbar numSelected={this.state.selected.length} />
                  </div>
                  <div className="col s6">
                    <SearchBar
                      query={this.state.query}
                      handleQuery={this.handleQuery}
                      columnToQuery={this.state.columnToQuery}
                      handleColumnSearch={this.handleColumnSearch}
                      headCells={this.state.headCells}
                    >

                    </SearchBar>
                  </div>
                </div>

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
                      headCells = {this.state.headCells}
                      delivery_units = {this.state.delivery_units}
                      shippers = {this.state.shippers}
                      rowsPerPage = {this.state.rowsPerPage}
                      page = {this.state.page}
                      dense = {this.state.dense}
                      selected = {this.state.selected}
                      order = {this.state.order}
                      orderBy = {this.state.orderBy}
                      handleRequestSort = {this.handleRequestSort}
                      editIdx = {this.state.editIdx}
                      handleRemove = {this.handleRequestSort}
                      startEditing = {this.startEditing}
                      handleChange = {this.handleChange}
                      stopEditing = {this.stopEditing}


                    >

                    </EditableTable>
                    <div className="ml-40 mt-20">

                      <button className="btn waves-effect waves-light green accent-4" type="submit" name="save">
                        <i className="material-icons icon left">save</i>
                        {submitButton()}

                      </button> &nbsp;
                    </div>
                  </form>
                </div>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={this.state.rows.length}
                  rowsPerPage={this.state.rowsPerPage}
                  page={this.state.page}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
              </Paper>
            </div>
          </div>

          <div className="col s1"></div>
        </div>
      </div>
    );
  }

}



export default App