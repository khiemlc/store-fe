import axios from "../axios";

const customerSignup = (data) => {
  return axios.post("/api/sign-up", data);
};
const GetUserById = (id) => {
  return axios.get(`/api/get-user-by-id?id=${id}`);
};
const editUserService = (data) => {
  return axios.put("/api/update-user", data);
};
export { customerSignup, GetUserById, editUserService };
