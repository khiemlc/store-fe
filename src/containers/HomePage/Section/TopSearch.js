import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import * as actions from "../../../store/actions";
import { withRouter } from "react-router";
//import Slider
import Slider from "react-slick";
import { Buffer } from "buffer";

class TopSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }
  componentDidMount() {
    this.props.getAllProducts();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.products !== this.props.products) {
      this.setState({
        products: this.props.products,
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
  handleViewDetailProduct = (product) => {
    console.log("view doctor detail: ", product);
    if (this.props.history) {
      this.props.history.push(`/product-detail/${product.id}`);
    }
  };
  render() {
    let arrProducts = [];
    this.state.products.map((item, index) => {
      if (item.isTopSearch === 1) {
        arrProducts.push(item);
      }
    });
    return (
      <div className="section__share">
        <div className="section__container top-search__container">
          <div className="section__header">
            <div className="header__title pointer__event">
              TOP SẢN PHẨM ĐƯỢC TÌM KIẾM NHIỀU NHẤT
            </div>
            <div className="btn pointer__event">XEM TẤT CẢ ⮞</div>
          </div>
          <div className="section__body">
            <Slider {...this.props.setting}>
              {arrProducts &&
                arrProducts.length > 0 &&
                arrProducts.map((item, index) => {
                  let imageBase64 = "";
                  if (item.avatar) {
                    imageBase64 = Buffer.from(item.avatar, "base64").toString(
                      "binary"
                    );
                  }
                  return (
                    <div
                      className="outline__body"
                      key={index}
                      onClick={() => this.handleViewDetailProduct(item)}
                    >
                      <div className="body__cus pointer__event">
                        <div
                          className="bg-img "
                          style={{
                            backgroundImage: `url(${imageBase64})`,
                          }}
                        />
                        <div className="product__info">
                          <p className="top-search">
                            <span>Hot search !!</span>
                          </p>
                          <span className="hover__event--blue">
                            {item.name}
                          </span>
                          <span className="price--real">
                            {this.formatCash(
                              item.initPrice ? item.initPrice.toString() : "0"
                            )}
                            ₫
                          </span>
                          <div className="price--sale">
                            <span className="price--begin">
                              {this.formatCash(
                                item.initPrice ? item.initPrice.toString() : "0"
                              )}
                              ₫
                            </span>
                            <span className="price--percent">
                              - {item.percent}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </Slider>
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
    products: state.product.products,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllProducts: () => dispatch(actions.getAllProductsStart()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TopSearch)
);
