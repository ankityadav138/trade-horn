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
import textSize from '../../../constants/textSize';
import Toolbar from '../../../constants/toolbar';
import {AppColors} from '../../../constants/appColors';
import { ScrollView } from 'react-native-gesture-handler';
import showMessage from '../../../components/showMessage';
import DropDownPicker from 'react-native-dropdown-picker';
import DatePicker from 'react-native-datepicker';
import Validation from '../../../utils/Validation';

const PersonalVerification = ({navigation}) => {
  const {colors} = useTheme();

  const [userName, setUserName] = useState()
  const [permanentAddress, setPermanentAddress] =useState('')
  const [dateOfBirth, setDateOfBirth] =useState('')
  const [age, setAge] =useState('')
  const [gender, setGender] =useState('')
  const [fromDatevalue, setFromDateValue] = useState('');


  
  const [open3, setOpen3] = useState(false);
  const [value3, setValue3] = useState(null);
  const [items3, setItems3] = useState([
    {label: 'Male', value: 'Male'},
    {label: 'Female', value: 'Female'},
  ]);



  const verification = () => {

    // console.log('Name',userName)
    // console.log('address',permanentAddress)
    // console.log('date',fromDatevalue)
    // console.log('age',age)
    // console.log('gender',value3)

   if(!userName || 
    !permanentAddress || 
    !fromDatevalue ||
    !age ||
    !value3 
    ) {
      showMessage("All fields required")
     }
    else {
      navigation.navigate('EnterAddress',{
        name:userName,
        address : permanentAddress,
        date:fromDatevalue,
        age : age,
        gender : value3,
    });
    }
  }

  

  return (
    <View style={styles.HeaderView}>
  <ScrollView>
      <LinearGradient
        style={{
          width: '90%',
          borderRadius: 6,
          marginHorizontal: '5%',
          padding: textSize.componentsDifferenceLow,
          marginTop:'5%',
          height:'90%'
        }}
        colors={[
          colors.transparentGradientColor1,
          colors.transparentGradientColor2,
        ]}>
        <View style={{margin: 5}}>
         
            <Text style={{color: colors.heading, fontSize: textSize.h2,left:10}}>
              Personal Details
            </Text>
            <Text style={{color: colors.heading, fontSize: textSize.h4,left:10,top:10}}>
           Your basic personal information is required for
           identification purpose.
            </Text>

            <View>
                <View style={{flexDirection:'row',backgroundColor:'#0A5BA1',borderRadius:5,alignItems:'center',marginTop:'7%',padding:5}}>
                <Icons name="information-circle" size={25} color={'#FFFFFF'} />
              <Text style={{color: colors.heading, fontSize: 11,marginLeft:2}}>
              Please type carefully and fill out the form with your personal
            </Text>
               </View>
           
            <Text style={{color: colors.heading, fontSize: textSize.h3,left:25,marginTop:'5%'}}>
              Username
            </Text>
            
            <TextInput
                  style={{borderRadius:50,backgroundColor:'#98C7FF4A',marginTop:'2%',alignItems:'center',height:45}}
                  // placeholder="Create User Name*"
                  // placeholderTextColor="#000000"
                  //keyboardType="email-address"
                  autoCapitalize={'none'}
                  underlineColorAndroid="transparent"
                  onChangeText={userName => setUserName(userName)}
                />
                   <Text style={{color: colors.heading, fontSize: textSize.h3,left:25,marginTop:'5%'}}>
              Permanent Address
            </Text>
                 <TextInput
                  style={{borderRadius:50,backgroundColor:'#98C7FF4A',marginTop:'2%',alignItems:'center',height:45}}
                  // placeholder="Create User Name*"
                  // placeholderTextColor="#000000"
                  keyboardType="email-address"
                  autoCapitalize={'none'}
                  underlineColorAndroid="transparent"
                  onChangeText={permanentAddress => setPermanentAddress(permanentAddress)}
                />
                   <Text style={{color: colors.heading, fontSize: textSize.h2,left:25,marginTop:'5%'}}>
              Date of Birth
            </Text>
            <View style={styles.datePickersWrapper}>
            <DatePicker
              style={styles.datePickerView}
              date={fromDatevalue}
              mode="date"
              //placeholder="From date"
              format="YYYY-MM-DD"
              minDate="1919-05-01"
              maxDate="2099-06-01"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: styles.dateIconStyle,
                dateInput: styles.dateInputStyle,
                // ... You can check the source to find the other keys.
              }}
              onDateChange={date => {
                setFromDateValue(date);
              }}
            />
            </View>
            
                
                   <Text style={{color: colors.heading, fontSize: textSize.h2,left:25,marginTop:'5%'}}>
              Age
            </Text>
                 <TextInput
                  style={{borderRadius:50,backgroundColor:'#98C7FF4A',marginTop:'2%',alignItems:'center',height:45}}
                  // placeholder="Create User Name*"
                  // placeholderTextColor="#000000"
                  keyboardType="numeric"
                  autoCapitalize={'none'}
                  underlineColorAndroid="transparent"
                  onChangeText={age => setAge(age)}
                />
                   <Text style={{color: colors.heading, fontSize: textSize.h2,left:25,marginTop:'5%'}}>
              Gender
            </Text>
            <DropDownPicker
                style={{borderRadius:50,backgroundColor:'#98C7FF4A',marginTop:'2%',alignItems:'center',height:45}}
                dropDownContainerStyle={{
                   backgroundColor: "#0466C0",
                   borderRadius:50,
                  }}
                placeholder="Male"
                open={open3}
                value={value3}
                items={items3}
                setOpen={setOpen3}
                setValue={setValue3}
                setItems={setItems3}
            />
                
            </View>
            
          
          
         
         
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 30, justifyContent: 'center' }}>
                        <TouchableOpacity
                            onPress={() => verification()}
                        >

                            <View style={[styles.buttonContainer, styles.loginDisableButton]}>
                                <Text style={styles.loginText}>CONTINUE</Text>

                            </View>
                        </TouchableOpacity>
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
datePickersWrapper: {
  //justifyContent: 'space-between',
  //padding: 10,
  //paddingBottom: 2,
  borderRadius:50,
  marginTop:'2%',
 // backgroundColor: '#98C7FF4A',
},
datePickerView: {
  width: '100%',
  backgroundColor: '#98C7FF4A',
  borderRadius:50
},
dateIconStyle: {
  position: 'absolute',
  right: 4,
  top: 4,
  marginLeft: 0,
},
dateInputStyle: {
  borderRadius: 5,
  height: 45,
  backgroundColor: '#98C7FF4A',
  borderRadius:50
},
});

export default PersonalVerification;