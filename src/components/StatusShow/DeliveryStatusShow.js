import React, { Component } from 'react';
import './../App.css';
import Product from './Product'
import callApi from '../../utils/apiCaller'
import axios from 'axios';
import * as Config from '../../constants/Config';


class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      bills_info: [],
      bills: []
      
    };
  }


  componentDidMount() {
    callApi('deliveries', 'GET', null).then(res => {
      this.setState({
        bills: res.data.deliveries
      });
    });
  }



  render() {

    var products = this.state.bills;

    function countProduct(products, status) {
      var number = 0;
      for (let i = 0; i < products.length; i++) {
        if (products[i].status === status) {
          number++;
        }
      }
      if (number === 0) {
        return '';
      } else {
        var extend = "(" + number + ")";
        return extend;
      }
    }

    let elements = products.map((product, index) => {
      return <Product
        key={product.id}
        // quantity={product.quantity}
        price={product.value}
        image={product.image}
      >
        {/* {product.name} */}
      </Product>

    });

    function getProduct(products, status) {
      let elements_taking = products.map((product, index) => {
        if (product.status === status)
          return <Product
            key={product.id}
            // quantity={product.quantity}
            price={product.value}
            // image={product.image}
          >
            {/* {product.name} */}
          </Product>
      });
      return elements_taking;
    }



    return (
      <div>

        <nav>
          <div className="nav-wrapper green">
            <div className="row">
              <div className="col s1">
              </div>
              <div className="col s10">
                <a href="#" className="brand-logo left">Home</a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                  <li><a href="sass.html">Thông báo</a></li>
                  <li><a href="components.html">Trợ giúp</a></li>
                  <li><a href="javascript.html">thehungphung98</a></li>
                </ul>
              </div>
              <div className="col s1">
              </div>
            </div>
            {/* <div className="container">
              
            </div> */}
          </div>
        </nav>

        {/* <div className="container"> */}


        <div className="row mt-20">
          <div className="col s1">
          </div>
          <div className="col s2">
            <div className="clearfix">
              <h4>
                Tình trạng giao hàng
              </h4>
            </div>
          </div>
          <div className="col s8">
            <div className="card">
              <ul className="tabs">
                <li className="tab col s2">
                  <a className="black-text active" href="#all" >Tất cả</a>
                </li>
                <li className="tab col s2">
                  <a href="#pending" className="black-text">
                    Chờ xác nhận {countProduct(products, 'Pending')}
                  </a>
                </li>
                <li className="tab col s2">
                  <a href="#take" className="black-text">
                    Chờ lấy hàng {countProduct(products, 'Success')}
                  </a>
                </li>
                <li className="tab col s2">
                  <a href="#shipping" className="black-text">
                    Đang giao {countProduct(products, 'Shipping')}
                  </a>
                </li>
                <li className="tab col s2">
                  <a href="#shiped" className="black-text">
                    Đã giao
                    </a>
                </li>
                <li className="tab col s2">
                  <a href="#canceled" className="black-text">
                    Đã hủy {countProduct(products, 'Cancel')}
                  </a>
                </li>
              </ul>
            </div>


            <div id="all" className="col s12">
              {elements}
            </div>

            <div id="pending" className="col s12">
              {getProduct(products, 'Pending')}
            </div>
            <div id="take" className="col s12">
              {getProduct(products, 'Success')}
            </div>
            <div id="shipping" className="col s12">
              {getProduct(products, 'Shipping')}
            </div>
            <div id="shiped" className="col s12">
              {getProduct(products, 'taking')}
            </div>
            <div id="canceled" className="col s12">
              {getProduct(products, 'Cancel')}
            </div>
          </div>
          <div className="col s1">
          </div>
        </div>

      </div>

      // </div>
    );
  }
}

export default App;
