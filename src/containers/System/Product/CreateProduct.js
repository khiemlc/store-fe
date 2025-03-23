import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./CreateProduct.scss";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import * as actions from "../../../store/actions";
import { CommonUtils } from "../../../utils";
const mdParser = new MarkdownIt(/* Markdown-it options */);

class CreateProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      type: "Tote",
      initPrice: "",
      truePrice: "",
      percent: "",
      isHot: 0,
      isTopSearch: 0,
      isBoughtMany: 0,
      isNew: 1,
      countInStock: "",
      countSold: 0,
      avatar: "",
      isOpen: false,
      previewImgURL: "",
      content: "",
      contentHTML: "",

      description: "",
      descriptionHTML: "",
    };
  }
  componentDidMount() { }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.products !== this.props.products) {
      this.setState({
        name: "",
        type: "",
        initPrice: "",
        truePrice: "",
        percent: "",
        isHot: 0,
        isTopSearch: 0,
        isBoughtMany: 0,
        isNew: 1,
        countInStock: "",
        countSold: 0,
        avatar: "",
        previewImgURL: "",
        content: "",
        contentHTML: "",
        description: "",
        descriptionHTML: "",
      });
    }
  }
  // Finish!

  //img
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
  checkValidateInput = () => {
    let isValid = true;
    let arrCheck = ["name", "type", "initPrice", "countInStock", "avatar"];
    for (let i = 0; i < arrCheck.length; i++) {
      if (!this.state[arrCheck[i]]) {
        isValid = false;
        alert("this input is required: " + arrCheck[i]);
        break;
      }
    }
    return isValid;
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

  //create
  handleCreateProduct = () => {
    let isValid = this.checkValidateInput();

    if (isValid === false) {
      return;
    } else {
      this.props.createProduct({
        name: this.state.name,
        type: this.state.type,
        initPrice: this.state.initPrice,
        truePrice: this.state.truePrice,
        percent: this.state.percent,
        isHot: this.state.isHot,
        isTopSearch: this.state.isTopSearch,
        isBoughtMany: this.state.isBoughtMany,
        isNew: 1,
        countInStock: this.state.countInStock,
        countSold: 0,
        content: this.state.content,
        avatar: this.state.avatar,
        contentHTML: this.state.contentHTML,
        description: this.state.description,
        descriptionHTML: this.state.descriptionHTML,
      });
    }
  };
  render() {
    let {
      name,
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
    } = this.state;
    let percent;
    // this.state.percent = (this.state.truePrice / this.state.initPrice) * 100;
    this.state.percent = Math.ceil(
      ((this.state.initPrice - this.state.truePrice) / this.state.initPrice) *
      100
    );

    return (
      <div className="create-product__container">
        {/* <div className="title mb-3">Quản lý sản phẩm</div> */}
        <div className="create-product__body">
          <div className="row mb-4">
            <div className="col-6 form-group ">
              <label className="pb-2">Tên sản phẩm</label>
              <input
                className="form-control"
                type="text"
                value={name}
                onChange={(event) => {
                  this.onChangeInput(event, "name");
                }}
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
                <option>Vòng Tay</option>
                <option>Vòng Cổ</option>

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
          </div>
          <div className="row">
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
              <label className="pb-2">Sản phẩm Top</label>
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
        <button
          className="btn btn-primary"
          onClick={() => this.handleCreateProduct()}
        >
          Thêm sản phẩm
        </button>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createProduct: (data) => dispatch(actions.createProduct(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateProduct);
