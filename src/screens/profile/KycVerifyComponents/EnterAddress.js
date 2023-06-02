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
import CountryPicker from 'react-native-country-picker-modal';

const EnterAddress = ({navigation,route}) => {

  const {colors} = useTheme();
  const [city, setCity] = useState()
  const [state, setState] =useState('')
  const [postCode, setPostCode] =useState('')

  const [countryCode, setCountryCode] = useState('FR')
  const [country, setCountry] = useState(null)
  const [withCountryNameButton, setWithCountryNameButton] = useState(
    false,
  )
  const [withFlag, setWithFlag] = useState(true)
  const [withEmoji, setWithEmoji] = useState(true)
  const [withFilter, setWithFilter] = useState(true)
  const [withAlphaFilter, setWithAlphaFilter] = useState(false)
  const [withCallingCode, setWithCallingCode] = useState(false)

  const onSelect = country => {
    setCountryCode(country.cca2);
    setCountry(country);
};

  const verification = () => {

   if(!city || 
    !state || 
    !postCode ||
    !country 
    ) {
      showMessage("All fields required")
     }
    else {
          navigation.navigate('Kyc',{
            name: route.params.name,
            address :  route.params.address,
            date: route.params.date,
            age :  route.params.age,
            gender :  route.params.gender,
            city:city,
            state:state,
            postCode:postCode,
            country:country,
        });
    }
  }


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
          height:'90%'
        }}
        colors={[
          colors.transparentGradientColor1,
          colors.transparentGradientColor2,
        ]}>
        <View style={{margin: 5}}>
         
            <Text style={{color: colors.heading, fontSize: textSize.h2,left:10}}>
              Enter Your Address
            </Text>
          
            <View>
  
            <Text style={{color: colors.heading, fontSize: textSize.h3,left:25,marginTop:'5%'}}>
              City
            </Text>
            
            <TextInput
                  style={{borderRadius:50,backgroundColor:'#98C7FF4A',marginTop:'2%',alignItems:'center',height:45}}
                  
                  autoCapitalize={'none'}
                  underlineColorAndroid="transparent"
                  onChangeText={city => setCity(city)}
                />
        
                   <Text style={{color: colors.heading, fontSize: textSize.h3,left:25,marginTop:'5%'}}>
              State
            </Text>
                 <TextInput
                  style={{borderRadius:50,backgroundColor:'#98C7FF4A',marginTop:'2%',alignItems:'center',height:45}}
                  // placeholder="Create User Name*"
                  // placeholderTextColor="#000000"
                  keyboardType="email-address"
                  autoCapitalize={'none'}
                  underlineColorAndroid="transparent"
                  onChangeText={state => setState(state)}
                />
            <Text style={{color: colors.heading, fontSize: textSize.h2,left:25,marginTop:'5%'}}>
             Post Code
            </Text>
                 <TextInput
                  style={{borderRadius:50,backgroundColor:'#98C7FF4A',marginTop:'2%',alignItems:'center',height:45}}
                  // placeholder="Create User Name*"
                  // placeholderTextColor="#000000"
                  keyboardType="email-address"
                  autoCapitalize={'none'}
                  underlineColorAndroid="transparent"
                  onChangeText={postCode => setPostCode(postCode)}
                />
                <Text style={{color: colors.heading, fontSize: textSize.h2,left:25,marginTop:'5%'}}>
              Country
            </Text>
            <View style={styles.inputContainer}>
            <CountryPicker
                {...{
                  countryCode,
                  withFilter,
                  withFlag,
                  withCountryNameButton,
                  withAlphaFilter,
                  withCallingCode,
                  withEmoji,
                  onSelect,
                }}
              />
                   </View>
            {/* <DropDownPicker
                style={{borderRadius:50,backgroundColor:'#98C7FF4A',marginTop:'2%',alignItems:'center',height:45}}
                dropDownContainerStyle={{
                  backgroundColor: "#0466C0",
                  borderRadius:50,
                 }}
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
            /> */}
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

export default EnterAddress;
