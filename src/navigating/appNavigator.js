import React, {useEffect, useMemo, useState} from 'react';
import darkColors from '../constants/color_dark.json';
import lightColors from '../constants/color_light.json';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import {
  DarkTheme,
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';
import {AuthContext} from '../components/context';
import AsyncStorage from '@react-native-community/async-storage';
import Splash from '../screens/Splash';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import Buy from '../screens/Buy';
import BuyReport from '../screens/BuyReport';
import BuyReportList from '../screens/BuyReportList';
import ForgotPassword from '../screens/ForgotPassword';
import SecurityOtp from '../screens/SecurityOtp';
import FirstStepHome from '../screens/FirstStepHome';
import SecurityPriority from '../screens/SecurityPriority';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import {AppColors} from '../constants/appColors';
import {getDimen} from '../dimensions/dimen';
import {Image} from 'react-native';
import DrawerNavigator from './Drawer/DrawerNavigator';
import Exchange from '../screens/Exchange';
//import AboutContainer from '../screens/about/AboutContainer';
import FeeSchedule from '../screens/FeeSchedule';
import HomeTab from './Tab/BottamTab';
import DepositAmount from '../screens/assets/DepositAmount';
import DepositDetails from '../screens/assets/DepositDetails';
import CryptoDepositAmount from '../screens/assets/cryptoDeposit';
import EnterAddress from '../screens/profile/KycVerifyComponents/EnterAddress';
import DocVerification from '../screens/profile/KycVerifyComponents/DocVerification';
import Kyc from '../screens/profile/KycVerifyComponents/Kyc';
import SubmitMessage from '../screens/profile/KycVerifyComponents/SubmitMessage';
import Withrawal from '../screens/assets/Withdrawal';
import CryptoWithrawal from '../screens/assets/cryptoWithdraw';
import GraphChart from '../screens/graph/GraphChart';
import Tips from '../screens/assets/Tips';
import TermsCondition from '../screens/TermsCondition';
import PrivacyPolicy from '../screens/PrivacyPolicy';
import TabNavigator from './BottomTabNavigator/TabNavigator';
import BuyBtcScreen from '../screens/BuyBtcScreen';
import TradeOrder from '../screens/orders/components/TradeOrder';
import MyPortfolio from '../screens/MyPortfolio';
import EditPortfolio from '../screens/EditPortfolio';
import createNewPassword from '../screens/createNewPassword';
import {THEME_CHANGE_DATA} from '../store/action';
import {useDispatch} from 'react-redux';
import Market from '../screens/Market';
import MarketExchange from '../screens/MarketExchange';
import Graphical from '../screens/graph/Graphical';
import AboutContainer from '../screens/about/AboutContainer';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// function HomeTab() {
//   const setFocus = function (isFocused) {
//     if (isFocused) {
//       return AppColors().blueColor;
//     } else {
//       return 'white';
//     }
//   };
//   return (
//     <Tab.Navigator
//       initialRouteName="Home"
//       tabBarOptions={{
//         activeTintColor: AppColors().blueColor,
//         inactiveTintColor: 'white',
//         safeAreaInset: {bottom: 'never', top: 'never'},
//         style: {
//           backgroundColor: 'rgb(3, 24, 47)',
//           alignItems: 'center',
//           justifyContent: 'center',
//           alignContent: 'center',
//           alignSelf: 'center',
//           height: getDimen(0.14),
//           paddingBottom: '2%',
//         },
//       }}>
//       <Tab.Screen
//         name="Dashboard"
//         component={Dashboard}
//         options={{
//           tabBarLabel: 'order',
//           tabBarIcon: ({focused, horizontal, tintColor}) => (
//             <Icon name="ios-cart-sharp" size={24} color={setFocus(focused)} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Wallets"
//         component={Exchange}
//         options={{
//           tabBarLabel: 'Exchange',
//           tabBarIcon: ({focused, horizontal, tintColor}) => (
//             <Image
//               style={{height: 20, width: 20, tintColor: setFocus(focused)}}
//               source={require('../assets/money-exchange.png')}
//             />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="SendMoney"
//         component={Buy}
//         options={{
//           tabBarLabel: 'Buy',
//           tabBarIcon: ({focused, horizontal, tintColor}) => (
//             <Image
//               style={{height: 20, width: 15, tintColor: setFocus(focused)}}
//               source={require('../assets/shopping-bag.png')}
//             />
//           ),
//         }}
//       />
//     </Tab.Navigator>
//   );
// }

const loginStack = () => {
  return (
    <>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="GraphChart"
        component={GraphChart}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MyPortfolio"
        component={MyPortfolio}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditPortfolio"
        component={EditPortfolio}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AboutContainer"
        component={AboutContainer}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen
        name="FeeSchedule"
        component={FeeSchedule}
        options={{headerShown: false}}
      /> */}
      <Stack.Screen
        name="BuyReport"
        component={BuyReport}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BuyReportList"
        component={BuyReportList}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="createNewPassword"
        component={createNewPassword}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SecurityOtp"
        component={SecurityOtp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="FirstStepHome"
        component={FirstStepHome}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SecurityPriority"
        component={SecurityPriority}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen
        name="DashboardScreen"
        component={DrawerNavigator}
        options={{headerShown: false}}
      /> */}
      <Stack.Screen
        name="TabNavigator"
        component={TabNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="HomeTab1"
        component={HomeTab}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EnterAddress"
        component={EnterAddress}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DocVerification"
        component={DocVerification}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Kyc" component={Kyc} options={{headerShown: false}} />

      <Stack.Screen
        name="SubmitMessage"
        component={SubmitMessage}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="DepositAmount"
        component={DepositAmount}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="DepositDetails"
        component={DepositDetails}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CryptoDeposit"
        component={CryptoDepositAmount}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Withrawal"
        component={Withrawal}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CryptoWithrawal"
        component={CryptoWithrawal}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Tips"
        component={Tips}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BuyBtcScreen"
        component={BuyBtcScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TradeOrder"
        component={TradeOrder}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Market"
        component={Market}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MarketExchange"
        component={MarketExchange}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Graphical"
        component={Graphical}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="TermsCondition"
        component={TermsCondition}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicy}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen
        name="ProfileDetails"
        component={ProfileDetails}
        options={{headerShown: false}}
      /> */}
    </>
  );
};

