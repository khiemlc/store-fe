import actionTypes from "../actions/actionTypes";

const initialState = {
  user: [],
};
const customerReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_A_USER_BY_ID_SUCCESS:
      state.user = action.user;
      return {
        ...state,
      };
    case actionTypes.GET_A_USER_BY_ID_FAIL:
      state.user = [];
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default customerReducer;
