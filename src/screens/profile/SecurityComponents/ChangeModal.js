import React, {useState, useEffect} from 'react';
import {TouchableOpacity, StyleSheet, Text, Modal, View,TextInput,Image,KeyboardAvoidingView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '@react-navigation/native';
import textSize from '../../../constants/textSize';
import showMessage from '../../../components/showMessage';
import AppButton from '../../../constants/AppButton';
import {SEND_OTP,PROFILE,CHECK_OTP,UPDATE_TFA} from '../../../store/action';
import {commonAxoisApiUtils} from '../../../utils/commonAxoisApiUtils';
import {useDispatch, useSelector} from 'react-redux';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {getDimen} from '../../../dimensions/dimen';


const ChangeModal = ({changeVisible, parentCallback}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {colors} = useTheme();
  const [otpInput, setotpInput] = useState(false);
  const [code, setCode] = useState('');
  const [tfaVery, setTfaVery] = useState('');
  const [password, setPassword] = useState('');
  const [confPass, setConfPass] = useState('');
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
  const closeTime = () => {
    
  }
  const onConfirm = () => {
    if (!password) {
      showMessage('Please Enter Password');
      return;
    }  
    if (!confPass) {
      showMessage('Please Enter Confirm Password');
      return;
    }
    if (password != confPass) {
      showMessage('Password and Confirm password must be same');
      return;
    }
     let params = {
    data: {
      confirm_password: password,
      new_password:confPass
    },
    params: {
      method: 'POST',
      url: '/v1/user/change-password',
      token: accessToken,
    },
  };
  commonAxoisApiUtils.getResponse(params).then(res => {
    if (res.data.code == 200) {    
      showMessage(res.data.message);
      setFirstChecked(false)
      setSecondChecked(false)
     setThirdChceked(true)  
       (() => {
        setThirdChceked(false)  
        parentCallback(!changeVisible)
      }, 3000);

    } else {
      showMessage(res.data.message);
    }
  });
  }
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
        setCode('')
        setFirstChecked(false)
        setSecondChecked(true)
      } else {
        showMessage(res.data.message);
      }
    });
  }
  const verifyTFA = () => {
    if (!tfaVery) {
      showMessage('TFA code is Requried');
      return;
    }
    let params = {
      data: {
        tfaCode: tfaVery,
      },
      params: {
        method: 'POST',
        url: 'v1/user/verify-tfa',
        token: accessToken,
      },
    };
    commonAxoisApiUtils.getResponse(params).then(res => {
      if (res.data.code == 200) {    
        showMessage(res.data.message);
        setTfaVery('')
      } else {
        showMessage(res.data.message);
      }
    });


  }
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
        visible={changeVisible}
        onRequestClose={() => {
          // Alert.alert("Modal has been closed.");
          parentCallback(!changeVisible);
        }}>

          {/* FIRST SCREEN */}
         { (firstChecked == true )?
        <View style={styles(colors).centeredView}>
          <View style={styles(colors).modalView1}>
          <View style={styles(colors).closeBtnView}>
              <TouchableOpacity onPress={() => parentCallback(!changeVisible)} >
                <Icon name="close" size={35} color={'#03315E'} />
              </TouchableOpacity>
            </View>
            <Text style={styles(colors).textlabel}>Change Password</Text>
            <View style={styles(colors).dotstyle}>
              <Icon name="md-checkmark-circle" size={35} color={'#2CE256'}style={{flex:1}} />
              <Icon name="radio-button-off-outline" size={35} color={'#03315E'} style={{flex:1}} />
              <Icon name="radio-button-off-outline" size={35} color={'#03315E'} />
            </View>
            <View style={styles(colors).dotstyleSecond}>
            <Text style={styles(colors).textIcon}>Confirm Email-----</Text>
            <Text style={styles(colors).textIcon}>Enter New Password---------</Text>
            <Text style={styles(colors).textIconDone}>Done</Text>
            </View>
            <View style={{marginTop:'5%'}}>
            <Text style={styles(colors).title}>Google Authentication Code</Text>
            </View>
            <View style={{marginTop:'3%'}}>
            <TextInput
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#0D4174D9',
              paddingVertical: 8,
              paddingHorizontal: 16,
              borderRadius: 50,
            }}
            placeholder='Enter 6 digit Code'
            placeholderTextColor="#FFFFFF"
            onChangeText={tfaVery => setTfaVery(tfaVery)}
            value={tfaVery}
          />
          </View>
           <View style={{marginTop:'5%'}}>
              <TouchableOpacity style={styles(colors).buttonView}  onPress={() => verifyTFA()}>
                <Text style={styles(colors).ButtonText}>NEXT </Text>
              </TouchableOpacity>
            </View>
            <View style={{marginTop:'5%'}}>
            <Text style={styles(colors).title}>Email Verification Code</Text>
            <View style={{marginTop:'3%'}}>
            <TextInput
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#0D4174D9',
              paddingVertical: 8,
              paddingHorizontal: 16,
              borderRadius: 50,
            }}
            placeholder='Email Verification Code'
            placeholderTextColor="#FFFFFF"
            onChangeText={code => setCode(code)}
            value={code}
          />
          </View>
           <View style={{marginTop:'5%'}}>
              <TouchableOpacity style={styles(colors).buttonView}  onPress={() => sendOtpOnMail()}>
                <Text style={styles(colors).ButtonText}>SEND </Text>
              </TouchableOpacity>
            </View>
            <View style={{marginTop:'5%',}}>
              <TouchableOpacity style={styles(colors).buttonView}  onPress={() => scanAuth()}>
                <Text style={styles(colors).ButtonText}>NEXT </Text>
              </TouchableOpacity>
            </View>
            </View>
          </View>
        </View>:<View></View>}

          {/* SECOND SCREEN */}
        {secondChecked == true? 
        <View style={styles(colors).centeredView}>
          <View style={styles(colors).modalView}>
          <View style={styles(colors).closeBtnView}>
              <TouchableOpacity onPress={() => parentCallback(!changeVisible)} >
                <Icon name="close" size={35} color={'#03315E'} />
              </TouchableOpacity>
            </View>
            <Text style={styles(colors).textlabel}>Change Password</Text>
            <View style={styles(colors).dotstyle}>
              <Icon name="md-checkmark-circle" size={35} color={'#2CE256'}style={{flex:1}} />
              <Icon name="md-checkmark-circle" size={35} color={'#2CE256'} style={{flex:1}} />
              <Icon name="radio-button-off-outline" size={35} color={'#03315E'} />
            </View>
            <View style={styles(colors).dotstyleSecond}>
            <Text style={styles(colors).textIcon}>Confirm Email-------------</Text>
            <Text style={styles(colors).textIcon}>Enter New Password---------</Text>
            <Text style={styles(colors).textIconDone}>Done</Text>
            </View>
            <View style={{marginTop:'5%'}}>
            <Text style={styles(colors).title}>New Password</Text>
            </View>
            <View style={{marginTop:'2%'}}>
            <TextInput
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#0D4174D9',
              paddingVertical: 8,
              paddingHorizontal: 16,
              borderRadius: 50,
            }}
            placeholder='Enter Password'
            placeholderTextColor="#FFFFFF"
            onChangeText={password => setPassword(password)}
            value={password}
          />
          </View>
          <View style={{marginTop:'5%'}}>
            <Text style={styles(colors).title}>Confirm New Password</Text>
            </View>
            <View style={{marginTop:'2%'}}>
            <TextInput
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#0D4174D9',
              paddingVertical: 8,
              paddingHorizontal: 16,
              borderRadius: 50,
            }}
            placeholder='Confirm Password'
            placeholderTextColor="#FFFFFF"
            onChangeText={confPass => setConfPass(confPass)}
            value={confPass}
          />
          </View>
            <View style={{marginTop:'5%',width:'100%'}}>
              <TouchableOpacity style={styles(colors).buttonView}  onPress={() => onConfirm()}>
                <Text style={styles(colors).ButtonText}>CONFIRM </Text>
              </TouchableOpacity>
            </View>
            </View>
          </View>
           :<View></View>}

          {/* THIRD SCREEN */}
         {thirdChceked == true? 
          <View style={styles(colors).centeredView}>
          <View style={styles(colors).modalView}>
          <View style={styles(colors).closeBtnView}>
              <TouchableOpacity onPress={() => parentCallback(!changeVisible)} >
                <Icon name="close" size={35} color={'#03315E'} />
              </TouchableOpacity>
            </View>
            <Text style={styles(colors).textlabel}>Change Password</Text>
            <View style={styles(colors).dotstyle}>
              <Icon name="md-checkmark-circle" size={35} color={'#2CE256'}style={{flex:1}} />
              <Icon name="md-checkmark-circle" size={35} color={'#2CE256'} style={{flex:1}} />
              <Icon name="md-checkmark-circle" size={35} color={'#2CE256'} />
            </View>
            <View style={styles(colors).dotstyleSecond}>
            <Text style={styles(colors).textIcon}>Confirm Email------------</Text>
            <Text style={styles(colors).textIcon}>Enter New Password--------</Text>
            <Text style={styles(colors).textIconDone}>Done</Text>
            </View>
             <View style={{marginTop:'8%',alignItems:'center'}}>
               <Icon name="md-checkmark-circle" size={180} color={'#03325F'}/>
            </View>
          </View>
        </View>
        :
        <View></View>}
      </Modal>
    </KeyboardAvoidingView>
  );
};

