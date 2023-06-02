import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {BackgroundImg} from '../assets/BackgroundImg';
import {AppColors} from '../constants/appColors';
import {useIsFocused} from '@react-navigation/native';
import {PROFILE} from '../store/action';

const Splash = ({navigation}) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const accessToken = useSelector(state => state.login.accessToken);
  const themeColorData = useSelector(state => state.login.themeValue);
  const profileData = useSelector(state => state.user.profileData);

  useEffect(() => {
    console.log('profile -----------------------------', profileData);
    dispatch({
      type: PROFILE,
      payload: {token: accessToken},
    });
  }, [isFocused]);

  const nextScreen = () => {
    if (accessToken) {
      navigation.replace('TabNavigator');
    } else {
      navigation.navigate('Login');
    }
  };

  useEffect(() => {
    setTimeout(() => nextScreen(), 2000);
  }, []);

  return (
    <View
      style={{flex: 1, backgroundColor: AppColors(themeColorData).background}}>
      <ImageBackground
        source={require('../assets/bg.png')}
        style={{flex: 1, padding: 16, justifyContent: 'space-between'}}>
        <View style={{marginLeft: '70%'}}>
          <Image
            style={{height: 129, width: 160, opacity: 0.9}}
            source={require('../assets/designColors.png')}
          />
        </View>
        <View style={{flexDirection: 'column', alignItems: 'center'}}>
          {/* <Image
            style={{height: 100, width: 180}}
            source={require('../assets/designColors.png')}
          /> */}
          <Image
            style={{height: 100, width: 235, marginTop: 16}}
            source={require('../assets/Group1.png')}
          />
        </View>
        <View></View>
        <View></View>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  imageBackgroundStyle: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconImageStyle: {
    height: 250,
    width: 250,
  },
});
export default Splash;
