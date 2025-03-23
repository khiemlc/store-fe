import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import "./Statistics.scss";
class StatisticProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products_topsold: [],
      products_topstock: [],
      products_topsoldfew: [],
    };
  }
  async componentDidMount() {
    setTimeout(() => {
      this.props.getTopProductSoldStart();
      this.props.getTopProductStockStart();
      this.props.getTopProductSoldFewStart();
    }, 250);
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.products_topsold !== this.props.products_topsold) {
      this.setState({
        products_topsold: this.props.products_topsold,
      });
    }
    if (prevProps.products_topsoldfew !== this.props.products_topsoldfew) {
      this.setState({
        products_topsoldfew: this.props.products_topsoldfew,
      });
    }
    if (prevProps.products_topstock !== this.props.products_topstock) {
      this.setState({
        products_topstock: this.props.products_topstock,
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

  render() {
    console.log("check state", this.state.products_topsoldfew);
    let { products_topsold, products_topsoldfew, products_topstock } =
      this.state;
    return (
      <div className="checking__container">
        <div className="statistic_table">
          <div className="title mb-3">Top 7 sản phẩm được mua nhiều nhất</div>
          <div className="table__body">
            <table id="TableManage">
              <tr>
                <th>Đã bán</th>
                <th>Tên sản phẩm</th>
                <th>Loại sản phẩm</th>
                <th>Giá ban đầu</th>
                <th>Giá bán</th>
                <th>Giảm giá</th>
                <th>Trong kho</th>
              </tr>
              {products_topsold &&
                products_topsold.length > 0 &&
                products_topsold.map((item, index) => {
                  if (item) {
                    return (
                      <tr>
                        <td>{item.countSold}</td>
                        <td>{item.name}</td>
                        <td></td>
                        <td>
                          {this.formatCash(
                            item.initPrice ? item.initPrice : "0"
                          )}
                          ₫
                        </td>
                        <td>
                          {this.formatCash(
                            item.truePrice ? item.truePrice : "0"
                          )}
                          ₫
                        </td>
                        <td>{item.percent}</td>
                        <td>{item.countInStock}</td>
                      </tr>
                    );
                  }
                })}
            </table>
          </div>
        </div>
        <div className="statistic_table">
          <div className="title mb-3">Top 7 sản phẩm được mua ít nhất</div>
          <div className="table__body">
            <table id="TableManage">
              <tr>
                <th>Đã bán</th>
                <th>Tên sản phẩm</th>
                <th>Loại sản phẩm</th>
                <th>Giá ban đầu</th>
                <th>Giá bán</th>
                <th>Giảm giá</th>
                <th>Trong kho</th>
              </tr>
              {products_topsoldfew &&
                products_topsoldfew.length > 0 &&
                products_topsoldfew.map((item, index) => {
                  if (item) {
                    return (
                      <tr>
                        <td>{item.countSold}</td>
                        <td>{item.name}</td>
                        <td></td>
                        <td>
                          {this.formatCash(
                            item.initPrice ? item.initPrice : "0"
                          )}
                          ₫
                        </td>
                        <td>
                          {this.formatCash(
                            item.truePrice ? item.truePrice : "0"
                          )}
                        </td>
                        <td>{item.percent}</td>
                        <td>{item.countInStock}</td>
                      </tr>
                    );
                  }
                })}
            </table>
          </div>
        </div>
        <div className="statistic_table">
          <div className="title mb-3">Top 7 sản phẩm tồn kho nhiều nhất</div>
          <div className="table__body">
            <table id="TableManage">
              <tr>
                <th>Trong kho</th>
                <th>Tên sản phẩm</th>
                <th>Loại sản phẩm</th>
                <th>Giá ban đầu</th>
                <th>Giá bán</th>
                <th>Giảm giá</th>
                <th>Đã bán</th>
              </tr>
              {products_topstock &&
                products_topstock.length > 0 &&
                products_topstock.map((item, index) => {
                  if (item) {
                    return (
                      <tr>
                        <td>{item.countInStock}</td>
                        <td>{item.name}</td>
                        <td></td>
                        <td>
                          {this.formatCash(
                            item.initPrice ? item.initPrice : "0"
                          )}
                          ₫
                        </td>
                        <td>
                          {this.formatCash(
                            item.truePrice ? item.truePrice : "0"
                          )}
                        </td>
                        <td>{item.percent}</td>
                        <td>{item.countSold}</td>
                      </tr>
                    );
                  }
                })}
            </table>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products_topsold: state.admin.products_topsold,
    products_topstock: state.admin.products_topstock,
    products_topsoldfew: state.admin.products_topsoldfew,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTopProductSoldStart: () => dispatch(actions.getTopProductSoldStart()),
    getTopProductStockStart: () => dispatch(actions.getTopProductStockStart()),
    getTopProductSoldFewStart: () =>
      dispatch(actions.getTopProductSoldFewStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StatisticProduct);
