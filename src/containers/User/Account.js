import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { FormattedMessage } from "react-intl";
import { changeLanguage } from "../../store/actions";
import * as actions from "../../store/actions";
import "./Account.scss";
import { withRouter } from "react-router";
import EditInfo from "./EditInfo";
import CusOrder from "./CusOrder";
class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isInfo: true,
    };
  }
  componentDidMount() {
    if (this.props.isLoggedIn === false) {
      this.props.history.push(`/home`);
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {}
  handleLogout = () => {
    this.props.processLogout();
    this.props.navigate("/login");
  };
  handleIsInfo = (status) => {
    if (this.state.isInfo !== status) {
      this.setState({ isInfo: status });
    }
  };
  changeLanguage = (language) => {
    this.props.changeLanguage(language);
  };
  render() {
    console.log("check state account", this.state);
    console.log("check props account", this.props);
    let user = this.props.userInfo;
    let { isInfo } = this.state;
    console.log("===========check user", isInfo);
    return (
      <div className="account__container">
        <div className="title">
          <FormattedMessage id="header__navbar.manage-account" />
        </div>

        <div className="account__content">
          <div className="general-info">
            <div className="name">
              <i className="fas fa-user-circle fa-3x"></i>
              <div className="user-name">{user?.fullName}</div>
            </div>
            <div className="user__menu">
              <ul>
                <li
                  className={isInfo === true ? "button active" : "button"}
                  onClick={() => this.handleIsInfo(true)}
                >
                  <i className="fas fa-user-edit"></i>
                  <span>
                    <FormattedMessage id="header__navbar.account_info" />
                  </span>
                </li>
                <li
                  className={isInfo === false ? "button active" : "button"}
                  onClick={() => this.handleIsInfo(false)}
                >
                  <i className="fas fa-receipt"></i>
                  <span>
                    <FormattedMessage id="header__navbar.order_info" />
                  </span>
                </li>
                <li className="button" onClick={() => this.handleLogout()}>
                  <i className="fas fa-sign-out-alt"></i>
                  <span>
                    <FormattedMessage id="header__navbar.logout" />
                  </span>
                </li>
              </ul>
            </div>
          </div>
          {isInfo === true ? (
            <div className="account__main">
              <EditInfo userId={this.props.userInfo?.id} />
            </div>
          ) : (
            <div className="account__main">
              <CusOrder userId={this.props.userInfo?.id} />
            </div>
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    userInfo: state.user.userInfo,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    processLogout: () => dispatch(actions.processLogout()),
    changeLanguage: (language) => dispatch(changeLanguage(language)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Account)
);
