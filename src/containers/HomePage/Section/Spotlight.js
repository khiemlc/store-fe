import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { changeLanguage } from "../../../store/actions";
import "./NoSlide.scss";
import { withRouter } from "react-router";

class Spotlight extends Component {
  getPrime = () => {
    setTimeout(() => {
      this.props.history.push(`/product-prime`);
    }, 100);
  };
  getTivi = () => {
    setTimeout(() => {
      this.props.history.push(`/tote`);
    }, 100);
  };
  changeLanguage = (language) => {
    this.props.changeLanguage(language);
  };
  render() {
    return (
      <div className="section-spotlight">
        <div className="section-spotlight__container">
          <ul className="spotlight">
            <li onClick={this.getPrime}>
              <div className="spl">
                <div className="spotlight__img prenium"></div>
                <span>
                  <FormattedMessage id="home__page.premium" />
                </span>
              </div>
            </li>
            <li onClick={this.getTivi}>
              <div className="spl">
                <div className="spotlight__img tivi"></div>
                <span>
                  <FormattedMessage id="home__page.tivi" />
                  <br />
                  <FormattedMessage id="home__page.upto" />
                </span>
              </div>
            </li>
            <li onClick={this.getPrime}>
              <div className="spl">
                <div className="spotlight__img prenium"></div>
                <span>
                  <FormattedMessage id="home__page.premium" />
                </span>
              </div>
            </li>
            <li onClick={this.getTivi}>
              <div className="spl">
                <div className="spotlight__img tivi"></div>
                <span>
                  <FormattedMessage id="home__page.tivi" />
                  <br />
                  <FormattedMessage id="home__page.upto" />
                </span>
              </div>
            </li>
          </ul>
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
  return {
    changeLanguage: (language) => dispatch(changeLanguage(language)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Spotlight)
);
