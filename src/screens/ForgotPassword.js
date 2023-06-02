import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {InputArea} from '../components/inputArea';
import AppButton from '../constants/AppButton';
import {AppColors} from '../constants/appColors';
import textSize from '../constants/textSize';
import showMessage from '../components/showMessage';
import {useTheme} from '@react-navigation/native';
import {ACCESS_TOKEN, FORGOT_PASS, FORGOT_PASS_DATA} from '../store/action';
import {useDispatch, useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import AuthButton from '../constants/AuthButton';
import {scale} from '../utils/Scale/Scale';
import {DEVICE_WIDTH} from '../utils/Dimensions/Dimensions';
import {moderateScale} from 'react-native-size-matters';
import {getDimen} from '../dimensions/dimen';

const ForgotPassword = ({navigation}) => {
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const themeColorData = useSelector(state => state.login.themeValue);
  const forgotPass = useSelector(state => state.login.forgotPass);
  console.log('forgotPass-----------', forgotPass);

  useEffect(() => {
    if (forgotPass.code === 200) {
      showMessage(forgotPass.message);
      navigation.navigate('SecurityOtp', {
        EmailId: email,
        routeName: 'ForgotPassword',
      });

      dispatch({
        type: ACCESS_TOKEN,
        payload: forgotPass.token,
      });

      dispatch({type: FORGOT_PASS_DATA, payload: {}});
    } else if (forgotPass.code === 400) {
      showMessage(forgotPass.message);
    }
  }, [forgotPass]);

  const forgotApi = () => {
    if (!email) {
      showMessage('Enter email to get OTP');
    } else {
      dispatch({
        type: FORGOT_PASS,
        payload: {email: email},
      });
    }
  };

  return (
    <View
      style={{flex: 1, backgroundColor: AppColors(themeColorData).background}}>
      {/* <ImageBackground
        source={require('../assets/back.png')}
        style={styles(colors).imageBackgroundStyle}> */}
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{marginTop: scale(25), marginHorizontal: scale(10)}}>
          <Ionicons
            name="arrow-back"
            size={25}
            color={AppColors(themeColorData).title}
            onPress={() => navigation.goBack()}
          />
          <Text
            style={{
              color: AppColors(themeColorData).title,
              fontSize: 20,
              fontWeight: '700',
              marginTop: -scale(27),
              marginLeft: scale(35),
              width: getDimen(0.45),
            }}>
            Back
          </Text>
        </View>
        <View style={{marginHorizontal: -scale(10), marginTop: scale(35)}}>
          <Image
            source={require('../assets/back.png')}
            style={{height: 120, width: 120, resizeMode: 'stretch'}}
          />
        </View>
      </View>
      {/* <View> */}
      {/* <LinearGradient
            style={{
              width: '90%',
              borderRadius: moderateScale(20),
              bottom: '5%',
            }}
            colors={[
              colors.transparentGradientColor1,
              colors.transparentGradientColor2,
            ]}> */}
      <View style={styles(colors).cardStyle}>
        <Text
          style={{
            color: AppColors(themeColorData).darkBlack,
            fontSize: textSize.h3,
            textAlign: 'left',
            fontWeight: 'bold',
            paddingLeft: 28,
          }}>
          Reset password
        </Text>
        <View style={{marginLeft: 28, marginTop: '2%'}}>
          <Text style={styles(colors).contentTextStyle}>
            Enter the email associated with your account {'\n'}and we'll send an
            email with instruction to {'\n'}reset your password.
          </Text>
        </View>
        {/* <View style={styles(colors).componetsMargin} /> */}
        {/* 
            <InputArea
              icon={'mail'}
              placeholder={'Email'}
              setValue={text => setEmail(text)}
              value={email}
            /> */}
        <View style={styles.inputContainer}>
          <Text
            style={{
              color: AppColors(themeColorData).title,
              paddingLeft: 30,
              fontSize: 15,
              fontWeight: '900',
              fontStyle: 'normal',
            }}>
            Enter Email Address
          </Text>
          <View style={{width: '85%', alignSelf: 'center', marginBottom: '5%'}}>
            <InputArea
              icon={'mail'}
              placeholder={'abc@gmail.com'}
              setValue={text => setEmail(text)}
              value={email}
              style={{
                borderWidth: 1,
              }}
            />
          </View>
          {/* <TextInput
            style={{
              height: 50,
              width: DEVICE_WIDTH * 0.85,
              backgroundColor: '#e8e8e8',
              color: '#3C3C43',
              fontSize: 12,
              paddingLeft: 40,
              borderRadius: 10,
              marginTop: 17,
              alignSelf: 'center',
              placeholderTextColor: '#3C3C43',
            }}
            // onChangeText={(text) => onChange(text)}
            value={email}
            placeholder={'abc@gmail.com'}
            keyboardType="email-address"
            onChangeText={text => setEmail(text)}
          />
          <Ionicons
            name="mail"
            size={20}
            style={{
              position: 'absolute',
              // right: 90
              top: 52,
              left: 38,
              alignItems: 'center',
              alignSelf: 'center',
            }}
          /> */}
        </View>
        {/* <View style={styles(colors).componetsMargin} /> */}

        {/* <AuthButton
          title={`Continue`}
          onPress={() => {
            forgotApi();
            navigation.navigate('SecurityOtp')
          }}
        /> */}
        <AppButton
          style={{width: '100%', top: '1%', padding: 30, paddingTop: '5%'}}
          text={'Continue'}
          onPress={() => {
            forgotApi();
            // navigation.navigate('SecurityOtp');
          }}
        />

        <View style={styles(colors).componetsMargin} />

        {/* <TouchableOpacity
              style={styles(colors).borderButtonStyle}
              onPress={() => navigation.navigate('Login')}>
              <Text style={styles(colors).borderButtonTextStyle}>
                Do you remember password?
              </Text>
            </TouchableOpacity> */}
      </View>
      {/* </LinearGradient> */}
      {/* </View> */}

      {/* <View style={{ flexDirection: 'column', alignItems: 'center' }}>
          <Text style={{ color: 'white' }}>
            Please make sure to use this URL:
          </Text>
          <TouchableOpacity style={styles(colors).webCardStyle}>
            <Icons
              name="lock-closed"
              size={12}
              color={AppColors(themeColorData).title}FF"
              style={{top: 2}}
            />
            <Text style={styles(colors).TextStyle}> | </Text>
            <Text style={styles(colors).weblinkStyle}>
              https://www.tradehorn.com
            </Text>
          </TouchableOpacity>
        </View> */}

      {/* </ImageBackground> */}
    </View>
  );
};

