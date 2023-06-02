import axios from 'axios';
import {all} from 'redux-saga/effects';
import * as config from '../../constants/config.json';

axios.defaults.baseURL = config.liveUrl;

export const API = {
  getProfile: async data => {
    // console.log('profile data', data);
    const result = await axios({
      method: 'GET',
      url: `/v1/user/profile`,
      headers: {Authorization: `Bearer ${data.token}`},
    });
    return result;
  },
  getLogHistory: async data => {
    const result = await axios({
      method: 'GET',
      url: `/v1/user/log-history`,
      headers: {Authorization: `Bearer ${data.token}`},
    });
    return result;
  },
  getAssets: async data => {
    const result = await axios({
      method: 'GET',
      url: `/v1/fiat/assets`,
      headers: {Authorization: `Bearer ${data.token}`},
    });
    return result;
  },

  getTotBalance: async data => {
    const result = await axios({
      method: 'GET',
      url: `/v1/user/total-balance`,
      data: data.data,
      headers: {Authorization: `Bearer ${data.token}`},
    });
    // console.log('log result', result);
    return result;
  },

  getCryptoWithdraw: async data => {
    const result = await axios({
      method: 'POST',
      url: `/v1/crypto/withdraw`,
      data: data.data,
      headers: {Authorization: `Bearer ${data.token}`},
    });
    // console.log('log result', result);
    return result;
  },

  getFiatWithdraw: async data => {
    const result = await axios({
      method: 'POST',
      url: `/v1/fiat/withdraw`,
      data: data.data,
      headers: {Authorization: `Bearer ${data.token}`},
    });
    // console.log('log result', result);
    return result;
  },

  getCryptoVeriftTFA: async data => {
    const result = await axios({
      method: 'POST',
      url: `/v1/crypto/verify-tfa`,
      data: data.data,
      headers: {Authorization: `Bearer ${data.token}`},
    });
    // console.log('log result', result);
    return result;
  },

  getFiatVerifyTFA: async data => {
    const result = await axios({
      method: 'POST',
      url: `/v1/fiat/verify-tfa`,
      data: data.data,
      headers: {Authorization: `Bearer ${data.token}`},
    });
    // console.log('log result', result);
    return result;
  },

  getdropdownCurrency: async data => {
    const result = await axios({
      method: 'GET',
      url: `/v1/user/preferred/${data.data}`,
      headers: {Authorization: `Bearer ${data.token}`},
    });
    // console.log('log result', result);
    return result;
  },

  getFiatTable: async data => {
    const result = await axios({
      method: 'GET',
      url: `/v1/fiat/assets`,
      headers: {Authorization: `Bearer ${data.token}`},
    });
    // console.log('log result', result);
    return result;
  },

  getCryptoTable: async data => {
    const result = await axios({
      method: 'GET',
      url: `/v1/crypto/assets`,
      headers: {Authorization: `Bearer ${data.token}`},
    });
    // console.log('log result', result);
    return result;
  },

  getFiatVerifyUserData: async data => {
    const result = await axios({
      method: 'POST',
      url: `/v1/fiat/verify-user-data`,
      data: data.data,
      headers: {Authorization: `Bearer ${data.token}`},
    });
    // console.log('log result', result);
    return result;
  },

  getCryptoVerifyUserData: async data => {
    const result = await axios({
      method: 'POST',
      url: `/v1/crypto/verify-user-data`,
      data: data.data,
      headers: {Authorization: `Bearer ${data.token}`},
    });
    // console.log('log result', result);
    return result;
  },

  getFiatVerifyPasscode: async data => {
    const result = await axios({
      method: 'POST',
      url: `/v1/fiat/verify-passcode`,
      data: data.data,
      headers: {Authorization: `Bearer ${data.token}`},
    });
    // console.log('log result', result);
    return result;
  },

  getCryptoVerifyPasscode: async data => {
    const result = await axios({
      method: 'POST',
      url: `/v1/crypto/verify-passcode`,
      data: data.data,
      headers: {Authorization: `Bearer ${data.token}`},
    });
    // console.log('log result', result);
    return result;
  },

  getFiatBankDetails: async data => {
    const result = await axios({
      method: 'GET',
      url: `/v1/fiat/bank-details`,
      data: data.data,
      headers: {Authorization: `Bearer ${data.token}`},
    });
    // console.log('log result', result);
    return result;
  },

  getRemoveBankDetails: async data => {
    const result = await axios({
      method: 'GET',
      url: `/v1/user/remove-bank`,
      data: data.data,
      headers: {Authorization: `Bearer ${data.token}`},
    });
    // console.log('log result', result);
    return result;
  },

  getUpdateBankDetails: async data => {
    const result = await axios({
      method: 'POST',
      url: `/v1/user/update-bank`,
      data: data.data,
      headers: {Authorization: `Bearer ${data.token}`},
    });
    // console.log('log result', result);
    return result;
  },

  getFiatDeposite: async data => {
    // console.log('FiatDeposite data!!', data);
    const result = await axios({
      method: 'POST',
      url: `/v1/fiat/deposit`,
      data: data.data,
      headers: {Authorization: `Bearer ${data.token}`},
    });
    // console.log('FiatDeposite result', result);
    return result;
  },

  getCryptoAddress: async data => {
    const result = await axios({
      method: 'GET',
      // url: `/v1/get-crypto-address/${data.data}`,
      url: `/v1/get-crypto-address/TRX`,
      data: data.data,
      headers: {Authorization: `Bearer ${data.token}`},
    });
    // console.log('log result', result);
    return result;
  },

  getLogin: async data => {
    const result = await axios({
      method: 'POST',
      url: `/v1/login`,
      data: data.data,
    });
    return result;
  },
  getSignUp: async data => {
    console.log(data.data);
    const result = await axios({
      method: 'POST',
      url: `/v1/register`,
      data: data.data,
    });
    // console.log('result', result);
    return result;
  },

  getOtpApi: async data => {
    //console.log('OtpApi...', data);
    const result = await axios({
      method: 'POST',
      url: `/v1/user/confirm-account`,
      data: data.data,
      headers: {Authorization: `Bearer ${data.token}`},
    });
    return result;
  },

  forgotPassApi: async data => {
    const result = await axios({
      method: 'POST',
      url: `/v1/forget`,
      data: data,
    });
    return result;
  },

  getOpenOrdersApi: async data => {
    const result = await axios({
      method: 'GET',
      url: `/v1/my-order-details`,
      headers: {Authorization: `Bearer ${data.token}`},
    });
    return result;
  },

  getMarketTrades: async data => {
    const result = await axios({
      method: 'GET',
      url: `/v1/trade-data-history2?id=BTC/USDT`,
      headers: {Authorization: `Bearer ${data.token}`},
    });
    return result;
  },

  getAssetsApi: async data => {
    const result = await axios({
      method: 'GET',
      url: `/v1/user/wallet-balance`,
      headers: {Authorization: `Bearer ${data.token}`},
    });

    return result;
  },

  getOpenOrders: async data => {
    const result = await axios({
      method: 'POST',
      url: `/v1/user/open-order-history`,
      data: data.data,
      headers: {Authorization: `Bearer ${data.token}`},
    });
    return result;
  },

  getOpenOrdersHistory: async data => {
    const result = await axios({
      method: 'POST',
      url: `/v1/user/open-order-history`,
      data: data.data,
      headers: {Authorization: `Bearer ${data.token}`},
    });
    return result;
  },
  getOrderHistory: async data => {
    const result = await axios({
      method: 'POST',
      url: `/v1/user/trade-order-history`,
      data: data.data,
      headers: {Authorization: `Bearer ${data.token}`},
    });
    //console.log('log result', result);
    return result;
  },

  getTickets: async data => {
    const result = await axios({
      method: 'GET',
      url: `/v1/user/tickets`,
      headers: {Authorization: `Bearer ${data.token}`},
    });
    //console.log('log result', result);
    return result;
  },

  getPairListApi: async data => {
    const result = await axios({
      method: 'GET',
      url: `/v1/pair-list`,
      headers: {Authorization: `Bearer ${data.token}`},
    });
    return result;
  },

  getTopPairListApi: async data => {
    const result = await axios({
      method: 'GET',
      url: `/v1/top-pair?currency=USD`,
      headers: {Authorization: `Bearer ${data.token}`},
    });
    return result;
  },

  getPairDetailApi: async data => {
    // console.log(data.data, '---hyyyy');
    const result = await axios({
      method: 'GET',
      url: `/v1/pair-detail/${data.data}`,
      headers: {Authorization: `Bearer ${data.token}`},
    });
    return result;
  },

  getCurrencyBalance: async data => {
    //console.log(' api index current==', data);
    const result = await axios({
      method: 'GET',
      url: `/v1/user/currency-balance/${data.data}`,
      //url: `/v1/user/currency-balance/${data.replace('/', '_')}`,
      headers: {Authorization: `Bearer ${data.token}`},
    });
    return result;
  },

  getFiatHistory: async data => {
    const result = await axios({
      method: 'GET',
      url: `/v1/user/fiat-history`,
      data: data.data,
      headers: {Authorization: `Bearer ${data.token}`},
    });
    return result;
  },

  getCryptoHistory: async data => {
    //const accessToken = 'eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.eyJvcHRpb24iOiJ1c2VyX2xvZ2luIiwiaWQiOiI2MTcxMzY1YmRkYjFlN2M2NzM0Y2NkMWQiLCJzdGF0dXMiOnRydWUsImlhdCI6MTY0NzQyNDY1OH0.fFSE30J7rC3-v0t6fst6V-2saF5Ja3keVaycXFi70xlJYth7PMW-uv-MAy2dM3tv'

    // console.log('crypto history apipiii', data);
    const result = await axios({
      method: 'POST',
      url: `/v1/user/crypto-history`,
      data: data.data,
      headers: {Authorization: `Bearer ${data.token}`},
    });
    return result;
  },

  getplaceOrderApi: async data => {
    // console.log('OtpApi...', data);
    const result = await axios({
      method: 'POST',
      url: `/v1/place-order`,
      data: data.data,
      headers: {Authorization: `Bearer ${data.token}`},
    });
    // console.log('RESULT', result.data)
    return result;
  },

  getactivateAccount: async data => {
    // console.log('activateApi...', data);
    const result = await axios({
      method: 'POST',
      url: `/v1/activate-account`,
      data: data.data,
      //headers: {Authorization: `Bearer ${data.token}`},
    });
    return result;
  },

  getOTP: async data => {
    const result = await axios({
      method: 'GET',
      url: `/v1/user/send-otp?o=TOTP_Code`,
      //  data: data.data,
      headers: {Authorization: ` ${data.token}`},
    });
    return result;
  },

  // getWalletHistory: async data => {
  //   console.log("wallet history in api", data.token)
  //   const result = await axios({
  //     method: 'GET',
  //     // params: { status: "All", type: "Withdraw " },
  //     url: `/v1/user/fiat-history`,
  //     data: data.data,
  //     headers: { Authorization: ` ${data.token}` },
  //   });

  //   return result;
  // },

  checkOTP: async data => {
    const result = await axios({
      method: 'POST',
      url: `/v1/user/verify-otp`,
      data: data.data,
      headers: {Authorization: `Bearer ${data.token}`},
    });
    return result;
  },
  updateTFA: async data => {
    const result = await axios({
      method: 'POST',
      url: `/v1/user/update-tfa`,
      data: data.data,
      headers: {Authorization: `Bearer ${data.token}`},
    });
    return result;
  },
  checkTFA: async data => {
    const result = await axios({
      method: 'POST',
      url: `/v1/user/verify-tfa`,
      data: data.data,
      headers: {Authorization: `Bearer ${data.token}`},
    });
    return result;
  },
  changePassword: async data => {
    const result = await axios({
      method: 'POST',
      url: `/v1/user/change-password`,
      data: data.data,
      headers: {Authorization: `Bearer ${data.token}`},
    });
    return result;
  },

  resetPasswordVerification: async data => {
    console.log('data in resert verificaiton', data);
    const result = await axios({
      method: 'POST',
      url: `/v1/password-reset-verification`,
      data: data.data,
      headers: {Authorization: `Bearer ${data.token}`},
    });
    return result;
  },

  resetPassword: async data => {
    const result = await axios({
      method: 'POST',
      url: `/v1/reset-password`,
      data: data.data,
      headers: {Authorization: `Bearer ${data.token}`},
    });
    return result;
  },
  signoutLoginSession: async data => {
    const result = await axios({
      method: 'POST',
      url: `/v1/user/signout-session`,
      data: data.data,
      headers: {Authorization: `Bearer ${data.token}`},
    });
    return result;
  },

  PairDetail: async data => {
    //console.log(data,'data')
    const result = await axios({
      method: 'GET',
      // url: `/v1/pair-detail/BTC_USDT`,
      url: `/v1/pair-detail/${data.data}`,
      //data: data.data,
      headers: {Authorization: `Bearer ${data.token}`},
    });
    return result;
  },

  placeOrderApi: async data => {
    const result = await axios({
      method: 'POST',
      url: `/v1/place-order`,
      data: data.data,
      headers: {Authorization: `Bearer ${data.token}`},
    });
    return result;
  },

  getFavourite: async data => {
    const result = await axios({
      method: 'GET',
      url: `/v1/user/get-favourites`,
      headers: {Authorization: `Bearer ${data.token}`},
    });
    return result;
  },
  saveFavourite: async data => {
    const result = await axios({
      method: 'GET',
      //url: `/v1/user/move-to-favourites?id=doge/eth`, ${data.data}
      url: `/v1/user/move-to-favourites?id= ${data.data}`,
      headers: {Authorization: `Bearer ${data.token}`},
    });
    return result;
  },

  currencyDataApi: async data => {
    const result = await axios({
      method: 'GET',
      url: `/v1/pair-currencies?currency=INR`,
      headers: {Authorization: `Bearer ${data.token}`},
    });
    return result;
  },

  getmarketdata: async data => {
    const result = await axios({
      method: 'GET',
      url: `/v1/markets2`,
      headers: {Authorization: `Bearer ${data.token}`},
    });
    return result;
  },

  deleteOpenOrder: async data => {
    const result = await axios({
      method: 'GET',
      url: `/v1/cancel-order/${data.data}`,
      headers: {Authorization: `Bearer ${data.token}`},
    });
    return result;
  },

  resendOtpApi: async data => {
    const result = await axios({
      method: 'POST',
      url: `/v1/resend-link`,
      data: data.data,
      headers: {Authorization: `Bearer ${data.token}`},
    });
    return result;
  },
};
