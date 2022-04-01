import axios from "axios";
import { createContext, useReducer, useContext } from "react";
import authReducer, { initState } from "./AuthReducer";
import ACTIONS from "./constants";

const AuthContext = createContext(initState);

export default function AuthProvider({ myAuth, children }) {
  const [state, dispatch] = useReducer(authReducer, myAuth);

  // login controller
  const loginAction = async (userCredential) => {
    dispatch({ type: ACTIONS.LOGIN_REQUEST });
    try {
      const res = await axios.post("/api/auth/login", {
        ...userCredential,
      });

      if (res.status === 200) {
        dispatch({
          type: ACTIONS.LOGIN_SUCCESS,
          payload: { user: res.data.user },
        });
      }
    } catch (error) {
      if (error.response) {
        dispatch({
          type: ACTIONS.LOGIN_FAILURE,
          payload: { error_msg: error.response.data.message },
        });
      }
      else {
        dispatch({
          type: ACTIONS.LOGIN_FAILURE,
          payload: { error_msg: "Internal Server Error Occured!" },
        });
      }
    }
  };

  // registration controller
  const registerAction = async (userCredential) => {
    dispatch({ type: ACTIONS.SIGNIN_REQUEST });

    try {
      const res = await axios.post("/api/auth/signup", {
        ...userCredential,
      });

      if (res.status === 200) {
        dispatch({
          type: ACTIONS.SIGNIN_SUCCESS,
          payload: { user: res.data.user },
        });
      }
    } catch (error) {
      if (error.response) {
        dispatch({
          type: ACTIONS.SIGNIN_FAILURE,
          payload: { error_msg: error.response.data.message },
        });
      }
      else {
        dispatch({
          type: ACTIONS.SIGNIN_FAILURE,
          payload: { error_msg: "Internal Server Error Occured!" },
        });
      }
    }
  };

  // logout controller
  const logoutAction = async () => {
    dispatch({ type: ACTIONS.LOGOUT_REQUEST });
    try {
      axios.post("/api/auth/logout");

      dispatch({ type: ACTIONS.LOGOUT_SUCCESS });
    } catch (error) {}
  };

  const updateUser = (data) => {
    dispatch({ type: ACTIONS.UPDATE_USER, payload: { data } });
  };

  async function getApiData(apiKey) {
    try {
      const response = await axios.get(`/api/getApidata?apikey=${apiKey}`);
      if (response.status === 200) {
        dispatch({
          type: ACTIONS.UPDATE_API_DATA,
          payload: { data: response.data },
        });
      }
    } catch (error) {}
  }


  const passchangeAction = async( oldPass,newPass, email)=>{
    dispatch({ type: ACTIONS.CHANGING_PASS });
    try {
      const res = await axios.post("/api/auth/changePassword", {
        oldPassword: oldPass,
        newPassword: newPass,
        email,
      });
      if (res.status === 200) {
        dispatch({ type: ACTIONS.PASS_CHANGED });
      }else{
        dispatch({
          type: ACTIONS.CHANGING_PASS_ERR,
          payload: { error_msg: res.data.message },
        });
      }
    } catch (err) {
      if (err.response) {
        dispatch({
          type: ACTIONS.CHANGING_PASS_ERR,
          payload: { error_msg: err.response.data.message },
        });
      }else{
        dispatch({
          type: ACTIONS.CHANGING_PASS_ERR,
          payload: { error_msg: "Internal Server Error Occured!" },
        });
      }
    }
  }
  const changeEmailAction = async(newEmail, oldEmail, password)=>{
    dispatch({ type: ACTIONS.CHANGING_EMAIL });
    try {
      const res = await axios.post("/api/auth/changeEmail", {
        newEmail,
        oldEmail,
        password,
      });
      if (res.status === 200) {
        dispatch({ type: ACTIONS.EMAIL_CHANGED });
      }
    } catch (err) {
      if (err.response) {
        dispatch({
          type: ACTIONS.CHANGING_EMAIL_ERR,
          payload: { error_msg: err.response.data.message },
        });
      }
      else {
        dispatch({
          type: ACTIONS.CHANGING_EMAIL_ERR,
          payload: { error_msg:"Internal Server Error Occured!" },
        });
      }
    }
  }

  const value = {
    loginAction,
    registerAction,
    logoutAction,
    updateUser,
    getApiData,
    passchangeAction,
    changeEmailAction,
    ...state,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
