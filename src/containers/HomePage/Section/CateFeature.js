import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { changeLanguage } from "../../../store/actions";
import "./NoSlide.scss";
import { withRouter } from "react-router";

class CateFeature extends Component {
  goTivi = () => {
    setTimeout(() => {
      this.props.history.push(`/tote`);
    }, 100);
  };
  goFridge = () => {
    setTimeout(() => {
      this.props.history.push(`/fridge`);
    }, 100);
  };
  goRefresher = () => {
    setTimeout(() => {
      this.props.history.push(`/refresher`);
    }, 100);
  };
  goWashingMachine = () => {
    setTimeout(() => {
      this.props.history.push(`/washing-machine`);
    }, 100);
  };
  changeLanguage = (language) => {
    this.props.changeLanguage(language);
  };
  render() {
    return (
      <div className="section__cate-feature">
        <div className="cate-feature__container">
          <div className="cate-feature__header">
            <div className="header__title">
              <FormattedMessage id="home__page.featured_category" />
            </div>
          </div>
          <div className="cate-feature__body pointer__event">
            <div className="catefeature__item">
              <div className="catefeature__oneitem" onClick={this.goTivi}>
                <div className="feature__img tivi__img mx-auto" />
                <div className="feature__text">
                  <FormattedMessage id="body.tivi" />
                </div>
              </div>
              <div className="catefeature__oneitem" onClick={this.goFridge}>
                <div className="feature__img tulanh__img mx-auto" />
                <div className="feature__text">
                  <FormattedMessage id="body.fridge" />
                </div>
              </div>
              <div className="catefeature__oneitem" onClick={this.goTivi}>
                <div className="feature__img tivi__img mx-auto" />
                <div className="feature__text">
                  <FormattedMessage id="body.tivi" />
                </div>
              </div>
              <div className="catefeature__oneitem" onClick={this.goFridge}>
                <div className="feature__img tulanh__img mx-auto" />
                <div className="feature__text">
                  <FormattedMessage id="body.fridge" />
                </div>
              </div>
              <div className="catefeature__oneitem" onClick={this.goTivi}>
                <div className="feature__img tivi__img mx-auto" />
                <div className="feature__text">
                  <FormattedMessage id="body.tivi" />
                </div>
              </div>
              <div className="catefeature__oneitem" onClick={this.goFridge}>
                <div className="feature__img tulanh__img mx-auto" />
                <div className="feature__text">
                  <FormattedMessage id="body.fridge" />
                </div>
              </div>
              <div className="catefeature__oneitem" onClick={this.goTivi}>
                <div className="feature__img tivi__img mx-auto" />
                <div className="feature__text">
                  <FormattedMessage id="body.tivi" />
                </div>
              </div>
              <div className="catefeature__oneitem" onClick={this.goFridge}>
                <div className="feature__img tulanh__img mx-auto" />
                <div className="feature__text">
                  <FormattedMessage id="body.fridge" />
                </div>
              </div>
            </div>
            <div className="catefeature__item">
              <div className="catefeature__oneitem" onClick={this.goRefresher}>
                <div className="feature__img air__img mx-auto" />
                <div className="feature__text">
                  <FormattedMessage id="body.refresher" />
                </div>
              </div>
              <div
                className="catefeature__oneitem"
                onClick={this.goWashingMachine}
              >
                <div className="feature__img maygiat__img mx-auto" />
                <div className="feature__text">
                  <FormattedMessage id="body.washingmachine" />
                </div>
              </div>
              <div className="catefeature__oneitem" onClick={this.goRefresher}>
                <div className="feature__img air__img mx-auto" />
                <div className="feature__text">
                  <FormattedMessage id="body.refresher" />
                </div>
              </div>
              <div
                className="catefeature__oneitem"
                onClick={this.goWashingMachine}
              >
                <div className="feature__img maygiat__img mx-auto" />
                <div className="feature__text">
                  <FormattedMessage id="body.washingmachine" />
                </div>
              </div>
              <div className="catefeature__oneitem" onClick={this.goRefresher}>
                <div className="feature__img air__img mx-auto" />
                <div className="feature__text">
                  <FormattedMessage id="body.refresher" />
                </div>
              </div>
              <div
                className="catefeature__oneitem"
                onClick={this.goWashingMachine}
              >
                <div className="feature__img maygiat__img mx-auto" />
                <div className="feature__text">
                  <FormattedMessage id="body.washingmachine" />
                </div>
              </div>
              <div className="catefeature__oneitem" onClick={this.goRefresher}>
                <div className="feature__img air__img mx-auto" />
                <div className="feature__text">
                  <FormattedMessage id="body.refresher" />
                </div>
              </div>
              <div
                className="catefeature__oneitem"
                onClick={this.goWashingMachine}
              >
                <div className="feature__img maygiat__img mx-auto" />
                <div className="feature__text">
                  <FormattedMessage id="body.washingmachine" />
                </div>
              </div>
            </div>
          </div>
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
  connect(mapStateToProps, mapDispatchToProps)(CateFeature)
);
