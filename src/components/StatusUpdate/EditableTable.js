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
import CreateIcon from '@material-ui/icons/Create';
import Pagination from './Pagination';
import InlineForm from './InlineForm';
import { Collapse } from '@material-ui/core';


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

    let renderRow = (x, i, y) => {
      function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }

      if (y.id === "total_cost") {
        return numberWithCommas(x[y.id]);
      } else {
        return x[y.id];
      }


    }

    const row = (x, i, header, handleRemove, startEditing, editIdx, handleSave, stopEditing,status) => {
      const currentlyEditing = editIdx === i;
      return currentlyEditing ? (
        <TableRow key={`inline-form-${i}`} >
          <InlineForm
            handleSave={handleSave}
            header={header}
            x={x}
            i={i}
            stopEditing={stopEditing}
            status={status}
          />
        </TableRow>
      ) : (
        <TableRow key={`tr-${i}`} >
          {header.map((y, k) =>
            <TableCell key={`trc-${k}`}>
              {renderRow(x, i, y)}
            </TableCell>
          )}
          <TableCell>
            <CreateIcon cursor="pointer" onClick={() => startEditing(i)} />
          </TableCell>
          <TableCell>
          {/* <Collapse></Collapse> */}

            <p></p>
          </TableCell>
        </TableRow>
      );
    }

    const emptyRows = this.props.rowsPerPage - Math.min(this.props.rowsPerPage, this.props.rows.length - this.props.page * this.props.rowsPerPage);

    return (
      <div>
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
                .map((x, i) => row(x, i, this.props.headCells, this.props.handleRemove, this.props.startEditing, this.props.editIdx, this.props.handleSave, this.props.stopEditing,this.props.status))
            }
            {emptyRows > 0 && (
              <TableRow style={{ height: (this.props.dense ? 33 : 53) * emptyRows }}>
                <TableCell colSpan={11} />
              </TableRow>
            )}
          </TableBody>
          <Pagination
            rows={this.props.rows}
            rowsPerPage={this.props.rowsPerPage}
            page={this.props.page}
            handleChangePage={this.props.handleChangePage}
            handleChangeRowsPerPage={this.props.handleChangeRowsPerPage}
          />
        </Table>
      </div>
    );
  }

}



export default EditableTable;