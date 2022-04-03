const UserReducer = (state, action) => {
  switch (action.type) {
    case "LOGOUT":
      return {
        user: null,
        isFetching: false,
        error: null,
      };
    case "LOGIN_START":
      return {
        user: null,
        isFetching: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        isFetching: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        isFetching: false,
        error: action.payload,
      };
  }
};

export default UserReducer;
