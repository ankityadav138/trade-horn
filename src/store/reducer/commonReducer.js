import {
  COUNTRY_DATA,
  LOADING,
  LOGOUT_DATA,
  NOTIFY,
  SELECT_CURRENCY_DATA,
  TRANSFER_DATA,
  USER_ACCOUNT,
  USER_ACCOUNTDATA,
  INITDEPOSIT_DATA,
  DETAILS_COINS_DATA,
  COINS_PAGE_DATA,
} from '../action';
import AsyncStorage from '@react-native-community/async-storage';

const initState = {
  loading: false,
  notify: '',
  currencyData: [],
  transferData: {},
  logoutData: {},
  userData: [],
  countryData: [],
  depositeData: [],
  details: {},
  pageName: {},
};

export const CommonReducer = (state = initState, action) => {
  switch (action.type) {
    case LOADING: {
      return {...state, loading: action.payload};
    }
    case NOTIFY: {
      return {...state, notify: action.payload, loading: false};
    }
    case SELECT_CURRENCY_DATA: {
      return {...state, currencyData: action.payload};
    }
    case TRANSFER_DATA: {
      return {...state, transferData: action.payload};
    }
    case TRANSFER_DATA: {
      return {...state, transferData: action.payload};
    }
    case USER_ACCOUNTDATA: {
      return {...state, userData: action.payload};
    }
    case COUNTRY_DATA: {
      return {...state, countryData: action.payload};
    }
    case INITDEPOSIT_DATA: {
      return {...state, depositeData: action.payload};
    }
    case DETAILS_COINS_DATA: {
      return {...state, details: action.payload};
    }
    case COINS_PAGE_DATA: {
      return {...state, pageName: action.payload};
    }
    // case LOGOUT_DATA: {
    //   //AsyncStorage.clear();
    //   console.log(AsyncStorage.getAllKeys());
    //   return;
    // }
    default: {
      return state;
    }
  }
};
