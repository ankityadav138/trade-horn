import darkColors from '../constants/color_dark.json';
import lightColors from '../constants/color_light.json';
import AsyncStorage from '@react-native-community/async-storage';
import {DarkBg} from '../constants/color_dark.json';
import {LightBg} from '../constants/color_light.json';
import React, {useEffect, useState, useContext} from 'react';
import {useTheme, Switch, TouchableRipple} from 'react-native-paper';

// let defaultTheme = true;
// export const SetColors = theme => {
//   //console.log('AsyncStorage', AsyncStorage.getItem('theme'));
//   defaultTheme = theme;
// };
export const AppColors = themeColorData => {
  //const paperTheme = useTheme();
  //  console.log('AMRITA',theme)
  return themeColorData === true ? darkColors : lightColors;
};

// export const AppBgs = () => {
//   return defaultTheme ? DarkBg : LightBg;
// };
