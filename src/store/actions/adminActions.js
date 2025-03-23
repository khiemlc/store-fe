import actionTypes from "./actionTypes";
import { toast } from "react-toastify";
import {
  customerGetAll,
  adminGetAll,
  updateCustomerExtra,
  getTopProductSold,
  getTopProductStock,
  getTopProductSoldFew,
  getTopOrderMoney,
  getOneYear,
} from "../../services/adminService";
export const customerGetAllStart = (id) => {
  return async (dispatch, getState) => {
    let res = await customerGetAll();

    if (res && res.errCode === 0) {
      dispatch({
        type: actionTypes.GET_ALL_CUS_SUCCESS,
        customers: res.customer,
      });
    } else {
      dispatch(customerGetAllFail());
    }
    try {
    } catch (e) {
      dispatch(customerGetAllFail());
    }
  };
};
export const customerGetAllFail = () => ({
  type: actionTypes.GET_ALL_CUS_FAIL,
});
export const adminGetAllStart = (id) => {
  return async (dispatch, getState) => {
    let res = await adminGetAll();

    if (res && res.errCode === 0) {
      dispatch({
        type: actionTypes.GET_ALL_ADMIN_SUCCESS,
        admins: res.admin,
      });
    } else {
      dispatch(adminGetAllFail());
    }
    try {
    } catch (e) {
      dispatch(adminGetAllFail());
    }
  };
};
export const adminGetAllFail = () => ({
  type: actionTypes.GET_ALL_ADMIN_FAIL,
});
export const updateCustomerExtraStart = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await updateCustomerExtra(data);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.UPDATE_CUS_EXTRA_SUCCESS,
        });
      } else {
        dispatch(updateCustomerExtraFailed());
      }
    } catch (e) {
      dispatch(updateCustomerExtraFailed());
    }
  };
};
export const updateCustomerExtraFailed = () => ({
  type: actionTypes.UPDATE_CUS_EXTRA_FAIL,
});
//statistic
//product
export const getTopProductSoldStart = () => {
  return async (dispatch, getState) => {
    let res = await getTopProductSold();
    if (res && res.errCode === 0) {
      dispatch({
        type: actionTypes.GET_TOP_SOLD_PRODUCTS_SUCCESS,
        products_topsold: res.products,
      });
    } else {
      dispatch(getTopProductSoldFail());
    }
    try {
    } catch (e) {
      dispatch(getTopProductSoldFail());
    }
  };
};
export const getTopProductSoldFail = () => ({
  type: actionTypes.GET_TOP_SOLD_PRODUCTS_FAIL,
});
export const getTopProductSoldFewStart = () => {
  return async (dispatch, getState) => {
    let res = await getTopProductSoldFew();
    if (res && res.errCode === 0) {
      dispatch({
        type: actionTypes.GET_TOP_SOLDFEW_PRODUCTS_SUCCESS,
        products_topsoldfew: res.products,
      });
    } else {
      dispatch(getTopProductSoldFewFail());
    }
    try {
    } catch (e) {
      dispatch(getTopProductSoldFewFail());
    }
  };
};
export const getTopProductSoldFewFail = () => ({
  type: actionTypes.GET_TOP_SOLDFEW_PRODUCTS_FAIL,
});
export const getTopProductStockStart = () => {
  return async (dispatch, getState) => {
    let res = await getTopProductStock();
    if (res && res.errCode === 0) {
      dispatch({
        type: actionTypes.GET_TOP_STOCK_PRODUCTS_SUCCESS,
        products_topstock: res.products,
      });
    } else {
      dispatch(getTopProductStockFail());
    }
    try {
    } catch (e) {
      dispatch(getTopProductStockFail());
    }
  };
};
export const getTopProductStockFail = () => ({
  type: actionTypes.GET_TOP_STOCK_PRODUCTS_FAIL,
});
//order
export const getTopOrderMoneyStart = () => {
  return async (dispatch, getState) => {
    let res = await getTopOrderMoney();
    if (res && res.errCode === 0) {
      dispatch({
        type: actionTypes.GET_TOP_ORDER_MONEY_SUCCESS,
        order_topmoney: res.order,
      });
    } else {
      dispatch(getTopOrderMoneyFail());
    }
    try {
    } catch (e) {
      dispatch(getTopOrderMoneyFail());
    }
  };
};
export const getTopOrderMoneyFail = () => ({
  type: actionTypes.GET_TOP_ORDER_MONEY_FAIL,
});
export const getOneYearStart = () => {
  return async (dispatch, getState) => {
    let res = await getOneYear();
    if (res && res.errCode === 0) {
      dispatch({
        type: actionTypes.GET_ORDER_MONTH_SUCCESS,
        statisticsOrder: res.statisticsOrder,
      });
    } else {
      dispatch(getOneYearFail());
    }
    try {
    } catch (e) {
      dispatch(getOneYearFail());
    }
  };
};
export const getOneYearFail = () => ({
  type: actionTypes.GET_ORDER_MONTH_FAIL,
});
