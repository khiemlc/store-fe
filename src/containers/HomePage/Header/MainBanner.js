import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../utils";
import { changeLanguage } from "../../../store/actions";
import { withRouter } from "react-router";

class MainBanner extends Component {
  changeLanguage = (language) => {
    this.props.changeLanguage(language);
  };
  goBoughtMany = () => {
    setTimeout(() => {
      this.props.history.push(`/product-bought-many`);
    }, 100);
  };
  render() {
    let language = this.props.language;
    return (
      <React.Fragment>
        <div
          className="banner__container pointer__event"
          onClick={() => this.goBoughtMany()}
        >
          <div className="first__banner"></div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguage: (language) => dispatch(changeLanguage(language)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MainBanner)
);
