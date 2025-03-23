import React, { Component } from "react";
import { connect } from "react-redux";
import "./Cart.scss";
import { push } from "connected-react-router";
import { withRouter } from "react-router";
import * as actions from "../../store/actions";
// import { deleteCart } from "../../services/orderService";
import { Buffer } from "buffer";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      tempo: "",
      total: "",
      quantity: "",
    };
  }
  componentDidMount() {
    console.log("hehe");
    setTimeout(() => {
      this.props.getAllCartItemStart(this.props?.dataUser?.id);
    }, 500);
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.cart !== this.props.cart) {
      this.setState({
        cart: this.props.cart,
      });
    }
  }
  handleBackHome = () => {
    this.props.history.push(`/home`);
  };
  handleOrder = () => {
    this.props.history.push(`/order`);
  };
  formatCash = (number) => {
    return number
      .split("")
      .reverse()
      .reduce((prev, next, index) => {
        return (index % 3 ? next : next + ",") + prev;
      });
  };
  handleDeleteCart = (item) => {
    this.props.deleteCartStart(item);
    setTimeout(() => {
      this.props.getAllCartItemStart(this.props?.dataUser?.id);
    }, 500);
  };
  handleOnChangeQuantity = (event, item) => {
    let quantity = event.target.value;

    if (quantity > 0) {
      this.setState({ quantity: quantity });
      let data = {};
      data.id = item.id;
      data.productId = item.productId;
      data.quantity = quantity;
      setTimeout(() => {
        this.props.updateCartStart(data);
      }, 500);
    } else {
      alert("Số lượng không hợp lệ");
    }

    setTimeout(() => {
      this.props.getAllCartItemStart(this.props?.dataUser?.id);
    }, 1000);
  };

  // handleKeyDown = (event, item) => {
  //   if (event.key === "Enter") {
  //     let { quantity } = this.state;
  //     if (quantity > 0) {
  //       let data = {};
  //       data.id = item.id;
  //       data.productId = item.productId;
  //       data.quantity = this.state.quantity;
  //       setTimeout(() => {
  //         this.props.updateCartStart(data);
  //       }, 500);
  //     } else {
  //       alert("Số lượng không hợp lệ");
  //     }

  //     setTimeout(() => {
  //       this.props.getAllCartItemStart(this.props?.dataUser?.id);
  //     }, 2000);
  //   }
  // };
  render() {
    console.log("check state", this.state);
    console.log("check props", this.props);

    let { isLoggedIn } = this.props;
    let { cart } = this.state;
    let { tempo } = this.state;

    return (
      <div className="cart__container">
        {isLoggedIn === false || cart.length === 0 ? (
          <div className="cart--empty">
            <i className="fas fa-cart-arrow-down fa-7x"></i>
            <span>Không có sản phẩm nào trong giỏ hàng</span>
            <button className="btn" onClick={this.handleBackHome}>
              Về trang chủ
            </button>
          </div>
        ) : (
          <>
            <div className="cart">
              <div className="title">Giỏ hàng của bạn</div>
              <div className="cart__main">
                <div className="cart__list">
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col" style={{ width: "20px" }}>
                          #
                        </th>
                        <th scope="col">Sản phẩm</th>
                        <th scope="col" style={{ width: "100px" }}>
                          Đơn giá
                        </th>
                        <th scope="col" style={{ width: "100px" }}>
                          Số lượng
                        </th>
                        <th scope="col" style={{ width: "100px" }}>
                          Tạm tính
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart &&
                        cart.length > 0 &&
                        cart.map((item, index) => {
                          console.log("check", typeof item);
                          tempo = +tempo + +item.totalPrice;
                          let imageBase64 = "";
                          if (item.productAvatar) {
                            imageBase64 = Buffer.from(
                              item.productAvatar,
                              "base64"
                            ).toString("binary");
                          }
                          return (
                            <tr key={index}>
                              <th scope="row">
                                <i
                                  className="fas fa-times-circle"
                                  onClick={() => this.handleDeleteCart(item)}
                                ></i>
                              </th>
                              <td>
                                <div className="product-info">
                                  <div
                                    className="product-img"
                                    style={{
                                      backgroundImage: `url(${imageBase64})`,
                                    }}
                                  ></div>
                                  <div className="product-name">
                                    {item.productType} {item.productName}
                                  </div>
                                </div>
                              </td>
                              <td>{this.formatCash(item.productTruePrice)}₫</td>
                              <td placeholder="hehe">
                                <input
                                  className="form-control"
                                  type="number"
                                  data-toggle="tooltip"
                                  data-placement="right"
                                  title="Nhấn Enter để ghi nhận"
                                  defaultValue={item.quantity}
                                  onChange={(event) =>
                                    this.handleOnChangeQuantity(event, item)
                                  }
                                  // onKeyDown={(event) =>
                                  //   this.handleKeyDown(event, item)
                                  // }
                                />
                              </td>
                              <td>{this.formatCash(item.totalPrice)}₫</td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>

                <div className="cart__total">
                  <span className="total__title">Tổng giá trị giỏ hàng</span>
                  <div className="tempo">
                    <span>Tạm tính</span>
                    <span className="money">
                      {this.formatCash(tempo.toString())}₫
                    </span>
                  </div>
                  <div className="total">
                    <span> Tổng</span>
                    <span className="money">
                      {this.formatCash(tempo.toString())}₫
                    </span>
                  </div>

                  <button className="btn" onClick={this.handleOrder}>
                    Thanh toán
                  </button>
                </div>
              </div>
            </div>
            {/* <div className="note">
              <span>
                Lưu ý: Quý khách hàng vui lòng chọn số lượng tối đa cho mỗi sản
                phẩm là 5.
              </span>
            </div> */}
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    dataUser: state?.user?.userInfo,
    cart: state.order.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    getAllCartItemStart: (userId) =>
      dispatch(actions.getAllCartItemStart(userId)),
    deleteCartStart: (item) => dispatch(actions.deleteCartStart(item)),
    updateCartStart: (data) => dispatch(actions.updateCartStart(data)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart));
