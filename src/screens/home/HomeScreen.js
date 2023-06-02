import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  BackHandler,
  SectionList,
  TouchableOpacity,
} from 'react-native';
import textSize from '../../constants/textSize';
import {useDispatch, useSelector} from 'react-redux';
import {
  TOP_PAIR_CURRENCY,
  GET_OPEN_ORDER,
  ORDER_HISTORY,
  GET_PAIRLIST,
  PROFILE,
  PAIR,
  DETAILS_COINS_DATA,
  COINS_PAGE_DATA,
} from '../../store/action';
import {getDimen} from '../../dimensions/dimen';
import MarketFooter from '../../components/MasterFooter';
import {ScrollView} from 'react-native-gesture-handler';
import {useNavigation, useRoute} from '@react-navigation/native';
import {moderateScale} from 'react-native-size-matters';
import {AuthContext} from '../../components/context';
import {AppColors} from '../../constants/appColors';
import {useIsFocused} from '@react-navigation/native';

const HomeScreen = ({searchBox, filter}) => {
  // const {mail} = route.params;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const route = useRoute();
  // const email = route.params.mail;
  // console.log('mail from loginnn home-----', email);

  const {toggleTheme} = useContext(AuthContext);
  const [ischecked, setChecked] = useState(false);
  const [openOrderData, setOpenOrderData] = useState([]);

  const [isSelected, setSelection] = useState('Gainers');
  const [userEmail, setUserEmail] = useState('');
  const [Email, setEmail] = useState('');
  const newmail = userEmail?.substring(0, userEmail.lastIndexOf('@'));
  const accessToken = useSelector(state => state.login.accessToken);
  const topPairlistData = useSelector(state => state.order.topPairlistData);
  const pairlistData = useSelector(state => state.order.marketHome);
  const themeColorData = useSelector(state => state.login.themeValue);
  const profileData = useSelector(state => state.user.profileData);

  useEffect(() => {
    dispatch({
      type: GET_OPEN_ORDER,
      payload: {token: accessToken},
    });
    dispatch({
      type: ORDER_HISTORY,
      payload: {token: accessToken},
    });
    dispatch({
      type: GET_PAIRLIST,
      payload: {token: accessToken},
    });
  }, []);

  useEffect(() => {
    dispatch({
      type: PROFILE,
      payload: {token: accessToken},
    });
    // setEmail(profileData && profileData.data && profileData.data.email);
  }, [isFocused, profileData]);

  useEffect(() => {
    setUserEmail(profileData && profileData.data && profileData.data.email);
    setEmail(userEmail?.substring(0, userEmail.lastIndexOf('@')));
  }, [isFocused, profileData]);

  useEffect(() => {
    dispatch({
      type: TOP_PAIR_CURRENCY,
      payload: {token: accessToken},
    });
    if (route.name === 'HomeTabs') {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );
      return () => backHandler.remove();
    }
    // setEmail(profileData && profileData.data && profileData.data.email);
  }, [isFocused]);

  const backAction = () => {
    if (navigation.isFocused()) {
      BackHandler.exitApp();
    } else {
      navigation.goBack();
    }
    return true;
  };

  const DATA = [
    {
      title: 'Form1',
      data: [],
    },
    {
      title: 'Submit',
      data: [],
    },
  ];

  const SelectLosers = () => {
    setSelection('Losers');
    console.log('DATA', pairlistData.data);
    const sortLoserData = pairlistData?.data?.sort(function (a, b) {
      return a.change - b.change;
    });
    setOpenOrderData(sortLoserData);
  };

  const SelectGainers = () => {
    setSelection('Gainers');
    const sortGainersData = pairlistData?.data?.reverse(function (a, b) {
      return a.change + b.change;
    });
    setOpenOrderData(sortGainersData);
  };

  const pairId = data => {
    dispatch({
      type: PAIR,
      payload: data,
    });
    // const replacenew = data.replace('/', '_');
  };

  const renderSection = ({section}) => {
    switch (section.title) {
      case 'Form1':
        return sectionFirst();
      default:
        return sectionFinal();
    }
  };

  const sectionFirst = () => (
    <View>
      <FlatList
        horizontal
        initialNumToRender={4}
        showsHorizontalScrollIndicator={false}
        data={topPairlistData && topPairlistData.data}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => {
          return (
            <View
              style={[
                styles(themeColorData).flatlistContainer,
                {backgroundColor: AppColors(themeColorData).backgroundLight},
              ]}>
              <TouchableOpacity
                onPress={() => {
                  pairId(item.pair);
                  dispatch({
                    type: DETAILS_COINS_DATA,
                    payload: item.pair.replace(/ /g, ''),
                  });
                  dispatch({type: COINS_PAGE_DATA, payload: 'MARKET'});
                }}>
                <TouchableOpacity
                  onPress={() => {
                    pairId(item.pair);
                    dispatch({
                      type: DETAILS_COINS_DATA,
                      payload: item.pair.replace(/ /g, ''),
                    });
                    dispatch({type: COINS_PAGE_DATA, payload: 'MARKET'});
                    accessToken ? navigation.navigate('BuyBtcScreen') : null;
                  }}>
                  <View
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      margin: 5,
                    }}>
                    <View>
                      <View>
                        <Image
                          style={{
                            height: 30,
                            width: 30,
                            marginTop: 20,
                            marginLeft: '20%',
                          }}
                          source={{
                            uri: item.logo,
                          }}
                        />
                      </View>
                      <Text
                        style={{
                          color: 'green',
                          left: getDimen(0.02),
                          top: getDimen(0.02),
                        }}>
                        {item.change >= 0 ? (
                          <Text
                            style={[
                              //  styles(themeColorData).headerSectionTitle1,
                              {color: item.change >= 0 ? '#2ce256' : null},
                              {
                                textAlign: 'left',
                                alignSelf: 'center',
                                right: moderateScale(17),
                              },
                            ]}>
                            +
                          </Text>
                        ) : null}

                        <Text
                          style={[
                            styles(themeColorData).headerSectionTitle1,
                            {
                              color: item.change >= 0 ? '#2ce256' : '#d0373d',
                            },
                            {textAlign: 'left', right: moderateScale(19)},
                          ]}>
                          {' '}
                          {parseFloat(item.change).toFixed(2)} %{' '}
                        </Text>

                        {/* {item.change} */}
                      </Text>
                    </View>

                    <View
                      style={{
                        flexDirection: 'column',
                        padding: 10,
                        height: getDimen(0.25),
                        justifyContent: 'space-evenly',
                        //right: moderateScale(10),
                      }}>
                      <Text
                        style={[
                          styles(themeColorData).textStyle,
                          {
                            color: AppColors(themeColorData).title,
                            // left: getDimen(0.05),
                          },
                        ]}>
                        {item.pair_name.toUpperCase()}
                        {/* Bitcoin */}
                      </Text>

                      <View style={{flexDirection: 'row'}}>
                        <Text
                          style={[
                            styles(themeColorData).subtextStyle,
                            {color: AppColors(themeColorData).title},
                          ]}>
                          ${item.lastprice}
                          {/* {'  '} {item.conversion.toFixed(2)} */}
                        </Text>
                        {/* <Text style={[styles(themeColorData).textStyle, {width: '20%'}]}></Text> */}
                      </View>

                      <Text
                        style={[
                          styles(themeColorData).paratextStyle,
                          {
                            width: '100%',
                            color: AppColors(themeColorData).title,
                          },
                        ]}>
                        24h Vol {item.volume.toFixed(1)}{' '}
                        {/* {item.secondcurrency.toUpperCase()} */}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>

    //  remove below empty view before uncommenting the above code

    // <View></View>
  );

  const sectionFinal = () => (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{
          backgroundColor: AppColors(themeColorData).backgroundLight,
          width: getDimen(0.95),
          borderRadius: 10,
        }}>
        <View style={styles(themeColorData).horizontalScrollView}>
          <TouchableOpacity
            onPress={() => SelectGainers()}
            style={[
              styles(themeColorData).horizontaScrollSectionWrapper,
              {
                backgroundColor:
                  isSelected == 'Gainers'
                    ? AppColors(themeColorData).lightPink
                    : null,
                padding: 2,
                borderRadius: isSelected == 'Gainers' ? 10 : null,
              },
            ]}>
            <Text
              style={[
                styles(themeColorData).headerSectionTitle,
                {
                  color:
                    isSelected == 'Gainers'
                      ? AppColors(themeColorData).title
                      : AppColors(themeColorData).title,
                  fontWeight: isSelected == 'Gainers' ? '700' : null,
                },
              ]}>
              Gainers{' '}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => SelectLosers()}
            style={[
              styles(themeColorData).horizontaScrollSectionWrapper,
              {
                // backgroundColor:
                //   isSelected == 'Losers' ? '#736C7F' : '#202020B5',
                backgroundColor:
                  isSelected == 'Losers'
                    ? AppColors(themeColorData).lightPink
                    : null,
                padding: 2,
                borderRadius: 10,
              },
            ]}>
            <Text
              style={[
                styles(themeColorData).headerSectionTitle,
                {
                  // color: isSelected == 'Losers' ? '#ffff' : '#E3E3E3B0',
                  color:
                    isSelected == 'Gainers'
                      ? AppColors(themeColorData).title
                      : AppColors(themeColorData).title,
                  fontWeight: isSelected == 'Losers' ? '700' : null,
                },
              ]}>
              Losers{' '}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelection('24h Vol')}
            style={[
              styles(themeColorData).horizontaScrollSectionWrapper,
              {
                // backgroundColor:
                //   isSelected == '24h Vol' ? '#736C7F' : '#202020B5',
                backgroundColor:
                  isSelected == '24h Vol'
                    ? AppColors(themeColorData).lightPink
                    : null,
                padding: 2,
                borderRadius: 10,
              },
            ]}>
            <Text
              style={[
                styles(themeColorData).headerSectionTitle,
                {
                  // color: isSelected == '24h Vol' ? '#ffff' : '#E3E3E3B0',
                  color:
                    isSelected == '24h Vol'
                      ? AppColors(themeColorData).title
                      : AppColors(themeColorData).title,
                  fontWeight: isSelected == '24h Vol' ? '700' : null,
                },
              ]}>
              24h Vol
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <MarketFooter
        searchBox={searchBox}
        filter={filter}
        isselected={isSelected}
      />
    </View>
  );

  return (
    <View style={{backgroundColor: AppColors(themeColorData).background}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          margin: moderateScale(15),
          marginTop: '10%',
        }}>
        <View>
          <Text
            style={[
              styles(themeColorData).welcome,
              {color: AppColors(themeColorData).lightBlue},
            ]}>
            {' '}
            Welcome,
          </Text>

          <Text
            style={[
              styles(themeColorData).username,
              {color: AppColors(themeColorData).title},
            ]}>
            {' '}
            {/* {mail?.slice(0, 15)} */}
            {newmail}
          </Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('EditPortfolio')}>
          <Image source={require('../../assets/user.png')} />
        </TouchableOpacity>
      </View>

      <SectionList
        sections={DATA}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => null}
        renderSectionHeader={renderSection}
        showsVerticalScrollIndicator={false}
        initialNumToRender={4}
      />
    </View>
  );
};

