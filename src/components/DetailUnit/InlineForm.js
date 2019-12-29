import React from "react";
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import TableCell from '@material-ui/core/TableCell';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';


export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: {
        ...props.x
      },
      errors: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        username: ""
      }
    };
  }

  change = e => {
    const { name, value } = e.target;
    this.setState(state => ({
      values: {
        ...state.values,
        [name]: value
      }
    }));
  };

  // validate = () => {
  //   let isError = false;
  //   const errors = {
  //     firstName: "",
  //     lastName: "",
  //     username: "",
  //     email: "",
  //     password: ""
  //   };

  //   const { username, email } = this.state.values;

  //   if (username.length < 5) {
  //     isError = true;
  //     errors.username = "Username needs to be atleast 5 characters long";
  //   }

  //   if (email.indexOf("@") === -1) {
  //     isError = true;
  //     errors.email = "Requires valid email";
  //   }

  //   this.setState({
  //     errors
  //   });

  //   return isError;
  // };

  onSubmit = e => {
    e.preventDefault();
    // const err = this.validate();
    // if (!err) {
    this.props.handleSave(this.props.i, this.state.values);
    // }
  };

  render() {
    // const { header, x, i } = this.props;
    function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return [
      this.props.header.map((y, k) => {
        if (y.id === "status_name") {
          return (
            <TableCell key={`trc-${k}`}>

              <Select
                // placeholder={this.props.x[y.id]}
                name={y.id}
                value={this.state.values[y.id]}
                onChange={this.change}
              >
                {this.props.status.map((st, index) => {
                  return <MenuItem key={index} value={st.name}>{st.name}</MenuItem>
                })}
              </Select>
            </TableCell>

          );
        } else if (y.id === "total_cost") {
          return (
            <TableCell key={`trc-${k}`}>
              {numberWithCommas(this.props.x[y.id])}
    
            </TableCell>

          )
        // } 
        // else if (y.id === "shipper_name") {
        //   return (
        //     <TableCell key={`trc-${k}`}>
        //       <Button>Add shipper</Button> 
        //     </TableCell>

        //   )
        }else {
          return (
            <TableCell key={`trc-${k}`}>
              {this.props.x[y.id]}
            </TableCell>
          );
        }
      }),
      <TableCell key="submit-icon" >
        <CheckIcon cursor="pointer" onClick={this.onSubmit} />
      </TableCell>,
      <TableCell key="cancel-icon">
        <CloseIcon cursor="pointer" onClick={this.props.stopEditing} />
      </TableCell>
    ];
  }
}
