import React, { Component } from "react";
import { connect } from "react-redux";
import "./Order.scss";
import { push } from "connected-react-router";
import { withRouter } from "react-router";
import * as actions from "../../store/actions";
import { getUserById } from "../../services/userService";
import { cartUpdateAfterOrder } from "../../services/orderService";
class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalQuantity: 0,
      fullName: "",
      shipAddress: "",
      phoneNumber: "",
      note: "",
      isBill: false,
      isPayDirect: "0",
      cart: [],
      totalPrice: 0,
      isAgree: false,
    };
  }
  async componentDidMount() {
    setTimeout(async () => {
      this.props.getAllCartItemStart(this.props?.dataUser?.id);
      let res = await getUserById(this.props?.dataUser?.id);
      let user = res.user[0];
      console.log("check res in order", user);

      if (res && res.errCode === 0) {
        this.setState({
          fullName: user?.fullName,
          shipAddress: user.address,
          phoneNumber: user.phoneNumber,
        });
      }
    }, 500);
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.cart !== this.props.cart) {
      this.setState({
        cart: this.props.cart,
        // fullName: this.props.dataUser.fullName,
        // shipAddress:this.props.dataUser.
      });
    }
    if (prevState.cart !== this.state.cart) {
      let { cart } = this.state;
      let totalQuantity = 0;
      let totalPrice = 0;
      if (cart.length > 0) {
        cart.map((item, index) => {
          totalQuantity += +item.quantity;
          totalPrice += +item.totalPrice;

          if (index === cart.length - 1) {
            this.setState({
              totalQuantity: totalQuantity,
              totalPrice: totalPrice,
            });
          }
        });
      }
    }
  }
  hanedleOnChangeText = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };
  handleIsBill = () => {
    this.setState({ isBill: !this.state.isBill });
  };

  handleIsAgree = () => {
    this.setState({ isAgree: !this.state.isAgree });
  };
  formatCash = (number) => {
    return number
      .split("")
      .reverse()
      .reduce((prev, next, index) => {
        return (index % 3 ? next : next + ",") + prev;
      });
  };
  checkValidateInput = () => {
    let isValid = true;
    let arrCheck = ["fullName", "shipAddress", "phoneNumber"];
    for (let i = 0; i < arrCheck.length; i++) {
      if (!this.state[arrCheck[i]]) {
        isValid = false;
        alert("this input is required: " + arrCheck[i]);
        break;
      }
    }
    return isValid;
  };
  autoSetOrderId = async () => {
    let { cart } = this.state;
    for (let i = 0; i < cart.length; i++) {
      await cartUpdateAfterOrder({
        id: cart[i].id,
        orderId: this.props.order.id,
      });
    }
  };
  handleCreateOrder = () => {
    let isValid = this.checkValidateInput();
    if (isValid === false) {
      return;
    } else {
      if (this.state.cart.length < 1) {
        alert("Không có sản phẩm để mua sắm");
      } else if (this.state.isAgree === false) {
        alert("Vui lòng xác nhận đặt hàng");
      } else {
        this.props.orderCreate({
          userId: this.props.dataUser.id,
          totalQuantity: this.state.totalQuantity,
          totalPrice: this.state.totalPrice,
          shipAddress: this.state.shipAddress,
          cusName: this.state.fullName,
          cusPhoneNumber: this.state.phoneNumber,
          isBill: 0,
          paymentMethod:
            this.state.isPayDirect == 0 ? "Tiền mặt" : "Chuyển khoản",
        });
        setTimeout(() => {
          this.autoSetOrderId();
        }, 500);
        setTimeout(() => {
          this.props.history.push(`/thanks-order/${this.props.order.id}`);
        }, 500);
      }
    }
  };
  ///test
  returnToHome = () => {
    if (this.props.history) {
      this.props.history.push(`/home`);
    }
  };
  render() {
    console.log("check state in order", this.state);
    console.log("check props in order", this.props);

    let { isPayDirect, cart } = this.state;
    return (
      <div className="order__container">
        <div className="title">TIẾN HÀNH THANH TOÁN</div>
        <div className="order__infor">
          <div className="cus__infor">
            <div className="cus__title">Thông tin thanh toán</div>
            <div className="col-10 form-group ">
              <label className="pb-2">Họ và tên*</label>
              <input
                className="form-control"
                type="text"
                required
                value={this.state.fullName}
                onChange={(event) =>
                  this.hanedleOnChangeText(event, "fullName")
                }
              />
            </div>
            <div className="col-10 form-group ">
              <label className="pb-2">Địa chỉ*</label>
              <input
                className="form-control"
                type="text"
                required
                value={this.state.shipAddress}
                onChange={(event) =>
                  this.hanedleOnChangeText(event, "shipAddress")
                }
              />
            </div>
            <div className="col-10 form-group ">
              <label className="pb-2">Số điện thoại*</label>
              <input
                className="form-control"
                type="number"
                required
                value={this.state.phoneNumber}
                onChange={(event) =>
                  this.hanedleOnChangeText(event, "phoneNumber")
                }
              />
            </div>
            {/* <div
              class="col-10 form-check"
              style={{ backgroundColor: "#ececec" }}
            >
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="defaultCheck1"
                onClick={this.handleIsBill}
              />
              <label class="form-check-label" for="defaultCheck1">
                Xuất hóa đơn
              </label>
            </div> */}
            <div className="cus__title">Thông tin bổ sung</div>
            <div className="col-10  form-group">
              <label>Ghi chú đơn hàng</label>
              <textarea
                className=" form-control"
                placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn."
                value={this.state.note}
                onChange={(event) => this.hanedleOnChangeText(event, "note")}
              ></textarea>
            </div>
          </div>

          <div className="order__detail">
            <div className="cus__title">Đơn hàng của bạn</div>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Sản phẩm</th>
                  <th scope="col" style={{ width: "100px" }}>
                    Tạm tính
                  </th>
                </tr>
              </thead>
              <tbody>
                {cart &&
                  cart.length > 0 &&
                  cart.map((item, index) => {
                    return (
                      <>
                        <tr key={index}>
                          <td>
                            <div className="product-name">
                              {item.productType} {item.productName} x{" "}
                              {item.quantity}
                            </div>
                          </td>
                          <td className="product-price">
                            {this.formatCash(item.totalPrice)}₫
                          </td>
                        </tr>
                      </>
                    );
                  })}
              </tbody>
            </table>
            <div className="cart__total">
              <div className="total">
                <span>Tạm tính</span>
                <span className="money">
                  {this.formatCash(this.state.totalPrice.toString())}₫
                </span>
              </div>
              <div className="total">
                <span> Tổng</span>
                <span className="money">
                  {this.formatCash(this.state.totalPrice.toString())}₫
                </span>
              </div>
            </div>

            <div className="col-10 form-group ">
              <label className="payment__method">
                Chọn phương thức thanh toán
              </label>
              <select
                class="form-control"
                type="number"
                value={this.state.isPayDirect}
                onChange={(event) => {
                  this.hanedleOnChangeText(event, "isPayDirect");
                }}
              >
                <option value={0}>Thanh toán khi nhận hàng</option>
                {/* <option value={1}>Chuyển khoản ngân hàng</option> */}
              </select>
              {isPayDirect == 0 ? (
                <div className="more">Trả tiền mặt khi nhận hàng</div>
              ) : (
                <div className="more">
                  Quý khách vui lòng chuyển khoản vào tài khoản ngân hàng của
                  chúng tôi sau khi nhân viên xác nhận tình trạng sản phẩm còn
                  hàng. Vui lòng sử dụng ghi rõ Mã đơn hàng của bạn trong phần
                  nội dung thanh toán.
                </div>
              )}
            </div>
            <div class="col-10 form-check">
              <input
                class="form-check-input"
                type="checkbox"
                required
                onClick={this.handleIsAgree}
                id="agreeCheckbox"
              />
              <label class="form-check-label" htmlFor="agreeCheckbox">
                Xác nhận đặt hàng, bạn đã đọc qua và đồng ý với tất cả điều
                khoản của chúng tôi. *
              </label>
            </div>

            <button className="btn" onClick={this.handleCreateOrder}>
              Đặt hàng
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.order.cart,
    isLoggedIn: state.user.isLoggedIn,
    dataUser: state?.user?.userInfo,
    order: state?.order?.order,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    getAllCartItemStart: (userId) =>
      dispatch(actions.getAllCartItemStart(userId)),
    orderCreate: (data) => dispatch(actions.orderCreate(data)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Order));
