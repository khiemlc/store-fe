import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
// import { LANGUAGES, CRUD_ACTIONS } from "../../../utils";
// import * as actions from "../../../store/actions";
// import "./UserRedux.scss";
// import Lightbox from "react-image-lightbox";
// import "react-image-lightbox/style.css";
// import TableManageUser from "./TableManageUser";
import { LANGUAGES } from "../../utils";
import * as actions from "../../store/actions";
class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  async componentDidMount() {}

  render() {
    return (
      <div className="user-redux__container">
        <div className="title mb-3">hello</div>
        <div className="user-redux__body">
          <div>add user</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
