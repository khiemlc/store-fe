import axios from "../axios";

const handleLoginApi = (email, password, action) => {
  console.log({
    email,
    password,
    action,
  });
  return axios.post("/api/login", { email, password, action });
};

const getAllUsers = (id) => {
  console.log("check id in service", id);
  return axios.get(`/api/get-all-users?id=${id}`);
};

const createNewUserService = (data) => {
  return axios.post("/api/create-users", data);
};

const deleteUserService = (id) => {
  return axios.delete("/api/delete-user", {
    data: {
      id: id,
    },
  });
};

const editUserService = (data) => {
  return axios.put("/api/update-user", data);
};
const getUserById = (id) => {
  console.log("=============check", id);
  return axios.get(`/api/get-user-by-id?id=${id}`);
};
// product
const getAllProducts = (id) => {
  return axios.get(`/api/get-all-products?id=${id}`);
};

export {
  handleLoginApi,
  getAllUsers,
  createNewUserService,
  deleteUserService,
  editUserService,
  getAllProducts,
  getUserById,
};
