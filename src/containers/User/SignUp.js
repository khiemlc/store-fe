import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import "../Auth/Login.scss";
import { FormattedMessage } from "react-intl";
import login from "../../assets/images/login.jpeg";
import { handleLoginApi } from "../../services/userService";
import { customerSignup } from "../../services/customerService";
import { withRouter } from "react-router";
import { toast } from "react-toastify";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isShowPassword: false,
      errMessage: "",
      fullName: "",
    };
  }

  // sự kiện on change
  handleOnChangeUsername = (event) => {
    this.setState({
      email: event.target.value,
    });
  };
  handleOnChangePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };
  handleOnChangeFullname = (event) => {
    this.setState({
      fullName: event.target.value,
    });
  };

  // show password
  handleShowPassword = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  };
  // add
  handleSignUp = async (data) => {
    this.setState({
      errMessage: "",
    });

    try {
      let res = await customerSignup(this.state);
      console.log("check func sign", this.state);

      console.log("sign up ceck res:", res);
      if (res && res.errCode !== 0) {
        alert(res.errMessage);
      } else if (res && res.errCode === 0) {
        toast.success("Sign up success! Please login!");

        this.props.history.push(`/login`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <div className="login__background">
        <div className="login__img">
          <img src={login} />
        </div>
        <div className="content__input">
          <div className="login__form">
            <h1 className="col-12 text-center">SIGN UP</h1>
            <div className="login__input">
              <label>Full name</label>
              <input
                type="text"
                className=""
                placeholder="Enter your full name"
                value={this.state.fullName}
                onChange={(event) => this.handleOnChangeFullname(event)}
              ></input>
            </div>
            <div className="login__input">
              <label>Username</label>
              <input
                type="email"
                className=""
                placeholder="Enter your email"
                value={this.state.email}
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
              <button className="btn-login" onClick={() => this.handleSignUp()}>
                Đăng ký
              </button>
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
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    //   adminLoginSucces: (adminInfor) => dispatch(actions.adminLoginSuccess(adminInfor)),
    // userLoginFail: () => dispatch(actions.userLoginFail()),
    // userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
