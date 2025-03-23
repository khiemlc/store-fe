import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import "./Statistics.scss";
import * as actions from "../../../store/actions";
import { withRouter } from "react-router";

class ProductItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  componentDidUpdate(prevProps, prevState, snapshot) {}
  render() {
    let cart = this.props.listCart;

    return (
      <div className="list-product__container">
        {cart &&
          cart.length > 0 &&
          cart.map((item) => {
            return (
              <div className="product">
                <div className="product-info">
                  <span className="name">
                    {item.productType} {item.productName}
                  </span>
                  <span className="quantity">x{item.quantity}</span>
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
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductItem)
);
