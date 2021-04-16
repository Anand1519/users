import {
  SIGNUP,
  LOADING,
  STATUS,
  LOGIN,
  LOGOUT,
  CURRENT_USER,
  UPDATE_PROFILE,
} from "store/actionType";
import {
  getFromStorage,
  saveToStorage,
  removeFromStorage,
} from "services/local-storage";

const getCurrentUser = () => {
  const users = getFromStorage("users");
  const userId = getFromStorage("token");
  return users.find((item) => item.id === userId);
};
const initialData = {
  loading: false,
  users: getFromStorage("users") || [],
  data: {},
  signup: false,
  currentUser: getCurrentUser() || {},
  auth: getFromStorage("token"),
};

export default function user(state = initialData, action) {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: !state.loading };
    case SIGNUP:
      return {
        ...state,
        ...action.payload,
        data: {},
        signup: true,
        loading: false,
      };
    case LOGIN:
      saveToStorage("token", action.id);
      return {
        ...state,
        ...action.payload,
        data: {},
        currentUser: getCurrentUser(),
        auth: action.id,
        loading: false,
      };
    case LOGOUT:
      removeFromStorage("token");
      return {
        ...state,
        ...action.payload,
        data: {},
        auth: "",
        loading: false,
      };
    case CURRENT_USER:
      let currentUser = getCurrentUser();
      if (currentUser) {
        return { ...state, currentUser };
      } else {
        removeFromStorage("token");
        return { ...state, auth: "" };
      }
    case UPDATE_PROFILE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
