import React, { Component } from "react";
import { connect } from "react-redux";

import "./ProductDetail.scss";
import Breadcrumb from "../AllSection/Breadcrumb";
import DefaultPromotion from "./DefaultPromotion";
import DetailImage from "./DetailImage";
import DetailMain from "./DetailMain";
import ProductInformation from "./ProductInformation";
import { getProductById } from "../../services/productService";
//slider
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailProduct: {},
      currentProductId: -1,
      isDetail: false,
    };
  }
  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      this.setState({
        currentProductId: id,
      });
      let res = await getProductById(id);
      if (res && res.errCode === 0) {
        this.setState({
          detailProduct: res.product,
        });
      }
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.product !== this.props.product) {
      this.setState({
        product: this.props.product,
      });
    }
  }
  render() {
    let setting = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    let { detailProduct } = this.state;
    return (
      <>
        <Breadcrumb product={detailProduct} isDetail={true} />
        <div className="product-detail__container">
          <DetailImage setting={setting} detailProduct={detailProduct} />
          <DetailMain detailProduct={detailProduct} />
          <DefaultPromotion />
        </div>
        <ProductInformation detailProduct={detailProduct} />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
