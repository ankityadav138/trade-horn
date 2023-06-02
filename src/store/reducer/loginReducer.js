import {
  LOGOUT,
  POSTS,
  SELECT_LANGUAGE,
  USER_LOGIN,
  USER_SIGNUP,
  REGISTER_DATA,
  ACCESS_TOKEN,
  USER_CHECK,
  VERIFY_OTP_DATA,
  FORGOT_PASS_DATA,
  ACTIVATE_ACCOUNT_DATA,
  THEME_CHANGE_DATA,
  RESET_VERIFICAYION_DATA,
  RESET_PASSWORD_DATA,
  RESEND_OTP,
  RESEND_OTP_DATA,
} from '../action';

const initState = {
  isLogin: 0,
  selectLanguage: '',
  loginData: {},
  signupData: [],
  accessToken: '',
  userCheckData: [],
  otpVerify: {},
  forgotPass: [],
  active: [],
  themeValue: '',
  resetPasswordData: [],
  resetPasswordVerifyData: [],
  resendOtp: [],
};

export const LoginReducer = (state = initState, action) => {
  switch (action.type) {
    case USER_LOGIN: {
      return {...state, loginData: action.payload};
    }
    case REGISTER_DATA: {
      return {...state, regis: action.payload};
    }
    case USER_SIGNUP: {
      return {...state, signupData: action.payload};
    }
    case LOGOUT: {
      return (state = initState);
    }
    case SELECT_LANGUAGE: {
      return {...state, selectLanguage: action.payload};
    }
    case ACCESS_TOKEN: {
      return {...state, accessToken: action.payload};
    }
    case USER_CHECK: {
      return {...state, userCheckData: action.payload};
    }
    case VERIFY_OTP_DATA: {
      return {...state, otpVerify: action.payload};
    }
    case FORGOT_PASS_DATA: {
      return {...state, forgotPass: action.payload};
    }
    case ACTIVATE_ACCOUNT_DATA: {
      return {...state, active: action.payload};
    }
    case THEME_CHANGE_DATA: {
      return {...state, themeValue: action.payload};
    }
    case RESET_PASSWORD_DATA: {
      return {...state, resetPasswordData: action.payload};
    }
    case RESET_VERIFICAYION_DATA: {
      return {...state, resetPasswordVerifyData: action.payload};
    }
    case RESEND_OTP_DATA: {
      return {...state, resendOtp: action.payload};
    }
    default: {
      return state;
    }
  }
};
