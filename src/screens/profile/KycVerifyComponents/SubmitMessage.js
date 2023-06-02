import {useTheme} from '@react-navigation/native';
import React,{useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,

} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import textSize from '../../../constants/textSize';
import Toolbar from '../../../constants/toolbar';
import {AppColors} from '../../../constants/appColors';
import { ScrollView } from 'react-native-gesture-handler';
import showMessage from '../../../components/showMessage';
import DropDownPicker from 'react-native-dropdown-picker';
import CountryPicker from 'react-native-country-picker-modal';

const SubmitMessage = ({navigation,route}) => {

  const {colors} = useTheme();
  

  return (
    <View style={styles.HeaderView}>
         <View style={{flexDirection:'row',marginTop:'5%'}}>
      <TouchableOpacity  onPress={()=>navigation.goBack()}>
      <Icons
            style={{
              color: colors.heading,
              textAlign: 'left',
              marginLeft:22
            }}
            name="arrow-back"
            size={20}
            color={'white'}
          />
          </TouchableOpacity>
          <Text style={{color: colors.heading, fontSize: textSize.h3,marginLeft:5}}>Verification</Text>
      </View>
  <ScrollView>
      <LinearGradient
        style={{
          width: '90%',
          borderRadius: 6,
          marginHorizontal: '5%',
          padding: textSize.componentsDifferenceLow,
          marginTop:'5%',
        }}
        colors={[
          colors.transparentGradientColor1,
          colors.transparentGradientColor2,
        ]}>
        <View style={{margin: 5,padding:10}}>
         
        <View style={{marginTop:'6%',alignItems:'center'}}>
             <Icon name="check-circle-o" size={150} color={'#2CE256'}/>
            </View>
            <View style={{marginTop:'5%',alignItems:'center'}}>
           <Text style={{color:'#2CE256',fontSize:20}}>Your KYC verification under process</Text>
              </View>
            
              <View style={{marginTop:'5%',alignItems:'center'}}>
           <Text style={{color:'#FFFFFF',fontSize:16}}>
           KYC verification usually takes just a few minutes, in certain cases, t may take up to 2-3 business days. We are still working on your identity verification. Once our team verified your identity, you will be notified by email.
               </Text>
              </View>
        </View>
              </LinearGradient>
      
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  HeaderView: {
    //width: '100%',
    flex:1,
    backgroundColor:'#0466C0'
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    right:18,
    marginTop: '35%',
    width: '120%',
    borderRadius: 25,
    backgroundColor: 'transparent',
    bottom:90
},
loginDisableButton: {
        
  backgroundColor: '#ffffff',
  shadowOpacity: 0.5,
  shadowRadius: 12.35,
  elevation: 2,
},
loginText: {
  color: '#081C35',
  fontSize: 18,
  fontWeight: '800',
},
inputContainer: {
  borderColor: 'grey',
  borderRadius: 5,
  borderWidth: 1,
  width: '100%',
  height: 45,
  borderRadius:50,
  backgroundColor:'98C7FF4A',
  paddingLeft:'5%',
  paddingTop:5
  //marginBottom: 20,
  //alignItems: 'center',
  // elevation: 5,
},
});

export default SubmitMessage;
