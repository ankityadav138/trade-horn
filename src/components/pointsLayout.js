import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import {AppColors} from '../constants/appColors';
import textSize from '../constants/textSize';
import {getDimen} from '../dimensions/dimen';

export const PointsLayout = ({title, imageUrl, details}) => {
  return (
    <View>
      <View style={{width: '100%', flexDirection: 'row'}}>
        <View
          style={{
            height: 70,
            width: 70,
            backgroundColor: '#FFFFFFDE',
            padding: 5,
            alignItems: 'center',
            borderRadius: 20,
           // alignSelf:'center'
          }}>
          <Image
            style={{height: 35, width: 35, marginVertical: 4,alignSelf:'center'}}
            source={imageUrl}
          />
          <Text
            style={[styles.borderButtonTextStyle, {color: AppColors().title,fontWeight:'bold'}]}>
            {title}
          </Text>
        </View>
        <View
          style={{
            width: '70%',
            marginStart: 8,
           // alignItems: 'center',
          }}>
          <Text style={styles.borderButtonTextStyle}>{details}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  borderButtonTextStyle: {
    color: '#FFFFFFDE',
   // fontWeight: 'bold',
    fontSize: textSize.h6,
   alignItems:'center',
   height:getDimen(0.25),
   alignSelf:'center'

  },
});
