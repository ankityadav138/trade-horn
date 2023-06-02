import React, {useState, useEffect} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  Modal,
  View,
  TextInput,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '@react-navigation/native';
import textSize from '../../../constants/textSize';
import showMessage from '../../../components/showMessage';
import AppButton from '../../../constants/AppButton';
import {SEND_OTP, PROFILE, CHECK_OTP, UPDATE_TFA} from '../../../store/action';
import {commonAxoisApiUtils} from '../../../utils/commonAxoisApiUtils';
import {useDispatch, useSelector} from 'react-redux';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {getDimen} from '../../../dimensions/dimen';
import {moderateScale} from 'react-native-size-matters';

const AuthModal = ({modalVisible, parentCallback}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {colors} = useTheme();
  const [otpInput, setotpInput] = useState(false);
  const [code, setCode] = useState(false);
  const [authCode, setAuthCode] = useState(false);
  const [firstChecked, setFirstChecked] = useState(true);
  const [secondChecked, setSecondChecked] = useState(false);
  const [thirdChceked, setThirdChceked] = useState(false);

  const profileData = useSelector(state => state.user.profileData);
  const sendOtp = useSelector(state => state.security.sendOtp);
  const accessToken = useSelector(state => state.login.accessToken);
  //console.log('sendOtp',sendOtp)
  useEffect(() => {
    dispatch({
      type: PROFILE,
      payload: {token: accessToken},
    });
  }, []);
  const closeTime = () => {};
  const onConfirm = () => {
    if (!authCode) {
      showMessage('Enter code from Google Authenticator');
      return;
    }

    let params = {
      data: {
        code: authCode,
      },
      params: {
        method: 'POST',
        url: '/v1/user/update-tfa',
        token: accessToken,
      },
    };
    commonAxoisApiUtils.getResponse(params).then(res => {
      if (res.data.code == 200) {
        showMessage(res.data.message);
        setFirstChecked(false);
        setSecondChecked(false);
        setThirdChceked(true);
        setTimeout(() => {
          setThirdChceked(false);
          parentCallback(!modalVisible);
        }, 3000);
      } else {
        showMessage(res.data.message);
      }
    });
  };
  const scanAuth = () => {
    if (!code) {
      showMessage('Email Verification code is Requried');
      return;
    }

    let params = {
      data: {
        otpCode: code,
      },
      params: {
        method: 'POST',
        url: '/v1/user/verify-otp',
        token: accessToken,
      },
    };
    commonAxoisApiUtils.getResponse(params).then(res => {
      if (res.data.code == 200) {
        showMessage(res.data.message);
        setFirstChecked(false);
        setSecondChecked(true);
      } else {
        showMessage(res.data.message);
      }
    });
  };
  const sendOtpOnMail = () => {
    // dispatch({
    //   type: SEND_OTP,
    //   payload: {token: accessToken},
    // });
    let params = {
      params: {
        method: 'GET',
        url: '/v1/user/send-otp?o=TOTP_Code',
        token: accessToken,
      },
    };
    commonAxoisApiUtils.getResponse(params).then(res => {
      if (res.data.code == 200) {
        showMessage(res.data.message);
      } else {
        showMessage(res.data.message);
      }
    });
  };
  return (
    <KeyboardAvoidingView style={styles(colors).centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          // Alert.alert("Modal has been closed.");
          parentCallback(!modalVisible);
        }}>
        {/* FIRST SCREEN */}
        {firstChecked == true ? (
          <View style={styles(colors).centeredView}>
            <View style={styles(colors).modalView}>
              <View style={styles(colors).closeBtnView}>
                <TouchableOpacity onPress={() => parentCallback(!modalVisible)}>
                  <Icon name="close" size={25} color={'#03315E'} />
                </TouchableOpacity>
              </View>
              <Text style={styles(colors).textlabel}>
                GOOGLE AUTHENTICATION
              </Text>
              <View style={styles(colors).dotstyle}>
                <Icon
                  name="md-checkmark-circle"
                  size={35}
                  color={'#2CE256'}
                  // style={{flex: 1}}
                />
                <Icon
                  name="radio-button-off-outline"
                  size={35}
                  color={'#03315E'}
                  // style={{flex: 1}}
                />
                <Icon
                  name="radio-button-off-outline"
                  size={35}
                  color={'#03315E'}
                />
              </View>
              <View style={styles(colors).dotstyleSecond}>
                <Text style={styles(colors).textIcon}>
                  Confirm Email ------
                </Text>

                <Text
                  style={[styles(colors).textIcon, {right: moderateScale(10)}]}>
                  {profileData &&
                  profileData.data &&
                  profileData.data.tfaVerified == true
                    ? 'Disable TFA ---------'
                    : 'Enable TFA -----------'}
                </Text>
                <Text style={styles(colors).textIconDone}>Done</Text>
              </View>
              <View style={{marginTop: '7%'}}>
                <Text style={styles(colors).title}>
                  Email Verification Code
                </Text>
                <View style={{marginTop: '5%'}}>
                  <TextInput
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#0D4174D9',
                      paddingVertical: 8,
                      paddingHorizontal: 16,
                      borderRadius: 50,
                      fontSize: 10,
                    }}
                    placeholder="Email Verification Code"
                    placeholderTextColor="#FFFFFF"
                    onChangeText={code => setCode(code)}
                    value={code}
                  />
                </View>
                <View style={{marginTop: '5%'}}>
                  <TouchableOpacity
                    style={styles(colors).buttonView}
                    onPress={() => sendOtpOnMail()}>
                    <Text style={styles(colors).ButtonText}>SEND </Text>
                  </TouchableOpacity>
                </View>
                <View style={{marginTop: '5%'}}>
                  <TouchableOpacity
                    style={styles(colors).buttonView}
                    onPress={() => scanAuth()}>
                    <Text style={styles(colors).ButtonText}>NEXT </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        ) : (
          <View></View>
        )}

        {/* SECOND SCREEN */}
        {secondChecked == true ? (
          <View style={styles(colors).centeredView}>
            {profileData &&
            profileData.data &&
            profileData.data.tfaVerified == false ? (
              <View style={styles(colors).modalView1}>
                <View style={styles(colors).closeBtnView}>
                  <TouchableOpacity
                    onPress={() => parentCallback(!modalVisible)}>
                    <Icon name="close" size={35} color={'#03315E'} />
                  </TouchableOpacity>
                </View>
                <Text style={styles(colors).textlabel}>
                  GOOGLE AUTHENTICATION
                </Text>
                <View style={styles(colors).dotstyle}>
                  <Icon
                    name="md-checkmark-circle"
                    size={35}
                    color={'#2CE256'}
                    // style={{flex: 1}}
                  />
                  <Icon
                    name="md-checkmark-circle"
                    size={35}
                    color={'#2CE256'}
                    // style={{flex: 1}}
                  />
                  <Icon
                    name="radio-button-off-outline"
                    size={35}
                    color={'#03315E'}
                  />
                </View>
                <View style={styles(colors).dotstyleSecond}>
                  <Text style={styles(colors).textIcon}>
                    Confirm Email-----------
                  </Text>
                  <Text style={styles(colors).textIcon}>
                    {profileData &&
                    profileData.data &&
                    profileData.data.tfaVerified == true
                      ? 'Disable TFA------------'
                      : 'Enable TFA------------'}{' '}
                    TFA------------
                  </Text>
                  <Text style={styles(colors).textIconDone}>Done</Text>
                </View>

                <View style={styles(colors).QRstyle}>
                  <Image
                    style={styles(colors).qrimage}
                    source={{
                      uri:
                        profileData &&
                        profileData.data &&
                        profileData.data.tfa &&
                        profileData.data.tfa.dataURL,
                    }}
                    //source={require('../assets/qrcode.png')}
                  />
                </View>

                <View style={{alignItems: 'center'}}>
                  <Text style={styles(colors).title}>Private Key</Text>
                </View>
                <View style={{marginTop: '1%', alignItems: 'center'}}>
                  <Text style={styles(colors).title}>
                    {profileData &&
                      profileData.data &&
                      profileData.data.tfa &&
                      profileData.data.tfa.tempSecret}
                  </Text>
                  <View style={{marginTop: '1%'}}>
                    <Text
                      style={[styles(colors).title, {fontSize: textSize.h5}]}>
                      Note: Scan this QR code via your authenticator. Please
                      keep your private key safe. if your private key in the
                      authenticator is deleted mistakenly you can recover it by
                      entering it manually. For your asset security, Trade Horn
                      does not support private key retrieving
                    </Text>
                  </View>
                  <OTPInputView
                    style={{width: '100%', height: 35, marginTop: '2%'}}
                    pinCount={6}
                    autoFocusOnLoad
                    codeInputFieldStyle={styles(colors).underlineStyleBase}
                    codeInputHighlightStyle={
                      styles(colors).underlineStyleHighLighted
                    }
                    onCodeFilled={authCode => {
                      setAuthCode(authCode);
                      // console.log(`Code is ${authCode}, you are good to go!`);
                    }}
                  />
                  <View style={{marginTop: '2%', width: '100%'}}>
                    <TouchableOpacity
                      style={styles(colors).buttonView}
                      onPress={() => onConfirm()}>
                      <Text style={styles(colors).ButtonText}>CONFIRM </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ) : (
              <View style={styles(colors).modalView}>
                <View style={styles(colors).closeBtnView}>
                  <TouchableOpacity
                    onPress={() => parentCallback(!modalVisible)}>
                    <Icon name="close" size={35} color={'#03315E'} />
                  </TouchableOpacity>
                </View>
                <Text style={styles(colors).textlabel}>
                  GOOGLE AUTHENTICATION
                </Text>
                <View style={styles(colors).dotstyle}>
                  <Icon
                    name="md-checkmark-circle"
                    size={35}
                    color={'#2CE256'}
                    style={{flex: 1}}
                  />
                  <Icon
                    name="md-checkmark-circle"
                    size={35}
                    color={'#2CE256'}
                    style={{flex: 1}}
                  />
                  <Icon
                    name="radio-button-off-outline"
                    size={35}
                    color={'#03315E'}
                  />
                </View>
                <View style={styles(colors).dotstyleSecond}>
                  <Text style={styles(colors).textIcon}>
                    Confirm Email-----------
                  </Text>
                  <Text style={styles(colors).textIcon}>
                    {profileData &&
                    profileData.data &&
                    profileData.data.tfaVerified == true
                      ? 'Disable TFA------------'
                      : 'Enable TFA------------'}{' '}
                    TFA------------
                  </Text>
                  <Text style={styles(colors).textIconDone}>Done</Text>
                </View>
                <View style={{marginTop: '5%', alignItems: 'center'}}>
                  <OTPInputView
                    style={{width: '100%', height: 40, marginTop: '2%'}}
                    pinCount={6}
                    autoFocusOnLoad
                    codeInputFieldStyle={styles(colors).underlineStyleBase}
                    codeInputHighlightStyle={
                      styles(colors).underlineStyleHighLighted
                    }
                    onCodeFilled={authCode => {
                      setAuthCode(authCode);
                      // console.log(`Code is ${authCode}, you are good to go!`);
                    }}
                  />
                  <View style={{marginTop: '5%', alignItems: 'center'}}>
                    <Text style={styles(colors).title}>
                      Enter the 6 digit code from Google Authenticator.
                    </Text>
                  </View>
                  <View style={{marginTop: '5%', width: '100%'}}>
                    <TouchableOpacity
                      style={styles(colors).buttonView}
                      onPress={() => onConfirm()}>
                      <Text style={styles(colors).ButtonText}>CONFIRM </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          </View>
        ) : (
          <View></View>
        )}

        {/* THIRD SCREEN */}
        {thirdChceked == true ? (
          <View style={styles(colors).centeredView}>
            <View style={styles(colors).modalView}>
              {/* <View style={styles(colors).closeBtnView}>
                <TouchableOpacity onPress={() => parentCallback(!modalVisible)}>
                  <Icon name="close" size={35} color={'#03315E'} />
                </TouchableOpacity>
              </View> */}
              <Text style={styles(colors).textlabel}>
                GOOGLE AUTHENTICATION
              </Text>
              <View style={styles(colors).dotstyle}>
                <Icon
                  name="md-checkmark-circle"
                  size={35}
                  color={'#2CE256'}
                  style={{flex: 1}}
                />
                <Icon
                  name="md-checkmark-circle"
                  size={35}
                  color={'#2CE256'}
                  style={{flex: 1}}
                />
                <Icon name="md-checkmark-circle" size={35} color={'#2CE256'} />
              </View>
              <View style={styles(colors).dotstyleSecond}>
                <Text style={styles(colors).textIcon}>
                  Confirm Email-----------
                </Text>
                <Text style={styles(colors).textIcon}>
                  {profileData &&
                  profileData.data &&
                  profileData.data.tfaVerified == true
                    ? 'Disable'
                    : 'Enable'}{' '}
                  TFA-------------
                </Text>
                <Text style={styles(colors).textIconDone}>Done</Text>
              </View>
              <View style={{marginTop: '6%', alignItems: 'center'}}>
                <Icon name="md-checkmark-circle" size={180} color={'#03325F'} />
              </View>
            </View>
          </View>
        ) : (
          <View></View>
        )}
      </Modal>
    </KeyboardAvoidingView>
  );
};

