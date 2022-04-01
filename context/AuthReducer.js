import ACTIONS from "./constants";

export const initState = {
  user: null,
  api_info:null,
  authenticated: false,
  authenticating: false,
  error: false,
  error_message:null,
  registered:false,
  registering:false,
  loading:false,
  register_err:false,
  register_err_msg:null,
  logout_success: false,
  changing_password:false,
  password_changed:false,
  password_err:null,

  change_email:false,
  email_changed:false,
  email_err:null,

  change_api:false,
};
const newInitState = {
  user: null,
  api_info:null,
  authenticated: false,
  authenticating: false,
  error: false,
  error_message:null,
  registered:false,
  registering:false,
  loading:false,
  register_err:false,
  register_err_msg:null,
  logout_success: false,
  changing_password:false,
  password_changed:false,
  password_err:null,

  change_email:false,
  email_err:null,

  change_api:false,
};


const authReducer = (state = initState, action) => {
  switch (action.type) {
    case ACTIONS.LOGIN_REQUEST:
      return {
        ...initState,
        authenticating: true,
      };

    case ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        authenticating: false,
        authenticated: true,
      };
    case ACTIONS.LOGIN_FAILURE:
      return {
        ...state,
        authenticating: false,
        error: true,
        error_message: action.payload.error_msg,
      };
    case ACTIONS.LOGOUT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ACTIONS.LOGOUT_SUCCESS:
      return {
        ...state,
        ...newInitState,
        logout_success:true
      };
    case ACTIONS.SIGNIN_REQUEST:
      return {
        ...initState,
        registering: true,
      };
    case ACTIONS.SIGNIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        registered: true,
        registering: false,
        authenticate: true,
      };
    case ACTIONS.SIGNIN_FAILURE:
      return {
        ...state,
        registering: false,
        register_err: true,
        register_err_msg:action.payload.error_msg
      };
    case ACTIONS.UPDATE_USER:
      return {
        ...state,
        user:action.payload.data
      };
    case ACTIONS.UPDATE_API_DATA:
      return {
        ...state,
        api_info:action.payload.data
      };
    case ACTIONS.CHANGING_PASS:
      return {
        ...state,
        changing_password:true,
        password_changed:false,
        password_err:null,
      };
    case ACTIONS.PASS_CHANGED:
      return {
        ...state,
        changing_password:false,
        password_changed:true,
        password_err:null,
      };
    case ACTIONS.CHANGING_PASS_ERR:
      return {
        ...state,
        changing_password:false,
        password_changed:false,
        password_err:action.payload.error_msg,
      };
    case ACTIONS.CHANGING_EMAIL:
      return {
        ...state,
        change_email:true,
        email_changed:false,
        email_err:null,
      };
    case ACTIONS.EMAIL_CHANGED:
      return {
        ...state,
        change_email:false,
        email_changed:true,
        email_err:null,
      };
    case ACTIONS.CHANGING_EMAIL_ERR:
      return {
        ...state,
        change_email:false,
        email_changed:false,
        email_err:action.payload.error_msg,
      };
    default:
      return state;
  }
};

export default authReducer;
