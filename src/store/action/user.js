import {
  SIGNUP,
  LOGIN,
  LOADING,
  CURRENT_USER,
  LOGOUT,
  UPDATE_PROFILE,
} from "store/actionType";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

export function Signup(payload, dispatch) {
  dispatch({ type: LOADING, payload });
  let isExists = payload.users.find(
    (item) =>
      item.email === payload.data.email || item.phone === payload.data.phone
  );
  if (isExists) {
    toast.error("User with this data already exists");
    dispatch({ type: LOADING, payload });
  } else {
    let id = uuidv4();
    let users = [...payload.users, { ...payload.data, id }];
    toast.success("Account has been created successfully.");
    dispatch({ type: SIGNUP, payload: { ...payload, users } });
  }
}

export function Login(payload, dispatch) {
  dispatch({ type: LOADING, payload });
  let isExists = payload.users.find(
    (item) =>
      item.email === payload.data.email || item.phone === payload.data.email
  );
  if (isExists && isExists.password === payload.data.password) {
    toast.success("Logged in successfully.");
    dispatch({ type: LOGIN, payload, id: isExists.id });
  } else {
    toast.error("wrong credentials.");
    dispatch({ type: LOADING, payload });
  }
}

export function Logout(dispatch) {
  dispatch({ type: LOGOUT });
}

export function currentUser() {
  return {
    type: CURRENT_USER,
  };
}

export function Update(payload, dispatch) {
  dispatch({ type: LOADING, payload });
  let isExists = payload.users.find(
    (item) =>
      item.email === payload.data.email || item.phone === payload.data.phone
  );
  if (isExists && payload.currentUser.id !== isExists.id) {
    toast.error("User with this data already exists");
    dispatch({ type: LOADING, payload });
  } else {
    let users = payload.users;
    let index = users.findIndex((item) => item.id === payload.currentUser.id);
    const currentUser = { ...payload.currentUser, ...payload.data };
    users[index] = currentUser;
    toast.success("Profile has been updated successfully.");
    dispatch({
      type: UPDATE_PROFILE,
      payload: { ...payload, users, currentUser },
    });
  }
}
