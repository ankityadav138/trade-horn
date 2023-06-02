import {
  FETCH_PROFILE,
  FETCH_LOGHISTORY,
  FETCH_ASSETS,
  FETCH_TOTALBALANCE,
  FETCH_OPEN_ORDER,
  FETCH_ORDER_HISTORY,
  FETCH_TICKETS,
  FETCH_FIAT_HISTORY,
  FETCH_CRYPTO_HISTORY,
  WALLET_HISTORY_DATA,

  CRYPTO_WITHDRAW_DATA,
  FIAT_WITHDRAW_DATA,
  CRYPTO_VERIFY_TFA_DATA,
  FIAT_VERIFY_TFA_DATA,
  DROPDOWN_CURRENCY_DATA,
  FIAT_TABLE_DATA,
  CRYPTO_TABLE_DATA,
  FIAT_DEPOSIT_DATA,
  FIAT_VERIFY_PASSCODE_DATA,
  FIAT_VERIFY_USERDATA_DATA,
  CRYPTO_ADDRESS_DATA,
  CRYPTO_VERIFY_PASSCODE_DATA,
  CRYPTO_VERIFY_USERDATA_DATA,
  BANK_DETAILS_DATA,
  REMOVE_BANK_DETAILS_DATA,
  UPDATE_BANK_DETAILS_DATA

} from '../action';

const initState = {
  profileData: [],
  logHistory: [],
  assets: [],
  totalBalance: [],
  openOrder: [],
  orderHistory: [],
  tickets: [],
  fiatHistory: [],
  cryptoHistory: [],
  wallerHistoryData: [],
  cryptoWithdraw: [],
  fiatWithdraw: [],
  cryptoVerifyTFA: [],
  fiatVerifyTFA: [],
  dropdownData: [],
  fiatTableData: [],
  cryptoTableData: [],
  cryptoAddressData: [],
  fiatVerifyUserData: [],
  cryptoVerifyUserData: [],
  fiatVerifyPasscode: [],
  cryptoVerifyPasscode: [],
  fiatBankDetails: [],
  removeBankDetails: [],
  updateBankDetails: [],
  fiatDeposite: [],
  cryptoAddress: []

};

export const userReducer = (state = initState, action) => {
  switch (action.type) {
    case FETCH_PROFILE: {
      return { ...state, profileData: action.payload };
    }
    case FETCH_LOGHISTORY: {
      return { ...state, logHistory: action.payload };
    }
    case FETCH_ASSETS: {
      return { ...state, assets: action.payload };
    }
    case FETCH_TOTALBALANCE: {
      return { ...state, totalBalance: action.payload };
    }
    case FETCH_OPEN_ORDER: {
      return { ...state, openOrder: action.payload };
    }
    case FETCH_ORDER_HISTORY: {
      return { ...state, orderHistory: action.payload };
    }
    case FETCH_TICKETS: {
      return { ...state, tickets: action.payload };
    }
    case FETCH_FIAT_HISTORY: {
      return { ...state, fiatHistory: action.payload };
    }
    case FETCH_CRYPTO_HISTORY: {
      return { ...state, cryptoHistory: action.payload };
    }
    case WALLET_HISTORY_DATA: {
      return { ...state, wallerHistoryData: action.payload };
    }
    case CRYPTO_VERIFY_TFA_DATA: {
      return { ...state, cryptoVerifyTFA: action.payload };
    }
    case CRYPTO_WITHDRAW_DATA: {
      return { ...state, cryptoWithdraw: action.payload };
    }
    case FIAT_VERIFY_TFA_DATA: {
      return { ...state, fiatVerifyTFA: action.payload };
    }
    case FIAT_WITHDRAW_DATA: {
      return { ...state, fiatWithdraw: action.payload };
    }
    case DROPDOWN_CURRENCY_DATA: {
      return { ...state, dropdownData: action.payload };
    }
    case FIAT_TABLE_DATA: {
      return { ...state, fiatTableData: action.payload };
    }
    case CRYPTO_TABLE_DATA: {
      return { ...state, cryptoTableData: action.payload };
    }

    case FIAT_DEPOSIT_DATA: {
      return { ...state, fiatDeposite: action.payload };
    }
    case FIAT_VERIFY_PASSCODE_DATA: {
      return { ...state, fiatVerifyPasscode: action.payload };
    }
    case FIAT_VERIFY_USERDATA_DATA: {
      return { ...state, fiatVerifyUserData: action.payload };
    }
    case CRYPTO_ADDRESS_DATA: {
      return {...state, cryptoAddressData: action.payload};
    }
    case CRYPTO_VERIFY_PASSCODE_DATA: {
      return { ...state, cryptoVerifyPasscode: action.payload };
    }
    case CRYPTO_VERIFY_USERDATA_DATA: {
      return { ...state, cryptoVerifyUserData: action.payload };
    }
    case BANK_DETAILS_DATA: {
      return { ...state, fiatBankDetails: action.payload };
    }
    case REMOVE_BANK_DETAILS_DATA: {
      return { ...state, removeBankDetails: action.payload };
    }
    case UPDATE_BANK_DETAILS_DATA: {
      return { ...state, updateBankDetails: action.payload };
    }

    default: {
      return state;
    }
  }
};