const styles = props =>
  StyleSheet.create({
    imageBackgroundStyle: {
      flex: 1,
      // padding: 20,
      // justifyContent: 'space-between',
      // zIndex: 15
      // paddingRight: 5,
    },
    iconImageStyle: {
      height: 60,
      width: 160,
      marginTop: textSize.componentsDifferenceMediam,
    },
    componetsMargin: {marginVertical: textSize.componentsDifferenceMediam},
    cardStyle: {
      flexDirection: 'column',
      // padding: textSize.componentsDifference,
      // alignItems: 'center',
      marginTop: -scale(60),
    },
    headingStyle: {
      color: props.headerColor,
      fontSize: textSize.h3,
      textAlign: 'left',
      fontWeight: 'bold',
      paddingLeft: 28,
    },
    contentTextStyle: {
      color: props.headerColor,
      fontSize: textSize.h5,
      // textAlign: 'center',
      fontWeight: '500',
      height: getDimen(0.25),
    },
    borderButtonStyle: {
      paddingVertical: 4,
      paddingHorizontal: 16,
      borderRadius: 8,
      borderColor: props.headerColor,
      borderWidth: 2,
      width: '99%',
      height: 30,
      borderRadius: 20,
      marginBottom: '5%',
      bottom: moderateScale(16),
    },
    borderButtonTextStyle: {
      color: props.headerColor,
      fontWeight: 'bold',
      fontSize: textSize.h6,
      //  textAlign: 'center',
    },
    TextStyle: {
      color: props.headerColor,
      fontSize: textSize.h6,
      //  textAlign: 'center',
    },
    webCardStyle: {
      marginVertical: 4,
      paddingVertical: 2,
      paddingHorizontal: 8,
      borderRadius: 15,
      borderColor: props.headerColor,
      borderWidth: 2,
      flexDirection: 'row',
    },
    weblinkStyle: {
      color: props.headerColor,
      fontSize: textSize.h6,
      textDecorationLine: 'underline',
      width: getDimen(0.47),
    },
    inputContainer: {
      justifyContent: 'center',
    },
    input: {
      height: 50,
    },
    icon: {
      position: 'absolute',
      right: 10,
    },
  });
export default ForgotPassword;
