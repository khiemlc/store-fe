import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

class Home extends Component {
  render() {
    const { isLoggedIn, dataUser } = this.props;
    console.log({ isLoggedIn, dataUser });
    let linkToRedirect = isLoggedIn
      ? +dataUser?.roleId === 0
        ? "/system/order-checking"
        : "/home"
      : "/login";
    console.log("this.props:", this.props);
    return <Redirect to={linkToRedirect} />;
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    isLoggedIn: state.user.isLoggedIn,
    dataUser: state?.user?.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
