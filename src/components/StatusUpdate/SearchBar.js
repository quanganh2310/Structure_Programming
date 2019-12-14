import React from 'react';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';

const classes = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default ({ query, handleQuery, columnToQuery, handleColumnSearch, headCells }) => (

    <div style={{ display: "flex" }}>
        <div style={{ display: "flex", margin: "auto" }}>
                <TextField
                    label="Query"
                    id="first_name" type="text"
                    className="validate"
                    value={query}
                    onChange={handleQuery}
                />
                <FormControl className={classes.formControl}>
                    <InputLabel id="select-label" style={{ marginLeft: "2em"}}>Column</InputLabel>
                    <Select
                        id="select-label"
                        style={{ marginLeft: "2em" , minWidth: "7em" }}
                        value={columnToQuery}
                        onChange={handleColumnSearch}
                        displayEmpty className={classes.selectEmpty}
                    >
                        {
                            headCells.map((headCell, index) => (
                                <MenuItem key={index} value={headCell.id}>{headCell.label}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
        </div>
    </div>
);
