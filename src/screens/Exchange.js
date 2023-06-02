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
import {useDispatch, useSelector} from 'react-redux';
import {
  GET_PAIRLIST,
  PAIR,
  GET_FAV,
  DETAILS_COINS_DATA,
  SAVE_FAV,
  COINS_PAGE_DATA,
} from '../store/action';
import {useNavigation, useRoute} from '@react-navigation/native';
import {getDimen} from '../dimensions/dimen';
import {moderateScale} from 'react-native-size-matters';
import {AppColors} from '../constants/appColors';
import {useIsFocused} from '@react-navigation/native';
import textSize from '../constants/textSize';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const dataaa = [
  {
    _id: '602132584aa87b3351137f8d',
    bot_status: false,
    change: 0,
    date: '2021-02-08T12:34:56.756Z',
    firstcurrency: 'bnb',
    firstcurrency_name: 'binancecoin',
    high: 99.31959236,
    lastprice: 99.31959236,
    low: 99.31959236,
    pair: 'bnb/trx',
    pair_id: 0,
    secondcurrency: 'trx',
    secondcurrency_name: 'tron',
    status: true,
    url: 'bnb-trx',
    volume: 2.48673,
  },
  {
    _id: '619f8bb78f906c9901831994',
    change: 0.2219752,
    firstcurrency: 'doge',
    firstcurrency_name: 'Dogecoin',
    high: 0.2318,
    lastprice: 0.2227423,
    low: 0.21,
    pair: 'doge/trx',
    pair_id: 0,
    secondcurrency: 'trx',
    secondcurrency_name: 'tron',
    status: true,
    url: 'doge-trx',
    volume: 0,
  },
  {
    _id: '61ab789f2463c87e4ae39ec4',
    change: 0,
    firstcurrency: 'btt',
    firstcurrency_name: 'BitTorrent',
    high: 0.002482,
    lastprice: 0.002482,
    low: 0.002482,
    pair: 'btt/trx',
    pair_id: 0,
    secondcurrency: 'trx',
    secondcurrency_name: 'tron',
    status: true,
    url: 'btt-trx',
    volume: 0,
  },
];

