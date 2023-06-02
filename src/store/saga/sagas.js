import React from 'react';
import {
  LOGIN,
  USER_LOGIN,
  LOADING,
  NOTIFY,
  PROFILE,
  FETCH_PROFILE,
  LOGHISTORY,
  FETCH_LOGHISTORY,
  ASSETS,
  FETCH_ASSETS,
  TOTALBALANCE,
  FETCH_TOTALBALANCE,
  VERIFY_OTP,
  VERIFY_OTP_DATA,
  FORGOT_PASS,
  SIGNUP,
  USER_SIGNUP,
  OPEN_ORDER,
  MARKET_TRADE,
  GET_ASSETS,
  FETCH_OPEN_ORDER,
  FETCH_ORDER_HISTORY,
  ORDER_HISTORY,
  TICKETS,
  FETCH_TICKETS,
  GET_OPEN_ORDER,
  GET_PAIRLIST,
  GET_PAIRDETAIL,
  CURRENCY_BAL,
  FIAT_HISTORY,
  CRYPTO_HISTORY,
  FETCH_CRYPTO_HISTORY,
  FETCH_FIAT_HISTORY,
  PLACE_ORDER,
  CURRENCY_BAL_DATA,
  GET_OPEN_ORDER_DATA,
  MARKET_TRADE_DATA,
  GET_ASSETS_DATA,
  GET_PAIRLIST_DATA,
  PLACE_ORDER_DATA,
  FORGOT_PASS_DATA,
  PLACEORDER_DATA,
  PLACEORDER,
  TOP_PAIR_CURRENCY,
  TOP_PAIR_CURRENCY_DATA,
  ACTIVATE_ACCOUNT,
  ACTIVATE_ACCOUNT_DATA,
  SEND_OTP,
  SEND_OTP_DATA,
  WALLET_HISTORY,
  WALLET_HISTORY_DATA,
  CHECK_OTP,
  CHECK_OTP_DATA,
  UPDATE_TFA,
  UPDATE_TFA_DATA,
  RESET_PASSWORD,
  RESET_PASSWORD_DATA,
  CHECK_TFA,
  CHECK_TFA_DATA,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_DATA,
  SIGNOUT_SESSION,
  SIGNOUT_SESSION_DATA,
  PAIR_DETAIL_API_DATA,
  PAIR_DETAIL_API,
  PLACE_TRADE_ORDER_DATA,
  PLACE_TRADE_ORDER,
  DROPDOWN_CURRENCY,
  DROPDOWN_CURRENCY_DATA,
  FIAT_TABLE,
  FIAT_TABLE_DATA,
  CRYPTO_TABLE,
  CRYPTO_TABLE_DATA,
  CRYPTO_VERIFY_TFA,
  CRYPTO_VERIFY_TFA_DATA,
  CRYPTO_WITHDRAW_DATA,
  CRYPTO_WITHDRAW,
  FIAT_VERIFY_TFA,
  FIAT_VERIFY_TFA_DATA,
  FIAT_WITHDRAW,
  FIAT_WITHDRAW_DATA,
  CRYPTO_ADDRESS_DATA,
  CRYPTO_ADDRESS,
  FIAT_DEPOSIT_DATA,
  UPDATE_BANK_DETAILS_DATA,
  REMOVE_BANK_DETAILS_DATA,
  BANK_DETAILS_DATA,
  CRYPTO_VERIFY_PASSCODE_DATA,
  FIAT_VERIFY_PASSCODE_DATA,
  CRYPTO_VERIFY_USERDATA_DATA,
  FIAT_VERIFY_USERDATA_DATA,
  FIAT_DEPOSIT,
  GET_FAV,
  GET_FAV_DATA,
  SAVE_FAV,
  SAVE_FAV_DATA,
  CURRENCY_DATA,
  CURRENCY,
  GET_OPEN_ORDER_HISTORY,
  GET_OPEN_ORDER_HISTORY_DATA,
  MARKET_HOME,
  MARKET_HOME_DATA,
  CANCEL_OPEN_ORDER,
  CANCEL_OPEN_ORDER_DATA,
  RESET_VERIFICAYION_DATA,
  RESET_VERIFICAYION,
  RESEND_OTP_DATA,
  RESEND_OTP,
} from '../action';
import {call, put, takeLatest, throttle} from 'redux-saga/effects';
import {API} from '../api';

