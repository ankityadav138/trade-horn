import {useTheme} from '@react-navigation/native';
import React , {useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icons from 'react-native-vector-icons/Ionicons';
import textSize from '../../../constants/textSize';
import Toolbar from '../../../constants/toolbar';
import {AppColors} from '../../../constants/appColors';
import { ScrollView } from 'react-native-gesture-handler';
import PersonalVerification from '../KycVerifyComponents/PersonalVerification';
import {useDispatch, useSelector} from 'react-redux';
import {SEND_OTP,PROFILE,CHECK_OTP,UPDATE_TFA} from '../../../store/action';
import {getDimen} from '../../../dimensions/dimen';



const ProfileVerification = ({data,navigation}) => {
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const accessToken = useSelector(state => state.login.accessToken);
  const profileData = useSelector(state => state.user.profileData);
  //console.log(profileData.data)

  useEffect(() => {
    dispatch({
      type: PROFILE,
      payload: {token: accessToken},
    });
  }, []);

  const CheckPoint = ({item}) => {
    return (
      <View style={{flexDirection: 'row', marginStart: 16, padding: 8}}>
        <Icons name="ios-checkmark" size={15} color={'green'} />
        <Text style={{color: colors.heading, fontSize: textSize.h6}}>
          {item}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.HeaderView}>
       <Toolbar navigation={navigation}  />
      <View style={{flexDirection:'row',marginTop:'5%'}}>
      <TouchableOpacity  onPress={()=>navigation.goBack()}>
      <Icons
            style={{
              color: colors.heading,
              textAlign: 'left',
              marginLeft:22
            }}
            name="arrow-back"
            size={25}
            color={'white'}
          />
          </TouchableOpacity>
          <Text style={{color: colors.heading, fontSize: textSize.h3,marginLeft:5,width:getDimen(0.40)}}>Verification</Text>
      </View>
      { profileData && profileData.data && profileData.data.kycVerified == false ?
      <PersonalVerification navigation={navigation}/> 
      :
       <LinearGradient
        style={{
          //width: '90%',
          borderRadius: 6,
          marginHorizontal: '5%',
          padding: textSize.componentsDifferenceLow,
          marginTop:'5%',
          flex:1
        }}
        colors={[
          colors.transparentGradientColor1,
          colors.transparentGradientColor2,
        ]}>
        <View style={{marginStart: 6}}>
          <View
            style={{
              flexDirection: 'row',
              marginTop: textSize.componentsDifferenceHight,
            }}>
            <Icons
              style={{backgroundColor: 'green', borderRadius: 20, marginEnd: 6}}
              name="ios-checkmark"
              size={18}
              color={'white'}
            />
            <Text style={{color: colors.heading, fontSize: textSize.h5,width:getDimen(0.50)}}>
              KYC Verification
            </Text>
          </View>
          <View style={{marginTop: 4}}>
            <CheckPoint item={'Security Settings'} />
            <CheckPoint item={'coi****@gmail.com'} />
            <CheckPoint item={'Google Authentication'} />
            <CheckPoint item={'Login Password'} />
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: textSize.componentsDifferenceHight,
            }}>
            <Icons
              style={{backgroundColor: 'green', borderRadius: 20, marginEnd: 6}}
              name="ios-checkmark"
              size={18}
              color={'white'}
            />
            <Text style={{color: colors.heading, fontSize: textSize.h5,width:getDimen(0.50)}}>
              Account Limits
            </Text>
          </View>
          <View style={{marginTop: 4}}>
            <CheckPoint item={'Crypto deposit enable'} />
            <CheckPoint item={'Crypto withdraw enable'} />
            <CheckPoint item={'Fiat deposit enable'} />
            <CheckPoint item={'Fiat withdraw enable'} />
            <CheckPoint item={'Trade enable'} />
          </View>
        </View>
      </LinearGradient> 
          }     
    </View>
  );
};

const styles = StyleSheet.create({
  HeaderView: {
    //width: '100%',
    flex:1,
    backgroundColor:'#0466C0'
  },
});

export default ProfileVerification;
