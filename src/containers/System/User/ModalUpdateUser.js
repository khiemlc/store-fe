import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import _ from "lodash";
import "./Manage.scss";

class ModalEditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      email: "",
      fullName: "",
      address: "",
      phoneNumber: "",
      gender: "",
      roleId: "",
      user: [],
    };
  }

  componentDidMount() {
    let user = this.props.currentUser;
    if (user && !_.isEmpty(user)) {
      this.setState({
        id: user.id,
        email: user.email,
        fullName: user?.fullName,
        address: user.address,
        phoneNumber: user.phoneNumber,
        gender: user.gender,
        roleId: user.roleId,
      });
    }
  }

  toggle = () => {
    this.props.toggleUpdateUserModal();
  };
  handleOnChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  checkValueInput = () => {
    let arrInput = ["id", "email", "fullName", "address", "phoneNumber"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        alert("Missing parameter: " + arrInput[i]);
        return false;
      }
    }
    return true;
  };
  handleUpdateUser = () => {
    let isValid = this.checkValueInput();
    if (isValid) {
      this.props.doUpdateUser(this.state);
    }
  };

  render() {
    console.log("check state in modal", this.state);
    console.log("check pros in modal", this.props);
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => {
          this.toggle();
        }}
        className="modal-user-container modal-xl"
      >
        <ModalHeader
          toggle={() => {
            this.toggle();
          }}
        >
          Edit user
        </ModalHeader>
        <ModalBody>
          <div className="container">
            <div className="row">
              <div className="form-group col-md-12 mt-1">
                <label className="mx-1">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "email");
                  }}
                  value={this.state.email}
                  disabled
                />
              </div>
              <div className="form-group col-md-12 mt-2">
                <label className="mx-1">Họ và tên</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Full Name"
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "fullName");
                  }}
                  value={this.state.fullName}
                />
              </div>

              <div className="form-group col-md-12 mt-2">
                <label className="mx-1">Địa chỉ</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Address"
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "address");
                  }}
                  value={this.state.address}
                />
              </div>

              <div className="form-group col-md-12 mt-2">
                <label className="mx-1">Phone Number</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Phone Number"
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "phoneNumber");
                  }}
                  value={this.state.phoneNumber}
                />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-4">
                <label>Giới tính</label>
                <select
                  class="form-control"
                  value={this.state.gender}
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "gender");
                  }}
                >
                  <option value={"0"}>Nữ</option>
                  <option value={"1"}>Nam</option>
                </select>
              </div>
              <div className="form-group col-4">
                <label>Vai trò</label>
                <select
                  class="form-control"
                  value={this.state.roleId}
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "roleId");
                  }}
                >
                  <option value={"0"}>Quản trị viên</option>
                  <option value={"1"}>Khách hàng</option>
                </select>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            className="px-2"
            color="primary"
            onClick={() => {
              this.handleUpdateUser();
            }}
          >
            Lưu thay đổi
          </Button>{" "}
          <Button
            className="px-2"
            color="secondary"
            onClick={() => {
              this.toggle();
            }}
          >
            Hủy
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
