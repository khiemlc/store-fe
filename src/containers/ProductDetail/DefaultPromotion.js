import React, { Component } from "react";
import { connect } from "react-redux";

import "./ProductDetail.scss";
class DefaultPromotion extends Component {
  render() {
    return (
      <>
        <div className="default-promotion__container">
          <div className="detail__gift">
            <div className="gift-box">
              <div className="ribbon">
                <span className="rib">Ưu dãi chỉ có tại Group 2</span>
              </div>
              <ul className="main-gift">
                <li>
                  <span className="bold_red">Tặng</span> thêm ...{" "}
                  <span className="bold_red">YAGE YG-D003</span> áp dụng tất cả
                  đơn hàng trên 10 triệu.
                </li>
                <li>
                  <b>Giá khuyến mãi</b> áp dụng từ{" "}
                  <span className="bold_red">01/01/2025</span> đến hết{" "}
                  <span className="bold_red">31/10/2025.</span>
                </li>
                <li>
                  Giao <b>siêu tốc trong ngày</b> cho đơn hàng từ 1 triệu trong
                  phạm vi 10km.
                </li>
              </ul>
            </div>
          </div>
          <div className="detail__commit">
            <div className="commit__title">
              CAM KẾT CHẤT LƯỢNG
            </div>
            <ul>
              <li>
                <i className="fas fa-shield-alt fa-2x"></i>
                <div>
                  Hàng chính hãng mới <b>100%</b>
                </div>
              </li>
              <li>
                <i className="fas fa-hand-holding-usd fa-2x"></i>
                <div>
                  Lắp đặt và Thanh toán <b>khi nhận hàng</b> (COD)
                </div>
              </li>
              <li>
                <i className="fas fa-sync-alt fa-2x"></i>
                <div>
                  Đổi trả trong <b>30 ngày</b> (Nếu do lỗi kỹ thuật)
                </div>
              </li>
              <li>
                <i className="fas fa-shipping-fast fa-2x"></i>{" "}
                <div>
                  Dịch vụ giao hàng siêu tốc <b>trong ngày</b> GK-EXPRESS
                </div>
              </li>
            </ul>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DefaultPromotion);
