import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import "./AllSection.scss";

class Breadcrumb extends Component {
  returnToHome = () => {
    if (this.props.history) {
      this.props.history.push(`/home`);
    }
  };
  render() {
    return (
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item" onClick={() => this.returnToHome()}>
            <a href="#">Trang chủ</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {this.props.product.type}
          </li>
          {this.props.isDetail && this.props.isDetail === true && (
            <li className="breadcrumb-item active" aria-current="page">
              {this.props.product.name}
            </li>
          )}
        </ol>
      </nav>
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Breadcrumb)
);
