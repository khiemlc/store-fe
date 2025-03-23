import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./NoSlide.scss";
import { withRouter } from "react-router";

//import Slider
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class BannerSlide extends Component {
  getTivi = () => {
    setTimeout(() => {
      this.props.history.push(`/tote`);
    }, 100);
  };
  getFridge = () => {
    setTimeout(() => {
      this.props.history.push(`/fridge`);
    }, 100);
  };
  render() {
    let setting = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 1,
    };

    return (
      <div className="section-banner">
        <div className="section-banner__container">
          <Slider {...setting}>
            <div className="banner__cus pointer__event">
              <div className="bg-img banner0__img" onClick={this.getTivi} />
            </div>
            <div
              className="banner__cus pointer__event"
              onClick={this.getFridge}
            >
              <div className="bg-img banner1__img" />
            </div>
            <div className="banner__cus pointer__event" onClick={this.getTivi}>
              <div className="bg-img banner0__img" />
            </div>
            <div
              className="banner__cus pointer__event"
              onClick={this.getFridge}
            >
              <div className="bg-img banner1__img" />
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(BannerSlide)
);
