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
    case "FOLLOW":
      return {
        ...state,
        user: {
          ...state.user,
          following: [...state.user.following, action.payload],
        },
      };
    case "UNFOLLOW":
      return {
        ...state,
        user: {
          ...state.user,
          following: state.user.following.filter(
            (following) => following != action.payload
          ),
        },
      };
    case "JOIN":
      return {
        ...state,
        user: {
          ...state.user,
          courses: [...state.user.courses, action.payload],
        },
      };
    case "LEAVE":
      return {
        ...state,
        user: {
          ...state.user,
          courses: state.user.courses.filter(
            (course) => course != action.payload
          ),
        },
      };
    case "UPDATE":
      return {
        ...state,
        user: {
          ...action.payload,
        },
      };
  }
};

export default UserReducer;
