import {combineReducers} from 'redux';
import {CommonReducer} from './commonReducer';
import {LoginReducer} from './loginReducer';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import {ThemeReducer} from './themeReducer';
import {userReducer} from './userReducer';
import {orderReducer} from './orderReducer';
import {SecurityReducer} from './SecurityReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['login', 'theme', 'user', 'order','security'],
};

const RootReducer = combineReducers({
  common: CommonReducer,
  login: LoginReducer,
  theme: ThemeReducer,
  user: userReducer,
  order: orderReducer,
  security:SecurityReducer
});

export default persistReducer(persistConfig, RootReducer);
