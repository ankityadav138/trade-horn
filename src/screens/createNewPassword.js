import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  TextInput,
  RNText,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {InputArea} from '../components/inputArea';
import AppButton from '../constants/AppButton';
import {AppColors} from '../constants/appColors';
import textSize from '../constants/textSize';
import showMessage from '../components/showMessage';
import {useTheme} from '@react-navigation/native';
import {
  ACCESS_TOKEN,
  FORGOT_PASS,
  FORGOT_PASS_DATA,
  RESET_PASSWORD,
  RESET_PASSWORD_DATA,
} from '../store/action';
import {useDispatch, useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import AuthButton from '../constants/AuthButton';
import {scale} from '../utils/Scale/Scale';
import {DEVICE_WIDTH} from '../utils/Dimensions/Dimensions';
import {getDimen} from '../dimensions/dimen';

const createNewPassword = ({navigation}) => {
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const themeColorData = useSelector(state => state.login.themeValue);

  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [show, setShow] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmShow, setConfirmShow] = useState(false);

  const forgotPass = useSelector(state => state.login.forgotPass);
  const resetPasswordData = useSelector(state => state.login.resetPasswordData);
  const accessToken = useSelector(state => state.login.accessToken);

  console.log('forgotPass-----------', resetPasswordData);

  useEffect(() => {
    if (resetPasswordData?.code === 200) {
      // navigation.navigate('SecurityOtp');
      showMessage(resetPasswordData?.message);
      dispatch({type: RESET_PASSWORD_DATA, payload: {}});
      navigation.navigate('Login');
    } else if (resetPasswordData?.code === 400) {
      dispatch({type: RESET_PASSWORD_DATA, payload: {}});
      showMessage(resetPasswordData?.message);
    }
  }, [resetPasswordData]);

  const resetPassword = () => {
    if (!password || !confirmPassword) {
      showMessage('Please fill required inputs');
    } else {
      dispatch({
        type: RESET_PASSWORD,
        payload: {
          data: {
            new_password: password,
            confirm_password: confirmPassword,
          },
          token: accessToken,
        },
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
              width: '100%',
              borderRadius: 6,
            }}
            colors={[
              colors.transparentGradientColor1,
              colors.transparentGradientColor2,
            ]}> */}
      <View style={styles(colors).cardStyle}>
        <Text style={styles(colors).headingStyle}>Create new password</Text>
        <View style={{marginLeft: 28}}>
          <Text style={styles(colors).contentTextStyle}>
            your new password must be different {'\n'}from previous used
            password
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
              fontSize: 16,
              fontStyle: 'normal',
              fontWeight: '900',
              marginLeft: scale(32),
              marginTop: '2%',
            }}>
            Password
          </Text>
          <TextInput
            style={{
              height: 50,
              width: DEVICE_WIDTH * 0.85,
              backgroundColor: '#E8E8E8', //AppColors(themeColorData).inputBackgroud,
              fontSize: 12,
              paddingLeft: 20,
              borderRadius: 10,
              marginTop: 10,
              alignSelf: 'center',
            }}
            underlineColorAndroid={'transparent'}
            placeholderTextColor={'#10101C'}
            fontSize={16}
            //fontWeight={'600'}
            placeholder={'Password'}
            isPassword={true}
            onChangeText={text => setPassword(text)}
            value={password}
          />
          <Text
            style={{
              color: AppColors(themeColorData).title,
              fontSize: 11,
              fontStyle: 'normal',
              fontWeight: '500',
              marginLeft: scale(32),
            }}>
            Must be at least 8 characters
          </Text>

          <TouchableOpacity onPress={() => setShow(!show)}>
            <Image
              style={[
                styles.icon,
                {opacity: 0.9},
                {
                  tintColor: AppColors(themeColorData).backgroundLight,
                  position: 'absolute',
                  right: scale(50),
                  bottom: scale(30),
                },
              ]}
              source={
                show
                  ? require('../assets/eye_close.png')
                  : require('../assets/eye_open.png')
              }
            />
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <Text
            style={{
              color: AppColors(themeColorData).title,
              fontSize: 16,
              fontStyle: 'normal',
              fontWeight: '900',
              marginLeft: scale(32),
              marginTop: scale(25),
            }}>
            Confirm Password
          </Text>

          <TextInput
            style={{
              height: 50,
              width: DEVICE_WIDTH * 0.85,
              backgroundColor: '#E8E8E8',
              fontSize: 12,
              paddingLeft: 20,
              borderRadius: 10,
              marginTop: 10,
              alignSelf: 'center',
            }}
            underlineColorAndroid={'transparent'}
            placeholderTextColor={'#10101C'}
            fontSize={16}
            placeholder="Confirm Password"
            // isPassword={true}
            onChangeText={text => setConfirmPassword(text)}
            value={confirmPassword}
          />
          <Text
            style={{
              color: AppColors(themeColorData).title,
              fontSize: 11,
              fontStyle: 'normal',
              fontWeight: '500',
              marginLeft: scale(32),
            }}>
            Both password must match
          </Text>

          <TouchableOpacity onPress={() => setConfirmShow(!confirmShow)}>
            <Image
              style={[
                styles.icon,
                {opacity: 0.9},
                {
                  tintColor: AppColors(themeColorData).backgroundLight,
                  position: 'absolute',
                  right: scale(50),
                  bottom: scale(30),
                },
              ]}
              source={
                confirmShow
                  ? require('../assets/eye_close.png')
                  : require('../assets/eye_open.png')
              }
            />
          </TouchableOpacity>
        </View>

        {/* <View style={styles(colors).componetsMargin} /> */}

        {/* <AuthButton
                    style={{ marginTop: 20 }}
                    title={`Reset Password`}
                    onPress={() => {
                        forgotApi();
                        navigation.navigate('createNewPassword')
                    }}
                /> */}

        <AppButton
          style={{width: '100%', top: '1%', padding: 30}}
          text={'Reset Password'}
          onPress={() => {
            //loginApi();
            resetPassword();
            // navigation.navigate('Login');
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
      fontWeight: '900',
      paddingLeft: 30,
    },
    contentTextStyle: {
      color: props.headerColor,
      fontSize: textSize.h5,
      // textAlign: 'center',
      fontWeight: '500',
      height: getDimen(0.15),
      paddingLeft: '1%',
      paddingTop: '2%',
    },
    borderButtonStyle: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 8,
      borderColor: props.headerColor,
      borderWidth: 2,
    },
    borderButtonTextStyle: {
      color: props.headerColor,
      fontWeight: 'bold',
      fontSize: textSize.h5,
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

    container: {
      alignSelf: 'stretch',
      marginVertical: scale(10),
      marginHorizontal: scale(20),
    },
    holder: {
      flexDirection: 'row',
      borderStyle: 'solid',
      borderWidth: scale(0.1),
      padding: scale(5),
      paddingHorizontal: scale(10),
      borderRadius: scale(25),
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'stretch',
      minHeight: scale(55),
      width: scale(320),
      backgroundColor: props.headerColor,
    },
    icon: {
      width: scale(20),
      height: scale(20),
      margin: scale(4),
      resizeMode: 'contain',
    },

    textField: {
      flex: 1,
      padding: scale(5),
      color: '#000',
      // color: colors.secondary
    },
    errorText: {
      // color: colors.danger,
      fontSize: scale(12),
      right: 0,
      marginLeft: scale(10),
    },
  });

export default createNewPassword;
