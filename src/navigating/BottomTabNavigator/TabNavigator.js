import React, {useContext} from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProfileOpenOrder from '../../screens/profile/components/ProfileOpenOrder';
import Exchange from '../../screens/Exchange';
import Market from '../../screens/Market';
import Order from '../../screens/orders/Order';
import ProfileDetails from '../../screens/profile/ProfileDetails';
import style from 'react-native-datepicker/style';
import textSize from '../../constants/textSize';
import HomeScreen from '../../screens/home/HomeScreen';
import MarketExchange from '../../screens/MarketExchange';
import OrderScreen from '../../screens/orders/OrderScreen';
import MyPortfolio from '../../screens/MyPortfolio';
import {AppColors} from '../../constants/appColors';
import {useDispatch, useSelector} from 'react-redux';

const Tab = createBottomTabNavigator();

console.log('hello');
export default function TabNavigator() {
  const themeColorData = useSelector(state => state.login.themeValue);

  const setFocus = function (isFocused) {
    if (isFocused) {
      return 'white';
    } else {
      return 'gray';
    }
  };

  return (
    <React.Fragment>
      <Tab.Navigator
        initialRouteName="HomeScreen"
        tabBarOptions={{
          showLabel: true,
          style: {backgroundColor: AppColors(themeColorData).background},
          activeTintColor: 'green',
          inactiveTintColor: 'green',
        }}
        screenOptions={({route}) => ({
          tabBarStyle: {backgroundColor: AppColors(themeColorData).background},
          tabBarIcon: ({focused}) => {
            let iconName;
            if (route.name === 'HomeScreen') {
              iconName = focused ? (
                <View style={Styles.selectedIconStyle}>
                  <Image
                    style={[
                      Styles.tabIcons,
                      {tintColor: AppColors(themeColorData).title},
                    ]}
                    source={require('../../assets/homeimg.png')}
                  />
                </View>
              ) : (
                <Image
                  style={[
                    Styles.tabIcons,
                    {tintColor: AppColors(themeColorData).title},
                  ]}
                  source={require('../../assets/homeIcon.png')}
                />
              );
            } else if (route.name === 'MarketExchange') {
              iconName = focused ? (
                <View style={Styles.selectedIconStyle}>
                  <Image
                    style={[
                      Styles.tabIcons,
                      {tintColor: AppColors(themeColorData).title},
                    ]}
                    source={require('../../assets/exchangeimg.png')}
                  />
                </View>
              ) : (
                <Image
                  style={[
                    Styles.tabIcons,
                    {tintColor: AppColors(themeColorData).title},
                  ]}
                  source={require('../../assets/exchIcon.png')}
                />
              );
            } else if (route.name === 'Market') {
              iconName = focused ? (
                <View style={Styles.selectedIconStyle}>
                  <Image
                    style={[
                      Styles.tabIcons,
                      {tintColor: AppColors(themeColorData).title},
                    ]}
                    source={require('../../assets/marketimg.png')}
                  />
                </View>
              ) : (
                <Image
                  style={[
                    Styles.tabIcons,
                    {tintColor: AppColors(themeColorData).title},
                  ]}
                  source={require('../../assets/Maarket.png')}
                />
              );
            } else if (route.name === 'OrderScreen') {
              iconName = focused ? (
                <View style={Styles.selectedIconStyle}>
                  <Image
                    style={[
                      Styles.tabIcons,
                      {tintColor: AppColors(themeColorData).title},
                    ]}
                    source={require('../../assets/orderimg.png')}
                  />
                </View>
              ) : (
                <Image
                  style={[
                    Styles.tabIcons,
                    {tintColor: AppColors(themeColorData).title},
                  ]}
                  source={require('../../assets/orderIcon.png')}
                />
              );
            } else if (route.name === 'MyPortfolio') {
              iconName = focused ? (
                <View style={Styles.selectedIconStyle}>
                  <Image
                    style={[
                      Styles.tabIcons,
                      {tintColor: AppColors(themeColorData).title},
                    ]}
                    source={require('../../assets/walletimg.png')}
                  />
                </View>
              ) : (
                <Image
                  style={[
                    Styles.tabIcons,
                    {tintColor: AppColors(themeColorData).title},
                  ]}
                  source={require('../../assets/walletIcon.png')}
                />
              );
            }
            return iconName;
          },
        })}>
        <Tab.Screen
          name="HomeScreen"
          options={{
            headerShown: false,
            tabBarLabel: ({focused, horizontal, tintColor}) =>
              focused ? (
                <Text
                  style={[
                    Styles.tabTitleSelected,
                    {color: AppColors(themeColorData).title},
                  ]}>
                  Home
                </Text>
              ) : (
                <Text style={Styles.tabTitle}>Home</Text>
              ),
          }}
          component={HomeScreen}
        />
        <Tab.Screen
          name="MarketExchange"
          options={{
            headerShown: false,
            tabBarLabel: ({focused, horizontal, tintColor}) =>
              focused ? (
                <Text
                  style={[
                    Styles.tabTitleSelected,
                    {color: AppColors(themeColorData).title},
                  ]}>
                  Exchange
                </Text>
              ) : (
                <Text style={Styles.tabTitle}>Exchange</Text>
              ),
          }}
          component={MarketExchange}
        />
        <Tab.Screen
          name="Market"
          options={{
            headerShown: false,
            tabBarLabel: ({focused, horizontal, tintColor}) =>
              focused ? (
                <Text
                  style={[
                    Styles.tabTitleSelected,
                    {color: AppColors(themeColorData).title},
                  ]}>
                  Market
                </Text>
              ) : (
                <Text style={Styles.tabTitle}>Market</Text>
              ),
          }}
          component={Market}
        />
        <Tab.Screen
          name="OrderScreen"
          options={{
            headerShown: false,
            tabBarLabel: ({focused, horizontal, tintColor}) =>
              focused ? (
                <Text
                  style={[
                    Styles.tabTitleSelected,
                    {color: AppColors(themeColorData).title},
                  ]}>
                  Order
                </Text>
              ) : (
                <Text style={Styles.tabTitle}>Order</Text>
              ),
          }}
          component={OrderScreen}
        />
        <Tab.Screen
          name="MyPortfolio"
          options={{
            headerShown: false,
            tabBarLabel: ({focused, horizontal, tintColor}) =>
              focused ? (
                <Text
                  style={[
                    Styles.tabTitleSelected,
                    {color: AppColors(themeColorData).title},
                  ]}>
                  Wallet
                </Text>
              ) : (
                <Text style={Styles.tabTitle}>Wallet</Text>
              ),
          }}
          component={MyPortfolio}
        />
      </Tab.Navigator>
    </React.Fragment>
  );
}

const Styles = StyleSheet.create({
  selectedIconStyle: {
    width: 32,
    height: 32,
    // backgroundColor: '#202020B5',
    borderRadius: 400 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIcons: {
    width: 20,
    height: 20,
  },
  reelsIcon: {
    width: 40,
    height: 40,
  },
  tabTitle: {
    textAlign: 'center',
    color: '#8F8F8F',
    //fontSize: textSize.h6,
    fontSize: 13,
    fontFamily: '',
  },
  tabTitleSelected: {
    textAlign: 'center',
    // color: 'white',
    //fontSize: textSize.h6,
    fontSize: 13,
    fontFamily: '',
  },
});
