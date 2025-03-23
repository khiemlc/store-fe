import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "./Header/HomeHeader.js";
import BannerSlide from "./Section/BannerSlide.js";
import Spotlight from "./Section/Spotlight.js";
import CateFeature from "./Section/CateFeature.js";
import Brand from "./Section/Brand.js";
import "./HomePage.scss";

import BigPromotion from "./Section/BigPromotion.js";
import NewProduct from "./Section/NewProduct.js";
import TopSeller from "./Section/TopSeller.js";
import TopSearch from "./Section/TopSearch.js";
import HomeGeneral from "./HomeGeneral.js";
import HomeFooter from "./HomeFooter.js";
import MainBanner from "./Header/MainBanner.js";
//slider
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
class HomePage extends Component {
  render() {
    let setting = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 1,
    };
    return (
      <div>
        {/* <HomeHeader /> */}
        <MainBanner />
        <BannerSlide />
        {/* <Spotlight /> */}
        <BigPromotion setting={setting} />
        {/* <TopSearch setting={setting} /> */}
        <NewProduct setting={setting} />
        <TopSeller setting={setting} />
        {/* <CateFeature /> */}
        {/* <Brand /> */}
        {/* <HomeGeneral />
        <HomeFooter /> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
