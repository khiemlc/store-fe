import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";

//import Slider
import Slider from "react-slick";

class HomeGeneral extends Component {
  render() {
    return (
      <div className="home-general">
        <div class="row">
          <div class="col-sm-3">
            <ul>
              <li className="pointer__event hover__event--blue">
                Thông tin cửa hàng
              </li>
              <li className="pointer__event hover__event--blue">Tuyển dụng</li>
              <li className="pointer__event hover__event--blue">
                Liên hệ và góp ý
              </li>
              <li className="pointer__event hover__event--blue">
                Phương thức thanh toán
              </li>
            </ul>
          </div>
          <div class="col-sm-3">
            <ul>
              <li className="pointer__event hover__event--blue">
                Hướng dẫn mua hàng Online
              </li>
              <li className="pointer__event hover__event--blue">
                Mua hàng trả góp
              </li>
              <li className="pointer__event hover__event--blue">
                Giao hàng và lắp đặt
              </li>
              <li className="pointer__event hover__event--blue">
                Quy chế hoạt động
              </li>
            </ul>
          </div>
          <div class="col-sm-3">
            <ul>
              <li className="pointer__event hover__event--blue">
                Hỗ trợ khách hàng
              </li>
              <li className="pointer__event hover__event--blue">
                Hotline: 0123456789
              </li>
              <li className="pointer__event hover__event--blue">
                Khiếu nại
              </li>
              <li className="pointer__event hover__event--blue">Chính sách</li>
              <li className="pointer__event hover__event--blue"></li>
            </ul>
          </div>
          <div class="col-sm-3">
            <div className="connect text-center">Kết nối với chúng tôi</div>
            <div className="connect__symbol pointer__event">
              <i
                className="fab fa-facebook fa-3x"
                style={{ color: "#4267B2" }}
              ></i>
              <i
                className="fab fa-youtube fa-3x"
                style={{ color: "#FF0000" }}
              ></i>
              <i
                className="fab fa-twitter fa-3x"
                style={{ color: "#1DA1F2" }}
              ></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeGeneral);
