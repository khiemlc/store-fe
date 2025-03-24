import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import { withRouter } from "react-router";
import NavbarComponent from "./FilerComponent";
import Breadcrumb from "../AllSection/Breadcrumb";
import { Buffer } from "buffer";

class ProductTivi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      filteredProducts: [],
      priceRange: {
        min: 0,
        max: Infinity
      },
      sortOption: 'default' // Có thể thêm tùy chọn sắp xếp: 'price-asc', 'price-desc'
    };
  }

  componentDidMount() {
    this.props.getProductByTypeStart("Vòng Cổ");
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.products !== this.props.products) {
      this.setState({
        products: this.props.products,
        filteredProducts: this.props.products
      }, () => {
        this.applyFilters();
      });
    }
  }

  applyFilters = () => {
    const { products, priceRange, sortOption } = this.state;

    // Lọc sản phẩm theo khoảng giá
    let filtered = products.filter(product => {
      const price = parseInt(product.truePrice);
      return price >= priceRange.min && price <= priceRange.max;
    });

    // Sắp xếp sản phẩm nếu cần
    if (sortOption === 'price-asc') {
      filtered = filtered.sort((a, b) => parseInt(a.truePrice) - parseInt(b.truePrice));
    } else if (sortOption === 'price-desc') {
      filtered = filtered.sort((a, b) => parseInt(b.truePrice) - parseInt(a.truePrice));
    }

    this.setState({ filteredProducts: filtered });
  };

  handlePriceRangeChange = (min, max) => {
    this.setState({
      priceRange: {
        min: min,
        max: max === 0 ? Infinity : max
      }
    }, () => {
      this.applyFilters();
    });
  };

  handleSortChange = (option) => {
    this.setState({ sortOption: option }, () => {
      this.applyFilters();
    });
  };

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
    let arrProducts = this.state.filteredProducts;

    return (
      <>
        <Breadcrumb
          product={arrProducts && arrProducts[0] ? arrProducts[0] : ""}
        />

        <div className="product-page__container">
          <div className="filter-section">
            <h3>Lọc sản phẩm</h3>

            <div className="price-filter">
              <h4>Theo giá</h4>
              <div className="price-options">
                <div onClick={() => this.handlePriceRangeChange(0, 0)} className="filter-option">
                  Tất cả giá
                </div>
                <div onClick={() => this.handlePriceRangeChange(0, 20000)} className="filter-option">
                  Dưới 20.000đ
                </div>
                <div onClick={() => this.handlePriceRangeChange(20000, 30000)} className="filter-option">
                  20.000₫ - 30.000₫
                </div>
                <div onClick={() => this.handlePriceRangeChange(30000, 40000)} className="filter-option">
                  30.000₫ - 40.000₫
                </div>
                <div onClick={() => this.handlePriceRangeChange(40000, 50000)} className="filter-option">
                  40.000₫ - 50.000₫
                </div>
                <div onClick={() => this.handlePriceRangeChange(50000, 0)} className="filter-option">
                  Trên 50.000₫
                </div>
              </div>
            </div>

            <div className="sort-section">
              <h4>Sắp xếp theo</h4>
              <div className="sort-options">
                <div onClick={() => this.handleSortChange('default')} className="sort-option">
                  Mặc định
                </div>
                <div onClick={() => this.handleSortChange('price-asc')} className="sort-option">
                  Giá tăng dần
                </div>
                <div onClick={() => this.handleSortChange('price-desc')} className="sort-option">
                  Giá giảm dần
                </div>
              </div>
            </div>
          </div>

          <div className="main-product">
            <div className="title">Sản phẩm Vòng Từ Vỏ Sò</div>
            <div className="filter-results">Đang hiển thị {arrProducts.length} sản phẩm</div>
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
                    <div className="outline__body" key={index}>
                      <div
                        className="body__cus pointer__event"
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
                              item.initPrice ? item.initPrice.toString() : "0"
                            )}
                            ₫
                          </span>
                          <div className="price--sale">
                            <span className="price--begin">
                              {this.formatCash(
                                item.truePrice ? item.truePrice.toString() : "0"
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
    products: state.product.products,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProductByTypeStart: (type) =>
      dispatch(actions.getProductByTypeStart(type)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductTivi)
);