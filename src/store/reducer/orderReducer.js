import {
  PAIR,
  CURRENCY_BAL_DATA,
  GET_OPEN_ORDER_DATA,
  MARKET_TRADE_DATA,
  GET_ASSETS_DATA,
  GET_PAIRLIST_DATA,
  GET_PAIRDETAIL_DATA,
  PLACEORDER_DATA,
  PLACE_ORDER_DATA,
  TOP_PAIR_CURRENCY_DATA,
  PAIR_DETAIL_API_DATA,
  PLACE_TRADE_ORDER_DATA,
  GET_FAV_DATA,
  SAVE_FAV_DATA,
  CURRENCY_DATA,
  GET_OPEN_ORDER_HISTORY_DATA,
  MARKET_HOME_DATA,
  CANCEL_OPEN_ORDER_DATA
} from '../action';

const initState = {
  openOrders: [],
  marketTradeData: [],
  assetsData: [],
  pairlistData: [],
  pair: '',
  pairdetail: [],
  currencyBalance: [],
  placeOrder: [],
  pairdetailData: [],
  placeTradeOrder: [],
  topPairlistData: [],
  fav: [],
  saveFav: [],
  currency: [],
  openOrdersHistoryData: [],
  marketHome:[],
  deleData:[],
};

export const orderReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_OPEN_ORDER_DATA: {
      
      return { ...state, openOrders: action.payload };
    }
    case MARKET_TRADE_DATA: {
      return { ...state, marketTradeData: action.payload };
    }
    case GET_ASSETS_DATA: {
      return { ...state, assetsData: action.payload };
    }
    case GET_PAIRLIST_DATA: {
      return { ...state, pairlistData: action.payload };
    }
    case PAIR: {
      return { ...state, pair: action.payload };
    }
    case TOP_PAIR_CURRENCY_DATA: {
      return { ...state, topPairlistData: action.payload };
    }
    case GET_PAIRDETAIL_DATA: {
      return { ...state, pairdetail: action.payload };
    }
    case CURRENCY_BAL_DATA: {
      return { ...state, currencyBalance: action.payload };
    }
    case PLACEORDER_DATA: {
      return { ...state, placeOrder: action.payload };
    }
    case PAIR_DETAIL_API_DATA: {
      return { ...state, pairdetailData: action.payload };
    }
    case PLACE_TRADE_ORDER_DATA: {
      return { ...state, placeTradeOrder: action.payload };
    }
    case GET_FAV_DATA: {
      return { ...state, fav: action.payload };
    }
    case SAVE_FAV_DATA: {
      return { ...state, saveFav: action.payload };
    }
    case CURRENCY_DATA: {
      return { ...state, currency: action.payload };
    }
    case GET_OPEN_ORDER_HISTORY_DATA: {
      return { ...state, openOrdersHistoryData: action.payload };
    }
    case MARKET_HOME_DATA: {
      return { ...state, marketHome: action.payload };
    }
    case CANCEL_OPEN_ORDER_DATA: {
      return { ...state, deleData: action.payload };
    }
    default: {
      return state;
    }
  }
};
