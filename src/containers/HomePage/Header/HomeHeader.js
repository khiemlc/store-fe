import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../utils";
import { changeLanguage } from "../../../store/actions";
import { withRouter } from "react-router";
import { push } from "connected-react-router";
import * as actions from "../../../store/actions";
import Select from "react-select";
import { getProductById } from "../../../services/productService";

class HomeHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      selectedOption: "",
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.props.productGetSearchStart();
    }, 200);
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.products !== this.props.products) {
      let dataSelect = this.buildDataInputSelect(this.props.products);
      this.setState({ products: dataSelect });
    }
  }

  //search
  handleChangeSelect = async (selectedOption, name) => {
    this.setState({ selectedOption });
    setTimeout(() => {
      this.props.history.push(`/home`);
    }, 10);

    setTimeout(() => {
      this.props.history.push(`/product-detail/${selectedOption.value}`);
      this.setState({ selectedOption: "" });
    }, 100);
  };
  buildDataInputSelect = (inputData) => {
    let result = [];
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {};
        object.label = item.type + " " + item.name;
        object.value = item.id;
        result.push(object);
      });
    }
    return result;
  };
  changeLanguage = (language) => {
    this.props.changeLanguage(language);
  };
  returnToHome = () => {
    if (this.props.history) {
      this.props.history.push(`/home`);
    }
  };
  getLogin = () => {
    this.props.history.push(`/login`);
  };
  getSignUp = () => {
    setTimeout(() => {
      this.props.navigate(`/signup`);
    }, 100);
  };
  getNews = () => {
    this.props.history.push(`/news`);
  };
  handleLogout = () => {
    this.props.processLogout();
    this.props.navigate("/login");
  };
  getTivi = () => {
    this.props.navigate("/tote");
  };
  getFridge = () => {
    this.props.navigate("/fridge");
  };
  getRefresher = () => {
    this.props.navigate("/refresher");
  };
  getWashingMachine = () => {
    this.props.navigate("/washing-machine");
  };
  goCart = () => {
    this.props.navigate("/cart");
  };
  goAccount = (string) => {
    setTimeout(() => {
      this.props.navigate("/account");
    }, 100);
  };
  goAdminPage = () => {
    const { navigate } = this.props;
    const redirectPath = "/system/order-checking";
    navigate(`${redirectPath}`);
  };
  goHot = () => {
    setTimeout(() => {
      this.props.history.push(`/product-hot`);
    }, 100);
  };

  render() {
    let language = this.props.language;
    let { isLoggedIn, processLogout, userInfo } = this.props;

    return (
      <React.Fragment>
        <div className="header__container">
          <div className="header__navbar">
            <div className="header__logo">
              <div
                className="logo pointer__event"
                onClick={() => this.returnToHome()}
              >

              </div>
              <div style={{ color: "white", fontSize: "20px", fontWeight: "bold", marginLeft: "-50px" }}>
                <FormattedMessage id="header__navbar.name_shop" />

              </div>
            </div>
            <div className="header__search">
              {/* <input type="text" placeholder="Bạn tìm gì..."> */}
              <div className="search">
                <Select
                  className="select"
                  placeholder=<FormattedMessage id="header__navbar.search" />
                  value={this.state.selectedOption}
                  onChange={this.handleChangeSelect}
                  options={this.state.products}
                />
              </div>

              {/* </input> */}
              <i className="fas fa-search pointer__event"></i>
            </div>
            <div className="header__info">
              <div className="info__child pointer__event" onClick={this.goCart}>
                <i className="fas fa-shopping-cart"></i>
                <div className="child__content">
                  <FormattedMessage id="header__navbar.cart" />
                </div>
              </div>
              <div
                className="info__child pointer__event"
                onClick={() => this.getLogin()}
              >
                <i className="fas fa-user"></i>{" "}
                {isLoggedIn === false && (
                  <div className="child__content">
                    <FormattedMessage id="header__navbar.user" />
                    <div className="user__menu">
                      <ul>
                        <li className="welcome">
                          <FormattedMessage id="header__navbar.pleaselogin" />
                        </li>
                        <li
                          className="button"
                          onClick={() => this.handleLogout()}
                        >
                          <FormattedMessage id="header__navbar.login" />
                        </li>
                        <li className="button" onClick={() => this.getSignUp()}>
                          <FormattedMessage id="header__navbar.register" />
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
                {isLoggedIn === true && (
                  <div className="child__content">
                    {userInfo?.fullName}
                    <div className="user__menu">
                      <ul>
                        <li className="welcome">
                          <FormattedMessage id="header__navbar.hello" />
                          {userInfo?.fullName}
                        </li>

                        <li className="button" onClick={() => this.goAccount()}>
                          <i className="fas fa-folder-open"></i>
                          <span>
                            <FormattedMessage id="header__navbar.manage-account" />
                          </span>
                        </li>
                        {userInfo?.roleId === "0" && (
                          <li
                            className="button"
                            onClick={() => this.goAdminPage()}
                          >
                            <i className="fas fa-folder-open"></i>
                            <span>
                              <FormattedMessage id="header__navbar.admin-page" />
                            </span>
                          </li>
                        )}

                        <li
                          className="button"
                          onClick={() => this.handleLogout()}
                        >
                          <i className="fas fa-sign-out-alt"></i>
                          <span>
                            <FormattedMessage id="header__navbar.logout" />
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="header__language">
              <div className="language language--vi pointer__event">
                <span onClick={() => this.changeLanguage(LANGUAGES.VI)}>
                  VN
                </span>
              </div>
              <div className="language language--en pointer__event">
                <span onClick={() => this.changeLanguage(LANGUAGES.EN)}>
                  EN
                </span>
              </div>
            </div>
          </div>
          <div className="header__menu">
            <div className="header__category pointer__event hover__event--blue">
              <i className="fas fa-bars"></i>
              <div className="option_content hover__event--bigger">
                <FormattedMessage id="header__menu.category" />
              </div>
              <i className="fas fa-sort-down"></i>
              <div className="submenu">
                <ul>
                  <li className="hover__event--bigger" onClick={this.getTivi}>
                    <i className="fas fa-tv"></i>
                    <span>
                      <FormattedMessage id="body.tote" />
                    </span>
                    <i className="fas fa-chevron-right posi-left"></i>
                  </li>
                  {/* <li className="hover__event--bigger" onClick={this.getTivi}>
                    <i className="fas fa-tv"></i>
                    <span>
                      <FormattedMessage id="body.necklace" />
                    </span>
                    <i className="fas fa-chevron-right posi-left"></i>
                  </li> */}
                </ul>
              </div>
            </div>
            <div className="header__support">
              <div className="options pointer__event hover__event--blue">
                <i className="fas fa-book"></i>
                <div
                  className="option_content option--hover hover__event--bigger"
                  onClick={() => this.getNews()}
                >
                  <FormattedMessage id="header__menu.news" />
                </div>
              </div>
              <div
                className="options pointer__event hover__event--blue"
                onClick={() => this.goHot()}
              >
                <i className="fas fa-percent"></i>
                <div className="option_content option--hover hover__event--bigger">
                  <FormattedMessage id="header__menu.promotion" />
                </div>
              </div>
         
              <div className="options pointer__event hover__event--blue">
                <i className="fas fa-phone-volume"></i>
                <div className="option_content hover__event--bigger">
                  <FormattedMessage id="header__menu.advisory" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    userInfo: state.user.userInfo,
    products: state.product.products_search,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguage: (language) => dispatch(changeLanguage(language)),
    processLogout: () => dispatch(actions.processLogout()),
    navigate: (path) => dispatch(push(path)),
    productGetSearchStart: () => dispatch(actions.productGetSearchStart()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeHeader)
);