function* login(action) {
  try {
    yield put({type: LOADING, payload: true});
    const data = yield call(API.getLogin, action.payload);
    yield put({type: USER_LOGIN, payload: data.data});
    yield put({type: LOADING, payload: false});
  } catch (e) {
    // console.log('else saga Login', e.response.data);
    yield put({type: LOADING, payload: false});
    yield put({type: NOTIFY, payload: e});
    yield put({type: USER_LOGIN, payload: e.response.data});
  }
}

function* signUp(action) {
  try {
    yield put({type: LOADING, payload: false});
    const data = yield call(API.getSignUp, action.payload);
    yield put({type: USER_SIGNUP, payload: data.data});
    yield put({type: LOADING, payload: false});
  } catch (e) {
    // console.log('Failure', e.response.data);
    yield put({type: LOADING, payload: false});
    yield put({type: NOTIFY, payload: e});
  }
}

function* getOtp(action) {
  try {
    yield put({type: LOADING, payload: true});
    const data = yield call(API.getOtpApi, action.payload);
    yield put({type: VERIFY_OTP_DATA, payload: data.data});
    yield put({type: LOADING, payload: false});
  } catch (e) {
    yield put({type: LOADING, payload: false});
    yield put({type: NOTIFY, payload: e});
  }
}

function* getPairList(action) {
  try {
    yield put({type: LOADING, payload: true});
    const data = yield call(API.getOtpApi, action.payload);
    yield put({type: VERIFY_OTP_DATA, payload: data.data});
    yield put({type: LOADING, payload: false});
  } catch (e) {
    yield put({type: LOADING, payload: false});
    yield put({type: NOTIFY, payload: e});
  }
}
function* forgotPass(action) {
  try {
    yield put({type: LOADING, payload: true});
    const data = yield call(API.forgotPassApi, action.payload);
    yield put({type: FORGOT_PASS_DATA, payload: data.data});
    yield put({type: LOADING, payload: false});
  } catch (e) {
    // console.log('else saga FORGOT PASS', e.response.data);
    yield put({type: LOADING, payload: false});
    yield put({type: NOTIFY, payload: e});
    yield put({type: USER_LOGIN, payload: e.response.data});
  }
}
function* resetPasswordVerification(action) {
  try {
    yield put({type: LOADING, payload: true});
    const data = yield call(API.resetPasswordVerification, action.payload);
    yield put({type: RESET_VERIFICAYION_DATA, payload: data.data});
    yield put({type: LOADING, payload: false});
  } catch (e) {
    // console.log('else saga FORGOT PASS', e.response.data);
    yield put({type: LOADING, payload: false});
    yield put({type: NOTIFY, payload: e});
    yield put({type: USER_LOGIN, payload: e.response.data});
  }
}

function* getProfile(action) {
  try {
    yield put({type: LOADING, payload: false});
    const data = yield call(API.getProfile, action.payload);
    yield put({type: FETCH_PROFILE, payload: data.data});
    yield put({type: LOADING, payload: false});
  } catch (e) {
    yield put({type: LOADING, payload: false});
    yield put({type: NOTIFY, payload: e});
    yield put({type: USER_LOGIN, payload: e.response.data});
  }
}

function* getLogHistory(action) {
  try {
    yield put({type: LOADING, payload: true});
    const data = yield call(API.getLogHistory, action.payload);
    yield put({type: FETCH_LOGHISTORY, payload: data.data});
    yield put({type: LOADING, payload: false});
  } catch (e) {
    yield put({type: LOADING, payload: false});
    yield put({type: NOTIFY, payload: e});
    yield put({type: USER_LOGIN, payload: e.response.data});
  }
}

function* getAssets(action) {
  try {
    yield put({type: LOADING, payload: true});
    const data = yield call(API.getAssets, action.payload);
    yield put({type: FETCH_ASSETS, payload: data.data});
    yield put({type: LOADING, payload: false});
  } catch (e) {
    yield put({type: LOADING, payload: false});
    yield put({type: NOTIFY, payload: e});
    yield put({type: USER_LOGIN, payload: e.response.data});
  }
}

