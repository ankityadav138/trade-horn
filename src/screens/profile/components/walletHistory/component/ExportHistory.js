import React from 'react';
import {View, Text} from 'react-native';
import textSize from '../../../../../constants/textSize';
import Entypo from 'react-native-vector-icons/Entypo';
import {getDeviceToken} from 'react-native-device-info';
import {getDimen} from '../../../../../dimensions/dimen';
import {moderateScale} from 'react-native-size-matters';

export default function ExportHistory() {
  return (
    <View
      style={{
        width: '60%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Entypo
        name="export"
        size={24}
        color="white"
        style={{marginHorizontal: 5}}
      />
      <Text
        style={{
          marginHorizontal: 4,
          color: 'white',
          fontSize: textSize.h6,
          width: moderateScale(47),
          // backgroundColor: 'red',
        }}>
        Export
      </Text>
      <Text
        style={{
          color: 'white',
          fontSize: textSize.h6,
          width: moderateScale(60),
        }}>
        History
      </Text>
    </View>
  );
}
