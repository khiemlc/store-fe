import React, { Component } from "react";
import { connect } from "react-redux";
import "./News.scss";
class News extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="news__container">
          <div className="title">TIN TỨC NỔI BẬT</div>
          <a
            target="_blank"
            href="https://tietkiemnangluong.com.vn/tin-tuc/meo-huu-ich/t29414/goi-y-cach-lua-chon-va-su-dung-am-dun-nuoc-sieu-toc-tiet-kiem-dien.html#:~:text=Khi%20ch%E1%BB%8Dn%20mua%20%E1%BA%A5m%20%C4%91un,inox%20ho%E1%BA%B7c%20th%C3%A9p%20kh%C3%B4ng%20g%E1%BB%89."
          >
            <div className="news__component">
              <div className="news__img amsieutoc"></div>
              <div className="news__infor">
                <div className="news__content">
                  Những đặc điểm cần lưu ý khi chọn ấm đun siêu tốc
                </div>
                <div className="news__description">
                  Bình đun vừa giúp tiết kiệm thời gian đun nước, vừa giảm bớt
                  điện năng tiêu thụ. Để chọn lựa bình đun tốt và phù hợp, người
                  dùng nên cân nhắc một số yếu tố quan trọng sau đây.
                </div>
              </div>
            </div>
          </a>
          <a
            target="_blank"
            href="https://dienmaythiennamhoa.vn/thay-gas-tu-lanh-het-bao-nhieu-tien-n628.html "
          >
            <div className="news__component">
              <div className="news__img tulanh"></div>
              <div className="news__infor">
                <div className="news__content">
                  Thay gas tủ lạnh hết bao nhiêu tiền?
                </div>
                <div className="news__description">
                  Sau một thời gian sử dụng, bạn sẽ cảm thấy tủ lạnh nhà bạn có
                  dấu hiệu kém lạnh, không lạnh thì có lẽ đã đến lúc thay gas
                  cho tủ. Vậy, khi nào cần thay gas tủ lạnh, thay như thế nào và
                  chi phí phải bỏ ra bao nhiêu thì bạn hãy cùng Điện Máy Thiên
                  Hòa tìm hiểu...
                </div>
              </div>
            </div>
          </a>
          <a
            target="_blank"
            href="https://www.dienmayxanh.com/kinh-nghiem-hay/remote-bi-hong-lam-sao-de-mo-tivi-933044"
          >
            <div className="news__component">
              <div className="news__img tivi"></div>
              <div className="news__infor">
                <div className="news__content">
                  LÀM SAO ĐỂ MỞ TIVI KHI ĐIỀU KHIỂN BỊ HỎNG?
                </div>
                <div className="news__description">
                  Làm gì khi bạn muốn điều khiển tivi nhưng không có remote
                  (thiết bị điều khiển)? Bên dưới là những cách giúp bạn mở tivi
                  khi điều khiển hư hỏng, hay mất một cách đơn giản
                </div>
              </div>
            </div>
          </a>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(News);