function* getTotBalance(action) {
  try {
    yield put({type: LOADING, payload: true});
    const data = yield call(API.getTotBalance, action.payload);
    yield put({type: FETCH_TOTALBALANCE, payload: data.data});
    yield put({type: LOADING, payload: false});
  } catch (e) {
    yield put({type: LOADING, payload: false});
    yield put({type: NOTIFY, payload: e});
    yield put({type: USER_LOGIN, payload: e.response.data});
  }
}

function* getDropdownCurrency(action) {
  try {
    yield put({type: LOADING, payload: true});
    const data = yield call(API.getdropdownCurrency, action.payload);
    yield put({type: DROPDOWN_CURRENCY_DATA, payload: data.data});
    yield put({type: LOADING, payload: false});
  } catch (e) {
    yield put({type: LOADING, payload: false});
    yield put({type: NOTIFY, payload: e});
  }
}

function* getFiatTable(action) {
  try {
    yield put({type: LOADING, payload: true});
    const data = yield call(API.getFiatTable, action.payload);
    yield put({type: FIAT_TABLE_DATA, payload: data.data});
    yield put({type: LOADING, payload: false});
  } catch (e) {
    yield put({type: LOADING, payload: false});
    yield put({type: NOTIFY, payload: e});
  }
}

function* getCryptoTable(action) {
  try {
    yield put({type: LOADING, payload: true});
    const data = yield call(API.getCryptoTable, action.payload);
    yield put({type: CRYPTO_TABLE_DATA, payload: data.data});
    yield put({type: LOADING, payload: false});
  } catch (e) {
    yield put({type: LOADING, payload: false});
    yield put({type: NOTIFY, payload: e});
  }
}

function* getCryptoWithdraw(action) {
  try {
    yield put({type: LOADING, payload: true});
    const data = yield call(API.getCryptoWithdraw, action.payload);
    yield put({type: CRYPTO_WITHDRAW_DATA, payload: data.data});
    yield put({type: LOADING, payload: false});
  } catch (e) {
    yield put({type: LOADING, payload: false});
    yield put({type: NOTIFY, payload: e});
  }
}

function* getCryptoVerifyTFA(action) {
  try {
    yield put({type: LOADING, payload: true});
    const data = yield call(API.getCryptoVeriftTFA, action.payload);
    yield put({type: CRYPTO_VERIFY_TFA_DATA, payload: data.data});
    yield put({type: LOADING, payload: false});
  } catch (e) {
    yield put({type: LOADING, payload: false});
    yield put({type: NOTIFY, payload: e});
  }
}

function* getFiatWithdraw(action) {
  try {
    yield put({type: LOADING, payload: true});
    const data = yield call(API.getFiatWithdraw, action.payload);
    yield put({type: FIAT_WITHDRAW_DATA, payload: data.data});
    yield put({type: LOADING, payload: false});
  } catch (e) {
    yield put({type: LOADING, payload: false});
    yield put({type: NOTIFY, payload: e});
  }
}

function* getFiatVerifyTFA(action) {
  try {
    yield put({type: LOADING, payload: true});
    const data = yield call(API.getFiatVerifyTFA, action.payload);
    yield put({type: FIAT_VERIFY_TFA_DATA, payload: data.data});
    yield put({type: LOADING, payload: false});
  } catch (e) {
    yield put({type: LOADING, payload: false});
    yield put({type: NOTIFY, payload: e});
  }
}

function* getFiatVerifyUserData(action) {
  try {
    yield put({type: LOADING, payload: true});
    const data = yield call(API.getFiatVerifyUserData, action.payload);
    yield put({type: FIAT_VERIFY_USERDATA_DATA, payload: data.data});
    yield put({type: LOADING, payload: false});
  } catch (e) {
    yield put({type: LOADING, payload: false});
    yield put({type: NOTIFY, payload: e});
  }
}

function* getCryptoVerifyUserData(action) {
  try {
    yield put({type: LOADING, payload: true});
    const data = yield call(API.getCryptoVerifyUserData, action.payload);
    yield put({type: CRYPTO_VERIFY_USERDATA_DATA, payload: data.data});
    yield put({type: LOADING, payload: false});
  } catch (e) {
    yield put({type: LOADING, payload: false});
    yield put({type: NOTIFY, payload: e});
  }
}

