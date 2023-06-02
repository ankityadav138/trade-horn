import {useTheme} from '@react-navigation/native';
import React, {useEffect, useState, useCallback} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {commonAxoisApiUtils} from '../../../utils/commonAxoisApiUtils';
import {useDispatch, useSelector} from 'react-redux';
import Icons from 'react-native-vector-icons/Ionicons';
import textSize from '../../../constants/textSize';
import {Security} from '../../../assets/Security';
import {GoogleIcon} from '../../../assets/GoogleIcon';
import {PasswordIcon} from '../../../assets/PasswordIcon';
import {LOGHISTORY, PROFILE} from '../../../store/action';
import Toolbar from '../../../constants/toolbar';
import {AppColors} from '../../../constants/appColors';
import {ScrollView} from 'react-native-gesture-handler';
import AuthModal from '../SecurityComponents/AuthModal';
import ChangeModal from '../SecurityComponents/ChangeModal';
import showMessage from '../../../components/showMessage';
import {getDimen} from '../../../dimensions/dimen';
import {moderateScale} from 'react-native-size-matters';
import {useIsFocused} from '@react-navigation/native';

const ProfileSecurity = ({data, navigation}) => {
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const profileData = useSelector(state => state.user.profileData);
  const logHistoryData = useSelector(state => state.user.logHistory);
  const accessToken = useSelector(state => state.login.accessToken);

  const [modalVisible, setModalVisible] = useState(false);
  const [changeVisible, setChangeVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [lastLogin, setLastlogin] = useState('');
  const [lastLoginAdd, setLastloginAdd] = useState('');

  useEffect(() => {
    setEmail(profileData && profileData.data && profileData.data.email);
    setLastlogin(profileData && profileData.data && profileData.data.resetTime);
    setLastloginAdd(
      profileData && profileData.data && profileData.data.address,
    );
  }, [profileData, isFocused]);

  useEffect(() => {
    dispatch({
      type: PROFILE,
      payload: {token: accessToken},
    });
    dispatch({
      type: LOGHISTORY,
      payload: {token: accessToken},
    });
  }, []);

  const callbackFromOTP = useCallback(status => {
    setModalVisible(status);
  }, []);

  const callBachChangePWD = useCallback(status => {
    setChangeVisible(status);
  }, []);

  const deleteHistory = item => {
    // console.log('ITEM',item.access_token)
    let params = {
      data: {
        token: item.access_token,
      },
      params: {
        method: 'POST',
        url: '/v1/user/signout-session',
        token: accessToken,
      },
    };
    commonAxoisApiUtils.getResponse(params).then(res => {
      if (res.data.code == 200) {
        showMessage(res.data.message);
        dispatch({
          type: LOGHISTORY,
          payload: {token: accessToken},
        });
      } else {
        showMessage(res.data.message);
      }
    });
  };
  const HeaderData = [
    {
      id: '1',
      title: 'Date & Time',
    },
    {
      id: '2',
      title: 'Login Method',
    },
    {
      id: '3',
      title: 'Ip Address',
    },
    {
      id: '4',
      title: 'Location',
    },
    {
      id: '5',
      title: 'Status',
    },
    {
      id: '6',
      title: 'Logout',
    },
  ];
  const ListHeader = () => {
    //View to set in Header
    return (
      <FlatList
        numColumns={HeaderData.length}
        data={HeaderData}
        renderItem={({item, index}) => (
          <View style={styles.TitleView}>
            <Text style={styles.Titletext}>{item.title}</Text>
          </View>
        )}
        keyExtractor={item => item.id}
      />
    );
  };
  const renderItem = ({item}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: textSize.componentsDifferenceLow,
        }}>
        <Text style={{color: 'white', fontSize: textSize.h5}}>{item.date}</Text>
        <Text style={{color: 'white', fontSize: textSize.h5}}>{item.os}</Text>
        <Text style={{color: 'white', fontSize: textSize.h5}}>
          {item.ipaddress}
        </Text>
      </View>
    );
  };

  return (
    <View style={[styles.HeaderView]}>
      <Toolbar navigation={navigation} />
      <View style={{flexDirection: 'row', marginTop: '2%'}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icons
            style={{
              color: colors.heading,
              textAlign: 'left',
              marginLeft: 22,
              fontWeight: 'bold',
            }}
            name="arrow-back"
            size={25}
            color={'white'}
          />
        </TouchableOpacity>
        <Text
          style={{
            color: colors.heading,
            fontSize: textSize.h3,
            marginLeft: 5,
            width: getDimen(0.3),
          }}>
          Security
        </Text>
      </View>
      <ScrollView>
        <LinearGradient
          style={{
            width: '90%',
            borderRadius: 6,
            marginHorizontal: '5%',
            padding: textSize.componentsDifferenceLow,
            marginTop: '5%',
          }}
          colors={[
            colors.transparentGradientColor1,
            colors.transparentGradientColor2,
          ]}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Icons
              style={{
                color: colors.heading,
                alignSelf: 'center',
                textAlign: 'center',
              }}
              name="md-person-circle"
              size={60}
              color={'#061E39'}
            />
            <View
              style={{marginStart: 6, marginTop: '5%', alignSelf: 'center'}}>
              <Text style={{color: colors.heading, fontSize: 12}}>
                Email ID: {email}
              </Text>
              <Text
                style={{
                  color: colors.heading,
                  fontSize: 12,
                  marginTop: textSize.componentsDifference,
                  fontFamily: '',
                }}>
                Last Login : {lastLogin} {'\n'}
                {lastLoginAdd}
              </Text>
            </View>
          </View>
        </LinearGradient>

        <View style={{marginVertical: textSize.componentsDifferenceLow}} />

        <LinearGradient
          style={{
            width: '90%',
            borderRadius: 6,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            marginHorizontal: '5%',
            padding: textSize.componentsDifferenceLow,
            //flex:1
          }}
          colors={[
            colors.transparentGradientColor1,
            colors.transparentGradientColor2,
          ]}>
          <View style={{marginStart: 6}}>
            <Text style={{color: colors.heading, fontSize: textSize.h4}}>
              Security Settings
            </Text>
            <View style={{marginTop: textSize.componentsDifferenceMediam}}>
              <View style={{padding: 7}}>
                <Security height={30} width={30} color="white" />
              </View>
              <Text
                style={{
                  color: colors.heading,
                  fontSize: textSize.h5,
                  marginBottom: 5,
                }}>
                Security Settings
              </Text>
              <Text
                style={{
                  color: '#7F8E9E',
                  fontSize: textSize.p,
                  marginBottom: 5,
                  height: moderateScale(23),
                }}>
                For login, withdrawals, password retrieval, change of security
                settings and API management.
              </Text>
              <Text style={{color: colors.heading, fontSize: textSize.h5}}>
                {/* {profileData && profileData.data && profileData.data.email} */}
                {profileData?.data?.email.slice(0, 3)}****@gmail.com
              </Text>
            </View>
            <View style={{marginTop: textSize.componentsDifferenceMediam}}>
              <View style={{padding: 7}}>
                <GoogleIcon height={30} width={30} color="white" />
              </View>
              <Text
                style={{
                  color: colors.heading,
                  fontSize: textSize.h5,
                  marginBottom: 5,
                }}>
                Google Authentication
              </Text>
              <Text
                style={{
                  color: '#7F8E9E',
                  fontSize: textSize.p,
                  marginBottom: moderateScale(5),
                  height: moderateScale(23),
                }}>
                For login, withdrawals, password retrieval, change of security
                settings and API management.
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Text
                  style={{
                    color: colors.heading,
                    fontSize: textSize.h5,
                    textDecorationLine: 'underline',
                    textDecorationColor: '#FFFFFFDE',
                  }}>
                  {profileData &&
                  profileData.data &&
                  profileData.data.tfaVerified == true
                    ? 'Disable'
                    : 'Enable'}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{marginTop: textSize.componentsDifferenceMediam}}>
              <View style={{padding: 7}}>
                <PasswordIcon height={30} width={30} color="white" />
              </View>

              <Text
                style={{
                  color: colors.heading,
                  fontSize: textSize.h6,
                  marginBottom: 5,
                }}>
                Login Password
              </Text>
              <Text
                style={{
                  color: '#7F8E9E',
                  fontSize: textSize.p,
                  marginBottom: 5,
                }}>
                To ensure account security
              </Text>
              <TouchableOpacity onPress={() => setChangeVisible(true)}>
                <Text
                  style={{
                    color: colors.heading,
                    fontSize: textSize.h5,
                    textDecorationLine: 'underline',
                    textDecorationColor: '#FFFFFFDE',
                  }}>
                  Change
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{marginVertical: textSize.componentsDifferenceLow}} />
        </LinearGradient>
        {/* <View style={{marginVertical: textSize.componentsDifferenceLow}} /> */}

        <LinearGradient
          style={{
            width: '90%',
            borderRadius: 6,
            marginHorizontal: '5%',
            // borderTopLeftRadius:0,
            // borderTopRightRadius:0,
          }}
          colors={[
            colors.transparentGradientColor1,
            colors.transparentGradientColor2,
          ]}>
          <View style={{marginTop: textSize.componentsDifference}}>
            <Text
              style={{
                padding: textSize.componentsDifferenceLow,
                color: colors.heading,
                fontSize: textSize.h4,
                marginLeft: '4%',
              }}>
              Active Session
            </Text>
            {/* <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: 'black',
              padding: textSize.componentsDifferenceLow,
            }}>
            <Text style={{color: 'white', fontSize: textSize.h5}}>
              Date & Time
            </Text>
            <Text style={{color: 'white', fontSize: textSize.h5}}>
              Login Method
            </Text>
            <Text style={{color: 'white', fontSize: textSize.h5}}>
              Ip Address
            </Text>
          </View> */}
            {/* <FlatList
            data={logHistoryData.data}
            renderItem={item => renderItem(item)}
            keyExtractor={(item, index) => index.toString()}
            ListHeaderComponent={ListHeader}
          /> */}
            <ScrollView horizontal>
              <FlatList
                style={{backgroundColor: '#03325F'}}
                data={logHistoryData && logHistoryData.data}
                renderItem={({item, index}) => (
                  <View style={styles.tableBodyView}>
                    <Text style={[styles.text, {width: moderateScale(90)}]}>
                      {item.date.slice(0, 10)} {item.date.slice(11, 20)}
                    </Text>
                    <Text style={styles.text}>
                      {'  '}

                      {item.os}
                    </Text>
                    <Text style={styles.text}>
                      {'  '}
                      {item.ipaddress}
                    </Text>
                    <Text style={styles.text}>
                      {'  '}
                      {item.location == 'null, null, null'
                        ? 'Location Unavailable '
                        : item.location}
                    </Text>
                    <Text style={styles.bodyTextStyleActive}>
                      {'  '}
                      {item.status == true ? 'Active' : 'InActive'}
                    </Text>
                    <TouchableOpacity onPress={() => deleteHistory(item)}>
                      <Text style={styles.text}>
                        <Icons name="log-out-outline" size={25} color="red" />
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
                keyExtractor={item => item.id}
                ListHeaderComponent={ListHeader}
              />
            </ScrollView>
          </View>
        </LinearGradient>

        <View style={{backgroundColor: 'transparent'}}>
          {modalVisible && (
            <AuthModal
              modalVisible={modalVisible}
              parentCallback={callbackFromOTP}
            />
          )}
        </View>

        <View style={{backgroundColor: 'transparent'}}>
          {changeVisible && (
            <ChangeModal
              changeVisible={changeVisible}
              parentCallback={callBachChangePWD}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  HeaderView: {
    flex: 1,
    backgroundColor: '#0466C0',
  },

  text: {
    color: '#FFF',
    fontSize: textSize.h6,
    textAlign: 'left',
    width: moderateScale(100),
    height: 48,
  },
  tableBodyView: {
    // flex: 1,
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#03325F',
    // height: moderateScale(60),
    // // height: moderateScale(30),
    // // padding: 15,
    justifyContent: 'space-between',
    padding: textSize.componentsDifference,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 3,
  },
  TitleView: {
    flexDirection: 'row',
    backgroundColor: 'black',
    padding: textSize.componentsDifferenceLow,
  },
  Titletext: {
    color: '#FFF',
    fontSize: textSize.h5,
    textAlign: 'left',
    width: moderateScale(100),
  },
  // bodyTextStyle: {
  //   textAlign: 'center',
  //   color: 'white',
  //   fontWeight: '500',
  //   fontSize: 12,
  //   width: moderateScale(160),
  // },

  bodyTextStyleActive: {
    // textAlign: 'center',
    color: 'green',
    fontWeight: '500',
    fontSize: textSize.h6,
    textAlign: 'left',
    width: moderateScale(100),
    // fontSize: 15,
    // // width: 150,
    // width: moderateScale(160),
    // left: moderateScale(30),
  },
});

export default ProfileSecurity;
