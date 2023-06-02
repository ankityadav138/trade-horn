import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icons from 'react-native-vector-icons/Ionicons';
import {InputArea} from '../components/inputArea';
import AppButton from '../constants/AppButton';
import {AppColors} from '../constants/appColors';
import textSize from '../constants/textSize';
import showMessage from '../components/showMessage';
import {CheckBox} from 'react-native-elements';
import {AppStyles} from '../style/AppStyles';
import {Link, useTheme} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {ACCESS_TOKEN, LOGIN, USER_LOGIN, MARKET_HOME} from '../store/action';
import DeviceInfo from 'react-native-device-info';
import {moderateScale} from 'react-native-size-matters';
import {getDimen} from '../dimensions/dimen';
import Icon from 'react-native-vector-icons/Fontisto';

const Login = ({navigation}) => {
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSelected, setSelection] = useState(false);
  const loginData = useSelector(state => state.login.loginData);
  const accessToken = useSelector(state => state.login.accessToken);
  const themeColorData = useSelector(state => state.login.themeValue);

  console.log(loginData);
  console.log('ACESS TOKEN________', accessToken);
  useEffect(() => {
    // console.log('====================================');
    // console.log(loginData);
    // console.log('====================================');
    if (loginData && loginData.code) {
      if (Object.keys(loginData).length > 0) {
        if (loginData.code === 200) {
          dispatch({
            type: ACCESS_TOKEN,
            payload: loginData.token,
          });
          dispatch({
            type: MARKET_HOME,
            payload: loginData.token,
          });
          navigation.replace('TabNavigator');
          // dispatch({type: USER_LOGIN, payload: {}});
        }

        showMessage(loginData && loginData.message);
      }
    }
  }, [loginData]);

  const loginApi = async () => {
    // console.log('Onlogin');
    if (email == '') {
      showMessage('Please Enter Email Address');
      return;
    }
    if (password == '') {
      showMessage('Please Enter Password');
      return;
    }
    // navigation.navigate('DashboardScreen');
    //const IP = DeviceInfo.getIPAddress()
    const systemVersion = DeviceInfo.getSystemVersion();
    console.log('system versionnnn', systemVersion);
    const systemModel = DeviceInfo.getModel();
    const deviceId = DeviceInfo.getDeviceId();
    const deviceType = DeviceInfo.getSystemName();
    var ipAddress = '';
    await DeviceInfo.getIpAddress().then(ip => {
      ipAddress = ip;
    });

    console.log('broweserVers', systemVersion);
    console.log('IP ADDRESS', ipAddress);
    console.log('os', systemModel);
    console.log('device', deviceType);
    console.log('deviceId', deviceId);

    dispatch({
      type: LOGIN,
      payload: {
        data: {
          username: email,
          password: password,
          ipaddress: ipAddress,
          deviceInfo: {
            browser_version: systemVersion,
            device: deviceType,
            os: systemModel,
          },
        },
      },
    });

    // payload: {
    //   username: 'cointestaccnt29@gmail.com',
    //   password: 'Test1234@',
    //   ipaddress: '103.239.86.188',
    //   deviceInfo: {
    //     browser_version: '92',
    //     os: 'Linux x86_64',
    //   },
    //   device: 'Desktop',
    // },
  };

  return (
    <View
      style={{flex: 1, backgroundColor: AppColors(themeColorData).background}}>
      <ImageBackground
        source={require('../assets/bg.png')}
        style={styles.imageBackgroundStyle}>
        {/* <View style={AppStyles.appLogoView}>
          <Image
            style={AppStyles.appLogo}
            source={require('../assets/Logo.png')}
          />
        </View> */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            top: '10%',
            marginRight: '22%',
          }}>
          <Image
            // style={styles.iconImageStyle}
            style={{height: 130, width: 250}}
            source={require('../assets/Group1.png')}
          />
          <Image
            style={{height: 100, width: 150, left: '22%'}}
            source={require('../assets/designColors.png')}
          />
        </View>
        {/* <View style={{marginLeft:'3%',}}>
          <Image
            style={styles.iconImageStyle}
            source={require('../assets/Group1.png')}
          />
        </View> */}
        <View style={{alignItems: 'center', marginTop: '10%'}}>
          <View>
            <View
              style={{
                flexDirection: 'column',
                padding: moderateScale(24),
                // alignItems: 'center',
                paddingBottom: 200,
              }}>
              <Text
                style={{
                  color: colors.heading,
                  fontSize: 16,
                  // textAlign: 'center',
                  // bottom: moderateScale(10),
                  width: '100%',
                  fontWeight: 'bold',
                  marginLeft: '2%',
                }}>
                Hey, Welcome Back!
              </Text>

              {/* <Image
                style={{ height: 40, width: 35, marginTop: '7%' }}
                source={require('../assets/profile.png')}
              /> */}

              <InputArea
                icon={'mail'}
                placeholder={'johnsondoe@gmail.com'}
                setValue={text => setEmail(text)}
                value={email}
                style={{
                  borderWidth: 1,
                }}
              />

              <View style={{marginVertical: moderateScale(10)}}></View>

              <InputArea
                icon={'md-lock-closed'}
                placeholder={'Password'}
                isPassword={true}
                setValue={text => setPassword(text)}
                value={password}
              />

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginVertical: 16,
                  width: '100%',
                }}>
                {/* <View
                  style={{
                    marginStart: -20,
                    flexDirection: 'row',
                    alignItems: 'center',
                    bottom: moderateScale(10),
                  }}>
                  <CheckBox
                    checkedIcon={
                      <Icons name="checkbox" size={16} color="#FFFFFF" />
                    }
                    uncheckedIcon={
                      <Icons
                        name="checkbox-outline"
                        size={16}
                        color="#FFFFFF"
                      />
                    }
                    checked={isSelected}
                    onPress={() => setSelection(!isSelected)}
                  />
                  <Text
                    style={{
                      color: colors.heading,
                      fontSize: textSize.p,
                      width: getDimen(0.3),
                      right: moderateScale(17),
                    }}>
                    Remember me
                  </Text>
                </View> */}

                <TouchableOpacity
                  style={{
                    width: '50%',
                    bottom: moderateScale(10),
                    top: '1%',
                    left: 150,
                  }}
                  onPress={() => navigation.navigate('ForgotPassword')}>
                  <Text
                    style={{
                      color: AppColors(themeColorData).greyish,
                      marginTop: moderateScale(17),
                      fontSize: 13,
                      textAlign: 'right',
                      fontWeight: 'bold',
                    }}>
                    Forgot Password?
                  </Text>
                </TouchableOpacity>
              </View>

              <AppButton
                style={{width: getDimen(0.84), top: '1%'}}
                text={'Continue'}
                onPress={() => {
                  loginApi();
                  //navigation.navigate('DashboardScreen');
                }}
              />

              {/* <View style={styles.componetsMargin}></View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  bottom: '5%',
                }}>
                <View
                  style={{flex: 1, height: 1, backgroundColor: '#FFFFFF2C'}}
                />
                <View>
                  <Text
                    style={{
                      width: '110%',
                      textAlign: 'center',
                      color: '#FFFFFF99',
                      padding: 16,
                      fontSize: 12,
                    }}>
                    Or Log In Using
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    height: 1,
                    backgroundColor: '#FFFFFF2C',
                    marginRight: 5,
                  }}
                />
              </View> */}

              {/* <TouchableOpacity
                style={{
                  paddingVertical: 4,
                  paddingHorizontal: 12,
                  borderRadius: 10,
                  borderColor: '#707070',
                  borderWidth: 2,
                  width: '95%',
                  paddingTop: 15,
                  height: moderateScale(50),
                  // top: 40,
                  bottom: '3%',
                }}>
                <Image
                  style={{height: 15, width: 15, left: '30%'}}
                  source={require('../assets/icons8-google.png')}
                />
                <Text
                  style={{
                    color: '#FFFFFF99',
                    fontWeight: 'bold',
                    fontSize: 14,
                    width: '100%',
                    textAlign: 'center',
                    bottom: 20,
                    padding: 3,
                  }}>
                  Google
                </Text>
              </TouchableOpacity> */}
              {/* <View style={{ right: '0%',bottom:'0%',top:'3%',alignItems:'center' }}>
                <Text style={{ color: '#FFF', alignItems:'center',alignSelf:'center',width:getDimen(0.40)}}>New to Tradehorn?
                <TouchableOpacity   onPress={() => navigation.navigate('SignUp')}>
                <Text
                    style={{ color: '#3AB091',fontWeight:'bold',alignItems:'center' ,alignSelf:'center',width:getDimen(0.50)}}> SignUp
                  </Text>
                </TouchableOpacity>
                 </Text>
                 
              </View> */}
              <View
                style={{
                  bottom: '0%',
                  top: '9%',
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginLeft: 20,
                  alignSelf: 'center',
                }}>
                <Text
                  style={{
                    color: AppColors(themeColorData).title,
                    alignItems: 'center',
                    alignSelf: 'center',
                    width: getDimen(0.44),
                  }}>
                  New to Tradehorn?
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                  <Text
                    style={{
                      color: '#3AB091',
                      fontWeight: '900',
                      alignSelf: 'center',
                      width: getDimen(0.15),
                      right: '65%',
                    }}>
                    {' '}
                    Sign Up
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: '27%',
                }}>
                <TouchableOpacity onPress={() => navigation.navigate('Market')}>
                  <View
                    style={{
                      backgroundColor: AppColors(themeColorData).inputBackgroud,
                      borderRadius: 10,
                      padding: 5,
                    }}>
                    <Text
                      style={{
                        fontFamily: '',
                        color: AppColors(themeColorData).title,
                        paddingHorizontal: 15,
                        fontWeight: 'bold',
                      }}>
                      {' '}
                      Market
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => navigation.navigate('MarketExchange')}>
                  <View
                    style={{
                      backgroundColor: AppColors(themeColorData).inputBackgroud,
                      borderRadius: 10,
                      padding: 5,
                    }}>
                    <Text
                      style={{
                        fontFamily: '',
                        color: AppColors(themeColorData).title,
                        paddingHorizontal: 15,
                        fontWeight: 'bold',
                      }}>
                      {' '}
                      Exchange
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        {/* <View
          style={{
            // flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: colors.heading,
              width: '100%',
              textAlign: 'center',
              fontSize: textSize.h6,
              right: moderateScale(30),
            }}>
            Please make sure to use this URL:
          </Text>
          <TouchableOpacity
            style={{
              marginVertical: 4,
              paddingVertical: 2,
              paddingHorizontal: 8,
              borderRadius: 8,
              borderColor: colors.headerColor,
              borderWidth: 1,
              flexDirection: 'row',
              width: '60%',
            }}
            onPress={() => Linking.openURL('https://demo.tradehorn.com/#/')}>
            <Icons name="lock-closed" size={16} color="#FFFFFF" />
            <Text style={styles.TextStyle}> | </Text>
            <Text
              style={{
                color: colors.headerColor,
                fontSize: textSize.p,
                textDecorationLine: 'underline',
                width: getDimen(1),
              }}>
              https://www.tradehorn.com
            </Text>
          </TouchableOpacity>
        </View> */}
        {/* <Text
          style={{
            color: colors.headerColor,
            fontSize: textSize.p,
            textDecorationLine: 'underline',
            width: getDimen(1),
            alignSelf: 'center',
            textAlign: 'center',
          }}>
          TradeHorn Version 1.0.3
        </Text> */}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  imageBackgroundStyle: {
    flex: 1,
    padding: 0,
    justifyContent: 'space-between',
  },
  // iconImageStyle: {
  //   // height: 250,
  //   // width: 250,
  // },
  iconImageStyle: {
    // height: 60,
    // width: 160,
    // marginTop: textSize.componentsDifferenceMediam,
    height: 100,
    width: 235,
    marginTop: 16,
  },
  componetsMargin1: {marginVertical: textSize.componentsDifferenceLow},
  componetsMargin: {marginVertical: textSize.componentsDifferenceMediam},
  TextStyle: {
    color: '#ffff',
    fontSize: textSize.h6,
    //  textAlign: 'center',
  },
});

export default Login;
