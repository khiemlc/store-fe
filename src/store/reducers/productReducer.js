import actionTypes from "../actions/actionTypes";

const initialState = {
  products: [],
  products_hot: [],
  products_new: [],
  products_bought: [],
  products_prime: [],
  products_search: [],
  products_per: [],
};
const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_PRODUCTS_SUCCESS:
      state.products = action.products;
      return {
        ...state,
      };
    case actionTypes.GET_ALL_PRODUCTS_FAIL:
      state.products = [];
      return {
        ...state,
      };
    case actionTypes.GET_PRODUCTS_SEARCH_SUCCESS:
      state.products_search = action.products_search;
      return {
        ...state,
      };
    case actionTypes.GET_PRODUCTS_SEARCH_FAIL:
      state.products_search = [];
      return {
        ...state,
      };
    case actionTypes.GET_PRODUCTS_BYTYPE_SUCCESS:
      state.products = action.products;
      return {
        ...state,
      };
    case actionTypes.GET_PRODUCTS_BYTYPE_FAIL:
      state.products = [];
      return {
        ...state,
      };
    case actionTypes.GET_PRODUCTS_HOT_SUCCESS:
      state.products_hot = action.products_hot;
      return {
        ...state,
      };
    case actionTypes.GET_PRODUCTS_HOT_FAIL:
      state.products_hot = [];
      return {
        ...state,
      };
    case actionTypes.GET_PRODUCTS_NEW_SUCCESS:
      state.products_new = action.products_new;
      return {
        ...state,
      };
    case actionTypes.GET_PRODUCTS_NEW_FAIL:
      state.products_new = [];
      return {
        ...state,
      };
    case actionTypes.GET_PRODUCTS_BOUGHT_SUCCESS:
      state.products_bought = action.products_bought;
      return {
        ...state,
      };
    case actionTypes.GET_PRODUCTS_BOUGHT_FAIL:
      state.products_bought = [];
      return {
        ...state,
      };
    case actionTypes.GET_PRODUCTS_PRIME_SUCCESS:
      state.products_prime = action.products_prime;
      return {
        ...state,
      };
    case actionTypes.GET_PRODUCTS_PRIME_FAIL:
      state.products_prime = [];
      return {
        ...state,
      };
    case actionTypes.GET_PRODUCTS_BY_BRAND_SUCCESS:
      state.products = action.products;
      return {
        ...state,
      };
    case actionTypes.GET_PRODUCTS_BY_BRAND_FAIL:
      state.products = [];
      return {
        ...state,
      };
    case actionTypes.GET_PRODUCTS_PERCENT_SUCCESS:
      state.products_per = action.products_per;
      return {
        ...state,
      };
    case actionTypes.GET_PRODUCTS_PERCENT_FAIL:
      state.products_per = [];
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default productReducer;
