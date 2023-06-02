import React from 'react';
import {moderateScale} from 'react-native-size-matters';

const RESIZE_FACTOR = 0.3;

export default {
  h: moderateScale(22, RESIZE_FACTOR),
  h1: moderateScale(20, RESIZE_FACTOR),
  h2: moderateScale(18, RESIZE_FACTOR),
  h3: moderateScale(16, RESIZE_FACTOR),
  h4: moderateScale(14, RESIZE_FACTOR),
  h5: moderateScale(12, RESIZE_FACTOR),
  h6: moderateScale(10, RESIZE_FACTOR),
  p: moderateScale(8, RESIZE_FACTOR),

  componentsDifferenceHight: moderateScale(24, RESIZE_FACTOR),
  componentsDifferenceMediam: moderateScale(16, RESIZE_FACTOR),
  componentsDifferenceLow: moderateScale(8, RESIZE_FACTOR),
  componentsDifference: moderateScale(5, RESIZE_FACTOR),
};
