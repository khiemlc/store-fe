import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import "./CusOrder.scss";

import * as actions from "../../store/actions";
import CartItem from "./CartItem";
// import "../Auth/CusOrder.scss";
import { withRouter } from "react-router";

class CusOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: [],
      isShow: false,
    };
  }
  componentDidMount() {
    this.props.getOrderByUserIdStart(this.props.userId);
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.orderUserId !== this.props.orderUserId) {
      this.setState({
        order: this.props.orderUserId,
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

  handelDetailOrder = (id) => {
    this.props.history.push(`/thanks-order/${id}`);
  };

  showHideDetail = (status) => {
    this.setState({ isShow: status });
  };

  render() {
    console.log("check props cusorder", this.props);
    let { order, isShow } = this.state;
    console.log("check state cusorder", order);

    return (
      <div className="cus-order__container">
        <div className="order__title">Quản lý đơn hàng</div>
        {order && order.length ? (
          <div className="order__body">
            {order &&
              order.length > 0 &&
              order.map((item, index) => {
                console.log("hehehe", item);
                return (
                  <div className="order__item">
                    <div className="order-up">
                      <span>Mã đơn hàng: #{item.id}</span>
                      <span className="status">
                        <span style={{ color: "black" }}>Tình trạng:</span>{" "}
                        {item.status}
                      </span>
                    </div>
                    <div className="cart__item">
                      <CartItem listCart={item.Carts} />
                    </div>

                    <div className="total">
                      <span>Thành tiền: </span>
                      <span className="money">
                        {this.formatCash(item.totalPrice)}₫
                      </span>
                    </div>
                    {isShow === false ? (
                      <div className="view-detail">
                        <span onClick={() => this.showHideDetail(true)}>
                          Xem thêm ▼
                        </span>
                      </div>
                    ) : (
                      <div className="detail">
                        <div className="cusInfo">
                          <div className="name">
                            <b>Họ tên người nhận</b> : {item.cusName}
                          </div>
                          <div className="phone">
                            <b>Số điện thoại người nhận</b> :{" "}
                            {item.cusPhoneNumber}
                          </div>
                        </div>
                        <div className="address">
                          <b>Giao đến</b> : {item.shipAddress}
                        </div>
                        <div className="pay-method">
                          <b>Hình thức thanh toán: </b>
                          {item.paymentMethod}
                        </div>
                        {/* <div>
                          {item.isBill === false ? (
                            <span>Không</span>
                          ) : (
                            <span>Có</span>
                          )}{" "}
                          yêu cầu hóa đơn
                        </div> */}
                        {item.status === "Chờ xác nhận" ? (
                          <div className="btn-detail">
                            <span
                              onClick={() => this.handelDetailOrder(item.id)}
                            >
                              Xem chi tiết ▼
                            </span>
                          </div>
                        ) : (
                          <></>
                        )}
                        <div className="view-detail">
                          <span onClick={() => this.showHideDetail(false)}>
                            Ẩn bớt ▼
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        ) : (
          <div className="order-no__body">
            <i className="far fa-frown fa-4x"></i>
            <div>Bạn chưa có đơn hàng nào!</div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    // userInfo: state.user.userInfo,
    orderUserId: state?.order?.orderUserId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    getOrderByUserIdStart: (userId) =>
      dispatch(actions.getOrderByUserIdStart(userId)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CusOrder)
);
