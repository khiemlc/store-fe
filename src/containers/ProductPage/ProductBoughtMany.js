import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import { withRouter } from "react-router";
import { Buffer } from "buffer";

class ProductBoughtMany extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }
  componentDidMount() {
    this.props.getproductBoughtStart();
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
    console.log("check state", this.state);
    console.log("check props", this.props);

    let arrProducts = this.state.products;

    return (
      <>
        <div className="product-page__container">
          <div className="main-product">
            <div className="title">Sản phẩm mua nhiều</div>

            <div className="product__item">
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
                    <div className="outline__body">
                      <div
                        className="body__cus pointer__event"
                        key={index}
                        onClick={() => this.handleViewDetailProduct(item)}
                      >
                        <div
                          className="bg-img"
                          style={{
                            backgroundImage: `url(${imageBase64})`,
                          }}
                        />
                        <div className="product__info">
                          <span className="hover__event--blue">
                            {item.name}
                          </span>
                          <span className="price--real">
                            {this.formatCash(
                              item.truePrice ? item.truePrice.toString() : "0"
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
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    products: state.product.products_bought,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getproductBoughtStart: () => dispatch(actions.getproductBoughtStart()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductBoughtMany)
);
