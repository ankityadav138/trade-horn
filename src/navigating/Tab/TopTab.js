import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Exchange from '../../screens/Exchange';
import Market from '../../screens/Market';

const Tab = createMaterialTopTabNavigator();

function TobTab() {
  return (
    <Tab.Navigator >
      <Tab.Screen name="MARKET" component={Market} />

      <Tab.Screen name="EXCHANGE" component={Exchange} />
    </Tab.Navigator>
  );
}

export default TobTab;
