import React, { Component } from "react";
import { connect } from "react-redux";

import "./ProductPage.scss";
import NavbarComponent from "./FilerComponent";
import MainProduct from "./MainProduct";
class ProductPage extends Component {
  render() {
    return (
      <div className="product-page__container">
        <div className="navbar">
          <NavbarComponent />
        </div>
        <div className="main-product">
          <MainProduct />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
