import React from "react";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';



let renderRow = (currentlyEditing, x, i, y, handleChange) => {
  if (currentlyEditing) {
    if (y.prop === "ship_id" || y.prop === "ship_custom" || y.prop === "money_collect") {
      return (
        <input
          name={y.prop}
          onChange={(e) => handleChange(e, y.prop, i)}
          value={x[y.prop]}
          type="text"
          className="validate"
        />
      );
    } else if (y.prop === "status") {
      return (
        // <div className="input-field">
        <Select
          placeholder={x[y.prop]}
          value={x[y.prop]}
          id="status"
          onChange={(e) => handleChange(e, y.prop, i)}
        >
          <MenuItem value="Đang xử lý">Đang xử lý</MenuItem>
          <MenuItem value="Đang lấy hàng">Đang lấy hàng</MenuItem>
          <MenuItem value="Đang giao">Đang giao</MenuItem>
          <MenuItem value="Đã giao">Đã giao</MenuItem>
        </Select>
        // </div>
      );
    } else {
      return x[y.prop];
    }

  } else {
    return x[y.prop];
  }

}

const row = (x, i, header, handleRemove, startEditing, editIdx, handleChange, stopEditing) => {
  const currentlyEditing = editIdx === i;
  return (
    <tr key={`tr-${i}`}>
      {header.map((y, k) =>
        <td key={`trc-${k}`}>
          {renderRow(currentlyEditing, x, i, y, handleChange)}
          {/* {currentlyEditing ? (
            <input
              name={y.prop}
              onChange={(e) => handleChange(e, y.prop, i)}
              value={x[y.prop]}
              type="text"
              className="validate"
            />
          ) : (
              x[y.prop]
            )
          } */}
        </td>
      )}
      <td>
        {currentlyEditing ? (
          <i className="material-icons icon" onClick={() => stopEditing()}>check</i>
        ) : (
            <i className="material-icons icon" onClick={() => startEditing(i)}>create</i>
          )
        }
      </td>
      <td>
        {currentlyEditing ? (
          <i className="material-icons icon" onClick={() => stopEditing()}>close</i>
        ) : (
            <i className="material-icons icon" onClick={() => handleRemove(i)}>delete</i>
          )
        }
      </td>
    </tr>
  );
}

export default ({ data, header, handleRemove, startEditing, editIdx, handleChange, stopEditing }) => (
  <div className="mt-20 ml-40">
    <table className="striped">
      <thead>
        <tr>
          {header.map((x, i) =>
            <th key={`thc-${i}`}>
              {x.name}
            </th>
          )}
        </tr>
      </thead>
      <tbody>
        {data.map((x, i) => row(x, i, header, handleRemove, startEditing, editIdx, handleChange, stopEditing))}
      </tbody>
    </table>
  </div>
);
