export const actionTypes = {
  LOGIN_REQUEST: "login_request",
  LOGIN_SUCCESS: "login_success",
  LOGIN_ERROR: "login_error",
  LOGOUT: "logout",
};

export const initState = {
  user: null,
  loading: false,
  error: null,
};
export const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        user: null,
        loading: false,
      };
    case actionTypes.LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
      };

    default:
      return state;
  }
};
