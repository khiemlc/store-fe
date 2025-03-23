import { Route, Switch } from "react-router-dom";
import { path } from "../utils";
import Home from "../routes/Home";

const AppRoutes = (props) => {
  return (
    <>
      <Switch>
        {/* <Route path="/" exact component={Home} /> */}
        {/* <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} />
        <Route path={path.SIGNUP} component={userIsNotAuthenticated(Login)} />
        <Route path={path.SYSTEM} component={userIsAuthenticated(System)} />
        <Route path={path.HOMEPAGE} component={HomePage} />
        <Route path={path.PRODUCT} component={ProductPage} />
        <Route path={path.PRODUCT_DETAIL} component={ProductDetail} />
        <Route path={path.NOPAGE} component={NotFoundPage} /> */}
      </Switch>
    </>
  );
};
export default AppRoutes;
