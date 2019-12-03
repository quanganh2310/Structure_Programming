import React, { Component } from 'react';
import './App.css';
import Table from './Table';
import orderBy from "lodash/orderBy";



class App extends Component {

  state = {
    data: [
      {
        order_id: 'HD00253',
        ship_id: 'AN005',
        custom: 'Mai Thanh Nga',
        ship_custom: 'Anh Nam',
        price: '158.000',
        need_collect: 0,
        money_collect: 0,
        status: 'Đang xử lý'
      },
      {
        order_id: 'HD00254',
        ship_id: 'AN010',
        custom: 'Phùng Thế Hùng',
        ship_custom: 'Anh Mạnh',
        price: '99.000',
        need_collect: 0,
        money_collect: 0,
        status: 'Đang giao'
      },
      {
        order_id: 'HD00255',
        ship_id: 'AN011',
        custom: 'Lê Văn An',
        ship_custom: 'Anh Tuấn',
        price: '199.000',
        need_collect: 0,
        money_collect: 0,
        status: 'Đã giao'
      },
      {
        order_id: 'HD00256',
        ship_id: 'AN012',
        custom: 'Phan Tuấn Tài',
        ship_custom: 'Anh Đạt',
        price: '299.000',
        need_collect: 0,
        money_collect: 0,
        status: 'Đang giao'
      }
    ],
    editIdx: -1,
    query: "",
    columnToQuery: "order_id"
  };

  handleRemove = (i) => {
    this.setState(state => ({
      data: state.data.filter((row, j) => j !== i),
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
      data: state.data.map(
        (row, j) => (j === i ? { ...row, [name]: value } : row)
      )
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
  }

  handleReset = (e) => {
    e.setDefault();
    console.log(this.state);

  }

  render() {
    const lowerCaseQuery = this.state.query.toLowerCase();
    return (
      <div>
        <div className="card-panel white">

          <div className="row">
            <div className="col s6">
              <h4 className="ml-40 green-text text-accent-3">
                Cập nhật hóa đơn giao hàng
              </h4>
            </div>
            <div className="search-bar col s6">
              <div style={{ display: "flex" }}>
                <div style={{ display: "flex", margin: "auto" }}>

                  <div className="input-field">
                    <input
                      placeholder="Query"
                      id="first_name" type="text"
                      className="validate"
                      value={this.state.query}
                      onChange={
                          e => this.setState({ query: e.target.value })
                        }
                    />
                    <label htmlFor="first_name">Query</label>
                  </div>
                  <div className="input-field">
                    <select
                      style={{ marginLeft: "1em" }}
                      value={this.state.columnToQuery}
                      onChange={
                        (event, index, value) => {this.setState({ columnToQuery: event.target.value });console.log(this.state);}
                      }
                    >
                      <option value="order_id">Mã hóa đơn</option>
                      <option value="ship_id">Mã vận đơn</option>
                      <option value="custom">Khách hàng</option>
                      <option value="ship_custom">Đối tác giao hàng</option>
                      <option value="status">Trạng thái</option>
                    </select>
                    <label>Column</label>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <form onSubmit={this.handleSubmit} onReset={this.handleReset}>

            <Table
              handleRemove={this.handleRemove}
              startEditing={this.startEditing}
              editIdx={this.state.editIdx}
              handleChange={this.handleChange}
              stopEditing={this.stopEditing}
              data={orderBy(
                this.state.query
                  ? this.state.data.filter(x => 
                    x[this.state.columnToQuery].toLowerCase().includes(lowerCaseQuery)
                  )
                  : this.state.data
              )}
              header={[
                {
                  name: "Mã hóa đơn",
                  prop: "order_id"
                },
                {
                  name: "Mã vận đơn",
                  prop: "ship_id"
                },
                {
                  name: "Khách hàng",
                  prop: "custom"
                },
                {
                  name: "Đối tác giao hàng",
                  prop: "ship_custom"
                },
                {
                  name: "Giá trị HĐ",
                  prop: "price"
                },
                {
                  name: "Cần thu hộ",
                  prop: "need_collect"
                },
                {
                  name: "Tiền thu hộ",
                  prop: "money_collect"
                },
                {
                  name: "Trạng thái",
                  prop: "status"
                }
              ]}
            >

            </Table>

            <div className="ml-40 mt-20">

              <button className="btn waves-effect waves-light green accent-4" type="submit" name="save">
                <i className="material-icons icon left">save</i>
                Lưu lại

              </button> &nbsp;
              {/* <button className="btn waves-effect waves-light orange" type="reset" name="ignore">
                <i className="material-icons icon left">block</i>
                Bỏ qua
              </button> */}
            </div>

          </form>

        </div>

      </div>
    );
  }
}

export default App;
