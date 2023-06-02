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

const Kyc = ({navigation,route}) => {
  const {colors} = useTheme();

  const [passport, setPassport] = useState()
  


  const [open1, setOpen1] = useState(false);
  const [value1, setValue1] = useState(null);
  const [items1, setItems1] = useState([
    {label: 'Passport', value: 'Passport'},
    {label: 'National ID', value: 'nationalId'},
    {label: 'Driver licence', value: 'licence'},
  ]);

  const verification = () => {

    if(!passport || 
      !value1 
      ) 
      {
        showMessage("All fields required")
       }
      else {
            navigation.navigate('DocVerification',{
              name: route.params.name,
              address :  route.params.address,
              date: route.params.date,
              age :  route.params.age,
              gender :  route.params.gender,
              city: route.params.city,
              state: route.params.state,
              postCode: route.params.postCode,
              country: route.params.country,
              passport: passport,
              type: value1,
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
         
            <View>
                   <Text style={{color: colors.heading, fontSize: textSize.h3,left:25,marginTop:'5%'}}>
                   Types of KYC
            </Text>
            <DropDownPicker
                style={{borderRadius:50,backgroundColor:'#98C7FF4A',marginTop:'2%',alignItems:'center',height:45}}
                dropDownContainerStyle={{
                  backgroundColor: "#0466C0",
                  borderRadius:50,
                 }}
                open={open1}
                value={value1}
                items={items1}
                setOpen={setOpen1}
                setValue={setValue1}
                setItems={setItems1}
            />
            <Text style={{color: colors.heading, fontSize: textSize.h3,left:25,marginTop:'5%'}}>
            Passport Number
            </Text>
                 <TextInput
                  style={{borderRadius:50,backgroundColor:'#98C7FF4A',marginTop:'2%',alignItems:'center',height:45}}
                  autoCapitalize={'none'}
                  underlineColorAndroid="transparent"
                  onChangeText={passport => setPassport(passport)}
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
 
});

export default Kyc;
