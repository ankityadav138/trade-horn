import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
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
import {useTheme} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {ACCESS_TOKEN, SIGNUP, USER_LOGIN, USER_SIGNUP} from '../store/action';
import {moderateScale} from 'react-native-size-matters';
import {getDimen} from '../dimensions/dimen';
import {AppInput} from '../components/AppInput';

const SignUp = ({navigation}) => {
  const {colors} = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSelected, setSelection] = useState(false);
  const [isSelectedSecond, setSelectionSecond] = useState(false);

  const dispatch = useDispatch();
  const loginData = useSelector(state => state.login.loginData);
  const signupData = useSelector(state => state.login.signupData);
  const themeColorData = useSelector(state => state.login.themeValue);

  useEffect(() => {
    // console.log('====================================');
    console.log(signupData);
    // console.log('====================================');
    if (Object.keys(signupData).length > 0) {
      dispatch({
        type: USER_SIGNUP,
        payload: {},
      });
      if (signupData.code === 200) {
        navigation.navigate('SecurityOtp', {
          EmailId: email,
          routeName: 'Signup',
        });
        // dispatch({
        //   type: ACCESS_TOKEN,
        //   payload: signupData.token,
        // });
        // dispatch({type: USER_LOGIN, payload: {}});
      }
      showMessage(signupData && signupData.message);
    }
  }, [signupData]);

  const signupApi = () => {
    console.log(email, password, confirmPassword, isSelected, isSelectedSecond);
    if (email == '') {
      showMessage('Please Enter name ');
      return;
    }
    if (password == '') {
      showMessage('Please Enter email');
      return;
    }
    if (confirmPassword == '') {
      showMessage('Please Enter Password');
      return;
    }
    if (isSelected === false) {
      showMessage('Please accept the Term & Conditions');
      return;
    }
    if (isSelectedSecond === false) {
      showMessage('Please accept the Term & Conditions');
      return;
    }
    dispatch({
      type: SIGNUP,
      payload: {
        data: {
          email: email,
          password: password,
          confirm_password: confirmPassword,
        },
      },
    });
  };

  return (
    <View
      style={{flex: 1, backgroundColor: AppColors(themeColorData).background}}>
      <ImageBackground
        source={require('../assets/bg.png')}
        style={{
          flex: 1,
          padding: textSize.componentsDifferenceMediam,
          justifyContent: 'space-between',
        }}>
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
            top: '2%',
            marginRight: '20%',
          }}>
          <Image
            // style={styles(colors).iconImageStyle}
            style={{height: 130, width: 250}}
            source={require('../assets/Group1.png')}
          />
          <Image
            style={{height: 100, width: 150, left: '22%'}}
            source={require('../assets/designColors.png')}
          />
        </View>
        <ScrollView>
          <View style={{alignItems: 'center'}}>
            <View
              // style={{width: '90%', borderRadius: moderateScale(30)}}
              colors={[
                colors.transparentGradientColor1,
                colors.transparentGradientColor2,
              ]}>
              <ScrollView>
                <View
                  style={{
                    flexDirection: 'column',
                    padding: textSize.componentsDifferenceHight,
                    alignItems: 'center',
                    // paddingBottom: 200
                    paddingTop: '2%',
                  }}>
                  {/* <Text
                  style={{
                    color: colors.headerColor,
                    fontSize: textSize.h3,
                    textAlign: 'center',
                    fontWeight: 'bold',
                    width: '100%',
                  }}>
                  CREATE YOUR
                </Text>
                <Text
                  style={{
                    color: colors.headerColor,
                    fontSize: textSize.h3,
                    textAlign: 'center',
                    fontWeight: 'bold',
                  }}>
                  ACCOUNT{'  '}
                </Text> */}
                  <Text
                    style={{
                      color: AppColors(themeColorData).darkBlack,
                      fontSize: 16,
                      // textAlign: 'center',
                      // bottom: moderateScale(10),
                      width: '100%',
                      fontWeight: 'bold',
                      marginRight: '5%',
                    }}>
                    Create an Account
                  </Text>

                  <View
                    style={{
                      marginVertical: textSize.componentsDifference,
                    }}></View>

                  <AppInput
                    icon={'mail'}
                    placeholder={'johnsondoe@gmail.com'}
                    setValue={text => setEmail(text)}
                    value={email}
                  />

                  <View style={styles(colors).componetsMargin}></View>

                  <AppInput
                    icon={'md-lock-closed'}
                    placeholder={'Password'}
                    isPassword={true}
                    setValue={text => setPassword(text)}
                    value={password}
                  />

                  <View style={styles(colors).componetsMargin}></View>

                  <AppInput
                    icon={'md-lock-closed'}
                    placeholder={'Confirm password'}
                    isPassword={true}
                    setValue={text => setConfirmPassword(text)}
                    value={confirmPassword}
                  />

                  <View
                    style={{
                      marginVertical: textSize.componentsDifferenceLow,
                    }}></View>

                  <View style={styles(colors).conditionTitle}>
                    <View style={{}}>
                      <CheckBox
                        checkedIcon={
                          <Icons
                            name="checkbox"
                            size={20}
                            color={AppColors(themeColorData).title}
                          />
                        }
                        uncheckedIcon={
                          <Icons
                            name="square-outline"
                            size={20}
                            color={AppColors(themeColorData).title}
                          />
                        }
                        checked={isSelected}
                        onPress={() => setSelection(!isSelected)}
                      />
                    </View>
                    <View style={{width: getDimen(0.7)}}>
                      <Text style={styles(colors).conditionText}>
                        I have read and agree to the trade horn terms and
                        conditions
                      </Text>
                    </View>
                    {/* <View style={{ bottom: '0%' }}>
                      <CheckBox
                        checkedIcon={
                          <Icons name="checkbox" size={20} color="#FFFFFF" />
                        }
                        uncheckedIcon={
                          <Icons
                            name="checkbox-outline"
                            size={20}
                            color="#FFFFFF"
                          />
                        }
                        checked={isSelected}
                        onPress={() => setSelection(!isSelected)}
                      />
                    </View> */}
                  </View>

                  <View style={styles(colors).conditionTitle}>
                    <View style={{bottom: '0%', bottom: 20}}>
                      <CheckBox
                        checkedIcon={
                          <Icons
                            name="checkbox"
                            size={20}
                            color={AppColors(themeColorData).title}
                          />
                        }
                        uncheckedIcon={
                          <Icons
                            name="square-outline"
                            size={20}
                            color={AppColors(themeColorData).title}
                          />
                        }
                        checked={isSelectedSecond}
                        onPress={() => setSelectionSecond(!isSelectedSecond)}
                      />
                    </View>
                    <View style={{width: getDimen(0.67), bottom: 20}}>
                      <Text style={styles(colors).conditionText}>
                        I have read and agree to the trade horn privacy policy
                      </Text>
                    </View>
                    {/* <View style={{ bottom: '0%' }}>
                      <CheckBox
                        checkedIcon={
                          <Icons name="checkbox" size={20} color="#FFFFFF" />
                        }
                        uncheckedIcon={
                          <Icons
                            name="checkbox-outline"
                            size={20}
                            color="#FFFFFF"
                          />
                        }
                        checked={isSelectedSecond}
                        onPress={() => setSelectionSecond(!isSelectedSecond)}
                      />
                    </View> */}
                  </View>

                  <View
                    style={{
                      marginVertical: textSize.componentsDifference,
                    }}></View>

                  <AppButton
                    style={{width: getDimen(0.84), bottom: '5%'}}
                    text={'Register'}
                    onPress={() => signupApi()}
                    // onPress={() =>
                    //   navigation.navigate('SecurityOtp', {
                    //     EmailId: email,
                    //     routeName: 'Signup',
                    //   })
                    // }
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    bottom: '12%',
                  }}>
                  <View
                    style={{flex: 1, height: 1, backgroundColor: '#FFFFFF2C'}}
                  />
                  {/* <View>
                    <Text
                      style={{
                        width: '110%',
                        textAlign: 'center',
                        color: AppColors(themeColorData).title,
                        padding: 16,
                        fontSize: 12,
                      }}>
                      Or Register Using
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      height: 1,
                      backgroundColor: '#FFFFFF2C',
                      marginRight: 5,
                    }}
                  /> */}
                </View>
                {/* 
                <View>
                  <TouchableOpacity
                    style={{
                      paddingVertical: 4,
                      paddingHorizontal: 12,
                      borderRadius: 10,
                      borderColor: '#707070',
                      borderWidth: 2,
                      width: '90%',
                      paddingTop: 15,
                      height: moderateScale(50),
                      // top: 40
                      bottom: '80%',
                      left: '5%',
                    }}
                    onPress={() => navigation.navigate('SignUp')}>
                    <Image
                      style={{height: 15, width: 15, left: '30%'}}
                      source={require('../assets/icons8-google.png')}
                    />
                    <Text
                      style={{
                        color: colors.headerColor,
                        fontWeight: 'bold',
                        fontSize: 14,
                        width: '100%',
                        textAlign: 'center',
                        bottom: 20,
                        padding: 3,
                      }}>
                      Google
                    </Text>
                  </TouchableOpacity>
                </View> */}
                <View style={{right: '0%', alignItems: 'center', bottom: '5%'}}>
                  <Text
                    style={{
                      color: AppColors(themeColorData).title,
                      width: '60%',
                      fontSize: 16,
                      marginLeft: '10%',
                    }}>
                    Already a member?
                    <Text
                      onPress={() => navigation.navigate('Login')}
                      style={{
                        color: '#3AB091',
                        fontSize: 16,
                        fontFamily: 'Bold',
                      }}>
                      {' '}
                      Log In
                    </Text>
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: '7%',
                    marginHorizontal: '5%',
                  }}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Market')}>
                    <View
                      style={{
                        backgroundColor:
                          AppColors(themeColorData).inputBackgroud,
                        borderRadius: 15,
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
                        backgroundColor:
                          AppColors(themeColorData).inputBackgroud,
                        borderRadius: 15,
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
              </ScrollView>
            </View>
          </View>
        </ScrollView>
        {/* <ScrollView>
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              bottom: '7%',
            }}>
            <TouchableOpacity
              style={styles(colors).loginStyle}
              onPress={() => navigation.goBack()}>
              <Text
                style={{
                  color: colors.headerColor,
                  fontWeight: 'bold',
                  fontSize: textSize.p,
                  textAlign: 'center',
                  top: moderateScale(3),
                }}>
                Already have an Account?
              </Text>

            </TouchableOpacity>
          </View>
        </ScrollView> */}
      </ImageBackground>
    </View>
  );
};
const styles = themeColorData =>
  StyleSheet.create({
    imageBackgroundStyle: {
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    conditionTitle: {
      width: '115%',
      flexDirection: 'row',
      // alignItems: 'center',
      // justifyContent: 'space-between',
      left: -10,
      // right: '5%',
      // top:'2%'
    },
    conditionText: {
      color: AppColors(themeColorData).greyish,
      //fontSize: textSize.p,
      fontSize: 10,
      //width: '150%',
      top: 19,
      // fontFamily: '',
      //bottom: 5,
      fontFamily: '',
      right: moderateScale(11),
    },
    componetsMargin: {marginVertical: textSize.componentsDifference},
    loginStyle: {
      paddingVertical: moderateScale(3),
      paddingHorizontal: moderateScale(16),
      borderRadius: moderateScale(8),
      //borderColor: props.headerColor,
      borderWidth: moderateScale(2),
      width: '68%',
      height: moderateScale(30),
      borderRadius: moderateScale(20),
    },
    iconImageStyle: {
      height: 60,
      width: 160,
      marginTop: textSize.componentsDifferenceMediam,
    },
  });
export default SignUp;
