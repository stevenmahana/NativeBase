import {
  AUTHENTICATE_USER_SUCCESS_MULTIFACTOR,
  AUTHENTICATE_USER_SUCCESS_WELCOME,
  AUTHENTICATE_PASSWORD_CHANGE,
  AUTHENTICATE_REGISTER_USER,
  AUTHENTICATE_REGISTER_APP,
  AUTHENTICATE_USER_SUCCESS,
  AUTHENTICATE_USER_FAILED,
  AUTHENTICATE_LOGOUT,
  PASSWORD_CHANGED,
  USERNAME_CHANGED,
  PIN_SEND_SUCCESS,
  PIN_SEND_FAIL,
  PIN_RESET_SUCCESS,
  PIN_RESET_FAIL,
  EMAIL_CHANGED,
  NAME_CHANGED,
  PIN_CHANGED,
  PIN_NEW_CHANGED,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_PROCESS,
  USER_UPDATE_FAIL,
  CLEAR_MESSAGE,
  USER_UPDATE,
  ONBOARDING,
  LOADING,
} from '../actions/types';

const INITIAL_STATE = {
  app: '',
  pin: '',
  pinNew: '',
  pinSend: false,
  multiFactor: false,
  name: '',
  email: '',
  phone: '',
  username: '',
  password: '',
  passwordNew: '',
  loading: false,
  error: '',
  message: '',
  user: '',
};

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {
    // ...INITIAL_STATE
    case CLEAR_MESSAGE:
      return {
        ...state,
        error: '',
        message: '',
        pin: '',
        pinNew: '',
        pinSend: false,
        name: '',
        email: '',
        phone: '',
        username: '',
        password: '',
        passwordNew: '',
        loading: false,
      };
    case LOADING:
      return { ...state, loading: action.payload };
    case ONBOARDING:
      return { ...state, error: action.payload };
    case USER_UPDATE:
      //console.log(action.payload.prop);
      return { ...state, [action.payload.prop]: action.payload.value };
    case USER_UPDATE_PROCESS:
      return {
        ...state,
        loading: true,
        error: ''
      };
    case USER_UPDATE_FAIL:
      return {
        ...state,
        error: action.payload ? action.payload : 'An error has occurred',
        password: '',
        passwordNew: '',
        loading: false
      };
    case USER_UPDATE_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: '',
        message: 'Yeah. Update Successful',
        password: '',
      };
    case PIN_CHANGED:
      return { ...state, error: '', message: '', pin: action.payload };
    case PIN_NEW_CHANGED:
      return { ...state, error: '', message: '', pinNew: action.payload };
    case NAME_CHANGED:
      return { ...state, error: '', message: '', name: action.payload };
    case EMAIL_CHANGED:
      return { ...state, error: '', message: '', email: action.payload };
    case USERNAME_CHANGED:
      return { ...state, error: '', message: '', username: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, error: '', message: '', password: action.payload };
    case AUTHENTICATE_REGISTER_APP:
      return { ...state, ...INITIAL_STATE, app: action.payload };
    case PIN_SEND_SUCCESS:
      return {
        ...state,
        error: '',
        message: action.payload,
        pinSend: true,
        password: '',
        phone: '',
      };
    case PIN_SEND_FAIL:
      return {
        ...state,
        error: action.payload,
        message: '',
        password: '',
        phone: '',
      };
    case PIN_RESET_SUCCESS:
      return {
        ...state,
        error: '',
        message: 'Yeah! Multi-Factor Success',
        multiFactor: action.payload,
        pinSend: false,
        pin: '',
        pinNew: '',
        password: '',
        phone: '',
      };
    case PIN_RESET_FAIL:
      return {
        ...state,
        error: action.payload,
        pin: '',
        pinNew: '',
        message: '',
        password: '',
        phone: '',
      };
    case AUTHENTICATE_PASSWORD_CHANGE:
      return {
        ...state,
        error: '',
        message: action.payload,
        password: '',
        passwordNew: '',
        username: '',
        phone: '',
        email: '',
        name: ''
      };
    case AUTHENTICATE_REGISTER_USER:
      return {
        ...state,
        user: '',
        error: '',
        message: action.payload,
        password: '',
        username: '',
        email: '',
        name: ''
      };
    case AUTHENTICATE_USER_SUCCESS:
      return {
        ...state,
        user: JSON.stringify(action.payload),
        multiFactor: false,
        error: '',
        message: '',
        password: '',
        username: '',
        email: '',
        name: '',
        pin: '',
      };
    case AUTHENTICATE_USER_SUCCESS_WELCOME:
      return {
        ...state,
        user: JSON.stringify(action.payload),
        multiFactor: false,
        error: 'Please Change Password',
        message: '',
        password: '',
        username: '',
        email: '',
        name: '',
        pin: '',
      };
    case AUTHENTICATE_USER_SUCCESS_MULTIFACTOR:
      return {
        ...state,
        user: JSON.stringify(action.payload),
        multiFactor: action.payload.public_key,
        error: '',
        message: '',
        password: '',
        username: '',
        email: '',
        name: '',
        pin: '',
      };
    case AUTHENTICATE_USER_FAILED:
      return {
        ...state,
        error: action.payload,
        message: '',
        user: '',
        password: '',
        username: '',
        email: '',
        name: ''
      };
    case AUTHENTICATE_LOGOUT:
      return {
        ...state,
        error: '',
        message: action.payload,
        user: '',
        password: '',
        passwordNew: '',
        username: '',
        pin: '',
        pinNew: '',
        pinSend: false,
        email: '',
        phone: '',
        name: '',
        loading: false,
      };
    default:
      return state;
  }
};
