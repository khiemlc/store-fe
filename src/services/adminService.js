import axios from "../axios";

const createProductService = (data) => {
  return axios.post("/api/product-create", data);
};
const customerGetAll = () => {
  return axios.get(`/api/get-all-customers`);
};
const adminGetAll = () => {
  return axios.get(`/api/get-all-admins`);
};
const updateCustomerExtra = (data) => {
  return axios.post(`/api/update-customer-extra`, data);
};

//statistic
const getTopProductSold = () => {
  return axios.get(`/api/get-top-product-sold`);
};
const getTopProductStock = () => {
  return axios.get(`/api/get-top-product-stock`);
};
const getTopProductSoldFew = () => {
  return axios.get(`/api/get-top-product-sold-few`);
};

const getTopOrderMoney = () => {
  return axios.get(`/api/get-top-order-money`);
};
const getOneYear = () => {
  return axios.get(`/api/get-oneyear`);
};
export {
  createProductService,
  customerGetAll,
  adminGetAll,
  updateCustomerExtra,
  getTopProductSold,
  getTopProductStock,
  getTopProductSoldFew,
  getTopOrderMoney,
  getOneYear,
};
