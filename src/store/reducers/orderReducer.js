import actionTypes from "../actions/actionTypes";

const initialState = {
  cart: [],
  order: [],
  cartOrder: [],
  orderUserId: [],
  orderChecking: [],
  orderStatus: [],
};
const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_CART_BY_USER:
      state.cart = action.cart;
      return {
        ...state,
      };
    case actionTypes.GET_CART_BY_USER_FAIL:
      state.cart = [];
      return {
        ...state,
      };
    case actionTypes.CREATE_ORDER_SUCCESS:
      state.order = action.order;
      return {
        ...state,
      };
    case actionTypes.CREATE_ORDER_FAIL:
      state.cart = [];
      return {
        ...state,
      };
    case actionTypes.GET_CART_BY_ID_SUCCESS:
      state.cartOrder = action.cartOrder;

      return {
        ...state,
      };
    case actionTypes.GET_CART_BY_ID_FAIL:
      state.cartOrder = [];

      return {
        ...state,
      };
    case actionTypes.GET_CART_BY_USERID_SUCCESS:
      state.orderUserId = action.orderUserId;
      return {
        ...state,
      };
    case actionTypes.GET_CART_BY_USERID_FAIL:
      state.orderUserId = [];
      return {
        ...state,
      };
    case actionTypes.GET_CHECKING_ORDER_SUCCESS:
      state.orderChecking = action.orderChecking;
      return {
        ...state,
      };
    case actionTypes.GET_CHECKING_ORDER_FAIL:
      state.orderChecking = [];
      return {
        ...state,
      };
    case actionTypes.GET_ORDER_BY_STATUS_SUCCESS:
      state.orderStatus = action.order;
      return {
        ...state,
      };
    case actionTypes.GET_ORDER_BY_STATUS_FAIL:
      state.orderStatus = [];
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default orderReducer;
