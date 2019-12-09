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
        <div className="card ">
          <div className="content ">
            <div className="row valign-wrapper">
              <div className="col s10">
                <div className="clearfix">
                  <img alt="" className="responsive-img img-left" src={this.props.image} />
                  <h6>{this.props.children}</h6>
                  <h7>x{this.props.quantity}</h7>
                </div>
              </div>
              <div className="col s2">
                <div className="green-text tr">
                  <span className="mr-50">{this.props.price}đ</span>
                </div>
              </div>
            </div>
          </div>
          <div className="card-action grey lighten-5">
            <div className="row">
              <div className="col s7"></div>
              <div className="col s5">
                <div className="black-text tr">
                  Tổng số tiền: <span className="green-text size-30">{this.props.price * this.props.quantity}đ</span><br/>
                </div>
                <div className="mr-0">
                  <a className="waves-effect green waves-light btn">Xem chi tiết</a>
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
