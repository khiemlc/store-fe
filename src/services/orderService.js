import axios from "../axios";
// order
const orderCreateService = (data) => {
  return axios.post("/api/order-create", data);
};
const cartUpdateAfterOrder = (data) => {
  return axios.post(`/api/update-cart-after-order`, data);
};
const getOrderById = (id) => {
  return axios.get(`/api/get-order-by-id?id=${id}`);
};

const updateProductCount = (data) => {
  return axios.put(`/api/update-product-count`, data);
};

const orderCancel = (data) => {
  return axios.post(`/api/status-order-cancel-req`, data);
};

const getOrderByUserId = (id) => {
  return axios.get(`/api/get-order-by-userId?id=${id}`);
};
//CART
const addCartService = (data) => {
  return axios.post("/api/cart-add", data);
};

const getAllCartItem = (userId) => {
  return axios.get(`/api/cart-getAll?userId=${userId}`);
};
const deleteCart = (id) => {
  return axios.delete("/api/cart-delete", {
    data: {
      id: id,
    },
  });
};
const UpdateCart = (data) => {
  return axios.post(`/api/update-cart`, data);
};
const getCartByOrderId = (id) => {
  return axios.get(`/api/get-cart-by-orderId?id=${id}`);
};
//order admin
const getOrderChecking = () => {
  return axios.get(`/api/get-order-checking`);
};
const getOrderByStatus = (status) => {
  return axios.get(`/api/get-order-status?id=${status}`);
};
const orderDelete = (id) => {
  return axios.delete("/api/order-delete", {
    data: {
      id: id,
    },
  });
};
const orderUpdate = (data) => {
  return axios.post(`/api/update-order`, data);
};
const orderUpdateStatus = (data) => {
  return axios.post(`/api/update-order-status`, data);
};
export {
  addCartService,
  getAllCartItem,
  deleteCart,
  UpdateCart,
  orderCreateService,
  cartUpdateAfterOrder,
  getOrderById,
  getCartByOrderId,
  orderCancel,
  getOrderByUserId,
  getOrderChecking,
  orderDelete,
  orderUpdate,
  orderUpdateStatus,
  getOrderByStatus,
  updateProductCount,
};
