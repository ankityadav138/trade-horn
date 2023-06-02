import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  BackHandler,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {
  GET_PAIRLIST,
  PAIR,
  GET_FAV,
  PAIR_DETAIL_API,
  DETAILS_COINS,
  DETAILS_COINS_DATA,
  SAVE_FAV,
  COINS_PAGE_DATA,
} from '../store/action';
import {useNavigation, useRoute} from '@react-navigation/native';
import textSize from '../constants/textSize';
import {getDimen} from '../dimensions/dimen';
import {moderateScale} from 'react-native-size-matters';
import {AppColors} from '../constants/appColors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useIsFocused} from '@react-navigation/native';

const MarketFooterTable = ({searchBox, filter}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();
  const isFocused = useIsFocused();

  const [openOrderData, setOpenOrderData] = useState([]);
  const [first, setfirst] = useState(openOrderData);
  const [data, setData] = useState(openOrderData);
  const [ischecked, setChecked] = useState('Change');
  const [isSelected, setSelection] = useState('USDT');
  const [startSelect, setStartSelect] = useState('');
  const [selectedItems, setselectedItems] = useState();
  const [isSelectedd, setSelectiond] = useState(false);

  const accessToken = useSelector(state => state.login.accessToken);
  const pairlistData = useSelector(state => state.order.pairlistData);
  const themeColorData = useSelector(state => state.login.themeValue);
  const favList = useSelector(state => state.order.fav);
  const saveFav = useSelector(state => state.order.saveFav);

  const pairdetailData = useSelector(state => state.order.pairdetailData);
  // console.log(
  //   'openOrderData ========================================>+++++++++++++++++++++++++++',
  //   favList?.data,
  // );

  // console.log(
  //   'isSelectedisSelectedisSelected ========================================>+++++++++++++++++++++++++++',
  //   saveFav,
  // );

  // console.log('token', accessToken);
  // useEffect(() => {
  //   setData(pairlistData?.data);
  // }, [pairlistData]);

  // console.log(
  //   'openOrderData ========================================>datadatadatadatadatadatadatadatadata',
  //   data,
  // );

  useEffect(() => {
    dispatch({
      type: GET_PAIRLIST,
      payload: {token: accessToken},
    });
    dispatch({
      type: GET_FAV,
      payload: {token: accessToken},
    });
    if (route.name === 'HomeTabs') {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );
      return () => backHandler.remove();
    }
    // getFavStarList();
  }, [isFocused, saveFav]);

  useEffect(() => {
    if (searchBox?.length == 0) {
      setOpenOrderData(pairlistData?.data);
    } else {
      setOpenOrderData(filter);
    }
  }, [searchBox]);

  useEffect(() => {
    TokenFilter(isSelected.toLowerCase());
  }, [isSelected]);

  const pairId = data => {
    dispatch({
      type: PAIR,
      payload: data,
    });
    // const replacenew = data.replace('/', '_');
  };

  const backAction = () => {
    if (navigation.isFocused()) {
      BackHandler.exitApp();
    } else {
      navigation.goBack();
    }
    return true;
  };

  const TokenFilter = type => {
    if (pairlistData && pairlistData.data) {
      console.log('type', type);
      const filterList = pairlistData.data.filter(
        item => item.secondcurrency == type,
      );
      setOpenOrderData(filterList);
      setData(filterList);
    }
  };

  // useEffect(() => {
  //   if (Object.keys(pairlistData).length > 0) {
  //     setOpenOrderData(pairlistData.data);
  //     //console.log('PAIR DATA =======>', pairlistData);
  //   }
  // }, [pairlistData]);

  const SortPrice = () => {
    const sortData = pairlistData?.data?.sort(function (a, b) {
      return a.lastprice - b.lastprice;
    });
    setOpenOrderData(sortData);
  };

  const sortName = () => {
    setOpenOrderData(pairlistData?.data);
    // const sortData = pairlistData.data.sort(function (a, b) {
    //   return a.title.localeCompare(b.title);
    // });
    // setOpenOrderData(sortData);
  };

  const onChecked = ind => {
    console.log('ids in onchecccc', ind);
    const dummyData = data;
    let arr = dummyData.map((item, index) => {
      if (ind == index) {
        item.isSelected = !item.isSelected;
      }
      return {...item};
    });
    // console.log("selection of key isSelected", arr)
    setData(arr);
  };

  const getSelectedItems = () => {
    let keys = data.map(t => t.key);
    var check = data.map(t => t.isSelected);

    let selected = [];

    for (let i = 0; i < check.length; i++) {
      if (check[i] == true) {
        selected.push(keys[i]);
      }
      // console.log("index itses ===================>", check)
    }
    //alert("selected items (some problem with api)", selected)

    setselectedItems(selected);
    // submitPoll()
  };

  const sortChanges = () => {
    const sortData = pairlistData?.data?.sort(function (a, b) {
      return a.change - b.change;
    });
    setOpenOrderData(sortData);
  };

  const getFavStarList = () => {
    setSelection('FAV');
    dispatch({
      type: GET_FAV,
      payload: {token: accessToken},
    });
    if (favList && favList.data) {
      if (Object.keys(favList).length > 0) {
        setOpenOrderData(favList.data);
      }
    }
    //console.log('openOrderData=======>', openOrderData);
  };

  const saveFavStar = title => {
    console.log('title1');
    const titleInLowercse = title.toLowerCase();

    const titleWithoutSpce = titleInLowercse.replace(/ +/g, ''); // replace with underscore ('_')
    // setSelection('FAV');
    console.log(
      'sbbjbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
      titleWithoutSpce,
    );
    if (accessToken) {
      setStartSelect(title.toUpperCase());
      dispatch({
        type: SAVE_FAV,
        payload: {data: titleWithoutSpce, token: accessToken},
      });
      dispatch({
        type: GET_FAV,
        payload: {token: accessToken},
      });
      if (favList && favList.data) {
        if (Object.keys(favList).length > 0) {
          setOpenOrderData(favList.data);
        }
      }
    }
  };
  const kFormatter = n => {
    if (n < 1e3) return n;
    if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + 'K';
    if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + 'M';
    if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + 'B';
    if (n >= 1e12) return +(n / 1e12).toFixed(1) + 'T';
  };

  const renderStarIcon = (isselected, title, index, symbol) => {
    // console.log('isselectedddddddddd in mrket footer==========>', isselected);
    // console.log('isselectedddddddddd==========>', title);
    // console.log('isselectedddddddddd==========>', index);
    console.log('isselectedddddddddd==========>', symbol);
    // console.log('isselectedddddddddd==========>', isSelected);
    if (isSelected === 'FAV') {
      return (
        <TouchableOpacity
          style={{width: '15%'}}
          onPress={() => {
            saveFavStar(title);
            onChecked(index);
            getSelectedItems();
          }}>
          <View style={{flexDirection: 'row'}}>
            <AntDesign
              name="star"
              size={15}
              color={'#F9C127'}
              style={{margin: 5}}
            />
            {/* <Text>bbbh</Text> */}
            <Image
              // source={{
              //   uri: `https://api.tradehorn.com/assets/${symbol}.png`,
              // }}
              source={require('../assets/bitcoin.png')}
              // style={{height: 22, width: 22, top: 2}}
            />
          </View>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          onPress={() => {
            saveFavStar(title);
            onChecked(index);
            getSelectedItems();
          }}>
          {isselected ? (
            <View style={{flexDirection: 'row'}}>
              <AntDesign
                name="star"
                size={15}
                color="#F9C127"
                style={{margin: 5}}
              />
              <Image
                source={{
                  uri: `https://api.tradehorn.com/assets/${symbol}.png`,
                }}
                // source={require('../assets/bitcoin.png')}
                style={{height: 22, width: 22, top: 2}}
              />
            </View>
          ) : (
            <View style={{flexDirection: 'row'}}>
              <AntDesign
                name="staro"
                size={15}
                color={AppColors(themeColorData).title}
                style={{margin: 5}}
              />
              <Image
                source={{
                  uri: `https://api.tradehorn.com/assets/${symbol}.png`,
                }}
                // source={require('../assets/bitcoin.png')}
                style={{height: 22, width: 22, top: 2}}
              />
            </View>
          )}
        </TouchableOpacity>
      );
    }
  };

  const Item = ({title, amount, change, volumn, index, isSelected}) => {
    console.log('indexxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx in Item', title);
    // console.log('indexxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', item.isSelected);

    const amt = amount.split('/');
    const subAmt = amt[0];
    let finalAmt = '';
    if (subAmt == '0') {
      finalAmt = amount;
    } else {
      finalAmt = parseFloat(amount).toFixed(2);
    }

    const currency = title.split('/');
    const subcurrency = currency[0];
    const subcurrency1 = currency[1];
    const symbol = subcurrency.toLowerCase();
    //console.log('subcurrency', symbol);

    const addRemoveFav = () => {};

    return (
      <View style={styles(themeColorData).item}>
        {renderStarIcon(isSelected, title, index, symbol)}
        {/* <TouchableOpacity
          style={{width: '15%'}}
          onPress={() => {
            saveFavStar(title);
            onChecked(index);
            getSelectedItems();
          }}>
          {isSelected ? (
            <View style={{flexDirection: 'row'}}>
              <AntDesign
                name="star"
                size={15}
                color="#F9C127"
                style={{margin: 5}}
              />
              <Image
                source={{
                  uri: `https://api.tradehorn.com/assets/${symbol}.png`,
                }}
                // source={require('../assets/bitcoin.png')}
                style={{height: 22, width: 22, top: 2}}
              />
            </View>
          ) : (
            <View style={{flexDirection: 'row'}}>
              <AntDesign
                name="staro"
                size={15}
                color={AppColors(themeColorData).title}
                style={{margin: 5}}
              />
              <Image
                source={{
                  uri: `https://api.tradehorn.com/assets/${symbol}.png`,
                }}
                // source={require('../assets/bitcoin.png')}
                style={{height: 22, width: 22, top: 2}}
              />
            </View>
          )}
        </TouchableOpacity> */}

        <View style={{right: getDimen(0.05), left: getDimen(0.01)}}>
          <View
            style={{
              flexDirection: 'row',
              width: getDimen(0.19),
            }}>
            <Text style={[styles(themeColorData).title]}>{subcurrency}/</Text>
            <Text style={styles(themeColorData).subcurrencyTitle}>
              {subcurrency1}
            </Text>
          </View>
        </View>
        <View style={{width: '33%'}}>
          <Text
            style={[
              styles(themeColorData).title,
              {
                textAlign: 'center',
              },
            ]}>
            {' '}
            {'     '}
            {/* {finalAmt} */}
            {kFormatter(parseFloat(amount).toFixed(2))}
          </Text>
        </View>
        {/* <Text style={styles(themeColorData).title}>{change}</Text> */}
        <View
          style={{
            width: '36%',
            left: getDimen(0.09),
            flexDirection: 'row',
            padding: 2,
          }}>
          {ischecked == 'Volumn' ? (
            <View
              style={[
                styles(themeColorData).colorView,
                {
                  backgroundColor:
                    volumn >= 0
                      ? AppColors(themeColorData).green
                      : AppColors(themeColorData).red,
                },
              ]}>
              <Text
                style={[styles(themeColorData).colorTitle, {marginBottom: 3}]}>
                {volumn}%
              </Text>
            </View>
          ) : (
            <View
              style={[
                styles(themeColorData).colorView,
                {
                  //left: getDimen(0.004),
                  backgroundColor:
                    change >= 0
                      ? AppColors(themeColorData).green
                      : AppColors(themeColorData).red,
                },
              ]}>
              <Text
                style={[
                  styles(themeColorData).colorTitle,
                  {marginBottom: 3},
                  // {( change >= 0) ? (styles(themeColorData).headerSectionTitle2) : (styles(themeColorData).headerSectionTitle1)},
                  // {textAlign: 'left', right: moderateScale(19)},
                ]}>
                {change}%
              </Text>
            </View>
          )}
        </View>
      </View>
    );
  };
  const renderItem = ({item, amount, index}) => {
    // console.log('indexxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', item.isSelected);
    return (
      <TouchableOpacity
        style={{
          backgroundColor: AppColors(themeColorData).backgroundLight,
          marginVertical: 3,
          borderRadius: 10,
          width: '98%',
          alignSelf: 'center',
          // paddingVertical: 5,
        }}
        onPress={() => {
          pairId(item.pair);
          //console.log('pairPrice',item.lastprice)
          //console.log('pairIdExchange',item.pair)
          dispatch({
            type: DETAILS_COINS_DATA,
            payload: item.pair,
          });
          dispatch({type: COINS_PAGE_DATA, payload: 'MARKET'});
          //navigation.navigate('BuyBtcScreen');
        }}>
        <TouchableOpacity
          onPress={() => {
            pairId(item.pair);
            // //console.log('pairPrice',item.lastprice)
            // //console.log('pairIdExchange',item.pair)
            dispatch({
              type: DETAILS_COINS_DATA,
              payload: item.pair,
            });
            dispatch({type: COINS_PAGE_DATA, payload: 'MARKET'});
            accessToken
              ? navigation.navigate('BuyBtcScreen', {
                  text: item,
                })
              : null;
          }}>
          <Item
            title={item.pair.toUpperCase()}
            amount={parseFloat(item.lastprice).toFixed(8)}
            change={parseFloat(item.change).toFixed(2)}
            volumn={item.volume}
            index={index}
            isSelected={item.isSelected}
            // rate={ischecked ? {item.change}: {item.volumn}}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  const ListHeaderComponent = () => (
    <View style={styles(themeColorData).listHeaderWrapper}>
      <TouchableOpacity
        style={styles(themeColorData).headerSectionView}
        onPress={() => sortName()}>
        <Text
          style={[
            styles(themeColorData).headerSectionTitle,
            {textAlign: 'right'},
          ]}>
          {' '}
          {'              '}
          Pair
        </Text>
        <MaterialCommunityIcons
          name="menu-swap"
          size={20}
          color={AppColors(themeColorData).title}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles(themeColorData).headerSectionView}
        onPress={() => SortPrice()}>
        <Text
          style={[
            styles(themeColorData).headerSectionTitle,
            {textAlign: 'center'},
          ]}>
          {'          '}
          Market Price
        </Text>
        <MaterialCommunityIcons
          name="menu-swap"
          size={20}
          color={AppColors(themeColorData).title}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles(themeColorData).headerSectionView,
          {right: moderateScale(10)},
        ]}
        onPress={() => sortChanges()}>
        {/* <Text style={styles(themeColorData).headerSectionTitle}>Change</Text> */}
        {ischecked === 'Volumn' ? (
          <Text
            style={[
              styles(themeColorData).headerSectionTitle,
              {
                width: '60%',
                textAlign: 'right',
              },
            ]}>
            Volumn
          </Text>
        ) : (
          <Text
            style={[
              styles(themeColorData).headerSectionTitle,
              {textAlign: 'center'},
            ]}>
            {'      '}
            {''}
            24h Change
          </Text>
        )}
        <MaterialCommunityIcons
          name="menu-swap"
          size={20}
          color={AppColors(themeColorData).title}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles(themeColorData).container}>
      <LinearGradient
        style={{borderRadius: 20, margin: 1}}
        colors={[
          AppColors(themeColorData).background,
          AppColors(themeColorData).background,
        ]}>
        {/* Header view*/}
        {/* <Toolbar navigation={navigation} /> */}
        {/* end */}
        <View style={styles(themeColorData).horizontalScrollView} horizontal>
          <TouchableOpacity
            onPress={() => {
              setSelection('FAV');
            }}
            // onPress={() => getFavStarList()}
            style={[
              {
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 0,
                padding: 2,
                //left: moderateScale(17),
              },
            ]}>
            <View style={[styles(themeColorData).headerSectionTitleTop]}>
              <Image
                source={require('../assets/star.png')}
                style={{height: 20, width: 20}}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelection('USDT')}
            style={[
              styles(themeColorData).horizontaScrollSectionWrapper,
              {
                padding: 2,
              },
            ]}>
            <Text
              style={[
                styles(themeColorData).headerSectionTitleTop,
                {borderBottomWidth: isSelected == 'USDT' ? 2 : 0},
                {
                  borderBottomColor: AppColors(themeColorData).title,
                  textAlign: 'center',
                },
                {
                  color:
                    isSelected == 'USDT'
                      ? AppColors(themeColorData).title
                      : AppColors(themeColorData).subText,
                },
              ]}>
              USDT
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelection('BTC')}
            style={[
              styles(themeColorData).horizontaScrollSectionWrapper,
              {
                padding: 2,
              },
            ]}>
            <Text
              style={[
                styles(themeColorData).headerSectionTitleTop,
                {borderBottomWidth: isSelected == 'BTC' ? 2 : 0},
                {borderBottomColor: AppColors(themeColorData).title}, //  {color: isSelected == 'BTC' ? '#000' : AppColors(themeColorData).title},
                {
                  color:
                    isSelected == 'BTC'
                      ? AppColors(themeColorData).title
                      : AppColors(themeColorData).subText,
                },
              ]}>
              BTC
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelection('ETH')}
            style={[
              styles(themeColorData).horizontaScrollSectionWrapper,
              {
                padding: 2,
              },
            ]}>
            <Text
              style={[
                styles(themeColorData).headerSectionTitleTop,
                {borderBottomWidth: isSelected == 'ETH' ? 2 : 0},
                {borderBottomColor: AppColors(themeColorData).title},
                {
                  color:
                    isSelected == 'ETH'
                      ? AppColors(themeColorData).title
                      : AppColors(themeColorData).subText,
                },
              ]}>
              ETH
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelection('BNB')}
            style={[
              styles(themeColorData).horizontaScrollSectionWrapper,
              {
                padding: 2,
              },
            ]}>
            <Text
              style={[
                styles(themeColorData).headerSectionTitleTop,
                {borderBottomWidth: isSelected == 'BNB' ? 2 : 0},
                {borderBottomColor: AppColors(themeColorData).title},
                {
                  color:
                    isSelected == 'BNB'
                      ? AppColors(themeColorData).title
                      : AppColors(themeColorData).subText,
                },
              ]}>
              BNB
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelection('TRX')}
            style={[
              styles(themeColorData).horizontaScrollSectionWrapper,
              {
                padding: 2,
              },
            ]}>
            <Text
              style={[
                styles(themeColorData).headerSectionTitleTop,
                {borderBottomWidth: isSelected == 'TRX' ? 2 : 0},
                {borderBottomColor: AppColors(themeColorData).title},
                {
                  color:
                    isSelected == 'TRX'
                      ? AppColors(themeColorData).title
                      : AppColors(themeColorData).subText,
                },
              ]}>
              TRX
            </Text>
          </TouchableOpacity>
        </View>

        {/* FLatList */}
        <View style={{height: '100%', bottom: moderateScale(5)}}>
          <FlatList
            data={isSelected === 'FAV' ? favList?.data : data}
            extraData={data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            ListHeaderComponent={ListHeaderComponent}
          />
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = themeColorData =>
  StyleSheet.create({
    container: {
      flexDirection: 'column',
      backgroundColor: AppColors(themeColorData).background,
    },
    // table styls
    item: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '98%',
      marginVertical: 10,
      alignSelf: 'center',
    },
    title: {
      fontSize: textSize.h3,
      color: AppColors(themeColorData).title,
      textAlign: 'left',
      top: 2,
      fontWeight: '700',
      fontFamily: '',
    },
    subcurrencyTitle: {
      fontSize: 14,
      color: AppColors(themeColorData).subText,
      fontFamily: '',
      top: 6,
      textAlign: 'left',
      fontWeight: '900',
    },

    listHeaderWrapper: {
      flexDirection: 'row',
      width: '100%',
      height: 35, // initaly was 35
      backgroundColor: AppColors(themeColorData).background,
      padding: 0,
      marginTop: 0,
    },
    headerSectionView: {
      width: '35%',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 0,
      flexDirection: 'row',
    },
    headerSectionTitle: {
      color: AppColors(themeColorData).title,
      fontSize: 13,
      textAlign: 'center',
      fontFamily: '',
    },
    colorView: {
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      right: moderateScale(12),
      paddingHorizontal: 5,
      width: getDimen(0.22),
      height: moderateScale(22),
    },

    // curr view
    // horizontalScrollView: {
    //   width: '99%',
    //   height: 47,
    //   marginBottom: 2,
    //   flexDirection: 'row',
    //   justifyContent: 'space-around',
    //   backgroundColor: AppColors(themeColorData).backgroundLight,
    //   borderRadius: 10,
    //   alignSelf: 'center',
    //   // paddingRight: 10,
    //   // position: 'absolute',
    //   // top: 0,
    //   // bottom: 0,
    //   // left: 0,
    //   // right: 0,
    // },
    // horizontaScrollSectionWrapper: {
    //   alignItems: 'center',
    //   justifyContent: 'center',
    //   backgroundColor: AppColors(themeColorData).backgroundLight,
    //   alignContent: 'center',
    //   alignSelf: 'center',
    //   right: 10,
    // },
    // headerSectionTitleTop: {
    //   color: AppColors(themeColorData).subText,
    //   textAlign: 'center',
    //   //width: moderateScale(52),
    //   //fontSize: 20,
    //   fontSize: 18,
    //   fontFamily: '',
    //   //padding: 3,
    // },
    horizontalScrollView: {
      width: '98%',
      height: 47,
      marginBottom: 2,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      backgroundColor: AppColors(themeColorData).backgroundLight,
      borderRadius: 10,
      alignSelf: 'center',
      // position: 'absolute',
      // top: 0,
      // bottom: 0,
      // left: 0,
      // right: 0,
    },
    horizontaScrollSectionWrapper: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 5, //dnt give
      alignContent: 'center',
      alignSelf: 'center',
      //position: 'relative',
    },
    headerSectionTitleTop: {
      color: AppColors(themeColorData).subText,
      textAlign: 'center',
      //width: moderateScale(57),
      fontSize: 20,
      fontWeight: '600',
      // backgroundColor: 'red',
      fontFamily: '',
    },
    // change n volumn btn
    toggleBtnParentView: {
      flexDirection: 'row',
      backgroundColor: AppColors(themeColorData).backgroundLight,
      borderRadius: 10,
      marginBottom: 10,
      height: 40,
      alignItems: 'center',
      marginTop: 10,
      alignSelf: 'center',
    },
    toggleBtnWrapper: {
      height: 40,
      width: '45%',
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
    },
    btnTitle: {
      // fontSize: textSize.h2,
      fontWeight: 'bold',
      fontSize: textSize.h3,
      //backgroundColor: AppColors(themeColorData).title,
      fontFamily: '',
    },
    colorTitle: {
      fontSize: textSize.h3,
      color: AppColors(themeColorData).white,
      textAlign: 'left',
      //top: 2,
      fontWeight: '700',
      fontFamily: '',
    },
  });
export default MarketFooterTable;
