import React, { Component } from "react";
import { connect } from "react-redux";

// import "./MainProduct.scss";
import "./ProductPage.scss";
import { withRouter } from "react-router";
import ProductDetail from "../ProductDetail/ProductDetail";
class MainProduct extends Component {
  handleViewProductDetail = () => {
    this.props.history.push(`/product-detail`);
  };
  render() {
    let mapfunc = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    return (
      <>
        <div className="product__item">
          {mapfunc.map((item) => {
            return (
              <div className="outline__body">
                <div
                  className="body__cus pointer__event"
                  onClick={() => this.handleViewProductDetail()}
                >
                  <div className="bg-img new-product__img" />
                  <div className="product__info">
                    <span className="hover__event--blue">
                      {/* Smart Tivi NanoCell */}
                      Tui tote
                    </span>
                    <span className="price--real">14.900.900 ₫</span>
                    <div className="price--sale">
                      <span className="price--begin">22.600.900 ₫</span>
                      <span className="price--percent">- 35%</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <nav aria-label="Page navigation example">
          <ul class="pagination justify-content-center">
            <li class="page-item ">
              <a class="page-link" href="#" tabindex="-1">
                Previous
              </a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">
                1
              </a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">
                2
              </a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">
                3
              </a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">
                Next
              </a>
            </li>
          </ul>
        </nav>
      </>
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MainProduct)
);
