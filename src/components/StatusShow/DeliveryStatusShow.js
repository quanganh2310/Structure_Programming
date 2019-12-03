import React, { Component } from 'react';
import './App.css';
import Product from './Product'


class App extends Component {
  constructor(props) {
    super(props);
  }



  render() {

    var products = [
      {
        id: 1,
        name: 'Áo thun nam',
        quantity: 1,
        price: 99000,
        image: 'https://cbu01.alicdn.com/img/ibank/2018/766/285/8873582667_1403146857.128x128.jpg',
        status: 'taking'
      },
      {
        id: 2,
        name: 'Giày vải',
        quantity: 1,
        price: 299000,
        image: 'https://giayaqua.com/wp-content/uploads/2016/10/M122-skyblue_1-128x128.jpg',
        status: 'shipping'
      },
      {
        id: 3,
        name: 'Thắt lưng nam',
        quantity: 1,
        price: 199000,
        image: 'https://cbu01.alicdn.com/img/ibank/2014/106/977/1894779601_530237812.128x128.jpg',
        status: 'completed'
      },
    ];

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
        quantity={product.quantity}
        price={product.price}
        image={product.image}
      >
        {product.name}
      </Product>

    });

    function getProduct(products, status) {
      let elements_taking = products.map((product, index) => {
        if (product.status === status)
          return <Product
            key={product.id}
            quantity={product.quantity}
            price={product.price}
            image={product.image}
          >
            {product.name}
          </Product>
      });
      return elements_taking;
    }



    return (
      <div>

        <nav>
          <div class="nav-wrapper green">
            <div class="row">
              <div class="col s1">
              </div>
              <div class="col s10">
                <a href="#" class="brand-logo left">Home</a>
                <ul id="nav-mobile" class="right hide-on-med-and-down">
                  <li><a href="sass.html">Thông báo</a></li>
                  <li><a href="components.html">Trợ giúp</a></li>
                  <li><a href="javascript.html">thehungphung98</a></li>
                </ul>
              </div>
              <div class="col s1">
              </div>
            </div>
            {/* <div class="container">
              
            </div> */}
          </div>
        </nav>

        {/* <div class="container"> */}


        <div class="row mt-20">
          <div class="col s1">
          </div>
          <div class="col s2">
            <div class="clearfix">
              <h4>
                Tình trạng giao hàng
              </h4>
            </div>
          </div>
          <div class="col s8">
            <div class="card">
              <ul class="tabs">
                <li class="tab col s3">
                  <a class="black-text active" href="#all" >Tất cả</a>
                </li>
                <li class="tab col s3">
                  <a href="#take" class="black-text">
                    Chờ lấy hàng {countProduct(products, 'taking')}
                  </a>
                </li>
                <li class="tab col s3">
                  <a href="#shipping" class="black-text">
                    Đang giao {countProduct(products, 'shipping')}
                  </a>
                </li>
                <li class="tab col s3">
                  <a href="#shiped" class="black-text">
                    Đã giao
                    </a>
                </li>
              </ul>
            </div>


            <div id="all" class="col s12">
              {elements}
            </div>

            <div id="take" class="col s12">
              {getProduct(products, 'taking')}
            </div>
            <div id="shipping" class="col s12">
              {getProduct(products, 'shipping')}
            </div>
            <div id="shiped" class="col s12">
              {getProduct(products, 'taking')}
            </div>
          </div>
          <div class="col s1">
          </div>
        </div>

      </div>

      // </div>
    );
  }
}

export default App;