export default HomeScreen;

const styles = themeColorData =>
  StyleSheet.create({
    container: {
      backgroundColor: {},
    },
    flatlistContainer: {
      // backgroundColor: '#202020B5',
      marginBottom: '3%',
      //height: getDimen(0.38),
      width: getDimen(0.6),
      alignSelf: 'center',
      borderRadius: 15,
      elevation: 5,
      justifyContent: 'space-between',
      marginHorizontal: 5,
      marginTop: moderateScale(20),
      marginVertical: moderateScale(20),
    },
    textStyle: {
      // color: '#FFFFFF',
      fontSize: textSize.h2,
      //width: '50%',
      fontFamily: '',
      // left: getDimen(0.09),
      fontWeight: '700',
    },
    subtextStyle: {
      // color: '#FFFFFF',
      fontSize: textSize.h3,
      fontFamily: '',
      // left: getDime / n(0.03),
      // width: '50%',
    },
    paratextStyle: {
      // color: '#6B6B6B',
      fontSize: textSize.h5,
      fontFamily: '',
      // width: '50%',
      // left: getDimen(0.01),
    },
    listHeaderWrapper: {
      flexDirection: 'row',
      width: '100%',
      height: 38, // initaly was 35
      backgroundColor: '#FFFFFF',
      padding: 0,
    },
    // headerSectionView: {
    //   width: '32%',
    //   alignItems: 'center',
    //   justifyContent: 'center',
    //   paddingVertical: 0,
    //   flexDirection: 'row',
    //   backgroundColor: '#FFFFFF',
    // },
    headerSectionTitle: {
      color: '#8B8B8B',
      //fontSize: textSize.h5,
      fontSize: 15,
      textAlign: 'center',
      // width: moderateScale(50),
      fontFamily: '',
      fontWeight: '500',
      paddingHorizontal: 25,
      textAlign: 'center',
      borderRadius: 5,
    },
    // headerSectionTitle1: {
    //   color: '#202020B5',
    //   fontSize: textSize.h6,
    //   // numberOfLines: 1,
    //   textAlign: 'left',
    //   width: moderateScale(50),
    //   fontWeight: '900',
    // },
    horizontalScrollView: {
      width: '100%',
      // backgroundColor: 'red',
      height: getDimen(0.12),
      marginBottom: 0,
      flexDirection: 'row',
      // marginHorizontal: getDimen(0.04),
      //borderRadius: 10,

      // flex: 1,
      borderRadius: 10,
      justifyContent: 'space-between',
    },
    horizontaScrollSectionWrapper: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: getDimen(0.0),
      backgroundColor: '#202020B5',
      height: getDimen(0.12),
      width: getDimen(0.32),
      shadowColor: '#202020B5',
    },
    welcome: {
      // color: '#1E7BF6',
      fontSize: textSize.h3,
      fontWeight: '700',
      // fontFamily:""
      width: getDimen(0.36),
    },

    username: {
      // color: '#fff',
      fontSize: textSize.h1,
      fontWeight: 'bold',
      fontFamily: '',
    },
  });
