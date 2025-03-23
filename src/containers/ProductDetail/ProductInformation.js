import React, { Component } from "react";
import { connect } from "react-redux";

import "./ProductInformation.scss";
class ProductInformation extends Component {
  render() {
    let product = this.props.detailProduct;

    return (
      <>
        <div className="product-infor__container">
          <div className="description">
            <div className="title__infor">Mô tả</div>
            <div
              className="content"
              dangerouslySetInnerHTML={{ __html: product.descriptionHTML }}
            ></div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductInformation);
