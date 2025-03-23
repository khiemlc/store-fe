import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import "./Order.scss";
import ModalOrder from "./ModalOrder";
import {
  orderUpdate,
  updateProductCount,
} from "../../../services/orderService";
import { updateCustomerExtra } from "../../../services/adminService";
class OrderDelivering extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: [],
      isModalOrder: false,
      editOrder: {},
    };
  }
  componentDidMount() {
    this.props.getOrderByStatusStart("Đơn đang giao");
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.order !== this.props.order) {
      this.setState({
        order: this.props.order,
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
  formatDate = (date) => {
    return date.slice(8, 10) + "/" + date.slice(5, 7) + "/" + date.slice(0, 4);
  };
  handleDeleteOrder = (id) => {
    this.props.orderUpdateStatusStart({
      id: id,
      status: "Đã hủy",
    });
    setTimeout(() => {
      this.props.getOrderByStatusStart("Đơn đang giao");
    }, 500);
  };

  //edit
  toggleModalOrder = () => {
    this.setState({
      isModalOrder: !this.state.isModalOrder,
    });
  };
  handleEditOrder = (item) => {
    this.setState({
      isModalOrder: true,
      editOrder: item,
    });
  };

  doEditOrder = async (item) => {
    try {
      let res = await orderUpdate(item);
      if (res && res.errCode === 0) {
        this.setState({
          isModalOrder: false,
        });
        setTimeout(() => {
          this.props.getOrderByStatusStart("Đơn đang giao");
        }, 500);
      } else if (res && res.errCode !== 0) {
        alert(res.errMessage);
      }
    } catch (e) {
      console.log(e);
    }
  };
  handleDone = async (item) => {
    this.props.orderUpdateStatusStart({
      id: item.id,
      status: "Đã hoàn thành",
    });
    // setTimeout(() => {
    //   this.props.updateCustomerExtraStart({
    //     id: item.userId,
    //     totalMoney: item.totalPrice,
    //   });
    // }, 300);
    setTimeout(() => {
      this.props.getOrderByStatusStart("Đơn đang giao");
    }, 500);

    // update countSold and countInStock
    await updateProductCount({ orderId: item.id });
    
    await updateCustomerExtra({ id: item.userId, totalMoney: item.totalPrice });
  };
  render() {
    console.log("check state in checking", this.state);
    console.log("check props in checking", this.props);
    let { order } = this.state;
    return (
      <div className="checking__container">
        {this.state.isModalOrder && (
          <ModalOrder
            isOpen={this.state.isModalOrder}
            toggleModalOrder={this.toggleModalOrder}
            currentOrder={this.state.editOrder}
            doEditOrder={this.doEditOrder}
          />
        )}
        <div className="title py-2">Đơn hàng đang giao</div>
        <div className="checking__body">
          <table id="OrderManage">
            <tr>
              <th style={{ width: "70px" }}>Mã đơn</th>
              <th>Người nhận đơn</th>
              <th>Số điện thoại</th>
              <th>Số lượng</th>
              <th>Tổng tiền</th>
              <th style={{ width: "200px" }}>Phương thức thanh toán</th>
              <th>Ngày đặt đơn</th>
              <th>Action</th>
            </tr>
            {order &&
              order.length > 0 &&
              order.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>#{item.id}</td>
                    <td>{item.cusName}</td>
                    <td>{item.cusPhoneNumber}</td>
                    <td>{item.totalQuantity}</td>
                    <td>{this.formatCash(item.totalPrice)}₫</td>
                    <td>{item.paymentMethod}</td>
                    <td>{this.formatDate(item.createdAt)}</td>
                    <td className="text-center">
                      <button
                        className="btn--edit"
                        onClick={() => this.handleEditOrder(item)}
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button
                        className="btn--delete"
                        onClick={() => this.handleDeleteOrder(item.id)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                      <button
                        className="btn--confirm"
                        onClick={() => this.handleDone(item)}
                      >
                        <i className="fas fa-check"></i>
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
    order: state.order.orderStatus,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteOrderStart: (id) => dispatch(actions.deleteOrderStart(id)),
    orderUpdateStatusStart: (data) =>
      dispatch(actions.orderUpdateStatusStart(data)),

    getOrderByStatusStart: (status) =>
      dispatch(actions.getOrderByStatusStart(status)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderDelivering);
