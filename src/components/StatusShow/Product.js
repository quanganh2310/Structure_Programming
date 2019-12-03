import React, { Component} from 'react';
// import './App.css';

class Product extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
    
  }
  onAddtoCart = () => {
    alert(this.props.children);
  }
  render() {
    return (
      <div>      
        <div class="card ">
          <div class="content ">
            <div class="row valign-wrapper">
              <div class="col s10">
                <div class="clearfix">
                  <img alt="" class="responsive-img img-left" src={this.props.image} />
                  <h6>{this.props.children}</h6>
                  <h7>x{this.props.quantity}</h7>
                </div>
              </div>
              <div class="col s2">
                <div class="green-text tr">
                  <span class="mr-50">{this.props.price}đ</span>
                </div>
              </div>
            </div>
          </div>
          <div class="card-action grey lighten-5">
            <div class="row">
              <div class="col s7"></div>
              <div class="col s5">
                <div class="black-text tr">
                  Tổng số tiền: <span class="green-text size-30">{this.props.price * this.props.quantity}đ</span><br/>
                </div>
                <div class="mr-0">
                  <a class="waves-effect green waves-light btn">Xem chi tiết</a>
                </div>
              </div>    
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Product;
