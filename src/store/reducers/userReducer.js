import actionTypes from "../actions/actionTypes";

const localStorage_User =
  JSON.parse(localStorage?.getItem("shop_customer")) ||
  JSON.parse(localStorage?.getItem("shop_admin"));
const initialState = localStorage_User?.email
  ? { isLoggedIn: true, userInfo: localStorage_User }
  : {
      isLoggedIn: false,
      userInfo: null,
    };

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_LOGIN_SUCCESS:
      console.log("action" + JSON.stringify(action));
      localStorage.setItem("shop_admin", JSON.stringify(action.userInfo));
      return {
        ...state,
        isLoggedIn: true,
        userInfo: action.userInfo,
      };
    case actionTypes.USER_LOGIN_FAIL:
      localStorage.setItem("shop_admin", JSON.stringify(null));
      return {
        ...state,
        isLoggedIn: false,
        userInfo: null,
      };
    case actionTypes.PROCESS_LOGOUT:
      localStorage.setItem("shop_admin", JSON.stringify(null));
      return {
        ...state,
        isLoggedIn: false,
        userInfo: null,
      };
    default:
      return state;
  }
};

export default appReducer;
