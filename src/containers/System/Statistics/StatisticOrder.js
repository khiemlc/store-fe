import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import ProductItem from "./ProductItem";
import Chart from "chart.js/auto";
import { Bar, Line } from "react-chartjs-2";
import "./Statistics.scss";
class StatisticOrder extends Component {
  constructor(props) {
    super(props);
    this.state = { order_topmoney: [], statisticsOrder: [] };
  }
  async componentDidMount() {
    setTimeout(() => {
      this.props.getTopOrderMoneyStart();
      this.props.getOneYearStart();
    }, 250);
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.order_topmoney !== this.props.order_topmoney) {
      this.setState({
        order_topmoney: this.props.order_topmoney,
      });
    }
    if (prevProps.statisticsOrder !== this.props.statisticsOrder) {
      this.setState({
        statisticsOrder: this.props.statisticsOrder,
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
  formatDate = (date) => {
    return date.slice(8, 10) + "/" + date.slice(5, 7) + "/" + date.slice(0, 4);
  };
  render() {
    console.log("check state", this.state.statisticsOrder);
    let { order_topmoney, statisticsOrder } = this.state;
    let labels = [];
    let totalMoney = [],
      totalOrder = [];
    let maxMoney = 0;
    let maxOrder = 0;

    statisticsOrder.map((item) => {
      labels.push(item.month);
      totalMoney.push(item.totalMoney);
      totalOrder.push(item.totalOrder);
      if (item.totalMoney > maxMoney) maxMoney = item.totalMoney;
      if (item.totalOrder > maxOrder) maxOrder = item.totalOrder;
    });
    return (
      <div className="checking__container">
        <div className="statistic">
          <div className="title">Thống kê doanh thu theo tháng</div>
          <Bar
            data={{
              labels: labels,
              datasets: [
                {
                  label: "Thành tiền",
                  backgroundColor: ["#3e95cd"],
                  data: totalMoney,
                },
              ],
            }}
            options={{
              legend: { display: true },

              scales: {
                x: {
                  title: {
                    display: true,
                    text: "Tháng",
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: "Doanh thu",
                  },
                  min: 0,
                  max: maxMoney + 1000000,
                },
              },
            }}
          />
          <div className="tablename">
            Biểu đồ thống kê doanh thu 12 tháng qua
          </div>
        </div>
        <div className="statistic_count">
          <div className="title">Thống kê số lượng theo tháng</div>
          <Line
            data={{
              labels: labels,
              datasets: [
                {
                  label: "Số lượng",
                  borderColor: ["#8e5ea2"],
                  data: totalOrder,
                },
              ],
            }}
            options={{
              legend: { display: true },

              scales: {
                x: {
                  title: {
                    display: true,
                    text: "Tháng",
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: "Số lượng",
                  },
                  min: 0,
                  max: maxOrder + 10,
                },
              },
            }}
          />
          <div className="tablename">
            Biểu đồ thống kê số lượng 12 tháng qua
          </div>
        </div>
        <div className="statistic_tableorder">
          <div className="title mb-3">Top 7 đơn hàng giá trị</div>
          <div className="table__body">
            <table id="TableManage">
              <tr>
                <th>Tổng tiền</th>
                <th>Khách hàng</th>
                <th>Số điện thoại</th>
                <th>Địa chỉ giao</th>
                <th>Sản phẩm</th>
                <th>Tổng số lượng</th>
                <th>Ngày nhận</th>
              </tr>
              {order_topmoney &&
                order_topmoney.length > 0 &&
                order_topmoney.map((item, index) => {
                  if (item) {
                    return (
                      <tr>
                        <td>
                          {this.formatCash(
                            item.totalPrice ? item.totalPrice.toString() : "0"
                          )}
                          ₫
                        </td>
                        <td>{item.cusName}</td>
                        <td>{item.cusPhoneNumber}</td>
                        <td>{item.shipAddress}</td>
                        <td>
                          <ProductItem listCart={item.Carts} />
                        </td>
                        <td className="totalQuantity">{item.totalQuantity}</td>
                        <td>{this.formatDate(item.updatedAt)}</td>
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
    order_topmoney: state.admin.order_topmoney,
    statisticsOrder: state.admin.statisticsOrder,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTopOrderMoneyStart: () => dispatch(actions.getTopOrderMoneyStart()),
    getOneYearStart: () => dispatch(actions.getOneYearStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StatisticOrder);
