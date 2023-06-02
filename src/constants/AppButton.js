import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {AppColors} from './appColors';
import textSize from './textSize';
// import { Container } from './styles';

const AppButton = ({text, onPress, style, IsImage}) => {
  return (
    <View style={style}>
      <TouchableOpacity style={styles.buttonView} onPress={onPress}>
        <Text
          style={
            IsImage ? [styles.ButtonText, {right: 10}] : styles.ButtonText
          }>
          {' '}
          {text}{' '}
        </Text>
        {IsImage == true ? (
          <Image
            style={{height: 20, width: 20}}
            source={require('../assets/delete.png')}
          />
        ) : null}
      </TouchableOpacity>
    </View>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  buttonView: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3AB091',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 30,
    flexDirection: 'row',
    height: moderateScale(45),
    borderRadius: 10,
  },

  ButtonText: {
    color: AppColors().title,
    // fontWeight: 'bold',
    fontSize: textSize.h2,
    width: '90%',
    textAlign: 'center',
    color: '#FFF',
    fontWeight: '900',
    borderRadius: 30,
  },
});
