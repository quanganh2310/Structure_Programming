import React from 'react';


export default ({ query, handleQuery, columnToQuery, handleColumnSearch, headCells}) => (
    <div style={{ display: "flex" }}>
        <div style={{ display: "flex", margin: "auto" }}>

            <div className="input-field">
                <input
                    placeholder="Query"
                    id="first_name" type="text"
                    className="validate"
                    value={query}
                    onChange={handleQuery}
                />
                <label htmlFor="first_name">Query</label>
            </div>
            <div className="input-field">
                <select
                    style={{ marginLeft: "1em" }}
                    value={columnToQuery}
                    onChange={handleColumnSearch}
                >
                    {
                        headCells.map((headCell, index) => (
                            <option key={index} value={headCell.id}>{headCell.label}</option>
                        ))
                    }
                </select>
                <label>Column</label>
            </div>
        </div>
    </div>
);
