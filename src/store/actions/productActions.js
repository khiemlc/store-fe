import actionTypes from "./actionTypes";
import { toast } from "react-toastify";
import {
  getAllProducts,
  deleteProduct,
  createProductService,
  UpdateProduct,
  getProductByType,
  getproductNew,
  getproductBought,
  getproductHot,
  productPrime,
  getProductByBrand,
  productGetSearch,
  productgetPercent,
} from "../../services/productService";
//product
//GET
export const getAllProductsStart = () => {
  return async (dispatch, getState) => {
    let res = await getAllProducts();
    if (res && res.errCode === 0) {
      dispatch({
        type: actionTypes.GET_ALL_PRODUCTS_SUCCESS,
        products: res.products,
      });
    } else {
      toast.error("Can not get products");
      dispatch(getAllProductsFail());
    }
    try {
    } catch (e) {
      toast.error("Can not get products");
      dispatch(getAllProductsFail());
    }
  };
};
export const getAllProductsFail = () => ({
  type: actionTypes.GET_ALL_PRODUCTS_FAIL,
});

export const productGetSearchStart = () => {
  return async (dispatch, getState) => {
    let res = await productGetSearch();
    if (res && res.errCode === 0) {
      dispatch({
        type: actionTypes.GET_PRODUCTS_SEARCH_SUCCESS,
        products_search: res.products,
      });
    } else {
      dispatch(productGetSearchFail());
    }
    try {
    } catch (e) {
      dispatch(productGetSearchFail());
    }
  };
};
export const productGetSearchFail = () => ({
  type: actionTypes.GET_PRODUCTS_SEARCH_FAIL,
});
//DELETE
export const deleteProductStart = (id) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteProduct(id);
      if (res && res.errCode === 0) {
        toast.success("Delete product succeed!");
        dispatch({
          type: actionTypes.DELETE_PRODUCT_SUCCESS,
        });
        dispatch(getAllProductsStart());
      } else {
        toast.error("Can not delete product");
        dispatch(deleteProductFailed());
      }
    } catch (e) {
      toast.error("Can not delete product");
      dispatch(deleteProductFailed());
    }
  };
};
export const deleteProductFailed = () => ({
  type: actionTypes.DELETE_PRODUCT_FAIL,
});
//create

export const createProduct = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createProductService(data);
      if (res && res.errCode === 0) {
        toast.success("Create a new product succeed!");
        dispatch({ type: actionTypes.CREATE_PRODUCT_SUCCESS });
        dispatch(getAllProductsStart());
      } else {
        toast.error(res.errMessage);
        dispatch(createProductFailed());
      }
    } catch (e) {
      toast.error("Can not create product");
      dispatch(createProductFailed());
    }
  };
};
export const createProductFailed = () => ({
  type: actionTypes.CREATE_PRODUCT_FAIL,
});

//EDIT
export const updateProduct = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await UpdateProduct(data);
      if (res && res.errCode === 0) {
        toast.success("Update product succeed!");
        dispatch({
          type: actionTypes.UPDATE_PRODUCT_SUCCESS,
        });
      } else {
        toast.error("Can not update product");
        dispatch(updateProductFailed());
      }
    } catch (e) {
      toast.error("Can not update product");
      dispatch(updateProductFailed());
    }
  };
};
export const updateProductFailed = () => ({
  type: actionTypes.UPDATE_PRODUCT_FAIL,
});
//get by type
export const getProductByTypeStart = (type) => {
  return async (dispatch, getState) => {
    let res = await getProductByType(type);
    if (res && res.errCode === 0) {
      dispatch({
        type: actionTypes.GET_PRODUCTS_BYTYPE_SUCCESS,
        products: res.products,
      });
    } else {
      dispatch(getProductByTypeFail());
    }
    try {
    } catch (e) {
      dispatch(getProductByTypeFail());
    }
  };
};
export const getProductByTypeFail = () => ({
  type: actionTypes.GET_PRODUCTS_BYTYPE_FAIL,
});

export const getProductByBrandStart = (brand) => {
  return async (dispatch, getState) => {
    let res = await getProductByBrand(brand);
    if (res && res.errCode === 0) {
      dispatch({
        type: actionTypes.GET_PRODUCTS_BY_BRAND_SUCCESS,
        products: res.products,
      });
    } else {
      dispatch(getProductByBrandFail());
    }
    try {
    } catch (e) {
      dispatch(getProductByBrandFail());
    }
  };
};
export const getProductByBrandFail = () => ({
  type: actionTypes.GET_PRODUCTS_BY_BRAND_FAIL,
});

//GET STICKER
export const getproductHotStart = () => {
  return async (dispatch, getState) => {
    let res = await getproductHot();
    if (res && res.errCode === 0) {
      dispatch({
        type: actionTypes.GET_PRODUCTS_HOT_SUCCESS,
        products_hot: res.products,
      });
    } else {
      toast.error("Can not get products");
      dispatch(getproductHotFail());
    }
    try {
    } catch (e) {
      toast.error("Can not get products");
      dispatch(getproductHotFail());
    }
  };
};
export const getproductHotFail = () => ({
  type: actionTypes.GET_PRODUCTS_HOT_FAIL,
});

export const getproductNewStart = () => {
  return async (dispatch, getState) => {
    let res = await getproductNew();
    if (res && res.errCode === 0) {
      dispatch({
        type: actionTypes.GET_PRODUCTS_NEW_SUCCESS,
        products_new: res.products,
      });
    } else {
      dispatch(getproductNewFail());
    }
    try {
    } catch (e) {
      dispatch(getproductNewFail());
    }
  };
};
export const getproductNewFail = () => ({
  type: actionTypes.GET_PRODUCTS_NEW_FAIL,
});

export const getproductBoughtStart = () => {
  return async (dispatch, getState) => {
    let res = await getproductBought();
    if (res && res.errCode === 0) {
      dispatch({
        type: actionTypes.GET_PRODUCTS_BOUGHT_SUCCESS,
        products_bought: res.products,
      });
    } else {
      dispatch(getproductBoughtFail());
    }
    try {
    } catch (e) {
      dispatch(getproductBoughtFail());
    }
  };
};
export const getproductBoughtFail = () => ({
  type: actionTypes.GET_PRODUCTS_BOUGHT_FAIL,
});

export const productPrimeStart = () => {
  return async (dispatch, getState) => {
    let res = await productPrime();
    if (res && res.errCode === 0) {
      dispatch({
        type: actionTypes.GET_PRODUCTS_PRIME_SUCCESS,
        products_prime: res.products,
      });
    } else {
      dispatch(productPrimeFail());
    }
    try {
    } catch (e) {
      dispatch(productPrimeFail());
    }
  };
};
export const productPrimeFail = () => ({
  type: actionTypes.GET_PRODUCTS_PRIME_FAIL,
});

export const productgetPercentStart = () => {
  return async (dispatch, getState) => {
    let res = await productgetPercent();
    if (res && res.errCode === 0) {
      dispatch({
        type: actionTypes.GET_PRODUCTS_PERCENT_SUCCESS,
        products_per: res.products,
      });
    } else {
      dispatch(productgetPercentFail());
    }
    try {
    } catch (e) {
      dispatch(productgetPercentFail());
    }
  };
};
export const productgetPercentFail = () => ({
  type: actionTypes.GET_PRODUCTS_PERCENT_FAIL,
});
