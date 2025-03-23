import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import "./Manage.scss";
import { toast } from "react-toastify";

import {
  deleteUserService,
  editUserService,
} from "../../../services/userService";
import ModalUpdateUser from "./ModalUpdateUser";
// import "./ManageCustomer.scss";
import "react-image-lightbox/style.css";
class ManageCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      isModalUpdateUser: false,
      updateUser: {},
    };
  }
  async componentDidMount() {
    setTimeout(() => {
      this.props.customerGetAllStart();
    }, 500);
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.customers !== this.props.customers) {
      this.setState({
        customers: this.props.customers,
      });
    }
  }
  formatCash = (number) => {
    return number
      .split("")
      .reverse()
      .reduce((prev, next, index) => {
        return (index % 3 ? next : next + ",") + prev;
      });
  };
  handleDeleteUser = async (item) => {
    try {
      let res = await deleteUserService(item.id);
      if (res) {
        setTimeout(() => {
          this.props.customerGetAllStart();
          toast.success("Delete succeed!");
        }, 500);
      } else {
        alert(res.errMessage);
        toast.success("Delete fail!");
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
          this.props.customerGetAllStart();
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
    let { customers } = this.state;
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
        <div className="title mb-3">Quản lý khách hàng</div>
        <div className="user__body">
          <table id="TableManageUser">
            <tr>
              <th style={{ width: "200px" }}>Email</th>
              <th style={{ width: "250px" }}>Họ và tên</th>
              <th style={{ width: "250px" }}>Địa chỉ</th>
              <th style={{ width: "150px" }}>Số điện thoại</th>
              <th style={{ width: "200px" }}>Tổng số tiền mua hàng</th>
              <th>Số đơn đã mua</th>
              <th>Action</th>
            </tr>
            {customers &&
              customers.length > 0 &&
              customers.map((item, index) => {
                return (
                  <tr>
                    <td>{item.email}</td>
                    <td>{item.fullName}</td>
                    <td>{item.address}</td>
                    <td>{item.phoneNumber}</td>
                    <td>
                      {this.formatCash(
                        item.totalMoney ? item.totalMoney.toString() : "0"
                      )}
                      ₫
                    </td>
                    <td>{item.totalOrder ? item.totalOrder : 0}</td>

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
    customers: state.admin.customers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    customerGetAllStart: () => dispatch(actions.customerGetAllStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCustomer);