function* getFiatVerifyPasscode(action) {
  try {
    yield put({type: LOADING, payload: true});
    const data = yield call(API.getFiatVerifyPasscode, action.payload);
    yield put({type: FIAT_VERIFY_PASSCODE_DATA, payload: data.data});
    yield put({type: LOADING, payload: false});
  } catch (e) {
    yield put({type: LOADING, payload: false});
    yield put({type: NOTIFY, payload: e});
  }
}

function* getCryptoVerifyPasscode(action) {
  try {
    yield put({type: LOADING, payload: true});
    const data = yield call(API.getCryptoVerifyPasscode, action.payload);
    yield put({type: CRYPTO_VERIFY_PASSCODE_DATA, payload: data.data});
    yield put({type: LOADING, payload: false});
  } catch (e) {
    yield put({type: LOADING, payload: false});
    yield put({type: NOTIFY, payload: e});
  }
}

function* getFiatBankDetails(action) {
  try {
    yield put({type: LOADING, payload: true});
    const data = yield call(API.getFiatBankDetails, action.payload);
    yield put({type: BANK_DETAILS_DATA, payload: data.data});
    yield put({type: LOADING, payload: false});
  } catch (e) {
    yield put({type: LOADING, payload: false});
    yield put({type: NOTIFY, payload: e});
  }
}

function* getRemoveBankDetails(action) {
  try {
    yield put({type: LOADING, payload: true});
    const data = yield call(API.getRemoveBankDetails, action.payload);
    yield put({type: REMOVE_BANK_DETAILS_DATA, payload: data.data});
    yield put({type: LOADING, payload: false});
  } catch (e) {
    yield put({type: LOADING, payload: false});
    yield put({type: NOTIFY, payload: e});
  }
}

function* getUpdateBankDetails(action) {
  try {
    yield put({type: LOADING, payload: true});
    const data = yield call(API.getUpdateBankDetails, action.payload);
    yield put({type: UPDATE_BANK_DETAILS_DATA, payload: data.data});
    yield put({type: LOADING, payload: false});
  } catch (e) {
    yield put({type: LOADING, payload: false});
    yield put({type: NOTIFY, payload: e});
  }
}

function* getFiatDeposite(action) {
  try {
    yield put({type: LOADING, payload: true});
    const data = yield call(API.getFiatDeposite, action.payload);
    yield put({type: FIAT_DEPOSIT_DATA, payload: data.data});
    yield put({type: LOADING, payload: false});
  } catch (e) {
    yield put({type: LOADING, payload: false});
    yield put({type: NOTIFY, payload: e});
  }
}

function* getCryptoAddress(action) {
  try {
    yield put({type: LOADING, payload: true});
    const data = yield call(API.getCryptoAddress, action.payload);
    yield put({type: CRYPTO_ADDRESS_DATA, payload: data.data});
    yield put({type: LOADING, payload: false});
  } catch (e) {
    yield put({type: LOADING, payload: false});
    yield put({type: NOTIFY, payload: e});
  }
}

function* getOpenOrders(action) {
  try {
    yield put({type: LOADING, payload: false});
    const data = yield call(API.getOpenOrdersApi, action.payload);
    yield put({type: GET_OPEN_ORDER_DATA, payload: data.data});
    yield put({type: LOADING, payload: false});
  } catch (e) {
    // console.log('else saga OPEN_ORDER', e.response.data);
    yield put({type: LOADING, payload: false});
    yield put({type: NOTIFY, payload: e});
    yield put({type: USER_LOGIN, payload: e.response.data});
  }
}

function* openordershistory(action) {
  try {
    yield put({type: LOADING, payload: false});
    const data = yield call(API.getOpenOrdersHistory, action.payload);
    yield put({type: GET_OPEN_ORDER_HISTORY_DATA, payload: data.data});
    yield put({type: LOADING, payload: false});
  } catch (e) {
    // console.log('else saga OPEN_ORDER', e.response.data);
    yield put({type: LOADING, payload: false});
    yield put({type: NOTIFY, payload: e});
    yield put({type: USER_LOGIN, payload: e.response.data});
  }
}

