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

            <div className="input-field">
                <TextField
                    label="Query"
                    id="first_name" type="text"
                    className="validate"
                    value={query}
                    onChange={handleQuery}
                    floatingLabelFixed
                />
            </div>
            <div className="input-field">
                <FormControl className={classes.formControl}>
                    <InputLabel id="select-label">Column</InputLabel>
                    <Select
                        width="200"
                        id="select-label"
                        style={{ marginLeft: "2em" }}
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
    </div>
);
