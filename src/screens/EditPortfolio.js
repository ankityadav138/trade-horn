import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  Linking,
  FlatList,
  TouchableHighlight,
} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';
import textSize from '../constants/textSize';
import {useDispatch, useSelector} from 'react-redux';
import securityLight from '../assets/securityLight.png';
import securityImage from '../assets/Iconmaterial-security.png';
import LinkImage from '../assets/link.png';
import verifyLight from '../assets/drawerIcons/verifyLight.png';
import TicketLight from '../assets/drawerIcons/TicketLight.png';
import LinkLight from '../assets/drawerIcons/LinkLight.png';
import darkmodeLight from '../assets/drawerIcons/darkmodeLight.png';
import assetLight from '../assets/drawerIcons/assetLight.png';
import sunWhite from '../assets/drawerIconDark/sunWhite.png';
import assetDark from '../assets/drawerIconDark/assetDark.png';
import ticketdark from '../assets/drawerIconDark/ticketdark.png';
import verifyDark from '../assets/drawerIconDark/verifyDark.png';
import logout from '../assets/drawerIconDark/logout.png';
import aboutWhite from '../assets/drawerIcons/aboutWhite.png';
import aboutDark from '../assets/drawerIcons/aboutDark.png';
import PPwhite from '../assets/drawerIcons/PPwhite.png';
import PPblack from '../assets/drawerIcons/PPblack.png';
import TCwhite from '../assets/drawerIcons/TCwhite.png';
import TCblack from '../assets/drawerIcons/TCblack.png';
import Foundation from 'react-native-vector-icons/Foundation';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
//import sunWhite from '../assets/drawerIconDark/sunWhite.png';

import {LOGOUT, PROFILE} from '../store/action';
import {TouchableRipple} from 'react-native-paper';
import {AuthContext} from '../components/context';
import {AppColors} from '../constants/appColors';
import {moderateScale} from 'react-native-size-matters';
import {getDimen} from '../dimensions/dimen';
import {useIsFocused} from '@react-navigation/native';

