import { useTheme } from '@react-navigation/native';
import React ,{useState,useEffect} from 'react';
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
import { AppColors } from '../../../constants/appColors';
import { ScrollView } from 'react-native-gesture-handler';
import {imageUploadAxois} from '../../../utils/imageUploadAxois';
import DocumentPicker from 'react-native-document-picker';
import showMessage from '../../../components/showMessage';
import {useDispatch, useSelector} from 'react-redux';
import {commonAxoisApiUtils} from '../../../utils/commonAxoisApiUtils';
import {PROFILE} from '../../../store/action';


const DocVerification = ({  navigation,route }) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const [singleFile, setSingleFile] = useState(null);
  const [selfieFile, setSelfieFile] = useState(null);
  const [url1, setUrl1] = useState('');
  const [url2, setUrl2] = useState('');

  const accessToken = useSelector(state => state.login.accessToken);
  const profileData = useSelector(state => state.user.profileData);

  useEffect(() => {
    dispatch({
      type: PROFILE,
      payload: {token: accessToken},
    });
  }, []);

  const uploadImage = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
        // There can me more options as well
        // DocumentPicker.types.allFiles
        // DocumentPicker.types.images
        // DocumentPicker.types.plainText

        // DocumentPicker.types.audio
        // DocumentPicker.types.pdf
      });
     // console.log('res : ' + JSON.stringify(res));
      // Setting the state to show single file attributes
      setSingleFile(res[0]);
      //setFilePath(res)
    } catch (err) {
      setSingleFile(null);
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err;
      }
    }
  //  console.log('SINgle',singleFile)
    //console.log('Filepath',filePath)
    if (singleFile != null) {
      const fileToUpload = singleFile;
      const data = new FormData();
     // data.append('name', 'photo');
      data.append('fileKey', fileToUpload);
     
      let params = {
        data: data,
        params: {
          method: 'POST',
          url: '/upload-image',
          token: accessToken 
        },
      };
      imageUploadAxois.getResponse(params).then(res => {
        if (res.data.status == true) {
           showMessage(res.data.message)
           setUrl1(res.data.data)           
        }
        else{
          showMessage(res.data.message)
        }
      });
    } else {
      showMessage('Please Select Image first');
    }
  }


  const uploadSelfie = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
    //  console.log('res : ' + JSON.stringify(res));
      setSelfieFile(res[0]);
    } catch (err) {
      setSelfieFile(null);
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err;
      }
    }
  //  console.log('SINgle',selfieFile)
    //console.log('Filepath',filePath)
    if (selfieFile != null) {
      const fileToUpload = selfieFile;
      const data = new FormData();
     // data.append('name', 'photo');
      data.append('fileKey', fileToUpload);
     
      let params = {
        data: data,
        params: {
          method: 'POST',
          url: '/upload-image',
          token: accessToken 
        },
      };
      imageUploadAxois.getResponse(params).then(res => {
        if (res.data.status == true) {
          showMessage(res.data.message)
          setUrl2(res.data.data)           
       }
       else{
         showMessage(res.data.message)
       }
      });
    } else {
      showMessage('Please Select Image first');
    }

  }

  const verify = () => {
    if(!singleFile || 
      !selfieFile 
      ) 
      {
        showMessage("All fields required")
       }
      else {
           
      let params = {
        data: {
          accountConfirm: true,
          address: route.params.address,
          age: route.params.age,
          attempt: 0, 
          avatar: "",
          bank_info: {
            account_type: "",
             bankname: "",
              branch: "", 
              holder: "", 
              ibanCode: "",
             country: "" ,
            },
        bank_status: false,
        city:  route.params.city,
        country: route.params.country,
        createdAt: profileData && profileData.data && profileData.data.createdAt,
        currency: profileData && profileData.data && profileData.data.currency,
        dob: route.params.date,
        email: profileData && profileData.data && profileData.data.email ,
        emailVerified: profileData && profileData.data && profileData.data.emailVerified ,
        emailVerifiedToken: profileData && profileData.data && profileData.data.emailVerifiedToken ,
        favourites: [],
        firstname: route.params.name,
        gender: route.params.gender,
        isActive:  profileData && profileData.data && profileData.data.isActive,
        kyc: {
          back: url1,
          front: url1,
          proofname: route.params.type,
          proofnumber:route.params.passport,
          proofstatus: profileData && profileData.data && profileData.data.kyc.proofstatus,
          selfie: url2,
          selfiestatus: profileData && profileData.data && profileData.data.kyc.selfiestatus,
        },
        kycVerified:  profileData && profileData.data && profileData.data.kycVerified,
        lastname: "",
        level: 0,
        operation: false,
        phone: "",
        pincode: route.params.postCode,
        profileUpdated: false,
        resetTime: profileData && profileData.data && profileData.data.resetTime,
        resetcode: "",
        state: route.params.state,
        termsCondition: true,
        tfa: {
          dataURL:profileData && profileData.data && profileData.data.tfa.dataURL,
          otpURL: profileData && profileData.data && profileData.data.tfa.otpURL,
          tempSecret: profileData && profileData.data && profileData.data.tfa.tempSecret,
        },       
        tfaVerified: profileData && profileData.data && profileData.data.tfaVerified,
        updatedAt: profileData && profileData.data && profileData.data.updatedAt,
        verificationCode: profileData && profileData.data && profileData.data.verificationCode,
        __v: profileData && profileData.data && profileData.data.__v,
        _id:profileData && profileData.data && profileData.data._id,
        },
        params: {
          method: 'POST',
          url: '/v1/user/update-profile',
          token: accessToken,
        },
      };
      commonAxoisApiUtils.getResponse(params).then(res => {
        navigation.navigate('SubmitMessage');
        if (res.data.code == 200) {    
          showMessage(res.data.message);
          //navigation.navigate('SubmitMessage');
        } else {
          showMessage(res.data.message);
        }
      });
      }

  }

  return (
    <View style={styles.HeaderView}>
     
      <View style={{ flexDirection: 'row', marginTop: '5%' }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icons
            style={{
              color: colors.heading,
              textAlign: 'left',
              marginLeft: 22
            }}
            name="arrow-back"
            size={20}
            color={'white'}
          />
        </TouchableOpacity>
        <Text style={{ color: colors.heading, fontSize: textSize.h3, marginLeft: 5 }}>Verification</Text>
      </View>
      <ScrollView> 
        <LinearGradient
          style={{
            width: '90%',
            borderRadius: 6,
            marginHorizontal: '5%',
            padding: textSize.componentsDifferenceLow,
            marginTop: '5%',
            height: '90%'
          }}
          colors={[
            colors.transparentGradientColor1,
            colors.transparentGradientColor2,
          ]}>
          <View style={{ margin: 7}}>

            <Text style={{ color: colors.heading, fontSize: textSize.h2, left: 10 }}>
              Documents Upload
            </Text>
            <Text style={{ color: colors.heading, fontSize: textSize.h6, left: 10, top: 10 }}>
              To verify your identity, we ask you to update high-quality
            </Text>
            <Text style={{ color: colors.heading, fontSize: textSize.h6, left: 10, top: 10 }}>
              scan or photos of official identtification documents issued
            </Text>
            <Text style={{ color: colors.heading, fontSize: textSize.h6, left: 10, top: 10 }}>
              by the government.
            </Text>
            <View style={{flexDirection:'row',backgroundColor:'#0A5BA1',borderRadius:5,alignItems:'center',marginTop:'7%',padding:1}}>
                <Icons name="information-circle" size={20} color={'#FFFFFF'} />
              <Text style={{color: colors.heading, fontSize: 11,marginLeft:2}}>
              In Order to complete,please update any of the following
              personal documents
                  </Text>
               </View>
            <View>           
           
              <Text style={{ color: colors.heading, fontSize: textSize.h6, left: 10, top: 10 }}>
                To avoid delays with verification process, please double-check
              </Text>
             
              <View style={{marginTop:'7%',flexDirection:'row'}}>
                <View>
                <Icons name="checkmark-circle" size={18} color="white"  />
                </View>
                <View>
                    <Text style={{ color: '#ffffff', fontSize: textSize.h6,marginLeft:'1%'}}>
                    Chosen credential must not be expired.
                      </Text>
                </View>
              </View>

              <View style={{marginTop:'2%',flexDirection:'row'}}>
                <View>
                <Icons name="checkmark-circle" size={18} color="white"  />
                </View>
                <View>
                    <Text style={{ color: '#ffffff', fontSize: textSize.h6,marginLeft:'1%'}}>
                    Documents should be in good condition and clearly visible.
                      </Text>
                </View>
              </View>

              <View style={{marginTop:'2%',flexDirection:'row'}}>
                <View>
                <Icons name="checkmark-circle" size={18} color="white"  />
                </View>
                <View>
                    <Text style={{ color: '#ffffff', fontSize: textSize.h6,marginLeft:'1%'}}>
                    There is no light glare or reflections on the card.
                      </Text>
                </View>
              </View>
              <View style={{marginTop:'2%',flexDirection:'row'}}>
                <View>
                <Icons name="checkmark-circle" size={18} color="white"  />
                </View>
                <View>
                    <Text style={{ color: '#ffffff', fontSize: textSize.h6,marginLeft:'1%'}}>
                    The file is at least 1 MB in size and has at least 300 dpi resolution.
                      </Text>
                </View>
              </View>

              <TouchableOpacity   onPress={() => uploadImage()}>
          
              <View style={{marginTop:'7%'}}>
                <Text style={{ color: colors.heading, fontSize: textSize.h4, left: 10 }}>
                  Upload Here Your Passport Copy
                </Text>
              </View>
              <View style={{flexDirection:'column',borderRadius:30,marginTop:'3%'}}>  
                <View style={{backgroundColor:'white',alignItems:'center',padding:10}}> 
                {(singleFile != null) ? (
                    <Image style={{height:100,width:100}} source={{ uri: singleFile.uri ? singleFile.uri : '' }} />
                  ) : (
                    <Icons name="md-document-text-outline" size={100} color="#32608E"  />
                  )}
                </View>
                <View style={{backgroundColor:'#32608E',alignItems:'center',padding:10}}>
                      <Text style={{ color: colors.heading, fontSize: textSize.h3}}>
                        Upload Here Your Passport Copy
                      </Text>
                </View>
              </View>
              </TouchableOpacity>


              <TouchableOpacity  onPress={() => uploadSelfie()}>
              <View style={{marginTop:'10%'}}>
                <Text style={{ color: colors.heading, fontSize: textSize.h4, left: 10 }}>
                Upload a selfie as a Photo Proof While Holding document in Your hand
                </Text>
              </View>
              <View style={{flexDirection:'column',borderRadius:30,marginTop:'3%'}}>  
                <View style={{backgroundColor:'white',alignItems:'center',padding:10}}> 
                {(selfieFile != null) ? (
                    <Image style={{height:100,width:100}} source={{ uri: selfieFile.uri ? selfieFile.uri : '' }} />
                 ) : (
                    <Icons name="images-outline" size={100} color="#32608E"  />
                 )}
                </View>
                <View style={{backgroundColor:'#32608E',alignItems:'center',padding:10}}>
                      <Text style={{ color: colors.heading, fontSize: textSize.h3}}>
                      Take a selfie
                      </Text>
                </View>
              </View>
              </TouchableOpacity>
              <View style={{marginTop:'5%',flexDirection:'row'}}>
                <View>
                <Icons name="checkbox-outline" size={20} color="white"  />
                </View>
                <View>
                    <Text style={{ color: '#ffffff', fontSize: textSize.h6,marginLeft:'1%'}}>
                      I have read the Terms and Condition and {'/n'}   Privacy policy
                      </Text>
                </View>
              </View>

              <View style={{marginTop:'5%',flexDirection:'row'}}>
                <View>
                <Icons name="checkbox-outline" size={20} color="white"  />
                </View>
                <View>
                    <Text style={{ color: '#ffffff', fontSize: textSize.h6,marginLeft:'1%'}}>
                    All the personal information I have entered is correct.
                      </Text>
                </View>
              </View>
            </View>

          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: '10%', justifyContent: 'center' }}>
            <TouchableOpacity
              onPress={() => verify()}>

              <View style={[styles.buttonContainer, styles.loginDisableButton]}>
                <Text style={styles.loginText}>PROCEED TO VERIFY</Text>

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
    flex: 1,
    backgroundColor: '#0466C0'
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    right: 2,
    marginTop: 250,
    width: '100%',
    borderRadius: 25,
    backgroundColor: 'transparent',
    bottom: 200
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

export default DocVerification;