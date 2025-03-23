import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../utils/emmiter";

class ModalUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      fullName: "",
      address: "",
      phoneNumber: "",
      gender: "1",
      roleId: "1",
    };
    this.listenToEmitter();
  }

  listenToEmitter() {
    emitter.on("EVENT_CLEAR_DATA", () => {
      this.setState({
        email: "",
        password: "",
        fullName: "",
        address: "",
        phoneNumber: "",
        gender: "1",
        roleId: "1",
      });
    });
  }
  componentDidMount() {}

  toggle = () => {
    this.props.toggleUserModal();
  };
  handleOnChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  checkValueInput = () => {
    let arrInput = [
      "email",
      "password",
      "fullName",
      "address",
      "phoneNumber",
      "gender",
      "roleId",
    ];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        alert("Missing parameter: " + arrInput[i]);
        return false;
      }
    }
    return true;
  };
  handleAddNewUser = () => {
    let isValid = this.checkValueInput();
    if (isValid) {
      this.props.createNewUser(this.state);
    }
  };

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => {
          this.toggle();
        }}
        className="modal-user-container"
      >
        <ModalHeader
          toggle={() => {
            this.toggle();
          }}
        >
          Create a new user
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
                />
              </div>

              <div className="form-group col-md-12 mt-2">
                <label className="mx-1">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "password");
                  }}
                  value={this.state.password}
                />
              </div>

              <div className="form-group col-md-12 mt-2">
                <label className="mx-1">Full Name</label>
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
                <label className="mx-1">Address</label>
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

              <div className="form-group col-md-6 mt-2">
                <label className="mx-1">Phone Number</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Address"
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "phoneNumber");
                  }}
                  value={this.state.phoneNumber}
                />
              </div>

              <div className="form-group col-md-3 mt-2">
                <label for="inputAddress">Gender</label>
                <select
                  name="gender"
                  className="form-control"
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "gender");
                  }}
                  value={this.state.gender}
                >
                  <option value="1">Male</option>
                  <option value="0">Female</option>
                </select>
              </div>

              <div className="form-group col-md-3 mt-2">
                <label for="inputZip">Role</label>
                <select
                  name="roleId"
                  className="form-control"
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "roleId");
                  }}
                  value={this.state.roleId}
                >
                  <option value="1">User</option>
                  <option value="0">Admin</option>
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
              this.handleAddNewUser();
            }}
          >
            Register
          </Button>{" "}
          <Button
            className="px-2"
            color="secondary"
            onClick={() => {
              this.toggle();
            }}
          >
            Cancel
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
