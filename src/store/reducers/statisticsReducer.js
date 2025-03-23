import actionTypes from "../actions/actionTypes";

const initialState = {
  // isLoggedIn: false,
  // adminInfo: null,
  customers: [],
  admins: [],
};

const statisticsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_ADMIN_SUCCESS:
      state.admins = action.admins;
      return {
        ...state,
      };
    case actionTypes.GET_ALL_ADMIN_FAIL:
      state.admins = [];
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default statisticsReducer;
