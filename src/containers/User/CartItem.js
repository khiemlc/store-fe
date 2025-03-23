import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import "./CusOrder.scss";

import * as actions from "../../store/actions";
// import "../Auth/CartItem.scss";
import { withRouter } from "react-router";

class CartItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  componentDidUpdate(prevProps, prevState, snapshot) {}
  formatCash = (number) => {
    return number
      .split("")
      .reverse()
      .reduce((prev, next, index) => {
        return (index % 3 ? next : next + ",") + prev;
      });
  };

  render() {
    let cart = this.props.listCart;

    return (
      <div className="list-cart__container">
        {cart &&
          cart.length > 0 &&
          cart.map((item) => {
            return (
              <div className="cart">
                <div className="product-info">
                  <div className="name">
                    {item.productType} {item.productName}
                  </div>
                  <div className="quantity">x{item.quantity}</div>
                </div>

                <div className="price">
                  {this.formatCash(
                    item.totalPrice ? item.totalPrice.toString() : "0"
                  )}
                  ₫
                </div>
              </div>
            );
          })}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    // userInfo: state.user.userInfo,
    orderUserId: state?.order?.orderUserId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    getOrderByUserIdStart: (userId) =>
      dispatch(actions.getOrderByUserIdStart(userId)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CartItem)
);
