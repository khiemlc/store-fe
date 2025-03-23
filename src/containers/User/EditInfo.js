import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { FormattedMessage } from "react-intl";
import { changeLanguage } from "../../store/actions";
import * as actions from "../../store/actions";
import "./Account.scss";
import { withRouter } from "react-router";

class EditInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
      email: "",
      fullName: "",
      phoneNumber: "",
      address: "",
      gender: "1",
    };
  }
  componentDidMount() {
    this.props.GetUserByIdStart(this.props.userId);
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.user !== this.props.user) {
      this.setState({
        user: this.props.user[0],
        email: this.props.user[0].email,
        fullName: this.props.user[0].fullName,
        phoneNumber: this.props.user[0].phoneNumber,
        address: this.props.user[0].address,
        gender: this.props.user[0].gender,
      });
    }
  }
  onChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({ ...copyState });
  };
  checkValidateInput = () => {
    let isValid = true;
    let arrCheck = ["fullName", "phoneNumber", "address"];
    for (let i = 0; i < arrCheck.length; i++) {
      if (!this.state[arrCheck[i]]) {
        isValid = false;
        alert("this input is required: " + arrCheck[i]);
        break;
      }
    }
    return isValid;
  };
  handleSaveUser = () => {
    let isValid = this.checkValidateInput();
    if (isValid === false) return;

    this.props.editUser({
      id: this.state.user.id,
      fullName: this.state.fullName,
      address: this.state.address,
      phoneNumber: this.state.phoneNumber,
      gender: this.state.gender,
    });
  };
  changeLanguage = (language) => {
    this.props.changeLanguage(language);
  };
  render() {
    console.log("check state cusorder", this.state);
    console.log("check props cusorder", typeof this.props);
    let { email, gender, fullName, phoneNumber, address } = this.state;
    return (
      <div className="info__container">
        <div className="info__title">
          <FormattedMessage id="header__navbar.account_info" />
        </div>
        <div className="info__body">
          <div className="body__input">
            <div className="name">Email</div>
            <input
              className="form-control"
              type="text"
              value={email}
              onChange={(event) => {
                this.onChangeInput(event, "email");
              }}
              disabled
            />
          </div>
          <div className="body__input">
            <div className="name">
              <FormattedMessage id="login.fullname" />
            </div>
            <input
              className="form-control"
              type="text"
              value={fullName}
              onChange={(event) => {
                this.onChangeInput(event, "fullName");
              }}
            />
          </div>
          <div className="body__input">
            <div className="name">
              <FormattedMessage id="login.phone" />
            </div>
            <input
              className="form-control"
              type="number"
              value={phoneNumber}
              onChange={(event) => {
                this.onChangeInput(event, "phoneNumber");
              }}
            />
          </div>
          <div className="body__input">
            <div className="name">
              <FormattedMessage id="login.gender" />
            </div>
            <select
              className="form-control"
              onChange={(event) => {
                this.onChangeInput(event, "gender");
              }}
              value={gender}
            >
              <option value="1">Nam</option>
              <option value="0">Nữ</option>
            </select>
          </div>

          <div className="body__input">
            <div className="name">
              <FormattedMessage id="login.address" />
            </div>
            <input
              className="form-control"
              type="text"
              value={address}
              onChange={(event) => {
                this.onChangeInput(event, "address");
              }}
            />
          </div>
          <div className="body__input">
            <button className="btn" onClick={() => this.handleSaveUser()}>
              <FormattedMessage id="common.confirm" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    userInfo: state.user.userInfo,
    user: state.customer.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    GetUserByIdStart: (id) => dispatch(actions.GetUserByIdStart(id)),
    editUser: (data) => dispatch(actions.editUser(data)),
    changeLanguage: (language) => dispatch(changeLanguage(language)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EditInfo)
);