const styles = props =>
  StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      //alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.7)',
    },
    modalView: {
      flex: 0.55,
      margin: 10,
      backgroundColor: '#FFFFFF',
      borderRadius: 20,
      padding: 35,
      alignItems: 'stretch',
      //alignItems: 'center',n
      //alignItems:'flex-start',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 50,
    },
    modalView1: {
      flex: 0.82,
      margin: 20,
      backgroundColor: '#FFFFFF',
      borderRadius: 20,
      padding: 35,
      alignItems: 'stretch',
      //alignItems: 'center',n
      //alignItems:'flex-start',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 50,
    },
    closeBtnView: {
      alignSelf: 'flex-end',
      bottom: moderateScale(10),
    },
    textlabel: {
      color: '#03315E',
      fontSize: 20,
      // marginBottom: 10,
      marginTop: 5,
      fontWeight: 'bold',
      alignItems: 'center',
    },
    roundedTextInput: {
      borderRadius: 10,
      borderWidth: 4,
      backgroundColor: '#FFFFFF',
      color: '#474747',
      marginTop: 20,
      marginBottom: 20,
    },
    buttonContainer: {
      height: 55,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
      marginTop: 20,
      width: 350,
      borderRadius: 10,
      backgroundColor: 'transparent',
    },
    submitBtnText: {
      color: props.headerColor,
      fontSize: textSize.h2,
      fontWeight: 'bold',
    },
    submitButton: {
      backgroundColor: props.buttonColor,
    },
    submitDisableButton: {
      backgroundColor: props.buttonColor,
      shadowOpacity: 0.5,
      shadowRadius: 12.35,
      elevation: 19,
    },
    dotstyle: {
      flexDirection: 'row',
      marginTop: 20,
      ///alignItems: 'center',
      justifyContent: 'space-around',
    },
    dotstyleSecond: {
      flexDirection: 'row',
      // alignItems: 'center',
      justifyContent: 'space-evenly',
      // backgroundColor: 'red',
    },
    textIcon: {
      color: '#03315E',
      fontSize: 10,
      // marginBottom: 10,
      marginTop: 10,
      fontWeight: 'bold',
      //flex: 1,
      //width: getDimen(0.5),
      fontFamily: '',
    },
    textIconDone: {
      color: '#03315E',
      fontSize: 10,
      // marginBottom: 10,
      marginTop: 10,
      fontWeight: 'bold',
      fontFamily: '',
      right: moderateScale(12),
    },
    title: {
      color: '#03315E',
      fontSize: 10,
      // marginBottom: 10,
      fontWeight: 'bold',
      alignItems: 'flex-start',
    },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
    buttonView: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#03325F',
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 50,
    },

    ButtonText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: textSize.h6,
      paddingVertical: 5,
    },
    underlineStyleBase: {
      width: 40,
      height: 38,
      backgroundColor: '#0D4174D9',
      color: props.title,
      borderWidth: 1,
      borderRadius: 10,
    },
    underlineStyleHighLighted: {
      borderColor: props.accent,
    },
    QRstyle: {
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
      marginTop: '1%',
    },
    qrimage: {
      height: 120,
      width: 120,
    },
  });

export default AuthModal;