function* getMarketTrades(action) {
  try {
    yield put({type: LOADING, payload: false});
    const data = yield call(API.getMarketTrades, action.payload);
    yield put({type: MARKET_TRADE_DATA, payload: data.data});
    yield put({type: LOADING, payload: false});
  } catch (e) {
    //  console.log('else saga OPEN_ORDER', e.response.data);
    yield put({type: LOADING, payload: false});
    yield put({type: NOTIFY, payload: e});
    yield put({type: USER_LOGIN, payload: e.response.data});
  }
}

function* getOrderHistory(action) {
  try {
    // yield put({ type: LOADING, payload: true });
    const data = yield call(API.getOrderHistory, action.payload);
    yield put({type: FETCH_ORDER_HISTORY, payload: data.data});
    // yield put({ type: LOADING, payload: false });
  } catch (e) {
    // yield put({ type: LOADING, payload: false });
    yield put({type: NOTIFY, payload: e});
    yield put({type: USER_LOGIN, payload: e.response.data});
  }
}

function* getAssetsApi(action) {
  try {
    yield put({type: LOADING, payload: false});
    const data = yield call(API.getAssetsApi, action.payload);
    yield put({type: GET_ASSETS_DATA, payload: data.data});
    yield put({type: LOADING, payload: false});
  } catch (e) {
    // console.log('else saga assets', e.response.data);
    yield put({type: LOADING, payload: false});
    yield put({type: NOTIFY, payload: e});
    yield put({type: USER_LOGIN, payload: e.response.data});
  }
}
function* getTickets(action) {
  try {
    yield put({type: LOADING, payload: true});
    const data = yield call(API.getTickets, action.payload);
    yield put({type: FETCH_TICKETS, payload: data.data});
    yield put({type: LOADING, payload: false});
  } catch (e) {
    yield put({type: LOADING, payload: false});
    yield put({type: NOTIFY, payload: e});
    yield put({type: USER_LOGIN, payload: e.response.data});
  }
}

function* getPairListApi(action) {
  try {
    yield put({type: LOADING, payload: false});
    const data = yield call(API.getPairListApi, action.payload);
    yield put({type: GET_PAIRLIST_DATA, payload: data.data});
    yield put({type: LOADING, payload: false});
  } catch (e) {
    yield put({type: LOADING, payload: false});
    yield put({type: NOTIFY, payload: e});
    //yield put({type: USER_LOGIN, payload: e.response.data});
  }
}

function* getTopPairListApi(action) {
  try {
    yield put({type: LOADING, payload: false});
    const data = yield call(API.getTopPairListApi, action.payload);
    yield put({type: TOP_PAIR_CURRENCY_DATA, payload: data.data});
    yield put({type: LOADING, payload: false});
  } catch (e) {
    yield put({type: LOADING, payload: false});
    yield put({type: NOTIFY, payload: e});
    //yield put({type: USER_LOGIN, payload: e.response.data});
  }
}

// console.log('else saga assets', e.response.data);
function* getFiatHistory(action) {
  try {
    yield put({type: LOADING, payload: false});
    const data = yield call(API.getFiatHistory, action.payload);
    yield put({type: FETCH_FIAT_HISTORY, payload: data.data});
    yield put({type: LOADING, payload: false});
  } catch (e) {
    yield put({type: LOADING, payload: false});
    yield put({type: NOTIFY, payload: e});
    yield put({type: USER_LOGIN, payload: e.response.data});
  }
}

function* getPairDetailApi(action) {
  try {
    yield put({type: LOADING, payload: false});
    const data = yield call(API.getPairDetailApi, action.payload);
    yield put({type: GET_PAIRDETAIL, payload: data.data});
    yield put({type: LOADING, payload: false});
  } catch (e) {
    //  console.log('pair detail api ===', response.data);
    yield put({type: LOADING, payload: false});
    yield put({type: NOTIFY, payload: e});
    yield put({type: USER_LOGIN, payload: e.response.data});
  }
}

