import React, { Component } from 'react';
import './../App.css';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

class EditableTable extends Component {


  render() {


    function desc(a, b, orderBy) {
      if (b[orderBy] < a[orderBy]) {
        return -1;
      }
      if (b[orderBy] > a[orderBy]) {
        return 1;
      }
      return 0;
    }

    function stableSort(array, cmp) {
      const stabilizedThis = array.map((el, index) => [el, index]);
      stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
      });
      return stabilizedThis.map(el => el[0]);
    }

    function getSorting(order, orderBy) {
      return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
    }

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

    const visuallyHidden = {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    };

    let EnhancedTableHead = (props) => {
      const { classes, order, orderBy, onRequestSort } = props;
      // props.classes = useStyles();

      const createSortHandler = property => event => {
        onRequestSort(event, property);
      };
      return (
        <TableHead>
          <TableRow>
            {this.props.headCells.map((headCell, index) => (
              <TableCell
                key={headCell.id}
                align='left'
                // padding={headCell.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === headCell.id ? order : false}
              >
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={order}
                  onClick={createSortHandler(headCell.id)}
                >
                  {headCell.label}
                  {orderBy === headCell.id ? (
                    <span className={classes}>
                      {/* {order === 'desc' ? 'sorted descending' : 'sorted ascending'} */}
                    </span>
                  ) : null}
                </TableSortLabel>
              </TableCell>
            )
            )
            }
          </TableRow>
        </TableHead>
      );
    }

    EnhancedTableHead.propTypes = {
      classes: PropTypes.object.isRequired,
      numSelected: PropTypes.number.isRequired,
      onRequestSort: PropTypes.func.isRequired,
      // onSelectAllClick: PropTypes.func.isRequired,
      order: PropTypes.oneOf(['asc', 'desc']).isRequired,
      orderBy: PropTypes.string.isRequired,
      rowCount: PropTypes.number.isRequired,
    };

    let renderRow = (currentlyEditing, x, i, y, handleChange) => {
      function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
      if (currentlyEditing) {
        if (y.id === "status") {
          return (
            <Select
              placeholder={x[y.id]}
              value={x[y.id]}
              id="status"
              onChange={(e) => handleChange(e, y.id, i)}
            >
              <MenuItem value="Pending">Đang xử lý</MenuItem>
              <MenuItem value="Confirmed">Đang lấy hàng</MenuItem>
              <MenuItem value="Shipping">Đang giao</MenuItem>
              <MenuItem value="Shipped">Đã giao</MenuItem>
            </Select>
          );
        } else if (y.id === "money_collected") {
          return (
            <input
              name={y.id}
              onChange={(e) => handleChange(e, y.id, i)}
              value={x[y.id]}
              type="text"
              className="validate"
            />
          );
        } else {
          return x[y.id];

        }

      } else {
        if (y.id === "total_cost") {
          return numberWithCommas(x[y.id]);
        } else if (y.id === "status") {
          if (x[y.id] === "Pending") {
            return "Đang xử lý";
          } else if (x[y.id] === "Success") {
            return "Đang lấy hàng";
          } else if (x[y.id] === "Shipping") {
            return "Đang giao";
          } else {
            return "Đã Giao";
          }
        } else if (y.id === "delivery_unit_id") {
          let unit_name = this.props.delivery_units.map((unit, index) => {
            if (x[y.id] === unit.id) {
              return unit.name;
            }
          })
          return unit_name;
        } else if (y.id === "shipper_id") {
          let shipper_name = this.props.shippers.map((shipper, index) => {
            if (x[y.id] === shipper.id) {
              return shipper.name;
            }
          })
          return shipper_name;
        } else {
          return x[y.id];
        }
      }

    }

    const row = (x, i, header, handleRemove, startEditing, editIdx, handleChange, stopEditing) => {
      const currentlyEditing = editIdx === i;
      return (
        <TableRow key={`tr-${i}`}>
          {header.map((y, k) =>
            <TableCell key={`trc-${k}`}>
              {renderRow(currentlyEditing, x, i, y, handleChange)}
            </TableCell>
          )}
          <TableCell>
            {currentlyEditing ? (
              <i className="material-icons icon" onClick={() => stopEditing()}>check</i>
            ) : (
                <i className="material-icons icon" onClick={() => startEditing(i)}>create</i>
              )
            }
          </TableCell>
          <TableCell>
            {currentlyEditing ? (
              <i className="material-icons icon" onClick={() => stopEditing()}>close</i>
            ) 
            : (
              <p></p>
                //<i className="material-icons icon" onClick={() => handleRemove(i)}>delete</i>
              )
            }
          </TableCell>
        </TableRow>
      );
    }

    const emptyRows = this.props.rowsPerPage - Math.min(this.props.rowsPerPage, this.props.rows.length - this.props.page * this.props.rowsPerPage);

    return (
      <Table
        className={classes.table}
        aria-labelledby="tableTitle"
        size={this.props.dense ? 'small' : 'medium'}
        aria-label="enhanced table"
      >
        <EnhancedTableHead
          classes={visuallyHidden}
          numSelected={this.props.selected.length}
          order={this.props.order}
          orderBy={this.props.orderBy}
          onRequestSort={this.props.handleRequestSort}
          rowCount={this.props.rows.length}
        />
        <TableBody>
          {
            stableSort(this.props.rows,
              getSorting(this.props.order, this.props.orderBy))
              .slice(this.props.page * this.props.rowsPerPage, this.props.page * this.props.rowsPerPage + this.props.rowsPerPage)
              .map((x, i) => row(x, i, this.props.headCells, this.props.handleRemove, this.props.startEditing, this.props.editIdx, this.props.handleChange, this.props.stopEditing))
          }
          {emptyRows > 0 && (
            <TableRow style={{ height: (this.props.dense ? 33 : 53) * emptyRows }}>
              <TableCell colSpan={11} />
            </TableRow>
          )}
        </TableBody>
      </Table>
    );
  }

}



export default EditableTable;