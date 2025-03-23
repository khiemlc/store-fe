import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { changeLanguage } from "../../../store/actions";
import * as actions from "../../../store/actions";
import { withRouter } from "react-router";
import { Buffer } from "buffer";
//import Slider
import Slider from "react-slick";

class NewProduct extends Component {
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
  goNew = () => {
    this.props.history.push(`/product-new`);
  };
  changeLanguage = (language) => {
    this.props.changeLanguage(language);
  };
  render() {
    // let arrProducts = this.state.products;
    let arrProducts = [];
    this.state.products.map((item, index) => {
      if (item.isNew === 1) {
        arrProducts.push(item);
      }
    });
    return (
      <div className="section__share">
        <div className="section__container new-product__container">
          <div className="section__header">
            <div className="header__title pointer__event">
              <FormattedMessage id="home__page.new" />
            </div>
            <div className="btn pointer__event" onClick={() => this.goNew()}>
              <FormattedMessage id="home__page.viewmore" />
            </div>
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
                          <p className="new-product">
                            <span>Sản phẩm mới</span>
                          </p>
                          <span className="hover__event--blue">
                            {item.name}
                          </span>
                          <span className="price--real">
                            {this.formatCash(
                              item.truePrice ? item.truePrice : "0"
                            )}
                            ₫
                          </span>
                          <div className="price--sale">
                            <span className="price--begin">
                              {this.formatCash(
                                item.initPrice ? item.initPrice : "0"
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
    changeLanguage: (language) => dispatch(changeLanguage(language)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(NewProduct)
);
