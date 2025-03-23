import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import "./Manage.scss";
import {
  deleteUserService,
  editUserService,
} from "../../../services/userService";
import ModalUpdateUser from "./ModalUpdateUser";

import "react-image-lightbox/style.css";
class ManageAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = { admins: [], isModalUpdateUser: false, updateUser: {} };
  }
  async componentDidMount() {
    setTimeout(() => {
      this.props.adminGetAllStart();
    }, 500);
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.admins !== this.props.admins) {
      this.setState({
        admins: this.props.admins,
      });
    }
  }
  handleDeleteUser = async (item) => {
    try {
      let res = await deleteUserService(item.id);
      if (res) {
        setTimeout(() => {
          this.props.adminGetAllStart();
        }, 500);
      } else {
        alert(res.errMessage);
      }
    } catch (e) {
      console.log(e);
    }
  };

  //update
  handleUpdateUser = (item) => {
    this.setState({
      isModalUpdateUser: true,
      updateUser: item,
    });
  };
  doUpdateUser = async (item) => {
    try {
      let res = await editUserService(item);
      if (res && res.errCode === 0) {
        this.setState({
          isModalUpdateUser: false,
        });
        setTimeout(() => {
          this.props.adminGetAllStart();
        }, 500);
      } else if (res && res.errCode !== 0) {
        alert(res.errMessage);
      }
    } catch (e) {
      console.log(e);
    }
  };

  toggleUpdateUserModal = () => {
    this.setState({
      isModalUpdateUser: !this.state.isModalUpdateUser,
    });
  };
  render() {
    let { admins } = this.state;

    return (
      <div className="user__container">
        {this.state.isModalUpdateUser && (
          <ModalUpdateUser
            isOpen={this.state.isModalUpdateUser}
            toggleUpdateUserModal={this.toggleUpdateUserModal}
            currentUser={this.state.updateUser}
            doUpdateUser={this.doUpdateUser}
          />
        )}
        <div className="title mb-3">Quản lý quản trị viên</div>
        <div className="user__body">
          <table id="TableManageUser">
            <tr>
              <th>Email</th>
              <th>Họ và tên</th>
              <th>Địa chỉ</th>
              <th>Số điện thoại</th>
              <th>Action</th>
            </tr>
            {admins &&
              admins.length > 0 &&
              admins.map((item, index) => {
                return (
                  <tr>
                    <td>{item.email}</td>
                    <td>{item.fullName}</td>
                    <td>{item.address}</td>
                    <td>{item.phoneNumber}</td>

                    <td className="text-center">
                      <button
                        className="btn--edit"
                        onClick={() => this.handleUpdateUser(item)}
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button
                        className="btn--delete"
                        onClick={() => this.handleDeleteUser(item)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    admins: state.admin.admins,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    adminGetAllStart: () => dispatch(actions.adminGetAllStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageAdmin);
