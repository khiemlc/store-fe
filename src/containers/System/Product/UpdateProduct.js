import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UpdateProduct.scss";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import * as actions from "../../../store/actions";
import { CommonUtils } from "../../../utils";
import Select from "react-select";
import { getProductById } from "../../../services/productService";
import { Buffer } from "buffer";
const mdParser = new MarkdownIt(/* Markdown-it options */);

class UpdateProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      type: "",
      initPrice: "",
      truePrice: "",
      percent: "",
      isHot: 0,
      isTopSearch: 0,
      isBoughtMany: 0,
      isNew: 0,
      countInStock: "",
      countSold: 0,
      avatar: "",
      previewImgURL: "",
      content: "",
      contentHTML: "",
      description: "",
      descriptionHTML: "",
      selectedOption: "",
      products: [],
      isOpen: false,
    };
  }
  componentDidMount() {
    this.props.getAllProducts();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.products !== this.props.products) {
      let dataSelect = this.buildDataInputSelect(this.props.products);
      this.setState({ products: dataSelect });
    }
  }

  handleChangeSelect = async (selectedOption, name) => {
    this.setState({ selectedOption });
    let res = await getProductById(selectedOption.value);
    if (res && res.errCode === 0 && res.product) {
      console.log("check res", res.product.avatar);
      let imageBase64 = "";
      if (res.product.avatar) {
        imageBase64 = Buffer.from(res.product.avatar, "base64").toString(
          "binary"
        );
      }
      console.log("check img", imageBase64);

      this.setState({
        type: res.product.type,
        initPrice: res.product.initPrice,
        truePrice: res.product.truePrice,
        percent: res.product.percent,
        isHot: res.product.isHot,
        isTopSearch: res.product.isTopSearch,
        isBoughtMany: res.product.isBoughtMany,
        isNew: res.product.isNew,
        countInStock: res.product.countInStock,
        countSold: res.product.countSold,
        avatar: res.product.avatar,
        content: res.product.content,
        contentHTML: res.product.contentHTML,
        description: res.product.description,
        descriptionHTML: res.product.descriptionHTML,
        previewImgURL: imageBase64,
      });
    } else {
    }
  };
  buildDataInputSelect = (inputData) => {
    let result = [];
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {};
        object.label = item.name;
        object.value = item.id;
        result.push(object);
      });
    }

    return result;
  };
  // change
  openPreviewImage = () => {
    if (!this.state.previewImgURL) return;
    this.setState({ isOpen: true });
  };
  handleEditorChangeContent = ({ html, text }) => {
    this.setState({
      content: text,
      contentHTML: html,
    });
  };
  handleEditorChangeDescription = ({ html, text }) => {
    this.setState({
      description: text,
      descriptionHTML: html,
    });
  };
  onChangeInput = (event, id) => {
    let copyState = { ...this.state };
  
    copyState[id] = event.target.value;
    this.setState({ ...copyState });
  };
  handleOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];

    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let objecturl = URL.createObjectURL(file);
      this.setState({
        previewImgURL: objecturl,
        avatar: base64,
      });
    }
  };
  checkValidateInput = () => {
    let isValid = true;
    let arrCheck = ["name", "type", "truePrice", "countInStock", "countSold"];
    for (let i = 0; i < arrCheck.length; i++) {
      if (!this.state[arrCheck[i]]) {
        isValid = false;
        alert("this input is required: " + arrCheck[i]);
        break;
      }
    }
    return isValid;
  };
  //edit
  handleUpdateProduct = () => {
    let imageBase64 = "";
    if (this.state.avatar) {
      imageBase64 = Buffer.from(this.state.avatar, "base64").toString("binary");
    }
    this.props.updateProduct({
      id: this.state.selectedOption.value,
      name: this.state.name,
      type: this.state.type,
      initPrice: this.state.initPrice,
      truePrice: this.state.truePrice,
      percent: this.state.percent,
      isHot: this.state.isHot,
      isTopSearch: this.state.isTopSearch,
      isBoughtMany: this.state.isBoughtMany,
      isNew: this.state.isNew,
      countInStock: this.state.countInStock,
      countSold: this.state.countSold,
      avatar: this.state.avatar,
      content: this.state.content,
      contentHTML: this.state.contentHTML,
      description: this.state.description,
      descriptionHTML: this.state.descriptionHTML,
      previewImgURL: imageBase64,
    });
  };
  handleDeleteProduct = (product) => {
    // this.props.deleteProductStart(product.id);
    console.log("check=======", this.state.selectedOption.value);
  };
  render() {
    console.log("check state in update product", this.state);

    let {
      type,
      initPrice,
      truePrice,
      // percent,
      isHot,
      isTopSearch,
      isBoughtMany,
      countInStock,
      content,
      description,
      countSold,
      isNew,
    } = this.state;
    let percent;
    this.state.percent = Math.ceil(
      ((this.state.initPrice - this.state.truePrice) / this.state.initPrice) *
        100
    );

    return (
      <div className="create-product__container">
        <div className="title mb-3">Chỉnh sửa thông tin sản phẩm</div>
        <div className="create-product__body">
          <div className="row mb-4">
            <div className="col-6 form-group ">
              <label className="pb-2">Tên sản phẩm</label>
              <Select
                value={this.state.selectedOption}
                onChange={this.handleChangeSelect}
                options={this.state.products}
              />
            </div>
            <div className="col-3 form-group ">
              <label className="pb-2">Loại sản phẩm</label>
              <select
                class="form-control"
                value={type}
                onChange={(event) => {
                  this.onChangeInput(event, "type");
                }}
              >
                <option value="Tote">Vòng Cổ</option>
                <option value="Tote">Vòng Tay</option>

                {/* <option value="Tote2">Túi Tote2</option> */}
                {/* <option>Tủ lạnh</option>
                <option>Máy giặt</option>
                <option>Máy lạnh</option> */}
              </select>
            </div>
            {/* <div className="col-3 form-group ">
              <label className="pb-2">Hãng sản phẩm</label>
              <select
                class="form-control"
                value={brand}
                onChange={(event) => {
                  this.onChangeInput(event, "brand");
                }}
              >
                {arrBrand &&
                  arrBrand.length > 0 &&
                  arrBrand.map((item) => {
                    return <option>{item}</option>;
                  })}
              </select>
            </div> */}
          </div>
        </div>
        <div className="create-product__body">
          <div className="row mb-4">
            <div className="col-3 form-group ">
              <label className="pb-2">Giá mặc định</label>
              <input
                className="form-control"
                type="number"
                value={initPrice}
                onChange={(event) => {
                  this.onChangeInput(event, "initPrice");
                }}
              />
            </div>
            <div className="col-3 form-group ">
              <label className="pb-2">Giá bán ra</label>
              <input
                className="form-control"
                type="number"
                value={truePrice}
                onChange={(event) => {
                  this.onChangeInput(event, "truePrice");
                }}
              />
            </div>
            <div className="col-3 form-group ">
              <label className="pb-2">Giảm giá(%)</label>
              <input
                className="form-control"
                type="number"
                value={this.state.percent}
                onChange={(event) => {
                  this.onChangeInput(event, "percent");
                }}
              />
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-3 form-group ">
              <label className="pb-2">Sản phẩm hot</label>
              <select
                class="form-control"
                type="number"
                value={isHot}
                onChange={(event) => {
                  this.onChangeInput(event, "isHot");
                }}
              >
                <option value={0}>False</option>
                <option value={1}>True</option>
              </select>
            </div>
            <div className="col-3 form-group ">
              <label className="pb-2">Sản phẩm Top tìm kiếm</label>
              <select
                class="form-control"
                value={isTopSearch}
                onChange={(event) => {
                  this.onChangeInput(event, "isTopSearch");
                }}
              >
                <option value={0}>False</option>
                <option value={1}>True</option>
              </select>
            </div>
            <div className="col-3 form-group ">
              <label className="pb-2">Sản phẩm Mua nhiều</label>
              <select
                class="form-control"
                value={isBoughtMany}
                onChange={(event) => {
                  this.onChangeInput(event, "isBoughtMany");
                }}
              >
                <option value={0}>False</option>
                <option value={1}>True</option>
              </select>
            </div>
            <div className="col-3 form-group ">
              <label className="pb-2">Sản phẩm mới</label>
              <select
                class="form-control"
                value={isNew}
                onChange={(event) => {
                  this.onChangeInput(event, "isNew");
                }}
              >
                <option value={0}>False</option>
                <option value={1}>True</option>
              </select>
            </div>
          </div>
          <div className=" row mb-4">
            <div className="col-3 form-group ">
              <label className="pb-2">Số lượng còn lại trong kho</label>
              <input
                className="form-control"
                type="number"
                value={countInStock}
                onChange={(event) => {
                  this.onChangeInput(event, "countInStock");
                }}
              />
            </div>
            <div className="col-3 form-group ">
              <label className="pb-2">Số lượng đã bán</label>
              <input
                className="form-control"
                type="number"
                value={countSold}
                onChange={(event) => {
                  this.onChangeInput(event, "countSold");
                }}
              />
            </div>
            <div className="col-3 form-group">
              <label className="pb-2">Chọn ảnh sản phẩm</label>
              <div className="product-img__container">
                <input
                  id="productImg"
                  type="file"
                  hidden
                  onChange={(event) => this.handleOnChangeImage(event)}
                />
                <label
                  htmlFor="productImg"
                  className="label-upload pointer__event"
                >
                  Tải ảnh<i className="fas fa-upload"></i>
                </label>
                <div
                  className="product-img pointer-event"
                  style={{
                    backgroundImage: `url(${this.state.previewImgURL})`,
                  }}
                  onClick={() => this.openPreviewImage()}
                ></div>
              </div>
            </div>
          </div>
        </div>
        <div className="create-product__body my-5">
          <label className="mb-2">Tóm tắt sản phẩm</label>
          <MdEditor
            style={{ height: "300px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChangeContent}
            value={content}
          />
        </div>
        <div className="create-product__body my-5">
          <label className="mb-2">Mô tả sản phẩm</label>
          <MdEditor
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChangeDescription}
            value={description}
          />
        </div>
        <div className="update__button">
          <button
            className="btn btn-warning"
            onClick={() => this.handleUpdateProduct()}
          >
            Xác nhận chỉnh sửa
          </button>
        </div>

        {this.state.isOpen === true && (
          <Lightbox
            mainSrc={this.state.previewImgURL}
            onCloseRequest={() => this.setState({ isOpen: false })}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    products: state.product.products,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllProducts: () => dispatch(actions.getAllProductsStart()),
    updateProduct: (data) => dispatch(actions.updateProduct(data)),
    deleteProductStart: (id) => dispatch(actions.deleteProductStart(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProduct);
