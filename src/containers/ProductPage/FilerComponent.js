import React, { Component } from "react";
import { connect } from "react-redux";

import "./ProductPage.scss";

class FilerComponent extends Component {
  render() {
    let options = ["tote"];
    let priceOptions = [
      "0₫ - 500,000₫",
      "1,000,000₫ - 5,000,000₫",
      " 50,000,000₫ trở lên",
    ];

    let tvOption = [
      {
        value: "hd",
        label: "HD",
      },
      {
        value: "fullhd",
        label: "Full HD",
      },
      {
        value: "4k",
        label: "4K",
      },
      {
        value: "8k",
        label: "8K",
      },
    ];

    return (
      <div className="filter__container">
        <div className="product__container">
          {options && options.length > 0 ? (
            <>
              <div className="title_filter">Label</div>
              {options.map((item, index) => {
                return (
                  <div value={item} key={index} className="pointer__event pl">
                    {item}
                  </div>
                );
              })}
            </>
          ) : (
            ""
          )}
        </div>
        {/* <div className="tv-resolution ">
          {tvOption && tvOption.length > 0 ? (
            <>
              <div className="title_filter">Độ phân giải Tivi</div>
              {tvOption.map((item, index) => {
                return (
                  <div className="form-check">
                    <label
                      className="form-check-label pointer__event"
                      for={index}
                    >
                      <input
                        type="checkbox"
                        className="form-check-input pointer__event"
                        id={index}
                        name={item.value}
                        value={item.value}
                      />
                      {item.label}
                    </label>
                  </div>
                );
              })}
            </>
          ) : (
            ""
          )}
        </div>
        <div className="price__filter">
          {priceOptions && priceOptions.length > 0 ? (
            <>
              <div className="title_filter">Giá</div>
              {priceOptions.map((item, index) => {
                return (
                  <div className="form-check ">
                    <label className="form-check-label" key={index}>
                      <input
                        type="checkbox"
                        className="form-check-input pointer__event"
                        key={index}
                        value={item}
                      />
                      {item}
                    </label>
                  </div>
                );
              })}
            </>
          ) : (
            ""
          )}
        </div> */}
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(FilerComponent);
