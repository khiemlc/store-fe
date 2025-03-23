import React, { Component } from "react";
import { push } from "connected-react-router";
import { connect } from "react-redux";

import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { adminMenu } from "./menuApp";
import "./Header.scss";
import { LANGUAGES, USER_ROLE } from "../../utils";
import { FormattedMessage } from "react-intl";
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuApp: [],
    };
  }
  handleChangeLanguage = (language) => {
    this.props.changeLanguage(language);
  };
  handleLogout = () => {
    this.props.processLogout();
    this.props.navigate("/login");
  };
  render() {
    const { processLogout, language, userInfo } = this.props;
    // console.log("check user infor", userInfo);
    return (
      <div className="header-container">
        {/* thanh navigator */}
        <div className="header-tabs-container">
          <Navigator menus={adminMenu} />
        </div>
        {/* <div className="welcome">Xin chào, {userInfo.fullName}</div> */}
        {/* nút logout */}
        {/* <div className="btn btn-logout" onClick={() => this.handleLogout()}>
          <i className="fas fa-sign-out-alt"></i>
        </div> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    changeLanguage: (language) => dispatch(actions.changeLanguage(language)),
    navigate: (path) => dispatch(push(path)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
