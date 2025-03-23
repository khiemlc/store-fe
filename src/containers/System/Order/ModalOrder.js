import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import _ from "lodash";
import "./Order.scss";
import * as actions from "../../../store/actions";
import CartItem from "../../User/CartItem";

class ModalOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      order: [],
      totalQuantity: "",
      isBill: "",
      totalPrice: "",
      shipAddress: "",
      cusName: "",
      cusPhoneNumber: "",
      paymentMethod: "",
      note: "",
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.props.getCartByOrderIdStart(this.props.currentOrder.id);
    }, 500);
    this.setState({
      order: this.props.currentOrder,
      cusName: this.props.currentOrder.cusName,
      cusPhoneNumber: this.props.currentOrder.cusPhoneNumber,
      paymentMethod: this.props.currentOrder.paymentMethod,
      isBill: this.props.currentOrder.isBill,
      shipAddress: this.props.currentOrder.shipAddress,
      note: this.props.currentOrder.note,
    });
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.cartOrder !== this.props.cartOrder) {
      this.setState({
        cart: this.props.cartOrder,
      });
    }
  }
  toggle = () => {
    this.props.toggleModalOrder();
  };
  hanedleOnChangeText = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };
  formatCash = (number) => {
    return number
      .split("")
      .reverse()
      .reduce((prev, next, index) => {
        return (index % 3 ? next : next + ",") + prev;
      });
  };
  checkValueInput = () => {
    let arrInput = ["cusName", "cusPhoneNumber", "cusPhoneNumber"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        alert("Missing parameter: " + arrInput[i]);
        return false;
      }
    }
    return true;
  };
  handleEditOrder = () => {
    let isValid = this.checkValueInput();
    if (isValid) {
      this.props.doEditOrder({
        id: this.state.order.id,
        cusName: this.state.cusName,
        cusPhoneNumber: this.state.cusPhoneNumber,
        paymentMethod: this.state.paymentMethod,
        isBill: this.state.isBill,
        shipAddress: this.state.shipAddress,
        note: this.state.note,
      });
    }
  };
  render() {
    console.log("check state in modal", this.state);
    console.log("check pros in modal", this.props);
    let {
      order,
      cart,
      cusName,
      cusPhoneNumber,
      shipAddress,
      paymentMethod,
      isBill,
      note,
    } = this.state;
    let totalPrice = order.totalPrice ? order.totalPrice.toString() : 0;
    console.log("check state in modal", this.state);

    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => {
          this.toggle();
        }}
        className="modal-order-container modal-xl"
      >
        <ModalHeader
          toggle={() => {
            this.toggle();
          }}
        >
          Edit order
        </ModalHeader>
        <ModalBody>
          <div className="container">
            <div className="row">
              <div className="form-group col-2">
                <label>Mã đơn hàng</label>
                <input
                  className="form-control"
                  value={"# " + order.id}
                  disabled
                />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-5">
                <label>Tên khách hàng</label>
                <input
                  className="form-control"
                  value={cusName}
                  onChange={(event) => {
                    this.hanedleOnChangeText(event, "cusName");
                  }}
                />
              </div>
              <div className="form-group col-5">
                <label>Số điện thoại</label>
                <input
                  className="form-control"
                  value={cusPhoneNumber}
                  onChange={(event) => {
                    this.hanedleOnChangeText(event, "cusPhoneNumber");
                  }}
                />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-10">
                <label>Địa chỉ giao hàng</label>
                <input
                  className="form-control"
                  value={shipAddress}
                  onChange={(event) => {
                    this.hanedleOnChangeText(event, "shipAddress");
                  }}
                />
              </div>
            </div>
            <div className="cart__item">
              <label>Sản phẩm</label>
              <CartItem listCart={cart} />
            </div>
            <div className="row">
              <div className="form-group col-3">
                <label>Tổng số lượng</label>
                <input
                  className="form-control"
                  value={order.totalQuantity}
                  disabled
                />
              </div>
              <div className="form-group col-3">
                <label>Tổng tiền</label>
                <input
                  className="form-control"
                  value={this.formatCash(totalPrice ? totalPrice : "0") + "₫"}
                  disabled
                />
              </div>
              <div className="form-group col-3">
                <label>Phương thức thanh toán</label>
                <select
                  class="form-control"
                  type="number"
                  value={paymentMethod}
                  onChange={(event) => {
                    this.hanedleOnChangeText(event, "paymentMethod");
                  }}
                >
                  <option value={"Tiền mặt"}>Tiền mặt</option>
                  {/* <option value={"Chuyển khoản"}>Chuyển khoản ngân hàng</option> */}
                </select>
              </div>
            </div>
            {/* <div className="row">
              <div className="form-group col-4">
                <label>Hóa đơn</label>
                <select
                  class="form-control"
                  type="number"
                  value={isBill}
                  onChange={(event) => {
                    this.hanedleOnChangeText(event, "isBill");
                  }}
                >
                  <option value={0}>Không yêu cầu hóa đơn</option>
                  <option value={1}>Có yêu cầu hóa đơn</option>
                </select>
              </div>
            </div> */}
            <div className="row">
              <div className="col-10  form-group">
                <label>Ghi chú đơn hàng</label>
                <textarea
                  className=" form-control"
                  placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn."
                  value={note}
                  onChange={(event) => this.hanedleOnChangeText(event, "note")}
                ></textarea>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          {this.state.order.status === "Đã hoàn thành" ? (
            ""
          ) : (
            <Button
              className="px-2"
              color="primary"
              onClick={() => {
                this.handleEditOrder();
              }}
            >
              Save change
            </Button>
          )}

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
  return {
    cartOrder: state.order.cartOrder,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCartByOrderIdStart: (id) => dispatch(actions.getCartByOrderIdStart(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalOrder);
