import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { push } from "connected-react-router";

import { connect } from "react-redux";
import "./userManage.scss";
import {
  getAllUsers,
  createNewUserService,
  deleteUserService,
  editUserService,
} from "../../services/userService";
import ModalUser from "./ModalUser";
import { emitter } from "../../utils/emmiter";
import ModalEditUser from "./ModalEditUser";
import ReactPaginate from "react-paginate";
class UserManage extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      arrUsers: [],
      isModalUser: false,
      isModalEditUser: false,
      editUser: {},
    };
  }
  redirectToCustomerPage = () => {
    const { navigate } = this.props;
    const redirectPath = "/home";
    navigate(`${redirectPath}`);
  };
  handleNavigateUser = () => {
    const { isLoggedIn, dataUser } = this.props;
    const { navigate } = this.props;
    if (isLoggedIn) {
      if (+dataUser?.roleId === 1) {
        this.redirectToCustomerPage();
      }
    } else {
      navigate(`/login`);
    }
  };

  async componentDidMount() {
    await this.getAllUsersFromReact();
    this.handleNavigateUser();
  }
  getAllUsersFromReact = async () => {
    let response = await getAllUsers("ALL");

    if (response && response.errCode === 0) {
      this.setState({
        arrUsers: response.users,
      });
    }
  };
  /* onlick create user*/
  handleCreateUser = () => {
    this.setState({
      isModalUser: true,
    });
  };

  createNewUser = async (data) => {
    try {
      let response = await createNewUserService(data);
      if (response && response.errCode !== 0) {
        alert(response.errMessage);
      } else if (response && response.errCode === 0) {
        await this.getAllUsersFromReact();
        this.setState({
          isModalUser: false,
        });
        emitter.emit("EVENT_CLEAR_DATA");
      }
    } catch (e) {
      console.log(e);
    }
  };
  /* create user end */

  /* delete user */
  handleDeleteUser = async (item) => {
    try {
      let res = await deleteUserService(item.id);
      if (res) {
        await this.getAllUsersFromReact();
      } else {
        alert(res.errMessage);
      }
    } catch (e) {
      console.log(e);
    }
  };

  /* edit user */
  handleEditUser = (item) => {
    this.setState({
      isModalEditUser: true,
      editUser: item,
    });
  };
  doEditUser = async (item) => {
    try {
      let res = await editUserService(item);
      if (res && res.errCode === 0) {
        this.setState({
          isModalEditUser: false,
        });
        await this.getAllUsersFromReact();
      } else if (res && res.errCode !== 0) {
        alert(res.errMessage);
      }
    } catch (e) {
      console.log(e);
    }
  };
  toggleUserModal = () => {
    this.setState({
      isModalUser: !this.state.isModalUser,
    });
  };

  toggleEditUserModal = () => {
    this.setState({
      isModalEditUser: !this.state.isModalEditUser,
    });
  };
  handlePageClick = () => {};
  render() {
    console.log("check state manage user", this.state);
    console.log("check props manage user", this.props);

    let arrUsers = this.state.arrUsers;
    return (
      <div className="users__container">
        <ModalUser
          isOpen={this.state.isModalUser}
          toggleUserModal={this.toggleUserModal}
          createNewUser={this.createNewUser}
        />

        {this.state.isModalEditUser && (
          <ModalEditUser
            isOpen={this.state.isModalEditUser}
            toggleEditUserModal={this.toggleEditUserModal}
            currentUser={this.state.editUser}
            editUserReact={this.doEditUser}
          />
        )}
        <div className="title text-center">Manage user</div>
        <div>
          <button
            type="button"
            class="btn btn-primary mx-1 px-2"
            onClick={() => this.handleCreateUser()}
          >
            <i className="fas fa-plus px-1"></i>Add new user
          </button>
        </div>
        <div className="user__table mt-3 mx-1">
          <table id="customers">
            <tr>
              <th>Email</th>
              <th>Full Name</th>
              <th>Address</th>
              <th>Phone Number</th>
              <th>Action</th>
            </tr>
            {arrUsers &&
              arrUsers.map((item, index) => {
                return (
                  <tr>
                    <td>{item.email}</td>
                    <td>{item.fullName}</td>
                    <td>{item.address}</td>
                    <td>{item.phoneNumber}</td>
                    <td className="text-center">
                      <button
                        className="btn--edit"
                        onClick={() => this.handleEditUser(item)}
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
  return { isLoggedIn: state.user.isLoggedIn, dataUser: state?.user?.userInfo };
};

const mapDispatchToProps = (dispatch) => {
  return { navigate: (path) => dispatch(push(path)) };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
