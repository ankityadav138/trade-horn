import {
    SEND_OTP_DATA,
    CHECK_OTP_DATA,
    UPDATE_TFA_DATA,
    CHECK_TFA_DATA,
    CHANGE_PASSWORD_DATA,
    SIGNOUT_SESSION_DATA
  } from '../action';
  
  const initState = {
    sendOtp: [],
    checkCode:[],
    tfa:[],
    checkTFA:[],
    pwd:[],
    session:[]
    
  };
  export const SecurityReducer = (state = initState, action) => {
    switch (action.type) {
      case SEND_OTP_DATA: {
        return {...state, sendOtp: action.payload};
      }
      case CHECK_OTP_DATA: {
        return {...state, checkCode: action.payload};
      }
      case UPDATE_TFA_DATA: {
        return {...state, tfa: action.payload};
      }
      case CHECK_TFA_DATA: {
        return {...state, checkTFA: action.payload};
      }
      case CHANGE_PASSWORD_DATA: {
        return {...state, pwd: action.payload};
      }
      case SIGNOUT_SESSION_DATA: {
        return {...state, session: action.payload};
      }
      default: {
        return state;
      }
    }
  };
  