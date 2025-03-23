import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import _ from "lodash";

class ModalUpdateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      email: "",
      fullName: "",
      address: "",
      phoneNumber: "",
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
      });
    }
    console.log("did mount check: ", this.props.currentUser);
  }

  toggle = () => {
    this.props.toggleEditUserModal();
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
  handleEditUser = () => {
    let isValid = this.checkValueInput();
    if (isValid) {
      this.props.editUserReact(this.state);
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

              <div className="form-group col-md-12 mt-2">
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
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            className="px-2"
            color="primary"
            onClick={() => {
              this.handleEditUser();
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUpdateUser);
