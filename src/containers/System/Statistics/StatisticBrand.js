import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import "./Statistics.scss";
class StatisticBrand extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  async componentDidMount() {}
  componentDidUpdate(prevProps, prevState, snapshot) {}
  formatCash = (number) => {
    return number
      .split("")
      .reverse()
      .reduce((prev, next, index) => {
        return (index % 3 ? next : next + ",") + prev;
      });
  };

  render() {
    return (
      <div className="checking__container">
        <div className="statistic_table">
          <div className="title mb-3">Top 10 sản phẩm được mua nhiều nhất</div>
          <div className="table__body">
            <table id="TableManage">
              <tr>
                <th>Tên sản phẩm</th>
                <th>Loại sản phẩm</th>
                <th>Giá ban đầu</th>
                <th>Giá bán</th>
                <th>Giảm giá</th>
                <th>Đã bán</th>
                <th>Trong kho</th>
              </tr>
              <tr>
                <td>Electric 506 lít MR-WX52D-F-V</td>
                <td>Tủ lạnh</td>
                <td>Mitsubishi</td>
                <td>82000000</td>
                <td>60690000</td>
                <td>26</td>
                <td>12</td>
                <td>100</td>
              </tr>
              <tr>
                <td>Electric 506 lít MR-WX52D-F-V</td>
                <td>Tủ lạnh</td>
                <td>Mitsubishi</td>
                <td>82000000</td>
                <td>60690000</td>
                <td>26</td>
                <td>12</td>
                <td>100</td>
              </tr>
            </table>
          </div>
        </div>
        <div className="statistic_table">
          <div className="title mb-3">Top 10 sản phẩm được mua ít nhất</div>
          <div className="table__body">
            <table id="TableManage">
              <tr>
                <th>Tên sản phẩm</th>
                <th>Loại sản phẩm</th>
                <th>Hãng sản phẩm</th>
                <th>Giá ban đầu</th>
                <th>Giá bán</th>
                <th>Giảm giá</th>
                <th>Đã bán</th>
                <th>Trong kho</th>
              </tr>
              <tr>
                <td>Electric 506 lít MR-WX52D-F-V</td>
                <td>Tủ lạnh</td>
                <td>Mitsubishi</td>
                <td>82000000</td>
                <td>60690000</td>
                <td>26</td>
                <td>12</td>
                <td>100</td>
              </tr>
              <tr>
                <td>Electric 506 lít MR-WX52D-F-V</td>
                <td>Tủ lạnh</td>
                <td>Mitsubishi</td>
                <td>82000000</td>
                <td>60690000</td>
                <td>26</td>
                <td>12</td>
                <td>100</td>
              </tr>
            </table>
          </div>
        </div>
        <div className="statistic_table">
          <div className="title mb-3">Top 10 sản phảm còn nhiều trong kho</div>
          <div className="table__body">
            <table id="TableManage">
              <tr>
                <th>Tên sản phẩm</th>
                <th>Loại sản phẩm</th>
                <th>Hãng sản phẩm</th>
                <th>Giá ban đầu</th>
                <th>Giá bán</th>
                <th>Giảm giá</th>
                <th>Đã bán</th>
                <th>Trong kho</th>
              </tr>
              <tr>
                <td>Electric 506 lít MR-WX52D-F-V</td>
                <td>Tủ lạnh</td>
                <td>Mitsubishi</td>
                <td>82000000</td>
                <td>60690000</td>
                <td>26</td>
                <td>12</td>
                <td>100</td>
              </tr>
              <tr>
                <td>Electric 506 lít MR-WX52D-F-V</td>
                <td>Tủ lạnh</td>
                <td>Mitsubishi</td>
                <td>82000000</td>
                <td>60690000</td>
                <td>26</td>
                <td>12</td>
                <td>100</td>
              </tr>
            </table>
          </div>
        </div>

        <div className="statistic_table">
          <div className="title mb-3">Top 7 đơn hàng giá trị</div>
          <div className="table__body">
            <table id="TableManage">
              <tr>
                <th>Tên sản phẩm</th>
                <th>Loại sản phẩm</th>
                <th>Hãng sản phẩm</th>
                <th>Giá ban đầu</th>
                <th>Giá bán</th>
                <th>Giảm giá</th>
                <th>Đã bán</th>
                <th>Trong kho</th>
              </tr>
              <tr>
                <td>Electric 506 lít MR-WX52D-F-V</td>
                <td>Tủ lạnh</td>
                <td>Mitsubishi</td>
                <td>82000000</td>
                <td>60690000</td>
                <td>26</td>
                <td>12</td>
                <td>100</td>
              </tr>
              <tr>
                <td>Electric 506 lít MR-WX52D-F-V</td>
                <td>Tủ lạnh</td>
                <td>Mitsubishi</td>
                <td>82000000</td>
                <td>60690000</td>
                <td>26</td>
                <td>12</td>
                <td>100</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    customers: state.admin.customers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    customerGetAllStart: () => dispatch(actions.customerGetAllStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StatisticBrand);
