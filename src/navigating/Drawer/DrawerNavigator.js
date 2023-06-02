import React, {useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DrawerMenu from './DrawerMenu';
import {useTheme} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AppColors} from '../../constants/appColors';
import Exchange from '../../screens/Exchange';
import Buy from '../../screens/Buy';
import {getDimen} from '../../dimensions/dimen';
import Icon from 'react-native-vector-icons/Ionicons';
import ProfileDetails from '../../screens/profile/ProfileDetails';
import AboutContainer from '../../screens/about/AboutContainer';
import BottamTab from '../Tab/BottamTab';
import TopTab from '../Tab/TopTab';
import MarketExchange from '../../screens/MarketExchange';
import ProfileMyAssets from '../../screens/profile/components/ProfileMyAssets';
import ProfileVerification from '../../screens/profile/components/ProfileVerification';
import ProfileWalletHistory from '../../screens/profile/components/ProfileWalletHistory';
import ProfileOpenOrder from '../../screens/profile/components/ProfileOpenOrder';
import ProfileOrderHistory from '../../screens/profile/components/ProfileOrderHistory';
import ProfileTicket from '../../screens/profile/components/ProfileTicket';
import ProfileSecurity from '../../screens/profile/components/ProfileSecurity';
import FeeSchedule from '../../screens/FeeSchedule';
import TermsCondition from '../../screens/TermsCondition';
import PrivacyPolicy from '../../screens/PrivacyPolicy';

const Drawer = createDrawerNavigator();

const DrawerNavigator = ({navigation}) => {
  const {colors} = useTheme();
  const dispatch = useDispatch();

  console.log('DrawerNavigator');
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        headerTintColor: colors.heading,
        headerStyle: {
          backgroundColor: colors.headerColor,
        },

        drawerStyle: {
          backgroundColor: 'black',
          //width: '90%',
        },
      }}
      drawerContent={() => <DrawerMenu />}>
      <Drawer.Screen
        name="HomeTabs"
        // component={BottamTab}
        component={MarketExchange}
        options={{title: 'Home'}}
      />

      <Drawer.Screen
        name="HomeBattamTabs"
        component={BottamTab}
        options={{title: 'Home'}}
      />

      <Drawer.Screen
        name="ProfileDetails"
        component={ProfileDetails}
        optisBackions={{title: 'Login'}}
      />
       <Drawer.Screen
        name="FeeSchedule"
        component={FeeSchedule}
        optisBackions={{title: 'Login'}}
      />
      {/* <Drawer.Screen
        name="ProfileMyAssets"
        component={ProfileMyAssets}
        optisBackions={{title: 'Login'}}
      />
      <Drawer.Screen
        name="ProfileVerification"
        component={ProfileVerification}
        optisBackions={{title: 'Login'}}
      />
      <Drawer.Screen
        name="ProfileWalletHistory"
        component={ProfileWalletHistory}
        optisBackions={{title: 'Login'}}
      />
      <Drawer.Screen
        name="ProfileOpenOrder"
        component={ProfileOpenOrder}
        optisBackions={{title: 'Login'}}
      />
      <Drawer.Screen
        name="ProfileOrderHistory"
        component={ProfileOrderHistory}
        optisBackions={{title: 'Login'}}
      />
      <Drawer.Screen
        name="ProfileTicket"
        component={ProfileTicket}
        optisBackions={{title: 'Login'}}
      /> */}
      <Drawer.Screen
        name="AboutContainer"
        component={AboutContainer}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="ProfileSecurity"
        component={ProfileSecurity}
        options={{headerShown: false}}
      />
       <Drawer.Screen
        name="ProfileVerification"
        component={ProfileVerification}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="ProfileMyAssets"
        component={ProfileMyAssets}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="ProfileWalletHistory"
        component={ProfileWalletHistory}
        options={{headerShown: false}}
      />
       <Drawer.Screen
        name="ProfileOpenOrder"
        component={ProfileOpenOrder}
        options={{headerShown: false}}
      />
       <Drawer.Screen
        name="ProfileOrderHistory"
        component={ProfileOrderHistory}
        options={{headerShown: false}}
      />
       <Drawer.Screen
        name="ProfileTicket"
        component={ProfileTicket}
        options={{headerShown: false}}
      />
        <Drawer.Screen
        name="TermsCondition"
        component={TermsCondition}
        options={{headerShown: false}}
      />

      <Drawer.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicy}
        options={{headerShown: false}}
      />

    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
