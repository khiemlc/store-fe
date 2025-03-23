import React, { Component } from "react";
import { connect } from "react-redux";
import "./OrderThanks.scss";
import { getOrderById, orderCancel } from "../../services/orderService";
import * as actions from "../../store/actions";
import { push } from "connected-react-router";

class OrderThanks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: [],
      currentOrderId: -1,
      totalPrice: "",
      cartOrder: [],
      isCancel: false,
      note: "",
      isSentCancel: false,
    };
  }
  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      this.setState({
        currentOrderId: id,
      });
      let res = await getOrderById(id);
      if (res && res.errCode === 0) {
        this.setState({
          order: res.order,
          totalPrice: res.order.totalPrice,
        });
      }
      setTimeout(() => {
        this.props.getCartByOrderIdStart(this.props.match.params.id);
      }, 500);
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.cartOrder !== this.props.cartOrder) {
      this.setState({
        cartOrder: this.props.cartOrder,
      });
    }
    if (prevState.order !== this.state.order) {
      let { order } = this.state;
      setTimeout(() => {
        if (JSON.stringify(order) !== "{}" && order.status !== "Chờ xác nhận") {
          this.props.history.push(`/home`);
        }
      }, 1000);
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
  handleIsCancel = () => {
    this.setState({ isCancel: true });
  };
  handleIsSentCancel = () => {
    this.setState({ isSentCancel: true });
  };
  hanedleOnChangeText = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };
  handleRequestCancel = async () => {
    if (this.state.note.length === 0) {
      alert("Vui lòng nhập lý do hủy đơn");
    } else {
      await orderCancel({
        id: this.state.currentOrderId,
        note: this.state.note,
      });
      this.handleIsSentCancel();
    }
  };
  handleBackHome = () => {
    this.props.history.push(`/home`);
  };
  render() {
    console.log("check state in thanks", this.state);
    let {
      id,
      cusName,
      cusPhoneNumber,
      shipAddress,
      totalQuantity,
      paymentMethod,
    } = this.state.order;
    let { cartOrder, isCancel, note, isSentCancel } = this.state;
    return (
      <div className="order-thanks__container">
        <div className="order-thanks__title">
          <i className="fas fa-cart-arrow-down fa-2x"></i>
          <div className="titlee">Đặt hàng thành công</div>
        </div>
        <div className="order-thanks__content">
          <div className="thanks--init">
            Cảm ơn quý khách <b>{cusName}</b> đã đặt hàng tại cửa hàng. Trong 20
            phút, nhân viên của chúng tôi sẽ <b>gọi điện xác nhận đặt hàng</b>{" "}
            cho quý khách. <br />
            <span>Xin chân thành cảm ơn !</span>
          </div>
          <div className="order-detail">
            <div>
              <span>ĐƠN HÀNG: # </span>
              {id}
            </div>
            <div>
              <span>Người nhận hàng: </span>
              {cusName}
            </div>
            <div>
              <span>Số điện thoại người nhận: </span>
              {cusPhoneNumber}
            </div>
            <div>
              <span>Địa điểm giao hàng: </span>
              {shipAddress}
            </div>
            <div>
              <span>Số lượng: </span>
              {totalQuantity}
            </div>
            <div>
              <span>Tổng tiền: </span>
              <span style={{ color: "red" }}>
                {this.formatCash(
                  this.state.totalPrice ? this.state.totalPrice : "loading"
                )}
                ₫
              </span>
            </div>
          </div>
          <div className="pt-4">
            <span>Phương thức thanh toán: </span>
            <b>{paymentMethod}</b>
          </div>
          <div className="order__item">
            <div className="item__title">NỘI DUNG ĐƠN HÀNG</div>
            <div className="item__info">
              {cartOrder &&
                cartOrder.length > 0 &&
                cartOrder.map((item) => {
                  return (
                    <>
                      <span className="item__name">
                        {item.productType} {item.productName}
                      </span>
                      <span className="item__quantity">
                        Số lượng x {item.quantity}
                      </span>
                      <div className="border"></div>
                    </>
                  );
                })}
            </div>
            <div>
              <span>Tổng tiền: </span>
              <span style={{ color: "red", float: "right" }}>
                {this.formatCash(
                  this.state.totalPrice ? this.state.totalPrice : "loading"
                )}
                ₫
              </span>
            </div>
          </div>
        </div>
        {isSentCancel === false ? (
          isCancel === false ? (
            <div className="order--cancel">
              <button className="btn" onClick={this.handleIsCancel}>
                Hủy đơn hàng
              </button>
            </div>
          ) : (
            <div className="cancel__reason">
              <div className="form-group mx-2">
                <label>Lý do hủy đơn hàng:</label>
                <textarea
                  className=" form-control mt-2"
                  placeholder="Quý khách vui lòng cho biết lý do hủy đơn. (không mua nữa, đổi sản phẩm, nhầm thông tin, ....)"
                  value={this.state.note}
                  onChange={(event) => this.hanedleOnChangeText(event, "note")}
                  required
                ></textarea>
              </div>
              <button className="btn" onClick={this.handleRequestCancel}>
                Xác nhận hủy đơn
              </button>
            </div>
          )
        ) : (
          <div className="req__sent">
            <span>Đã gửi yêu cầu hủy đơn hàng</span>
            <i class="fas fa-frown fa-2x"></i>
            <button className="btn" onClick={this.handleBackHome}>
              Về trang chủ
            </button>
          </div>
        )}
      </div>
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
    navigate: (path) => dispatch(push(path)),

    getCartByOrderIdStart: (id) => dispatch(actions.getCartByOrderIdStart(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderThanks);