const styles = props =>
  StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
     // alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.7)',
    },
    modalView: {
      flex: 0.60,
      margin: 20,
      backgroundColor: '#FFFFFF',
      borderRadius: 20,
      padding: 35,
      alignItems:'stretch',
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
      flex: 0.80,
      margin: 20,
      backgroundColor: '#FFFFFF',
      borderRadius: 20,
      padding: 35,
      alignItems:'stretch',
      //alignItems: 'center',
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
    },
    textlabel: {
      color: '#03315E',
      fontSize: 20,
     // marginBottom: 10,
      marginTop: 5,
      fontWeight: 'bold',
      alignItems:'center',
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
    dotstyle:{
        flexDirection:'row',
        marginTop:20,
        alignItems:'center'
    },
    dotstyleSecond:{
      flexDirection:'row',
      alignItems:'center'
  },
    textIcon: {
      color: '#03315E',
      fontSize: 12,
     // marginBottom: 10,
      marginTop: 10,
      fontWeight: 'bold',
      flex:1,
      width:getDimen(0.60),

    },
    textIconDone: {
      color: '#03315E',
      fontSize: 12,
     // marginBottom: 10,
      marginTop: 10,
      fontWeight: 'bold',
      width:getDimen(0.10)

    },
    title: {
      color: '#03315E',
      fontSize: 12,
     // marginBottom: 10,
      fontWeight: 'bold',
      alignItems:'flex-start',
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
      fontSize: textSize.h3,
    },
    underlineStyleBase: {
      width: 40,
      height: 38,
      backgroundColor: '#0D4174D9',
      color: props.title,
      borderWidth: 1,
      borderRadius:10
    },
    underlineStyleHighLighted: {
      borderColor: props.accent,
    },
    QRstyle: {
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center',
          marginTop:'1%',
    },
    qrimage: {
      height: 120,
      width: 120,
    },
  });

export default ChangeModal;
