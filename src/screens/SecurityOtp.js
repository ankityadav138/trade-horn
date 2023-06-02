import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icons from 'react-native-vector-icons/Ionicons';
import {InputArea} from '../components/inputArea';
import {AppColors} from '../constants/appColors';
import textSize from '../constants/textSize';
import showMessage from '../components/showMessage';
import {CheckBox} from 'react-native-elements';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {useTheme} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  ACCESS_TOKEN,
  VERIFY_OTP,
  VERIFY_OTP_DATA,
  ACTIVATE_ACCOUNT,
  RESET_VERIFICAYION,
  RESET_VERIFICAYION_DATA,
  ACTIVATE_ACCOUNT_DATA,
  RESEND_OTP_DATA,
  RESEND_OTP,
} from '../store/action';
import Ionicons from 'react-native-vector-icons/MaterialIcons';
import AuthButton from '../constants/AuthButton';
import {scale} from '../utils/Scale/Scale';
import {getDimen} from '../dimensions/dimen';
import AppButton from '../constants/AppButton';
import {useIsFocused} from '@react-navigation/native';

const SecurityOtp = ({navigation, route}) => {
  const {mail} = route.params.EmailId;
  console.log(route.params.routeName);
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const accessToken = useSelector(state => state.login.accessToken);
  const otpVerify = useSelector(state => state.login.otpVerify);
  const resetPasswordVerifyData = useSelector(
    state => state.login.resetPasswordVerifyData,
  );
  const activateOtp = useSelector(state => state.login.active);
  const signupData = useSelector(state => state.login.signupData);
  const themeColorData = useSelector(state => state.login.themeValue);
  const resendOtp = useSelector(state => state.login.resendOtp);

  const [otp, setOtp] = useState('');

  useEffect(() => {
    // console.log(
    //   'otpVerify====================================',
    //   resetPasswordVerifyData,
    // );
    // console.log(otpVerify);
    // console.log('ACTIVATE', activateOtp);
    // console.log('====================================');

    if (Object.keys(activateOtp).length > 0) {
      if (activateOtp && activateOtp.code === 200) {
        dispatch({
          type: ACTIVATE_ACCOUNT_DATA,
          payload: {},
        });
        // dispatch({type: VERIFY_OTP_DATA, payload: {}});
        showMessage(activateOtp && activateOtp.message);
        navigation.navigate('Login');
      } else {
        showMessage(activateOtp && activateOtp.message);
      }
    }
  }, [activateOtp, resendOtp]);

  useEffect(() => {
    if (Object.keys(resetPasswordVerifyData).length > 0) {
      if (resetPasswordVerifyData && resetPasswordVerifyData.code === 200) {
        dispatch({
          type: RESET_VERIFICAYION_DATA,
          payload: {},
        });
        // dispatch({type: VERIFY_OTP_DATA, payload: {}});
        showMessage(resetPasswordVerifyData && resetPasswordVerifyData.message);
        navigation.navigate('createNewPassword');
      } else {
        showMessage(resetPasswordVerifyData && resetPasswordVerifyData.message);
      }
    }
  }, [resetPasswordVerifyData]);

  useEffect(() => {
    if (Object.keys(resendOtp).length > 0) {
      if (resendOtp && resendOtp.code === 200) {
        dispatch({
          type: RESEND_OTP_DATA,
          payload: {},
        });
        // showMessage(resendOtp && resendOtp.message);
      } else {
        showMessage(resendOtp && resendOtp.message);
      }
    }
  }, [isFocused]);

  const getOtp = () => {
    // console.log(
    //   'otpVerify====================================',
    //   resetPasswordVerifyData,
    // );
    // console.log('otp', otp);
    console.log('ACTIVATE', activateOtp);
    console.log('signupData ===========', signupData);
    if (otp && otp.length === 6) {
      if (route.params.routeName === 'Signup') {
        dispatch({
          type: ACTIVATE_ACCOUNT,
          payload: {
            data: {
              code: otp,
              email: route.params.EmailId,
            },
            //  token: accessToken,
          },
        });
      } else if (route.params.routeName === 'ForgotPassword') {
        dispatch({
          type: RESET_VERIFICAYION,
          payload: {
            data: {code: otp},
            token: accessToken,
          },
        });
      }

      // dispatch({
      //   type: RESET_VERIFICAYION,
      //   payload: {
      //     data: {code: otp},
      //     token: accessToken,
      //   },
      // });
      // dispatch({
      //   type: ACTIVATE_ACCOUNT,
      //   payload: {
      //     data: {
      //       code: otp,
      //       email: route.params.EmailId,
      //     },
      //     //  token: accessToken,
      //   },
      // });
      // navigation.replace('TabNavigator');
      // dispatch({
      //   type: ACCESS_TOKEN,
      //   payload: signupData.token,
      // });
    } else {
      showMessage('Enter 6 digit code');
    }
  };

  const resendNewOtp = () => {
    console.log('resendOtp------------------', resendOtp);
    dispatch({
      type: RESEND_OTP,
      payload: {
        data: {
          email: route.params.EmailId,
        },
      },
    });
    if (Object.keys(resendOtp).length > 0) {
      showMessage(resendOtp && resendOtp.message);
    }
  };
  return (
    <View
      style={{flex: 1, backgroundColor: AppColors(themeColorData).background}}>
      {/* <ImageBackground
        source={require('../assets/Backgrond.png')}
        style={styles(colors).imageBackgroundStyle}> */}
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{marginTop: scale(20), marginHorizontal: scale(10)}}>
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
              width: getDimen(0.4),
            }}>
            Back
          </Text>
        </View>
        <View style={{marginHorizontal: -scale(10), marginTop: scale(10)}}>
          <Image
            source={require('../assets/back.png')}
            style={{height: 120, width: 120, resizeMode: 'stretch'}}
          />
        </View>
      </View>

      <Image
        source={require('../assets/mail.png')}
        style={{
          height: 130,
          width: 140,
          resizeMode: 'stretch',
          alignSelf: 'center',
        }}
      />

      <Text style={styles(colors).headingStyle}>Check your mail</Text>
      <Text style={styles(colors).mailTextStyle}>
        Code is sent {route.params.EmailId?.slice(0, 5)}******
        {route.params.EmailId?.slice(23)}
      </Text>
      <View style={{marginVertical: textSize.componentsDifferenceLow}} />

      {/* <View
          style={{ marginVertical: textSize.componentsDifferenceLow }}
        /> */}

      <OTPInputView
        style={{width: '100%', height: 60, padding: 25}}
        pinCount={6}
        autoFocusOnLoad
        codeInputFieldStyle={styles(colors).underlineStyleBase}
        codeInputHighlightStyle={styles(colors).underlineStyleHighLighted}
        onCodeFilled={code => {
          setOtp(code);
          console.log(`Code is ${code}, you are good to go!`);
        }}
      />

      {/* <View style={styles(colors).componetsMargin} /> */}

      <View style={styles(colors).componetsMargin} />
      {/* <AuthButton
        title={`Verify and Create Account`}
        onPress={() => {
         // forgotApi();
           navigation.navigate('createNewPassword')
        }}
      /> */}
      <AppButton
        style={{width: getDimen(0.84), alignSelf: 'center'}}
        text={'Verify and Create Account'}
        onPress={() => {
          // loginApi();
          getOtp();
          // navigation.navigate('createNewPassword');
        }}
      />

      <View style={styles(colors).componetsMargin} />

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'center',
        }}>
        <Text style={styles(colors).borderButtonTextStyle}>
          Did not receive the code?
        </Text>
        <TouchableOpacity
          style={styles(colors).borderButtonStyle}
          onPress={() => resendNewOtp()}>
          <Text style={styles(colors).borderButtonTextStyle2}>Resend OTP</Text>
        </TouchableOpacity>
      </View>
      {/* </ImageBackground> */}
    </View>
  );
};

