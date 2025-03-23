import axios from "../axios";
// product
const createProductService = (data) => {
  return axios.post("/api/product-create", data);
};

const getAllProducts = () => {
  return axios.get(`/api/get-all-products`);
};
const productGetSearch = () => {
  return axios.get(`/api/get-products-search`);
};
const deleteProduct = (id) => {
  return axios.delete("/api/delete-product", {
    data: {
      id: id,
    },
  });
};

const getProductById = (id) => {
  return axios.get(`/api/get-product-by-id?id=${id}`);
};
const UpdateProduct = (data) => {
  return axios.post(`/api/update-product`, data);
};
const getProductByType = (type) => {
  return axios.get(`/api/get-all-products-type?type=${type}`);
};
const getProductByBrand = (brand) => {
  return axios.get(`/api/get-all-products-brand?brand=${brand}`);
};
const getproductNew = () => {
  return axios.get(`/api/get-all-products-new`);
};
const getproductBought = () => {
  return axios.get(`/api/get-all-products-bought`);
};
const getproductHot = () => {
  return axios.get(`/api/get-all-products-hot`);
};
const productPrime = () => {
  return axios.get(`/api/get-all-products-prime`);
};
const productgetPercent = () => {
  return axios.get(`/api/get-percent`);
};
export {
  getAllProducts,
  deleteProduct,
  createProductService,
  getProductById,
  UpdateProduct,
  getProductByType,
  getproductNew,
  getproductBought,
  getproductHot,
  productPrime,
  getProductByBrand,
  productGetSearch,
  productgetPercent,
};