const EditPortfolio = ({navigation}) => {
  const [userEmail, setUserEmail] = useState('');
  const [Email, setEmail] = useState('');
  const newmail = userEmail?.substring(0, userEmail.lastIndexOf('@'));

  const isFocused = useIsFocused();
  const {toggleTheme} = useContext(AuthContext);
  const dispatch = useDispatch();

  const themeColorData = useSelector(state => state.login.themeValue);
  const profileData = useSelector(state => state.user.profileData);
  const accessToken = useSelector(state => state.login.accessToken);

  // console.log('themeColorData', themeColorData);
  // console.log('paperTheme', paperTheme.dark);

  useEffect(() => {
    dispatch({
      type: PROFILE,
      payload: {token: accessToken},
    });
    setUserEmail(profileData && profileData.data && profileData.data.email);
    setEmail(userEmail?.substring(0, userEmail.lastIndexOf('@')));
  }, [isFocused]);

  useEffect(() => {
    dispatch({
      type: PROFILE,
      payload: {token: accessToken},
    });
    setUserEmail(profileData && profileData.data && profileData.data.email);
    setEmail(userEmail?.substring(0, userEmail.lastIndexOf('@')));
  }, [isFocused, profileData]);

  const HeaderData = [
    {
      id: '1',
      title: 'Security',
      image: securityImage,
      image2: securityLight,
    },
    {
      id: '2',
      title: 'Verification',
      image: verifyDark,
      image2: verifyLight,
    },
    {
      id: '3',
      title: 'My asset',
      image: assetDark,
      image2: assetLight,
    },
    {
      id: '4',
      title: 'Ticket',
      image: ticketdark,
      image2: TicketLight,
    },
    {
      id: '5',
      title: 'Referal Income',
      image: LinkImage,
      image2: LinkLight,
    },
    // {
    //   id: '6',
    //   title: 'Dark Mode',
    //   image: '',
    //   image2: darkmodeLight,
    // },
    {
      id: '6',
      title: 'About Us',
      navigate: 'AboutContainer',
      image: aboutWhite,
      image2: aboutDark,
    },
    {
      id: '7',
      title: 'Terms and conditions',
      navigate: 'TermsCondition',
      image: TCblack,
      image2: TCwhite,
    },
    {
      id: '8',
      title: 'Privacy Policy',
      navigate: 'PrivacyPolicy',
      image: PPwhite,
      image2: PPblack,
    },
  ];
  const handleLogOut = () => {
    //setConfirm(true);
    dispatch({
      type: LOGOUT,
    });
    navigation.push('Login');
  };
  //   console.log('BG_COLOR', AppColors().background);

  return (
    <View
      style={{flex: 1, backgroundColor: AppColors(themeColorData).background}}>
      <ImageBackground style={styles.imageBackgroundStyle}>
        <View
          style={{
            margin: 15,
          }}>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              // backgroundColor: 'blue',
              width: getDimen(1),
              alignSelf: 'center',
            }}>
            <TouchableOpacity
              style={{margin: 10}}
              onPress={() => navigation.goBack()}>
              <Icons
                name="arrow-back"
                size={25}
                color={AppColors(themeColorData).title}
              />
            </TouchableOpacity>
            <View>
              <TouchableOpacity style={{margin: 10}}>
                <FontAwesome
                  name="edit"
                  size={25}
                  color={AppColors(themeColorData).title}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{flexDirection: 'row', marginTop: '10%'}}>
            <Image
              style={{height: 39, width: 39, margin: 5}}
              source={require('../assets/myprofile.png')}
            />
            <Text style={styles(themeColorData).username}>
              {newmail} {/* Emma Phillipa */}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              borderBottomWidth: 1,
              borderBottomColor: '#BABABA',
              marginTop: 13,
            }}>
            <Foundation
              name="mail"
              size={27}
              color={AppColors(themeColorData).title}
              style={{margin: getDimen(0.015), marginLeft: getDimen(0.03)}}
            />
            <Text style={styles(themeColorData).gmailText}>
              {' '}
              {userEmail}
              {/* emma.philips@gmail.com */}
            </Text>
          </View>
        </View>

        <View style={{marginTop: '5%', margin: 15}}>
          <FlatList
            data={HeaderData}
            key={HeaderData.id}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    if (item.id == 6 || item.id == 7 || item.id == 8) {
                      navigation.navigate(item?.navigate);
                    }
                  }}
                  style={styles(themeColorData).mainbg}>
                  <Image
                    source={themeColorData == true ? item.image : item.image2}
                    style={{
                      width: getDimen(0.045),
                      height: getDimen(0.05),
                      margin: 10,
                    }}
                  />

                  <View style={{}}>
                    <Text
                      style={{
                        color: AppColors(themeColorData).title,
                        fontSize: textSize.h3,
                        fontWeight: '600',
                        fontFamily: '',
                        margin: 10,
                      }}>
                      {item.title}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
          <TouchableRipple
            style={[
              styles(themeColorData).background,
              {marginBottom: moderateScale(10)},
            ]}
            onPress={() => toggleTheme()}>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={themeColorData == true ? sunWhite : darkmodeLight}
                style={{
                  width: 20,
                  height: 23,
                  margin: 10,
                }}
              />

              <Text
                style={{
                  color: AppColors(themeColorData).title,
                  fontSize: textSize.h3,
                  fontWeight: '600',
                  fontFamily: '',
                  margin: 10,
                }}>
                {themeColorData == true ? 'Light Mode' : 'Dark Mode'}
              </Text>
              {/* 
              // <View pointerEvents="none">
              //   <Switch value={paperTheme.dark} />
              // </View> */}
            </View>
          </TouchableRipple>

          <TouchableRipple
            style={styles(themeColorData).background}
            onPress={() => handleLogOut()}>
            <View
              style={{flexDirection: 'row', marginBottom: moderateScale(10)}}>
              <Image
                source={logout}
                style={{
                  width: 25,
                  height: 23,
                  margin: 10,
                }}
              />

              <Text
                style={{
                  color: AppColors(themeColorData).red,
                  fontSize: 16,
                  fontWeight: '700',
                  fontFamily: '',
                  margin: 10,
                }}>
                Logout
              </Text>
            </View>
          </TouchableRipple>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = themeColorData =>
  StyleSheet.create({
    imageBackgroundStyle: {
      flex: 1,
      padding: textSize.componentsDifference,
    },
    // iconImageStyle: {
    //   // height: 250,
    //   // width: 250,
    // },
    iconImageStyle: {
      // height: 60,
      // width: 160,
      // marginTop: textSize.componentsDifferenceMediam,
      height: 100,
      width: 235,
      marginTop: 16,
    },
    componetsMargin: {marginVertical: textSize.componentsDifferenceMediam},
    TextStyle: {
      color: '#ffff',
      fontSize: textSize.h6,
      //  textAlign: 'center',
    },
    background: {
      backgroundColor: AppColors(themeColorData).backgroundLight,
      borderRadius: 10,
      marginVertical: 2,
    },
    mainbg: {
      flexDirection: 'row',
      marginBottom: moderateScale(10),
      backgroundColor: AppColors(themeColorData).backgroundLight,
      borderRadius: 10,
    },
    gmailText: {
      color: AppColors(themeColorData).title,
      fontSize: textSize.h5,
      fontFamily: '',
      // margin: 10,
      marginLeft: getDimen(0.05),
      margin: getDimen(0.018),
    },
    username: {
      color: AppColors(themeColorData).title,
      fontSize: 18,
      margin: 10,
      fontFamily: '',
      fontWeight: '900',
    },
  });

export default EditPortfolio;