const homeStack = () => {
  return (
    <>
      {/*  <Stack.Screen
        name="SplashWithLogin"
        component={SplashWithLogin}
        options={{headerShown: false}}
    />*/}
    </>
  );
};

const AppNavigator = () => {
  const dispatch = useDispatch();

  const accessToken = useSelector(state => state.login.accessToken);
  const themeColorData = useSelector(state => state.login.themeValue);
  console.log('appnavigatorColortheme', themeColorData);

  const [isDarkTheme, setIsDarkTheme] = useState(themeColorData);

  const authContext = useMemo(
    () => ({
      toggleTheme: () => {
        // if (DarkTheme) {
        //   setIsDarkTheme(!isDarkTheme);
        // } else {
        //   setIsDarkTheme(true);
        // }
        // if(isDarkTheme === true){
        //   setIsDarkTheme(themeColorData)
        // }
        setIsDarkTheme(isDarkTheme => !isDarkTheme);
        dispatch({
          type: THEME_CHANGE_DATA,
          payload: theme.dark,
        });
      },
    }),
    [],
  );
  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#FFFFFF',
      text: '#000000F0',
      ...lightColors,
    },
  };

  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '##000000F0',
      text: '#FFFFFF',
      ...darkColors,
    },
  };
  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;
  console.log('theme', theme.dark);
  dispatch({
    type: THEME_CHANGE_DATA,
    payload: theme.dark,
  });

  useEffect(() => {}, [accessToken]);

  return (
    <PaperProvider theme={theme}>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer theme={theme}>
          <Stack.Navigator>
            {accessToken ? loginStack() : loginStack()}
          </Stack.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
    </PaperProvider>
  );
};

export default AppNavigator;
