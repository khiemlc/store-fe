import React, { Component } from "react";
import { connect } from "react-redux";

import "./NotFoundPage.scss";

class NotFoundPage extends Component {
  render() {
    return <div style={{ backgroundColor: "#f3f3f3" }}>No page here </div>;
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

export default connect(mapStateToProps, mapDispatchToProps)(NotFoundPage);
