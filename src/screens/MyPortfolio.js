import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  Linking,
  Switch,
  FlatList,
  Modal,
  ScrollView,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icons from 'react-native-vector-icons/Ionicons';
import {InputArea} from '../components/inputArea';
// import Icons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AppButton from '../constants/AppButton';
import {AppColors} from '../constants/appColors';
import textSize from '../constants/textSize';
import showMessage from '../components/showMessage';
import {CheckBox} from 'react-native-elements';
import {AppStyles} from '../style/AppStyles';
import {Link, useTheme} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  ACCESS_TOKEN,
  GET_FAV,
  LOGIN,
  MARKET_HOME,
  SAVE_FAV,
  USER_LOGIN,
  DETAILS_COINS_DATA,
  ASSETS,
  DROPDOWN_CURRENCY,
  TOTALBALANCE,
  COINS_PAGE_DATA,
  DROPDOWN_CURRENCY_DATA,
  FETCH_TOTALBALANCE,
} from '../store/action';
import DeviceInfo from 'react-native-device-info';
import {moderateScale} from 'react-native-size-matters';
import {getDimen} from '../dimensions/dimen';
// import Icon from 'react-native-vector-icons/Fontisto';
// import {Row, ScrollView} from 'native-base';
import DropDownPicker from 'react-native-dropdown-picker';
import img1 from '../assets/bitcoin.png';
import Group438 from '../assets/Group438.png';
import ethereum from '../assets/ethereum.png';
import Group1439 from '../assets/Group1439.png';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {AuthContext} from '../components/context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import bitcoin from '../assets/bitcoin.png';
import {useIsFocused} from '@react-navigation/native';

