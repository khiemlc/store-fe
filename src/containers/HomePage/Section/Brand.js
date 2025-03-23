import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./NoSlide.scss";
import { withRouter } from "react-router";

//import Slider
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class Brand extends Component {
  goSamsung = () => {
    setTimeout(() => {
      this.props.history.push(`/product-samsung`);
    }, 100);
  };
  goSony = () => {
    setTimeout(() => {
      this.props.history.push(`/product-sony`);
    }, 100);
  };
  goLg = () => {
    setTimeout(() => {
      this.props.history.push(`/product-lg`);
    }, 100);
  };
  goPanasonic = () => {
    setTimeout(() => {
      this.props.history.push(`/product-panasonic`);
    }, 100);
  };

  render() {
    let setting = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: 1,
    };
    return (
      <div className="section-brand">
        <div className="section-brand__container">
          <Slider {...setting}>
            <div className="brand__cus pointer__event" onClick={this.goSamsung}>
              <div className="bg-img brand0__img" />
            </div>
            <div className="brand__cus pointer__event" onClick={this.goSony}>
              <div className="bg-img brand1__img" />
            </div>
            <div className="brand__cus pointer__event" onClick={this.goLg}>
              <div className="bg-img brand2__img" />
            </div>
            <div
              className="brand__cus pointer__event"
              onClick={this.goPanasonic}
            >
              <div className="bg-img brand3__img" />
            </div>
            <div className="brand__cus pointer__event" onClick={this.goSamsung}>
              <div className="bg-img brand0__img" />
            </div>
            <div className="brand__cus pointer__event" onClick={this.goSony}>
              <div className="bg-img brand1__img" />
            </div>
            <div className="brand__cus pointer__event" onClick={this.goLg}>
              <div className="bg-img brand2__img" />
            </div>
            <div
              className="brand__cus pointer__event"
              onClick={this.goPanasonic}
            >
              <div className="bg-img brand3__img" />
            </div>
          </Slider>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Brand));