function* currencyBalanceApi(action) {
  try {
    yield put({type: LOADING, payload: false});
    const data = yield call(API.getCurrencyBalance, action.payload);
    yield put({type: CURRENCY_BAL_DATA, payload: data.data});
    yield put({type: LOADING, payload: false});
  } catch (e) {
    yield put({type: LOADING, payload: false});
    yield put({type: NOTIFY, payload: e});
    yield put({type: USER_LOGIN, payload: e.response.data});
  }
}
//  console.log('pair detail api ===', response.data);
function* getCryptoHistory(action) {
  try {
    // yield put({ type: LOADING, payload: true });
    const data = yield call(API.getCryptoHistory, action.payload);
    yield put({type: FETCH_CRYPTO_HISTORY, payload: data.data});
    // yield put({ type: LOADING, payload: false });
  } catch (e) {
    // yield put({ type: LOADING, payload: false });
    yield put({type: NOTIFY, payload: e});
    yield put({type: USER_LOGIN, payload: e.response.data});
  }
}

function* getplaceOrder(action) {
  try {
    yield put({type: LOADING, payload: true});
    const data = yield call(API.getplaceOrderApi, action.payload);
    yield put({type: PLACEORDER_DATA, payload: data.data});
    yield put({type: LOADING, payload: false});
  } catch (e) {
    yield put({type: LOADING, payload: false});
    yield put({type: NOTIFY, payload: e});
    yield put({type: USER_LOGIN, payload: e.response.data});
  }
}

function* activateUser(action) {
  try {
    yield put({type: LOADING, payload: false});
    const data = yield call(API.getactivateAccount, action.payload);
    yield put({type: ACTIVATE_ACCOUNT_DATA, payload: data.data});
    yield put({type: LOADING, payload: false});
  } catch (e) {
    yield put({type: LOADING, payload: false});
    yield put({type: NOTIFY, payload: e});
    yield put({type: USER_LOGIN, payload: e.response.data});
  }
}

function* otpOnEmail(action) {
  try {
    yield put({type: LOADING, payload: true});
    const data = yield call(API.getOTP, action.payload);
    yield put({type: SEND_OTP_DATA, payload: data.data});
    yield put({type: LOADING, payload: false});
  } catch (e) {
    yield put({type: LOADING, payload: false});
    yield put({type: NOTIFY, payload: e});
    yield put({type: USER_LOGIN, payload: e.response.data});
  }
}

function* checkCode(action) {
  try {
    yield put({type: LOADING, payload: true});
    const data = yield call(API.checkOTP, action.payload);
    yield put({type: CHECK_OTP_DATA, payload: data.data});
    yield put({type: LOADING, payload: false});
  } catch (e) {
    yield put({type: LOADING, payload: false});
    yield put({type: NOTIFY, payload: e});
    yield put({type: USER_LOGIN, payload: e.response.data});
  }
}

function* updateTfaCode(action) {
  try {
    yield put({type: LOADING, payload: true});
    const data = yield call(API.updateTFA, action.payload);
    yield put({type: UPDATE_TFA_DATA, payload: data.data});
    yield put({type: LOADING, payload: false});
  } catch (e) {
    yield put({type: LOADING, payload: false});
    yield put({type: NOTIFY, payload: e});
    yield put({type: USER_LOGIN, payload: e.response.data});
  }
}
function* checkTfaVerify(action) {
  try {
    yield put({type: LOADING, payload: true});
    const data = yield call(API.checkTFA, action.payload);
    yield put({type: CHECK_TFA_DATA, payload: data.data});
    yield put({type: LOADING, payload: false});
  } catch (e) {
    yield put({type: LOADING, payload: false});
    yield put({type: NOTIFY, payload: e});
    yield put({type: USER_LOGIN, payload: e.response.data});
  }
}
function* changePasswordAPi(action) {
  try {
    yield put({type: LOADING, payload: true});
    const data = yield call(API.changePassword, action.payload);
    yield put({type: CHANGE_PASSWORD_DATA, payload: data.data});
    yield put({type: LOADING, payload: false});
  } catch (e) {
    yield put({type: LOADING, payload: false});
    yield put({type: NOTIFY, payload: e});
    yield put({type: USER_LOGIN, payload: e.response.data});
  }
}

