import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { withRouter } from "react-router";
import * as actions from "../../store/actions";
import "./ProductDetail.scss";
class DetailMain extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      userId: "",
      productId: "",
    };
  }
  componentDidMount() {}
  componentDidUpdate() {}
  formatCash = (number) => {
    return number
      .split("")
      .reverse()
      .reduce((prev, next, index) => {
        return (index % 3 ? next : next + ",") + prev;
      });
  };
  handleAddOrderproduct = () => {
    const { navigate, location } = this.props;
    console.log("check props", this.props);
    if (this.props.isLoggedIn === false) {
      navigate(`/login`);
    } else {
      setTimeout(() => {
        this.props.addCart({
          userId: this.props.dataUser.id,
          productId: this.props.detailProduct.id,
        });
        navigate(`/cart`);
      }, 500);
    }
  };
  render() {
    let product = this.props.detailProduct;
    return (
      <>
        <div className="detail-main__container">
          <div className="main-title">
            {/*check=====*/}
            {product.name}
          </div>
          <div className="main-brand">Loại: {product.type}</div>
          <div className="price">
            <span className="price--sale">
              {product.initPrice ? this.formatCash(product.initPrice) : ""} ₫
            </span>

            <span className="price--real">
              {product.truePrice ? this.formatCash(product.truePrice) : ""} ₫
            </span>
          </div>
          <div
            className="short-description"
            dangerouslySetInnerHTML={{ __html: product.contentHTML }}
          ></div>
          <div className="choice">
            <button
              className="btn buy-now"
              onClick={this.handleAddOrderproduct}
            >
              Mua Ngay
            </button>
            {/* <button className="btn add-cart">Thêm vào giỏ hàng</button> */}
            <button className="btn call">
              Gọi tư vấn <span>0123456789</span> ( 24/7 )
            </button>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    dataUser: state?.user?.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    addCart: (data) => dispatch(actions.addCart(data)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DetailMain)
);
