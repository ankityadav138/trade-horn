import React, {useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AppColors} from '../../constants/appColors';
import Exchange from '../../screens/Exchange';
import Buy from '../../screens/Buy';
import {getDimen} from '../../dimensions/dimen';
import Icon from 'react-native-vector-icons/Ionicons';
import Order from '../../screens/orders/Order';
import AsyncStorage from '@react-native-community/async-storage';
import GraphChart from '../../screens/graph/GraphChart';
import textSize from '../../constants/textSize';

const Tab = createBottomTabNavigator();

const BottamTab = ({navigation, route}) => {
  //const [count, setCount] = React.useState(0);

  //const {newPrice} = route.params.pairPrice;
  //console.log('PRICE',route.params.pairPrice)
  // AsyncStorage.setItem('Cost',route.params.pairPrice)
  _storeData = async () => {
    try {
      await AsyncStorage.setItem('Cost', route.params.pairPrice);
    } catch (error) {
      // Error saving data
    }
  };
  //console.log('COST',newPrice)
  //setCount(route.params.pairPrice)
  useEffect(() => {
    _storeData();
  }, []);
  const setFocus = function (isFocused) {
    if (!isFocused) {
      return AppColors().blueColor;
    } else {
      return 'white';
    }
  };
  return (
    <Tab.Navigator
      initialRouteName="SendMoneyTab"
      tabBarOptions={{
        activeTintColor: '#fff',
        inactiveTintColor: AppColors().blueColor,
        safeAreaInset: {bottom: 'never', top: 'never'},
        style: {
          backgroundColor: 'rgb(3, 24, 47)',
          alignItems: 'center',
          justifyContent: 'center',
          alignContent: 'center',
          alignSelf: 'center',
          height: getDimen(0.14),
          paddingBottom: '2%',
          width: '100%',
        },
      }}>
      <Tab.Screen
        name="OrderTab"
        component={Order}
        options={{
          tabBarLabel: ({focused, horizontal, tintColor}) => (
            <Text
              style={{
                width: '50%',
                textAlign: 'center',
                color: setFocus(!focused),
                fontSize: textSize.h5,
              }}>
              ORDER
            </Text>
          ),
          tabBarIcon: ({focused, horizontal, tintColor}) => (
            <Image
              style={{height: 20, width: 25, tintColor: setFocus(!focused)}}
              source={require('../../assets/shopping-cart.png')}
            />
          ),
        }}
      />
      <Tab.Screen
        name="SendMoneyTab"
        component={Buy}
        options={{
          tabBarLabel: ({focused, horizontal, tintColor}) => (
            <Text
              style={{
                width: '50%',
                textAlign: 'center',
                color: setFocus(!focused),
                fontSize: textSize.h5,
              }}>
              BUY
            </Text>
          ),
          tabBarIcon: ({focused, horizontal, tintColor}) => (
            <Image
              style={{height: 20, width: 15, tintColor: setFocus(!focused)}}
              source={require('../../assets/shopping-bag.png')}
            />
          ),
        }}
      />

      {/* <Tab.Screen
        name="GraphChart"
        component={GraphChart}
        options={{
          tabBarLabel: 'GraphChart',
          tabBarIcon: ({focused, horizontal, tintColor}) => (
            <Icon name="ios-cart-sharp" size={24} color={setFocus(!focused)} />
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
};

export default BottamTab;