function* PairDetail(action) {
  try {
    yield put({type: LOADING, payload: false});
    const data = yield call(API.PairDetail, action.payload);
    yield put({type: PAIR_DETAIL_API_DATA, payload: data.data});
    yield put({type: LOADING, payload: false});
  } catch (e) {
    yield put({type: LOADING, payload: false});
    yield put({type: NOTIFY, payload: e});
    yield put({type: USER_LOGIN, payload: e.response.data});
  }
}

function* deleteHistorySession(action) {
  try {
    yield put({type: LOADING, payload: true});
    const data = yield call(API.signoutLoginSession, action.payload);
    yield put({type: SIGNOUT_SESSION_DATA, payload: data.data});
    yield put({type: LOADING, payload: false});
  } catch (e) {
    yield put({type: LOADING, payload: false});
    yield put({type: NOTIFY, payload: e});
    yield put({type: USER_LOGIN, payload: e.response.data});
  }
}

function* placeOrderApi(action) {
  try {
    yield put({type: LOADING, payload: true});
    const data = yield call(API.placeOrderApi, action.payload);
    yield put({type: PLACE_TRADE_ORDER_DATA, payload: data.data});
    yield put({type: LOADING, payload: false});
  } catch (e) {
    yield put({type: LOADING, payload: false});
    yield put({type: NOTIFY, payload: e});
    yield put({type: USER_LOGIN, payload: e.response.data});
  }
}

function* getFavStar(action) {
  try {
    yield put({type: LOADING, payload: false});
    const data = yield call(API.getFavourite, action.payload);
    yield put({type: GET_FAV_DATA, payload: data.data});
    yield put({type: LOADING, payload: false});
  } catch (e) {
    yield put({type: LOADING, payload: false});
    yield put({type: NOTIFY, payload: e});
    yield put({type: USER_LOGIN, payload: e.response.data});
  }
}

function* saveFavstar(action) {
  try {
    yield put({type: LOADING, payload: true});
    const data = yield call(API.saveFavourite, action.payload);
    yield put({type: SAVE_FAV_DATA, payload: data.data});
    yield put({type: LOADING, payload: false});
  } catch (e) {
    yield put({type: LOADING, payload: false});
    yield put({type: NOTIFY, payload: e});
    yield put({type: USER_LOGIN, payload: e.response.data});
  }
}

function* currencyDataApi(action) {
  try {
    yield put({type: LOADING, payload: true});
    const data = yield call(API.currencyDataApi, action.payload);
    yield put({type: CURRENCY_DATA, payload: data.data});
    yield put({type: LOADING, payload: false});
  } catch (e) {
    yield put({type: LOADING, payload: false});
    yield put({type: NOTIFY, payload: e});
    yield put({type: USER_LOGIN, payload: e.response.data});
  }
}

function* getMarketHomedata(action) {
  try {
    yield put({type: LOADING, payload: true});
    const data = yield call(API.getmarketdata, action.payload);
    yield put({type: MARKET_HOME_DATA, payload: data.data});
    yield put({type: LOADING, payload: false});
  } catch (e) {
    yield put({type: LOADING, payload: false});
    yield put({type: NOTIFY, payload: e});
    yield put({type: USER_LOGIN, payload: e.response.data});
  }
}

function* cancelOpenOrdersRecord(action) {
  try {
    yield put({type: LOADING, payload: true});
    const data = yield call(API.deleteOpenOrder, action.payload);
    yield put({type: CANCEL_OPEN_ORDER_DATA, payload: data.data});
    yield put({type: LOADING, payload: false});
  } catch (e) {
    yield put({type: LOADING, payload: false});
    yield put({type: NOTIFY, payload: e});
    yield put({type: USER_LOGIN, payload: e.response.data});
  }
}

function* resetPassword(action) {
  try {
    yield put({type: LOADING, payload: true});
    const data = yield call(API.resetPassword, action.payload);
    yield put({type: RESET_PASSWORD_DATA, payload: data.data});
    yield put({type: LOADING, payload: false});
  } catch (e) {
    yield put({type: LOADING, payload: false});
    yield put({type: NOTIFY, payload: e});
    yield put({type: USER_LOGIN, payload: e.response.data});
  }
}

