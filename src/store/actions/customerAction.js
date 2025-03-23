import actionTypes from "./actionTypes";
import { toast } from "react-toastify";
import { GetUserById, editUserService } from "../../services/customerService";
export const GetUserByIdStart = (id) => {
  return async (dispatch, getState) => {
    let res = await GetUserById(id);
    if (res && res.errCode === 0) {
      dispatch({
        type: actionTypes.GET_A_USER_BY_ID_SUCCESS,
        user: res.user,
      });
    } else {
      dispatch(GetUserByIdFail());
    }
    try {
    } catch (e) {
      dispatch(GetUserByIdFail());
    }
  };
};
export const GetUserByIdFail = () => ({
  type: actionTypes.GET_A_USER_BY_ID_FAIL,
});
export const editUser = (user) => {
  return async (dispatch, getState) => {
    try {
      let res = await editUserService(user);
      if (res && res.errCode === 0) {
        toast.success("Update succeed!");
        dispatch(editUserSuccess());
      } else {
        toast.error("Can not edit!!!");
        dispatch(editUserFailed());
      }
    } catch (e) {
      toast.error("Can not edit!!!");
      dispatch(editUserFailed());
      console.log("editUserFailed err", e);
    }
  };
};
export const editUserSuccess = () => ({
  type: actionTypes.EDIT_USER_SUCCESS,
});
export const editUserFailed = () => ({
  type: actionTypes.EDIT_USER_FAILED,
});