const Exchange = ({searchBox, filter}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();
  const isFocused = useIsFocused();

  const [openOrderData, setOpenOrderData] = useState([]);
  const [ischecked, setChecked] = useState('Change');
  const [isSelected, setSelection] = useState('USDT');
  const [startSelect, setStartSelect] = useState('');
  const [data, setData] = useState(openOrderData);
  const [selectedItems, setselectedItems] = useState();

  const accessToken = useSelector(state => state.login.accessToken);
  const pairlistData = useSelector(state => state.order.pairlistData);
  const themeColorData = useSelector(state => state.login.themeValue);
  const favList = useSelector(state => state.order.fav);
  const saveFav = useSelector(state => state.order.saveFav);
  console.log(
    'openOrderData ========================================>+++++++++++++++++++++++++++',
    data,
  );

  console.log(
    'isSelectedisSelectedisSelected ========================================>+++++++++++++++++++++++++++',
    saveFav,
  );

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
  }, [saveFav]);
  useEffect(() => {
    TokenFilter(isSelected.toLowerCase());
  }, [pairlistData]);

  const backAction = () => {
    if (navigation.isFocused()) {
      BackHandler.exitApp();
    } else {
      navigation.goBack();
    }
    return true;
  };

  useEffect(() => {
    if (searchBox.length == 0) {
      setOpenOrderData(pairlistData?.data);
    } else {
      setOpenOrderData(filter);
    }
  }, [searchBox]);

  useEffect(() => {
    TokenFilter(isSelected.toLowerCase());
  }, [isSelected]);

  const TokenFilter = type => {
    if (pairlistData && pairlistData.data) {
      const filterList = pairlistData.data.filter(
        item => item.secondcurrency == type,
      );
      setOpenOrderData(filterList);
      setData(filterList);
    }
  };

  const pairId = data => {
    dispatch({
      type: PAIR,
      payload: data,
    });
    // const replacenew = data.replace('/', '_');
  };

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

  const sortChanges = () => {
    const sortData = pairlistData?.data?.sort(function (a, b) {
      return a.change - b.change;
    });
    setOpenOrderData(sortData);
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

  const saveFavStar = title => {
    console.log('title1');
    const titleInLowercse = title.toLowerCase();

    const titleWithoutSpce = titleInLowercse.replace(/ +/g, ''); // replace with underscore ('_')
    // setSelection('FAV');
    // console.log(
    //   'sbbjbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
    //   titleWithoutSpce,
    // );
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
  };
  const kFormatter = n => {
    if (n < 1e3) return n;
    if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + 'K';
    if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + 'M';
    if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + 'B';
    if (n >= 1e12) return +(n / 1e12).toFixed(1) + 'T';
  };

  const renderStarIcon = (isselected, title, index, symbol) => {
    // console.log('isselectedddddddddd==========>', isselected);
    // console.log('isselectedddddddddd==========>', title);
    // console.log('isselectedddddddddd indexxxxx==========>', index);
    // console.log('isselectedddddddddd==========>', symbol);
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
            <Image
              source={{
                uri: `https://api.tradehorn.com/assets/${symbol}.png`,
              }}
              // source={require('../assets/bitcoin.png')}
              style={{height: 22, width: 22, top: 2}}
            />
          </View>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          onPress={() => {
            // alert('hhhhhhhh');
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
    // console.log('indexxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', index);
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

    return (
      <View style={styles(themeColorData).item}>
        {/* <TouchableOpacity
          style={{padding: 20, backgroundColor: 'blue'}}
          onPress={() => alert('hiii')}>
          <Text>jbdfj</Text>
        </TouchableOpacity> */}
        {renderStarIcon(isSelected, title, index, symbol)}

        {/* <TouchableOpacity
     
         
          style={{width: '15%'}}
          onPress={() => {
       
            // saveFavStar(title);
            // onChecked(index);
            // getSelectedItems();
          }}
        >
          
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
            {kFormatter(parseFloat(amount).toFixed(2))}
          </Text>
        </View>
        {/* <Text style={styles(themeColorData).title}>{change}</Text> */}
        <View style={styles(themeColorData).changeVolView}>
          {ischecked == 'Volume' ? (
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
                {/* {volumn}% */}
                {kFormatter(parseFloat(volumn).toFixed(2))}%
              </Text>
            </View>
          ) : (
            <View
              style={[
                styles(themeColorData).colorView,
                {
                  backgroundColor:
                    change >= 0
                      ? AppColors(themeColorData).green
                      : AppColors(themeColorData).red,
                },
              ]}>
              <Text
                style={[styles(themeColorData).colorTitle, {marginBottom: 3}]}>
                {change}%
              </Text>
            </View>
          )}
        </View>
      </View>
    );
  };

  const renderItem = ({item, amount, index}) => {
    return (
      <TouchableOpacity
        style={styles(themeColorData).tableCard}
        onPress={() => {
          // alert('hiii');
          pairId(item.pair);
          dispatch({
            type: DETAILS_COINS_DATA,
            payload: item.pair,
          });
          dispatch({type: COINS_PAGE_DATA, payload: 'EXCHANGE'});
        }}>
        {/* <TouchableOpacity
          style={{backgroundColor: 'blue'}}
          onPress={() => alert('hiii')}>
          <Text>jbdfj</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          onPress={() => {
            pairId(item.pair);
            dispatch({
              type: DETAILS_COINS_DATA,
              payload: item.pair,
            });
            dispatch({type: COINS_PAGE_DATA, payload: 'EXCHANGE'});
            accessToken
              ? navigation.navigate(
                  'BuyBtcScreen',
                  //{ item: item }
                  {
                    text: item,
                  },
                )
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
        {ischecked === 'Volume' ? (
          <Text
            style={[
              styles(themeColorData).headerSectionTitle,
              {
                width: '60%',
                textAlign: 'right',
              },
            ]}>
            24h Volume
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
      <View style={styles(themeColorData).horizontalScrollView}>
        <TouchableOpacity
          onPress={() => {
            getFavStarList();
            setSelection('FAV');
          }}
          style={{padding: 2, alignSelf: 'center'}}>
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
              paddingHorizontal: isSelected == 'USDT' ? 15 : null,
              backgroundColor:
                isSelected == 'USDT'
                  ? AppColors(themeColorData).lightPurple
                  : null,
              padding: isSelected == 'USDT' ? 7 : null,
            },
          ]}>
          <Text
            style={[
              styles(themeColorData).headerSectionTitleTop,
              {borderBottomWidth: isSelected == 'USDT' ? 1 : null},
              {
                borderBottomColor: AppColors(themeColorData).title,
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
              padding: 5,
              borderRadius: 10,
            },
            {
              paddingHorizontal: isSelected == 'BTC' ? 13 : null,
              backgroundColor:
                isSelected == 'BTC'
                  ? AppColors(themeColorData).lightPurple
                  : null,
              padding: isSelected == 'BTC' ? 7 : null,
            },
          ]}>
          <Text
            style={[
              styles(themeColorData).headerSectionTitleTop,
              {borderBottomWidth: isSelected == 'BTC' ? 1 : null},
              {
                borderBottomColor: AppColors(themeColorData).title,
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
              padding: 5,
              borderRadius: 10,
            },
            {
              paddingHorizontal: isSelected == 'ETH' ? 13 : null,
              backgroundColor:
                isSelected == 'ETH'
                  ? AppColors(themeColorData).lightPurple
                  : null,
              padding: isSelected == 'ETH' ? 7 : null,
            },
          ]}>
          <Text
            style={[
              styles(themeColorData).headerSectionTitleTop,
              {borderBottomWidth: isSelected == 'ETH' ? 1 : null},
              {
                borderBottomColor: AppColors(themeColorData).title,
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
              padding: 5,
              borderRadius: 10,
            },
            {
              paddingHorizontal: isSelected == 'BNB' ? 13 : null,
              backgroundColor:
                isSelected == 'BNB'
                  ? AppColors(themeColorData).lightPurple
                  : null,
              padding: isSelected == 'BNB' ? 7 : null,
            },
          ]}>
          <Text
            style={[
              styles(themeColorData).headerSectionTitleTop,
              {borderBottomWidth: isSelected == 'BNB' ? 1 : null},
              {
                borderBottomColor: AppColors(themeColorData).title,
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
              padding: 5,
              borderRadius: 10,
            },
            {
              paddingHorizontal: isSelected == 'TRX' ? 13 : null,
              backgroundColor:
                isSelected == 'TRX'
                  ? AppColors(themeColorData).lightPurple
                  : null,
              padding: isSelected == 'TRX' ? 7 : null,
            },
          ]}>
          <Text
            style={[
              styles(themeColorData).headerSectionTitleTop,
              {
                borderBottomWidth: isSelected == 'TRX' ? 1 : null,
                textAlign: 'center',
              },
              {
                borderBottomColor: AppColors(themeColorData).title,
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

      <View style={styles(themeColorData).toggleBtnParentView}>
        <TouchableOpacity
          style={[
            styles(themeColorData).toggleBtnWrapper,
            {
              backgroundColor:
                ischecked == 'Change'
                  ? AppColors(themeColorData).lightPurple
                  : null,
              opacity: '60%',
            },
          ]}
          onPress={() => setChecked('Change')}>
          <Text
            style={[
              styles(themeColorData).btnTitle,
              {
                color:
                  ischecked == 'Change'
                    ? AppColors(themeColorData).title
                    : AppColors(themeColorData).subText,
              },
            ]}>
            Change
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles(themeColorData).toggleBtnWrapper,
            {
              backgroundColor:
                ischecked == 'Volume'
                  ? AppColors(themeColorData).lightPurple
                  : null,
            },
          ]}
          onPress={() => setChecked('Volume')}>
          <Text
            style={[
              styles(themeColorData).btnTitle,
              {
                color:
                  ischecked == 'Volume'
                    ? AppColors(themeColorData).title
                    : AppColors(themeColorData).subText,
              },
            ]}>
            Volume
          </Text>
        </TouchableOpacity>
      </View>

      {/* FLatList */}
      <View style={{height: '100%', bottom: moderateScale(5)}}>
        <FlatList
          data={isSelected === 'FAV' ? favList?.data : data}
          // data={openOrderData}
          // extraData={openOrderData}
          extraData={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          ListHeaderComponent={ListHeaderComponent}
        />
      </View>
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
      width: '100%',
      marginVertical: 10,
      alignSelf: 'center',
      padding: 0,
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
      height: 38, // initaly was 35
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

    horizontalScrollView: {
      width: '98%',
      height: 47,
      marginBottom: 2,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      backgroundColor: AppColors(themeColorData).backgroundLight,
      borderRadius: 10,
      alignSelf: 'center',
    },
    horizontaScrollSectionWrapper: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 5, //dnt give
      alignContent: 'center',
      alignSelf: 'center',
      borderRadius: 10,
    },
    headerSectionTitleTop: {
      color: AppColors(themeColorData).subText,
      textAlign: 'center',
      fontSize: 20,
      fontWeight: '600',
      fontFamily: '',
    },
    tableCard: {
      backgroundColor: AppColors(themeColorData).backgroundLight,
      marginVertical: 3,
      borderRadius: 10,
      width: '98%',
      alignSelf: 'center',
      //paddingVertical: 5,
    },
    changeVolView: {
      width: '36%',
      left: getDimen(0.09),
      flexDirection: 'row',
      padding: 2,
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
      fontWeight: 'bold',
      fontSize: textSize.h3,
      fontFamily: '',
    },
    colorTitle: {
      fontSize: textSize.h3,
      color: AppColors(themeColorData).white,
      textAlign: 'left',
      fontWeight: '700',
      fontFamily: '',
    },
  });
export default Exchange;