function* resendOtpApi(action) {
  try {
    yield put({type: LOADING, payload: true});
    const data = yield call(API.resendOtpApi, action.payload);
    yield put({type: RESEND_OTP_DATA, payload: data.data});
    yield put({type: LOADING, payload: false});
  } catch (e) {
    yield put({type: LOADING, payload: false});
    yield put({type: NOTIFY, payload: e});
    yield put({type: USER_LOGIN, payload: e.response.data});
  }
}

export function* rootSaga() {
  yield takeLatest(LOGIN, login);
  yield takeLatest(SIGNUP, signUp);
  yield takeLatest(PROFILE, getProfile);
  yield takeLatest(LOGHISTORY, getLogHistory);
  yield takeLatest(ASSETS, getAssets);
  yield takeLatest(TOTALBALANCE, getTotBalance);

  yield takeLatest(VERIFY_OTP, getOtp);
  yield takeLatest(FORGOT_PASS, forgotPass);
  yield takeLatest(MARKET_TRADE, getMarketTrades);
  yield takeLatest(GET_ASSETS, getAssetsApi);

  //yield throttle()
  yield takeLatest(GET_OPEN_ORDER, getOpenOrders);
  yield takeLatest(ORDER_HISTORY, getOrderHistory);
  yield takeLatest(TICKETS, getTickets);

  yield takeLatest(GET_PAIRLIST, getPairListApi);

  yield takeLatest(TOP_PAIR_CURRENCY, getTopPairListApi);

  yield takeLatest(GET_PAIRDETAIL, getPairDetailApi);
  yield takeLatest(CURRENCY_BAL, currencyBalanceApi);
  yield takeLatest(FIAT_HISTORY, getFiatHistory);
  yield takeLatest(CRYPTO_HISTORY, getCryptoHistory);
  yield takeLatest(PLACE_ORDER, getplaceOrder);
  yield takeLatest(ACTIVATE_ACCOUNT, activateUser);
  yield takeLatest(SEND_OTP, otpOnEmail);
  // yield takeLatest(WALLET_HISTORY, wallethistorydata);
  yield takeLatest(CHECK_OTP, checkCode);
  yield takeLatest(UPDATE_TFA, updateTfaCode);
  yield takeLatest(CHECK_TFA, checkTfaVerify);
  yield takeLatest(CHANGE_PASSWORD, changePasswordAPi);
  yield takeLatest(SIGNOUT_SESSION, deleteHistorySession);
  yield takeLatest(PAIR_DETAIL_API, PairDetail);
  yield takeLatest(PLACE_TRADE_ORDER, placeOrderApi);
  //yield takeLatest(PLACEORDER, getplaceOrder);

  yield takeLatest(DROPDOWN_CURRENCY, getDropdownCurrency);
  yield takeLatest(FIAT_TABLE, getFiatTable);
  yield takeLatest(CRYPTO_TABLE, getCryptoTable);

  yield takeLatest(CRYPTO_WITHDRAW, getCryptoWithdraw);
  yield takeLatest(CRYPTO_VERIFY_TFA, getCryptoVerifyTFA);
  yield takeLatest(FIAT_WITHDRAW, getFiatWithdraw);
  yield takeLatest(FIAT_VERIFY_TFA, getFiatVerifyTFA);

  yield takeLatest(FIAT_DEPOSIT, getFiatDeposite);
  yield takeLatest(GET_FAV, getFavStar);
  yield takeLatest(SAVE_FAV, saveFavstar);
  yield takeLatest(GET_OPEN_ORDER_HISTORY, openordershistory);

  yield takeLatest(CRYPTO_ADDRESS, getCryptoAddress);

  yield takeLatest(CURRENCY, currencyDataApi);
  yield takeLatest(MARKET_HOME, getMarketHomedata);
  yield takeLatest(CANCEL_OPEN_ORDER, cancelOpenOrdersRecord);

  yield takeLatest(CRYPTO_ADDRESS, getCryptoAddress);

  yield takeLatest(CURRENCY, currencyDataApi);
  yield takeLatest(MARKET_HOME, getMarketHomedata);
  yield takeLatest(RESET_PASSWORD, resetPassword);
  yield takeLatest(RESET_VERIFICAYION, resetPasswordVerification);
  yield takeLatest(RESEND_OTP, resendOtpApi);
}
