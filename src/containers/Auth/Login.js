import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import "./Login.scss";
import { FormattedMessage } from "react-intl";
import login from "../../assets/images/208581b3-b65e-42c0-8416-0a4fa1d000be.webp";
import { handleLoginApi } from "../../services/userService";
import { withRouter } from "react-router";

class Login extends Component {
  constructor(props) {
    super(props);
    // console.log("constructor");

    this.state = {
      username: "",
      password: "",
      isShowPassword: false,
      errMessage: "",
      navigate: "",
    };
  }

  componentDidMount() {
    const dataLocalStorage =
      JSON.parse(localStorage?.getItem("shop_admin")) ||
      JSON.parse(localStorage?.getItem("shop_customer"));
    const { navigate } = this.props;

    if (dataLocalStorage?.email) {
      // console.log("dataLocalStorage?.email:", dataLocalStorage?.email);
      if (+dataLocalStorage?.roleId === 0) {
        this.redirectToAdminPage();
      } else {
        this.redirectToCustomerPage();
      }
    } else {
      navigate(`/login`);
    }
  }

  // sự kiện on change
  handleOnChangeUsername = (event) => {
    this.setState({
      username: event.target.value,
    });
  };
  handleOnChangePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };
  // login
  redirectToAdminPage = () => {
    const { navigate } = this.props;
    const redirectPath = "/system/order-checking";
    navigate(`${redirectPath}`);
  };
  redirectToCustomerPage = () => {
    const { navigate } = this.props;
    const redirectPath = "/home";
    navigate(`${redirectPath}`);
  };
  handleLogin = async () => {
    this.setState({
      errMessage: "",
    });

    try {
      let data = await handleLoginApi(
        this.state.username,
        this.state.password,
        process.env.REACT_APP_ROLE_ADMIN
      );
      if (data && data.errCode !== 0) {
        this.setState({
          errMessage: data.message,
        });
      }
      if (data && data.errCode === 0) {
        this.props.userLoginSuccess(data.user);

        //navigate ....
        if (+data?.user?.roleId === 0) {
          this.redirectToAdminPage();
        } else {
          this.redirectToCustomerPage();
        }
      }
    } catch (e) {
      if (e.response) {
        if (e.response.data) {
          this.setState({
            errMessage: e.response.data.message,
          });
        }
      }
    }
  };
  // show password
  handleShowPassword = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  };
  handleKeyDown = (event) => {
    console.log("check keydown", event);

    if (event.key === "Enter" || event.keyCode === 13) {
      this.handleLogin();
    }
  };
  render() {
    console.log("UUI", this.props);

    return (
      <div className="login__background">
        <div className="login__img">
          <img src={login} />
        </div>
        <div className="content__input">
          <div className="login__form">
            <h1 className="col-12 text-center">LOGIN</h1>
            <div className="login__input">
              <label>Username</label>
              <input
                type="email"
                className=""
                placeholder="Enter your email"
                value={this.state.username}
                onChange={(event) => this.handleOnChangeUsername(event)}
              ></input>
            </div>
            <div className="login__input">
              <label>Password</label>
              <div className="form__control">
                <input
                  type={this.state.isShowPassword ? "text" : "password"}
                  className=""
                  placeholder="Enter your password"
                  value={this.state.password}
                  onChange={(event) => this.handleOnChangePassword(event)}
                  onKeyDown={(event) => this.handleKeyDown(event)}
                ></input>
                <span onClick={() => this.handleShowPassword()}>
                  <i
                    className={
                      this.state.isShowPassword
                        ? "far fa-eye"
                        : "far fa-eye-slash"
                    }
                  ></i>
                </span>
              </div>
            </div>
            <div
              className="col-12 pb-2"
              style={{ color: "red", fontSize: "1.2rem" }}
            >
              {this.state.errMessage}
            </div>
            <div className="col-12">
              <button className="btn-login" onClick={() => this.handleLogin()}>
                Login
              </button>
            </div>
            <div className="col-12 pt-2">
              <span className="forgot-password">Forgot your password?</span>
            </div>
            <div className="col-12 text-center mt-5">
              <span className="text-center">Or login with :</span>
            </div>
            <div className="col-12 social-login mt-1">
              <i className="fab fa-facebook fa-3x facebook"></i>
              <i className="fab fa-twitter fa-3x switter"></i>
              <i className="fab fa-google-plus-g fa-3x google"></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log("redux");
  return {
    language: state.app.language,
    isLoggedIn: state.user.isLoggedIn,
    dataUser: state?.user?.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    //   adminLoginSucces: (adminInfor) => dispatch(actions.adminLoginSuccess(adminInfor)),
    userLoginFail: () => dispatch(actions.userLoginFail()),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