const styles = props =>
  StyleSheet.create({
    imageBackgroundStyle: {
      flex: 1,
      padding: textSize.componentsDifferenceMediam,
      justifyContent: 'space-between',
    },
    iconImageStyle: {
      height: 60,
      width: 160,
      marginTop: textSize.componentsDifferenceMediam,
    },
    componetsMargin: {marginVertical: textSize.componentsDifferenceMediam},
    cardStyle: {
      flexDirection: 'column',
      padding: textSize.componentsDifferenceHight,
      alignItems: 'center',
    },
    headingStyle: {
      //color:AppColors(themeColorData).inputDark,
      color: props.headerColor,
      fontSize: textSize.h3,
      textAlign: 'center',
      fontWeight: '900',
      marginVertical: 10,
    },
    borderButtonStyle: {
      paddingVertical: 8,
      paddingHorizontal: 1,
      flexDirection: 'row',
      // borderRadius: 8,
      // borderColor:AppColors(themeColorData).inputDark,
      // borderWidth: 2,
    },
    borderButtonTextStyle: {
      color: props.headerColor,
      // fontWeight: 'bold',
      fontSize: 14,
      fontStyle: 'normal',
      width: getDimen(0.47),
    },
    borderButtonTextStyle2: {
      color: '#0AD7FF',
      fontWeight: 'bold',
      fontSize: textSize.h5,
      //paddingLeft: 3,
      width: getDimen(0.2),
    },
    mailTextStyle: {
      color: props.headerColor,
      // fontWeight: 'bold',
      fontSize: 14,
      fontStyle: 'normal',
      alignSelf: 'center',
      width: getDimen(0.6),
    },
    webCardStyle: {
      marginVertical: 4,
      paddingVertical: 2,
      paddingHorizontal: 8,
      borderRadius: 8,
      borderColor: props.headerColor,
      borderWidth: 1,
    },
    weblinkStyle: {
      color: props.headerColor,
      fontSize: textSize.p,
      textDecorationLine: 'underline',
    },
    borderStyleBase: {
      width: 30,
      height: 45,
    },

    underlineStyleBase: {
      width: 38,
      height: 45,
      backgroundColor: '#606060',
      color: '#fff',
      borderWidth: 1,
      borderRadius: 10,
      elevation: 5,
    },

    underlineStyleHighLighted: {
      borderColor: props.headerColor,
    },
  });
export default SecurityOtp;