const MyPortfolio = ({navigation}) => {
  const paperTheme = useTheme();
  const {toggleTheme} = useContext(AuthContext);
  const {colors} = useTheme();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [ischecked, setChecked] = useState(false);
  const [isSelected, setSelection] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const [isHide, setHide] = useState(true);
  const [showButton, setshowButton] = useState(false);
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    if (!isEnabled) {
      setHide(false);
    } else {
      setHide(true);
    }
  };
  const assetsData = useSelector(state => state.user.assets);
  const totalBalanceData = useSelector(state => state.user.totalBalance);
  const dropDownData = useSelector(state => state.user.dropdownData);

  // console.log('totalBalanceData : ', totalBalanceData.data.total);
  // console.log('dropDownData : ', dropDownData);
  const options = ['USD', 'INR'];
  // console.log('assetsData!!', assetsData);
  const [open01, setOpen01] = useState(false);
  const [value01, setValue01] = useState('USD');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'INR', value: 'INR'},
    {label: 'USD', value: 'USD'},
  ]);

  const [openOrderData, setOpenOrderData] = useState([]);
  const pairlistData = useSelector(state => state.order.marketHome);
  const accessToken = useSelector(state => state.login.accessToken);
  // const favList = useSelector(state => state.order.fav);
  // const saveFavCoin = useSelector(state => state.order.saveFav);
  const themeColorData = useSelector(state => state.login.themeValue);

  const [changeBtnStyle, setChangeBtnStyle] = useState(true);
  const [balanceHide, setbalanceHide] = useState(false);
  const [InrUsdValue, setInrUsdValue] = useState('');
  console.log('totalBalanceData : ', totalBalanceData);
  console.log('InrUsdValue : ', InrUsdValue);
  const [chooseData, setChooseData] = useState('USD');
  const [isSelectedCurrency, setisSelectedCurrency] = useState(0);
  console.log('choosedata ======>', isSelectedCurrency);

  useEffect(() => {
    console.log('totalBalanceData : ', totalBalanceData);

    //console.log('Value 01 changed', value01);
    dispatch({
      type: TOTALBALANCE,
      payload: {token: accessToken},
    });
  }, [chooseData]);

  useEffect(() => {
    if (dropDownData) {
      if (Object.keys(dropDownData).length > 0) {
        if (dropDownData.code === 200) {
          // showMessage(dropDownData.message);
          // dispatch({
          //   type: TOTALBALANCE,
          //   payload: {token: accessToken},
          // });
          dispatch({
            type: DROPDOWN_CURRENCY_DATA,
            payload: {},
          });
        } else if (dropDownData.code === 400) {
          showMessage(dropDownData.message);
          dispatch({
            type: DROPDOWN_CURRENCY_DATA,
            payload: {},
          });
        }
      }
    }
  }, [dropDownData]);

  useEffect(() => {
    if (totalBalanceData.code === 200) {
      // dispatch({
      //   type: FETCH_TOTALBALANCE,
      //   payload: {},
      // });
      setInrUsdValue(
        chooseData === 'INR'
          ? totalBalanceData &&
              totalBalanceData.data &&
              totalBalanceData.data.inr_value &&
              (
                parseFloat(totalBalanceData.data.total) *
                parseFloat(totalBalanceData.data.inr_value)
              ).toString()
          : totalBalanceData &&
              totalBalanceData.data &&
              totalBalanceData.data.usd_balance &&
              (
                parseFloat(totalBalanceData.data.total) *
                parseFloat(totalBalanceData.data.usd_balance)
              ).toString(),
      );
    } else {
    }
  }, [totalBalanceData, isFocused]);
  useEffect(() => {
    dispatch({
      type: ASSETS,
      payload: {token: accessToken},
    });
    // dispatch({
    //   type: DROPDOWN_CURRENCY,
    //   payload: {
    //     data: chooseData,
    //     token: accessToken,
    //   },
    // });
    dispatch({
      type: DROPDOWN_CURRENCY,
      payload: {
        data: chooseData,
        token: accessToken,
      },
    });
    // dispatch({
    //   type: MARKET_HOME,
    //   payload: {},
    // });
    // // dispatch({
    // //   type: GET_PAIRLIST,
    // //   payload: {},
    // // });
    // dispatch({
    //   type: GET_FAV,
    //   payload: {token: accessToken},
    // });
    // dispatch({
    //   type: SAVE_FAV,
    //   payload: {token: accessToken},
    // });
  }, []);
  useEffect(() => {
    if (pairlistData && pairlistData.data) {
      if (Object.keys(pairlistData).length > 0) {
        setOpenOrderData(pairlistData.data);
        //console.log('PAIR DATA =======>', pairlistData);
        // dispatch({
        //   type: MARKET_HOME,
        //   payload: {},
        // });
      }
    }
  }, [pairlistData]);

  //   useEffect(() => {
  //     if (searchBox?.length == 0) {
  //       setOpenOrderData(pairlistData?.data);
  //     } else {
  //       setOpenOrderData(filter);
  //     }
  //   }, [searchBox]);

  const leftValue = useState(new Animated.Value(10))[0];

  function moveBall() {
    Animated.timing(leftValue, {
      toValue: 29,
      duration: 100,
      useNativeDriver: false,
    }).start();
    setHide(true);
  }

  function Ball() {
    Animated.timing(leftValue, {
      toValue: 10,
      duration: 100,
      useNativeDriver: false,
    }).start();
    setHide(false);
  }

  const Item = ({title, amount, change, volumn}) => {
    const amt = amount.split('/');
    const subAmt = amt[0];
    let finalAmt = '';
    if (subAmt == '0') {
      finalAmt = amount;
    } else {
      finalAmt = parseFloat(amount).toFixed(2);
      //console.log('finalAmt', finalAmt);
    }
    return (
      <View style={styles.item}>
        {/* <Icons
        name="star-outline"
        size={15}
        color="#FFFFFF"
        style={{ width: '10%' }}
      /> */}

        {/* <TouchableOpacity
          style={{width: '10%'}}
          onPress={() => saveFavStar(title)}>
          {startSelect == title ? (
            <Image
              source={require('../assets/bitcoin.png')}
              style={{height: 25, width: 25}}
            />
          ) : (
            <Image
              source={require('../assets/bitcoin.png')}
              style={{height: 25, width: 25}}
            />
            // <Icons name="star-outline" size={15} color="#FFFFFF" />
          )}
        </TouchableOpacity> */}

        <View
          style={{
            width: '33%',
            right: getDimen(0.05),
            left: getDimen(0.01),
          }}>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={require('../assets/bitcoin.png')}
              style={{height: 25, width: 25, margin: 5}}
            />
            <View>
              <Text
                style={[
                  styles.title,
                  {color: AppColors(themeColorData).title},
                ]}>
                Bitcoin
              </Text>
              <Text
                style={[
                  styles.title,
                  {fontSize: textSize.h5, color: '#aaa', textAlign: 'left'},
                ]}>
                BTCs
              </Text>
            </View>
          </View>
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text
            style={[
              styles.title,
              {textAlign: 'center', color: AppColors(themeColorData).title},
            ]}>
            ${finalAmt}
          </Text>
        </View>
        {/* <Text style={styles.title}>{change}</Text> */}
        <View
          style={
            {
              //left: getDimen(0.06),
              // flexDirection: 'row',
            }
          }>
          {/* <Icon
            name="chevron-up"
            size={15}
            color="#08D870"
            style={{
              right: moderateScale(14),
              bottom: 0,
            }}
          /> */}
          {/* {change >= 0 ? (
            <Text
              style={[
                //  styles.headerSectionTitle1,
                {color: change >= 0 ? '#2ce256' : null},
                {
                  textAlign: 'left',
                  right: moderateScale(17),
                },
              ]}>
              +
            </Text>
          ) : null} */}

          <View>
            <Text
              style={[
                styles.title,
                {textAlign: 'center', color: AppColors(themeColorData).title},
              ]}>
              {/* {finalAmt} */}
              {change}
            </Text>
            <Text
              style={[
                styles.title,
                {fontSize: textSize.h5, color: '#aaa', textAlign: 'center'},
              ]}>
              QTC
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const [count, setcount] = useState(0);
  const [count1, setcount1] = useState(0);
  const [toggleButton, setToggleButton] = useState(0);
  console.log('count', count);

  const showToggleButton = () => {
    // setshowButton(true);
    if (count1 === 0) {
      setToggleButton(true);
      setcount1(1);
    } else {
      setToggleButton(false);
      setcount1(0);
    }
  };
  const showHideButton = () => {
    // setshowButton(true);
    if (count === 0) {
      setshowButton(true);
      setcount(1);
    } else {
      setshowButton(false);
      setcount(0);
    }
  };
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity onPress={() => showHideButton()}>
        <LinearGradient
          style={{
            width: '100%',
            borderRadius: 6,
            alignSelf: 'center',
            marginHorizontal: '5%',
            padding: textSize.componentsDifferenceLow,
            marginTop: '2%',
          }}
          colors={[
            AppColors(themeColorData).backgroundLight,
            AppColors(themeColorData).backgroundLight,
          ]}>
          <View style={{marginStart: 0}}>
            {/* <View style={{marginVertical: textSize.componentsDifferenceMediam}} /> */}

            <View style={{flexDirection: 'row', width: '100%'}}>
              <View
                style={{
                  flexDirection: 'column',
                  // justifyContent: 'space-between',
                  // backgroundColor: 'white',
                  padding: textSize.componentsDifferenceLow,
                  width: '50%',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <Image
                    source={bitcoin}
                    style={{width: getDimen(0.05), height: getDimen(0.05)}}
                  />
                  <Text
                    style={{
                      color: AppColors(themeColorData).title,
                      fontSize: textSize.h4,
                      fontWeight: 'bold',
                      width: getDimen(0.2),
                      left: getDimen(0.02),
                    }}>
                    Bitcoin
                  </Text>
                </View>

                <Text
                  style={[
                    styles.TextStyle,
                    {color: AppColors(themeColorData).title},
                  ]}>
                  Available
                </Text>
                <Text
                  style={[
                    styles.TextStyle,
                    {color: AppColors(themeColorData).title},
                  ]}>
                  On hold
                </Text>
                <Text
                  style={[
                    styles.TextStyle,
                    {color: AppColors(themeColorData).title},
                  ]}>
                  USD Valuation
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  // justifyContent: 'center',
                  alignItems: 'flex-end',
                  padding: textSize.componentsDifferenceLow,
                  width: '50%',
                }}>
                {/* <Text
                  style={{
                    color: AppColors(themeColorData).title,
                    fontSize: textSize.h6,
                  }}>
                  {item.currency.toUpperCase()}
                </Text> */}
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <Text
                    style={{
                      color: AppColors(themeColorData).title,
                      fontSize: textSize.h5,
                      fontWeight: '800',
                    }}>
                    {item.btc_value}
                    {'  '}
                  </Text>
                  <Text
                    style={{
                      color: AppColors(themeColorData).inputDark,
                      fontSize: textSize.h6,
                      fontFamily: '',
                      top: 2,
                      // backgroundColor: 'green',
                      // width: getDimen(0.06),
                    }}>
                    {/* {item.currency.toUpperCase()} */}
                    {/* USD */}
                    BTC
                  </Text>
                </View>
                <Text style={[styles.TextStyleRight]}>
                  {/* {!isHide ? '******' : item.amount} */}
                  {item.amount}
                </Text>
                <Text style={[styles.TextStyleRight]}>
                  {item.hold.toFixed(2)}
                  {/* {!isHide ? '******' : item.hold.toFixed(2)} */}
                </Text>
                <Text style={[styles.TextStyleRight]}>
                  {item.btc_value.toFixed(3)}
                  {/* {!isHide ? '******' : item.btc_value.toFixed(3)} */}
                </Text>
              </View>
            </View>

            {/* <Text
              style={[
                styles.TextStyle,
                {
                  marginTop: getDimen(0.0),
                  left: getDimen(0.03),
                  color: AppColors(themeColorData).title,
                },
              ]}>
              Operation
            </Text> */}

            {/* <View style={styles.footerBtnParentView}>
              <TouchableOpacity
                style={[
                  styles.footerBtn,
                  {
                    backgroundColor:
                      isSelected == 'Fiat' ? '#3389E2' : '#3389E2',
                  },
                ]}
                onPress={() =>
                  navigation.navigate('DepositAmount', {
                    currency: item.currency,
                    fee: item.fee,
                  })
                }>
                <Text
                  style={[
                    styles.btnTitle,
                    {color: isSelected == 'Fiat' ? '#FFF' : '#FFF'},
                  ]}>
                  Deposite
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.footerBtn,
                  {
                    backgroundColor:
                      isSelected == 'Crypto' ? '#3389E2' : '#3389E2',
                  },
                ]}
                onPress={() =>
                  navigation.navigate('Withrawal', {
                    amount: item.amount,
                    currency: item.currency,
                  })
                }>
                <Text
                  style={[
                    styles.btnTitle,
                    {color: isSelected == 'Crypto' ? '#FFF' : '#FFF'},
                  ]}>
                  Withdraw
                </Text>
              </TouchableOpacity>
            </View> */}
          </View>
        </LinearGradient>
        {showButton ? (
          <View style={styles.footerBtnParentView}>
            <TouchableOpacity
              style={[
                styles.footerBtn,
                {
                  backgroundColor:
                    isSelected == 'Crypto'
                      ? AppColors(themeColorData).backgroundLight
                      : AppColors(themeColorData).backgroundLight,
                },
              ]}
              onPress={() =>
                navigation.navigate('CryptoDeposit', {
                  currency: item.currency,
                  fee: item.fee,
                })
              }>
              <Text
                style={[
                  styles.btnTitle,
                  {
                    color:
                      isSelected == 'Fiat'
                        ? AppColors(themeColorData).title
                        : AppColors(themeColorData).title,
                    // width: getDimen(0.23),
                    fontWeight: '700',
                    fontFamily: '',
                  },
                ]}>
                Deposite
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.footerBtn,
                {
                  backgroundColor:
                    isSelected == 'Crypto'
                      ? AppColors(themeColorData).backgroundLight
                      : AppColors(themeColorData).backgroundLight,
                },
              ]}
              onPress={() =>
                navigation.navigate('Withrawal', {
                  amount: item.amount,
                  currency: item.currency,
                })
              }>
              <Text
                style={[
                  styles.btnTitle,
                  {
                    color:
                      isSelected == 'Crypto'
                        ? AppColors(themeColorData).title
                        : AppColors(themeColorData).title,
                    // width: getDimen(0.25),
                    fontWeight: '700',
                    fontFamily: '',
                  },
                ]}>
                Withdrawal
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </TouchableOpacity>
      // <TouchableOpacity onPress={() => pairId(item.pair)}>
      // <TouchableOpacity
      //   style={{
      //     backgroundColor: AppColors(themeColorData).backgroundLight,
      //     marginVertical: 3,
      //     borderRadius: 10,
      //     width: '100%',
      //     paddingVertical: 5,
      //   }}
      //   onPress={() => {
      //     //  console.log('pairIdExchange', item.pair);
      //     //  console.log('withTrim ', item.pair.replace(/ /g, ""));
      //     dispatch({
      //       type: DETAILS_COINS_DATA,
      //       payload: item.pair.replace(/ /g, ''),
      //     });
      //     dispatch({type: COINS_PAGE_DATA, payload: 'MARKET'});
      //     navigation.navigate('BuyBtcScreen');
      //   }}>
      //   <Item
      //     title={item.pair.toUpperCase()}
      //     amount={parseFloat(item.lastprice).toFixed(8)}
      //     change={parseFloat(item.change).toFixed(2)}
      //     volumn={item.volume}
      //     // rate={ischecked ? {item.change}: {item.volumn}}
      //   />
      // </TouchableOpacity>
    );
  };
  const HeaderData = [
    {
      id: '1',
      title: 'Bitcoin.',
    },
    {
      id: '2',
      title: 'Etherium',
    },
    {
      id: '3',
      title: 'Binance',
    },
    {
      id: '4',
      title: 'Solana',
    },
    {
      id: '5',
      title: 'Doge',
    },
    {
      id: '6',
      title: 'Trx',
    },
  ];

  const [isModalVisible, setisModalVisible] = useState(false);

  const setData = option => {
    setChooseData(option);
  };

  const changeModalVisibility = bool => {
    setisModalVisible(bool);
  };

  const CustomModal = props => {
    const onPressItem = (option, index) => {
      console.log('last seen optionn================>', option, index);
      props.changeModalVisibility(false);
      props.setData(option);
      setisSelectedCurrency(index);
      dispatch({
        type: DROPDOWN_CURRENCY,
        payload: {
          data: chooseData,
          token: accessToken,
        },
      });
      // if (chooseData === 'INR') {
      //   dispatch({
      //     type: DROPDOWN_CURRENCY,
      //     payload: {
      //       data: 'INR',
      //       token: accessToken,
      //     },
      //   });
      //   dispatch({
      //     type: TOTALBALANCE,
      //     payload: {token: accessToken},
      //   });
      // } else if (chooseData === 'USD') {
      //   dispatch({
      //     type: DROPDOWN_CURRENCY,
      //     payload: {
      //       data: 'USD',
      //       token: accessToken,
      //     },
      //   });
      //   dispatch({
      //     type: TOTALBALANCE,
      //     payload: {token: accessToken},
      //   });
      // }
    };

    const option = options.map((item, index) => {
      console.log('index oof item mmmmm', index);
      return (
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            // backgroundColor: 'blue',
            borderRadius: 5,
            top: getDimen(0.013),
            height: getDimen(0.055),
            // width: getDimen(0.2),

            // height: '100%',
          }}
          key={index}
          onPress={() => {
            onPressItem(item, index);
          }}>
          <Text
            style={{
              fontWeight: '700',
              color: isSelectedCurrency === index ? 'black' : 'gray',
              fontSize: textSize.h5,
              width: getDimen(0.08),
              // backgroundColor: 'gray',
              letterSpacing: 0.5,
              alignSelf: 'center',
            }}>
            {item}
          </Text>
        </TouchableOpacity>
      );
    });

    return (
      <TouchableOpacity
        onPress={() => props.changeModalVisibility(false)}
        style={{
          // flex: 1,
          alignSelf: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
          width: getDimen(0.15),
          height: getDimen(0.17),
          // position: 'absolute',
          marginLeft: getDimen(0.6),
          top: getDimen(0.22),
          borderRadius: 7,
          alignItems: 'center',
        }}>
        <ScrollView>{option}</ScrollView>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{flex: 1, backgroundColor: AppColors(themeColorData).background}}>
      <ImageBackground style={styles.imageBackgroundStyle}>
        <View style={styles.headerContainer}>
          <View
            style={{
              padding: getDimen(0.06),
              position: 'absolute',
              // justifyContent: 'space-be/tween',
              // backgroundColor: 'gray',
            }}>
            <Text
              style={[
                styles.myWalletText,
                {color: AppColors(themeColorData).title},
              ]}>
              My Wallet
            </Text>
            <View style={{top: getDimen(0.03)}}>
              <Text
                style={{
                  color: AppColors(themeColorData).title,
                  fontSize: textSize.h3,
                  paddingTop: getDimen(0.0),
                }}>
                Balance
              </Text>
              <Text
                style={{
                  fontSize: textSize.h3,
                  color: AppColors(themeColorData).title,
                  paddingTop: getDimen(0.01),
                  fontWeight: 'bold',
                  // backgroundColor: 'green',
                  width: getDimen(0.8),
                }}>
                {!balanceHide
                  ? '*********'
                  : totalBalanceData && totalBalanceData?.data?.total}
                {!balanceHide ? '*****' : ' BTC'}
                {/* {totalBalanceData && totalBalanceData?.data?.total} BTC */}
              </Text>
              <Text
                style={{
                  fontSize: textSize.h5,
                  color: AppColors(themeColorData).title,
                  paddingTop: getDimen(0.01),
                  // backgroundColor: 'green',
                  // width: getDimen(0.4),
                }}>
                {!balanceHide ? '*********' : InrUsdValue + ' ' + chooseData}
                {/* {InrUsdValue + ' ' + chooseData} */}
              </Text>
            </View>

            {!balanceHide ? (
              <Icon
                name="eye-off"
                size={18}
                color={AppColors(themeColorData).title}
                style={{left: moderateScale(90), bottom: moderateScale(53)}}
                onPress={() => setbalanceHide(!balanceHide)}
              />
            ) : (
              <Icon
                name="eye"
                size={18}
                color={AppColors(themeColorData).title}
                style={{bottom: moderateScale(53), left: moderateScale(90)}}
                onPress={() => setbalanceHide(!balanceHide)}
              />
            )}
          </View>

          <View>
            {themeColorData === false ? (
              <View
                style={{
                  bottom: getDimen(0.05),
                  // right: 10,
                  left: getDimen(0.6),
                  // position: 'absolute',
                }}>
                <ImageBackground
                  style={{
                    width: getDimen(0.37),
                    height: getDimen(0.37),
                    // bottom: getDimen(0.07),
                    // marginLeft: getDimen(0.05),
                  }}
                  source={require('../assets/dot.png')}>
                  <View
                    style={{
                      width: getDimen(0.14),
                      // height: getDimen(0.18),
                      borderColor: 'white',
                      borderRadius: 20,
                      left: getDimen(0.08),
                      // position: 'absolute',
                      top: getDimen(0.17),
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        setisModalVisible(true);
                        // setvisibility('lastseen');
                      }}
                      style={{
                        flexDirection: 'row',
                        backgroundColor: 'white',
                        borderRadius: 20,
                        justifyContent: 'space-around',
                        width: '100%',
                        alignItems: 'center',
                        height: getDimen(0.055),
                      }}>
                      <Text
                        style={{
                          width: '50%',
                          fontWeight: 'bold',
                          color: 'black',
                          fontSize: textSize.h5,
                        }}>
                        {chooseData}
                      </Text>
                      <Ionicons
                        name="caret-down-outline"
                        size={15}
                        style={{}}
                        color={'black'}
                      />
                    </TouchableOpacity>
                  </View>
                </ImageBackground>

                {/* MODAL START */}
                {/* <View
                  style={{
                    width: getDimen(0.16),
                    // height: getDimen(0.18),
                    borderColor: 'white',
                    borderRadius: 20,
                    // marginLeft: getDimen(0.15),
                    // position: 'absolute',
                    // top: getDimen(0.15),
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      setisModalVisible(true);
                      // setvisibility('lastseen');
                    }}
                    style={{
                      flexDirection: 'row',
                      backgroundColor: 'white',
                      borderRadius: 20,
                      justifyContent: 'space-around',
                      width: '100%',
                      alignItems: 'center',
                      height: getDimen(0.055),
                    }}>
                    <Text
                      style={{
                        width: '50%',
                        fontWeight: 'bold',
                        color: 'black',
                        fontSize: textSize.h5,
                      }}>
                      {chooseData}
                    </Text>
                    <Ionicons
                      name="caret-down-outline"
                      size={15}
                      style={{}}
                      color={'black'}
                    />
                  </TouchableOpacity>
                </View> */}
                {/* MODAL END */}

                {/* <View
                  style={{
                    width: getDimen(0.18),
                    // borderColor: 'white',
                    position: 'absolute',
                    top: getDimen(0.14),
                  }}>
                  <DropDownPicker
                    style={{
                      height: getDimen(0.065),
                      borderColor: '#75D6F9',
                      elevation: 2,
                      borderRadius: 20,
                      marginLeft: getDimen(0.14),
                      backgroundColor: '#75D6F9',
                    }}
                    ArrowDownIconComponent={() => {
                      return <AntDesign name="caretdown" size={11} />;
                    }}
                    ArrowUpIconComponent={() => {
                      return <AntDesign name="caretup" size={11} />;
                    }}
                    TickIconComponent={() => {
                      return <Entypo name="check" size={11} />;
                    }}
                    zIndex={1000}
                    zIndexInverse={1000}
                    open={open01}
                    placeholder="USD"
                    value={value01}
                    textStyle={{fontSize: 11, fontWeight: '900'}}
                    items={items}
                    setOpen={setOpen01}
                    setValue={setValue01}
                    setItems={setItems}
                    dropDownContainerStyle={{
                      marginLeft: getDimen(0.14),
                      borderColor: '#75D6F9',
                      backgroundColor: '#75D6F9',
                      height: getDimen(0.18),
                    }}
                  />
                </View> */}
              </View>
            ) : (
              <View
                style={{
                  bottom: getDimen(0.05),
                  // right: 10,
                  left: getDimen(0.6),
                  // position: 'absolute',
                }}>
                <ImageBackground
                  style={{
                    width: getDimen(0.37),
                    height: getDimen(0.37),
                    // bottom: getDimen(0.07),
                    // marginLeft: getDimen(0.05),
                  }}
                  source={require('../assets/dot.png')}>
                  <View
                    style={{
                      width: getDimen(0.14),
                      // height: getDimen(0.18),
                      borderColor: 'white',
                      borderRadius: 20,
                      left: getDimen(0.08),
                      // position: 'absolute',
                      top: getDimen(0.17),
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        setisModalVisible(true);
                        // setvisibility('lastseen');
                      }}
                      style={{
                        flexDirection: 'row',
                        backgroundColor: 'white',
                        borderRadius: 20,
                        justifyContent: 'space-around',
                        width: '100%',
                        alignItems: 'center',
                        height: getDimen(0.055),
                      }}>
                      <Text
                        style={{
                          width: '50%',
                          fontWeight: 'bold',
                          color: 'black',
                          fontSize: textSize.h5,
                        }}>
                        {chooseData}
                      </Text>
                      <Ionicons
                        name="caret-down-outline"
                        size={15}
                        style={{}}
                        color={'black'}
                      />
                    </TouchableOpacity>
                  </View>
                </ImageBackground>

                {/* MODAL START */}

                {/* MODAL END */}
                {/* <View
                  style={{
                    width: getDimen(0.18),
                    // borderColor: 'white',
                    position: 'absolute',
                    top: getDimen(0.14),
                  }}>
                  <DropDownPicker
                    style={{
                      height: getDimen(0.065),
                      borderColor: AppColors(themeColorData).white,
                      elevation: 2,
                      borderRadius: 20,
                      marginLeft: getDimen(0.14),
                    }}
                    ArrowDownIconComponent={() => {
                      return <AntDesign name="caretdown" size={11} />;
                    }}
                    ArrowUpIconComponent={() => {
                      return <AntDesign name="caretup" size={11} />;
                    }}
                    TickIconComponent={() => {
                      return <Entypo name="check" size={11} />;
                    }}
                    zIndex={1000}
                    zIndexInverse={1000}
                    open={open01}
                    placeholder="USD"
                    value={value01}
                    textStyle={{
                      fontSize: 11,
                      fontWeight: '900',
                    }}
                    items={items}
                    customItemContainerStyle={{
                      backgroundColor: 'red',
                      height: getDimen(0.1),
                    }}
                    customItemLabelStyle={{
                      color: 'blue',
                      fontSize: 25,
                    }}
                    // labelStyle={{color: 'blue'}}
                    setOpen={setOpen01}
                    setValue={setValue01}
                    setItems={setItems}
                    dropDownContainerStyle={{
                      marginLeft: getDimen(0.14),
                      borderColor: AppColors(themeColorData).white,
                      height: getDimen(0.2),
                      // top: 50,

                      borderRadius: 10,
                      borderTopEndRadius: 10,
                      borderTopStartRadius: 10,
                    }}
                  />
                </View> */}
              </View>
            )}
            {/* <Image
              style={{
                width: getDimen(0.4),
                height: getDimen(0.4),
                bottom: getDimen(0.05),
                marginLeft: getDimen(0.03),
              }}
              source={require('../assets/dot.png')}
            />  */}

            {/* <View
              style={{
                width: getDimen(0.18),
                // borderColor: 'white',
                position: 'absolute',
                top: getDimen(0.19),
              }}>
              <DropDownPicker
                style={{
                  height: getDimen(0.065),
                  borderColor: AppColors(themeColorData).white,
                  elevation: 2,
                  borderRadius: 20,
                  marginLeft: getDimen(0.14),
                }}
                ArrowDownIconComponent={() => {
                  return <AntDesign name="caretdown" size={11} />;
                }}
                ArrowUpIconComponent={() => {
                  return <AntDesign name="caretup" size={11} />;
                }}
                TickIconComponent={() => {
                  return <Entypo name="check" size={11} />;
                }}
                zIndex={1000}
                zIndexInverse={1000}
                open={open01}
                placeholder="USD"
                value={value01}
                textStyle={{fontSize: 11, fontWeight: '900'}}
                items={items}
                setOpen={setOpen01}
                setValue={setValue01}
                setItems={setItems}
                dropDownContainerStyle={{
                  marginLeft: getDimen(0.14),
                  borderColor: AppColors(themeColorData).white,
                }}
              />
            </View> */}
          </View>
        </View>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            bottom: getDimen(0.0),
            // marginVertical: '5%',
            marginTop: '5%',
          }}>
          <Text
            style={{
              color: AppColors(themeColorData).title,
              fontSize: textSize.h4,
              marginLeft: 10,
              fontWeight: '700',
              width: '50%',
            }}>
            My Portfolio
          </Text>

          <View
            style={{
              flexDirection: 'row',
              backgroundColor: '#1EBCF6',
              width: getDimen(0.13),
              height: getDimen(0.06),
              borderRadius: 18,
              alignItems: 'center',
              marginRight: 15,
              justifyContent: 'space-around',
              //justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              onPress={() => {
                // setHide(true);
                Ball();
              }}
              style={{
                width: getDimen(0.09),
                // backgroundColor: 'green',
                height: getDimen(0.09),
              }}
              // style={{ position: "absolute" }}
            ></TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                // setHide(false);
                moveBall();
              }}
              style={{
                width: getDimen(0.09),
                // backgroundColor: 'green',
                height: getDimen(0.09),
              }}></TouchableOpacity>

            <Animated.View
              style={
                changeBtnStyle
                  ? {
                      width: getDimen(0.045),
                      height: getDimen(0.045),
                      flexDirection: 'row',
                      backgroundColor: 'white',
                      borderRadius: 30,
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'absolute',
                      zIndex: -9,
                      marginLeft: leftValue,
                    }
                  : null
              }></Animated.View>
          </View>

          {/* <Switch
            trackColor={{false: '#1EBCF6', true: '#81b0ff'}}
            thumbColor={isEnabled ? '#fff' : '#fff'}
            ios_backgroundColor="#1EBCF6"
            onValueChange={toggleSwitch}
            value={isEnabled}
            // style={{transform: [{scaleX: 1.3}, {scaleY: 1.3}]}}
          /> */}
        </View>
        {/* <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
            flexDirection: 'row',
            // top: '10%',
          }}>
          <View style={{width: '50%', paddingLeft: 10, bottom: 5, margin: 5}}>
            <Text style={{color: 'blue', fontSize: 22}}>Hello</Text>
            <Text style={{color: '#FFF', fontSize: 22}}>Emma Phillipa</Text>
          </View>
         <TouchableOpacity
            onPress={() => navigation.navigate('EditPortfolio')}>
            <Image
              style={{height: 46, width: 46, left: '15%', top: 5}}
              source={require('../assets/myprofile.png')}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            backgroundColor: '#1EBCF6',
            height: '30%',
            width: '100%',
            left: '1%',
            borderRadius: 20,
            // marginBottom: 120,
          }}>
          <Image
            style={{height: '60%', width: '70%', left: '50%', top: 5}}
            source={require('../assets/dot.png')}
          />
          <Text
            style={{
              top: -100,
              marginLeft: 30,
              fontSize: 16,
              color: AppColors(themeColorData).title,
            }}>
            My Wallet
          </Text>
          <Text
            style={{
              top: -100,
              marginLeft: 30,
              fontSize: 24,
              color: AppColors(themeColorData).title,
            }}>
            Balance
          </Text>
          <Text
            style={{
              top: -100,
              marginLeft: 30,
              fontSize: 30,
              color: AppColors(themeColorData).title,
            }}>
            $1,228
          </Text>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              top: -60,
              marginLeft: 40,
              marginRight: 20,
            }}>
             <View
              style={{
                borderWidth: 1,
                // backgroundColor: '#FFFFFF',
                backgroundColor: AppColors(themeColorData).skyColor,
                width: '25%',
                borderRadius: 20,
                height: 30,
                padding: 4,
                borderColor: '#fff',
              }}>
              <Text
                style={{
                  // color: '#000000',
                  color: AppColors(themeColorData).bottomTabColor,
                  width: '100%',
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}>
                Profit
              </Text>
            </View> 
         <View
              style={{
                borderWidth: 1,
                backgroundColor: AppColors(themeColorData).skyColor,
                width: '25%',
                borderRadius: 20,
                height: 30,
                padding: 4,
                borderColor: '#fff',
              }}>
              <Text
                style={{
                  color: AppColors(themeColorData).bottomTabColor,
                  width: '100%',
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}>
                Loss
              </Text>
            </View> *
             <View
              style={{
                width: 85,
              }}>
              <DropDownPicker
                open={open}
                value={value}
                items={items}
                placeholderStyle={{
                  color: AppColors(themeColorData).bottomTabColor,
                  fontWeight: 'bold',
                }}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                placeholder={'24H'}
                style={{
                  height: 30,
                  backgroundColor: AppColors(themeColorData).skyColor,
                  borderRadius: 20,
                  color: 'black',
                  fontWeight: 'bold',
                  borderColor: '#fff',
                }}
              />
            </View> 
          </View>
        </View>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            // top: -90,
            marginVertical: '5%',
          }}>
          <Text
            style={{
              color: AppColors(themeColorData).title,
              fontSize: 17,
              marginLeft: 10,
              width: '50%',
            }}>
            My Portfolio
          </Text>
        <Image
                            style={{ height: 26, width: 26, top: 5 }}
                            source={require('../assets/myprofile.png')}
                        /> 
          <Switch
            trackColor={{false: '#1EBCF6', true: '#81b0ff'}}
            thumbColor={isEnabled ? '#fff' : '#fff'}
            ios_backgroundColor="#1EBCF6"
            onValueChange={toggleSwitch}
            value={isEnabled}
            // style={{transform: [{scaleX: 1.3}, {scaleY: 1.3}]}}
          />
        </View>

      <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            top: -60,
          }}>
          <View
            style={{
              borderWidth: 1,
              backgroundColor: '#303030',
              width: '45%',
              height: '100%',
              borderRadius: 10,
              marginLeft: 10,
            }}>
            <Image
              style={{height: 24, width: 24, bottom: -10, left: 20}}
              source={require('../assets/upload.png')}
            />
            <Text style={{right: -55, top: -14, color: '#fff'}}>Deposit</Text>
          </View>

          <View
            style={{
              borderWidth: 1,
              backgroundColor: '#303030',
              width: '45%',
              height: '100%',
              borderRadius: 10,
            }}>
            <Image
              style={{height: 24, width: 24, bottom: -10, left: 20}}
              source={require('../assets/withdrawal.png')}
            />
            <Text style={{right: -55, top: -14, color: '#fff'}}>
              Withdrawal
            </Text>
          </View>
        </View>  */}

        <View
          style={
            {
              // flex: 1,
            }
          }>
          <FlatList
            data={assetsData && assetsData.data && assetsData.data}
            extraData={assetsData && assetsData.data && assetsData.data}
            renderItem={item => renderItem(item)}
            keyExtractor={item => item.id}
          />
          {/* <FlatList
            data={openOrderData}
            extraData={openOrderData}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            // ListHeaderComponent={ListHeaderComponent}
            initialNumToRender={7}
            maxToRenderPerBatch={10}
          /> 
       <FlatList
            data={HeaderData}
            key={HeaderData.id}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 20,
                    top: 20,
                    marginHorizontal: 10,
                    backgroundColor: '#202020B5',
                    height: 50,
                    borderRadius: 10,
                  }}>
                  <Image
                    source={require('../assets/bitcoin.png')}
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: 50,
                      left: 10,
                      marginLeft: 10,
                      marginTop: 13,
                    }}
                  />

                  <View
                    style={{
                      flexDirection: 'column',
                      marginLeft: 70,
                      position: 'absolute',
                      width: '82%',
                      // borderWidth:1,
                    }}>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 14,
                        fontWeight: '700',
                        padding: 13,
                      }}>
                      {item.title}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />  */}
        </View>
        <Modal
          style={{
            borderRadius: 20,
          }}
          transparent={true}
          animationType={'fade'}
          visible={isModalVisible}
          nRequestClose={() => changeModalVisibility(false)}>
          <CustomModal
            // visibility={visibility}
            changeModalVisibility={changeModalVisibility}
            setData={setData}
            // setData1={setData1}
            // setData2={setData2}
            chooseData={chooseData}
          />
        </Modal>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  imageBackgroundStyle: {
    // flex: 0.8,
    padding: textSize.componentsDifferenceMediam,
    // justifyContent: 'space-between',
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
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  boxWrapperView: {
    backgroundColor: '#3F535D',
    padding: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 0,
    marginVertical: 15,
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  title: {
    fontSize: textSize.h2,
    // color: '#FFFFFF',
    // width: '30%',
    textAlign: 'center',
    top: 2,
    fontWeight: '700',
    fontFamily: '',
    //numberOfLines: 10,
  },
  listHeaderWrapper: {
    flexDirection: 'row',
    width: '100%',
    height: 38, // initaly was 35
    backgroundColor: 'black',
    padding: 0,
    marginTop: 10,
  },
  headerSectionView: {
    width: '32%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 0,
    flexDirection: 'row',
  },
  headerSectionTitle: {
    color: '#fff',
    fontSize: textSize.h5,
    // numberOfLines: 1,
    textAlign: 'center',
    width: moderateScale(50),
  },
  headerSectionTitle1: {
    color: '#fff',
    fontSize: textSize.h3,
    // numberOfLines: 1,
    textAlign: 'left',
    // width: moderateScale(55),
    fontWeight: '900',
    fontFamily: '',
  },
  horizontalScrollView: {
    width: '100%',
    backgroundColor: '#fff',
    height: 40,
    marginBottom: 2,
  },
  horizontaScrollSectionWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  OptionTitle: {
    color: '#fff',
  },
  TextStyle: {
    color: '#27B808',
    fontSize: textSize.h5,
    fontWeight: '800',
    marginTop: getDimen(0.02),
  },
  TextStyleRight: {
    color: '#27B808',
    fontSize: textSize.h5,
    fontWeight: '800',
    marginTop: getDimen(0.02),
    width: getDimen(1),
    textAlign: 'right',
  },
  footerBtnParentView: {
    // alignItems: 'center',
    flexDirection: 'row',
    // backgroundColor: 'green',
    justifyContent: 'space-between',
    // padding: getDimen(0.01),
    // borderRadius: 20,
    // marginBottom: 20,
    // marginLeft: getDimen(0.05),
    // marginRight: getDimen(0.05),
    marginTop: getDimen(0.01),
  },
  subtitle: {
    fontSize: textSize.h2,
    color: '#dddd',
    // width: '30%',
    textAlign: 'center',
    top: 2,
    fontWeight: '700',
    fontFamily: '',
  },
  footerBtn: {
    height: getDimen(0.1),
    width: '48%',
    borderRadius: 8,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    width: getDimen(0.9),
    backgroundColor: '#1EBCF6',
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'flex-start',
    // alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    padding: getDimen(0.0),
  },
  balanceText: {
    fontSize: textSize.h3,
  },
  myWalletText: {
    fontSize: textSize.h5,
  },
  btnTitle: {
    // width: getDimen(0.2),
    alignSelf: 'center',
    // fontWeight: '500',
  },
});

export default MyPortfolio;

{
  /* <View
style={{
  width: getDimen(0.18),
  // borderColor: 'white',
  // position: 'absolute',
  // top: getDimen(0.19),
  marginRight: getDimen(0.05),
  top: getDimen(0.15),
}}>
<DropDownPicker
  style={{
    height: getDimen(0.065),
    borderColor: AppColors(themeColorData).white,
    elevation: 2,
    borderRadius: 20,
    // marginRight: getDimen(0.5),
  }}
  ArrowDownIconComponent={() => {
    return <AntDesign name="caretdown" size={11} />;
  }}
  ArrowUpIconComponent={() => {
    return <AntDesign name="caretup" size={11} />;
  }}
  TickIconComponent={() => {
    return <Entypo name="check" size={11} />;
  }}
  zIndex={1000}
  zIndexInverse={1000}
  open={open01}
  placeholder="USD"
  value={value01}
  textStyle={{fontSize: 11, fontWeight: '900'}}
  items={items}
  setOpen={setOpen01}
  setValue={setValue01}
  setItems={setItems}
  dropDownContainerStyle={{
    marginLeft: getDimen(0.012),
    borderColor: AppColors(themeColorData).white,
  }}
/>
</View> */
}
