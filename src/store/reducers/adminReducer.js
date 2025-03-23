import actionTypes from "../actions/actionTypes";

const initialState = {
  // isLoggedIn: false,
  // adminInfo: null,
  customers: [],
  admins: [],
  products_topsold: [],
  products_topstock: [],
  products_topsoldfew: [],
  order_topmoney: [],
  statisticsOrder: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADMIN_LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        adminInfo: action.adminInfo,
      };
    case actionTypes.ADMIN_LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        adminInfo: null,
      };
    case actionTypes.PROCESS_LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        adminInfo: null,
      };
    case actionTypes.GET_ALL_CUS_SUCCESS:
      state.customers = action.customers;
      return {
        ...state,
      };
    case actionTypes.GET_ALL_CUS_FAIL:
      state.customers = [];
      return {
        ...state,
      };
    case actionTypes.GET_ALL_ADMIN_SUCCESS:
      state.admins = action.admins;
      return {
        ...state,
      };
    case actionTypes.GET_ALL_ADMIN_FAIL:
      state.admins = [];
      return {
        ...state,
      };
    case actionTypes.GET_TOP_SOLD_PRODUCTS_SUCCESS:
      state.products_topsold = action.products_topsold;
      return {
        ...state,
      };
    case actionTypes.GET_TOP_SOLD_PRODUCTS_FAIL:
      state.products_topsold = [];
      return {
        ...state,
      };
    case actionTypes.GET_TOP_SOLDFEW_PRODUCTS_SUCCESS:
      state.products_topsoldfew = action.products_topsoldfew;
      return {
        ...state,
      };
    case actionTypes.GET_TOP_SOLDFEW_PRODUCTS_FAIL:
      state.products_topsoldfew = [];
      return {
        ...state,
      };
    case actionTypes.GET_TOP_STOCK_PRODUCTS_SUCCESS:
      state.products_topstock = action.products_topstock;
      return {
        ...state,
      };
    case actionTypes.GET_TOP_STOCK_PRODUCTS_FAIL:
      state.products_topstock = [];
      return {
        ...state,
      };
    case actionTypes.GET_TOP_ORDER_MONEY_SUCCESS:
      state.order_topmoney = action.order_topmoney;
      return {
        ...state,
      };
    case actionTypes.GET_TOP_ORDER_MONEY_FAIL:
      state.order_topmoney = [];
      return {
        ...state,
      };
    case actionTypes.GET_ORDER_MONTH_SUCCESS:
      state.statisticsOrder = action.statisticsOrder;
      return {
        ...state,
      };
    case actionTypes.GET_ORDER_MONTH_FAIL:
      state.statisticsOrder = [];
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default adminReducer;
