import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {AppColors} from '../constants/appColors';
import {useDispatch, useSelector} from 'react-redux';
import {
  DETAILS_COINS_DATA,
  MARKET_HOME,
  COINS_PAGE_DATA,
  PAIR,
} from '../store/action';
import {getDimen} from '../dimensions/dimen';
import textSize from '../constants/textSize';
import {useNavigation} from '@react-navigation/native';
import {moderateScale} from 'react-native-size-matters';
import {AuthContext} from '../components/context';

const MasterFooter = ({searchBox, filter, isselected, isSelection}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [openOrderData, setOpenOrderData] = useState([]);
  const themeColorData = useSelector(state => state.login.themeValue);
  const pairlistData = useSelector(state => state.order.marketHome);
  const accessToken = useSelector(state => state.login.accessToken);

  useEffect(() => {
    dispatch({
      type: MARKET_HOME,
      payload: {},
    });
  }, []);

  useEffect(() => {
    if (searchBox?.length == 0) {
      if (isselected == 'Gainers') {
        const sortGainersData = pairlistData?.data?.reverse(
          (a, b) => a.lastprice + b.lastprice,
        );
        setOpenOrderData(sortGainersData);
      }
      // setOpenOrderData(pairlistData?.data);
    } else {
      setOpenOrderData(filter);
    }
  }, [searchBox]);

  useEffect(() => {
    if (pairlistData && pairlistData.data) {
      if (Object.keys(pairlistData).length > 0) {
        if (isselected == 'Gainers') {
          const sortGainersData = pairlistData?.data?.reverse(
            (a, b) => a.lastprice + b.lastprice,
          );
          setOpenOrderData(sortGainersData);
        } else {
          setOpenOrderData(pairlistData.data);
        }
        // setOpenOrderData(pairlistData.data);
      }
    }
  }, [pairlistData]);

  const kFormatter = n => {
    if (n < 1e3) return n;
    if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + 'K';
    if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + 'M';
    if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + 'B';
    if (n >= 1e12) return +(n / 1e12).toFixed(1) + 'T';
  };

  const Item = ({title, amount, change, volumn}) => {
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
      <View style={styles.item}>
        <View
          style={{width: '33%', right: getDimen(0.05), left: getDimen(0.01)}}>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={{
                uri: `https://api.tradehorn.com/assets/btc.png`,
              }}
              // source={require('../assets/bitcoin.png')}
              style={{height: 22, width: 22, margin: 5}}
            />
            <Text
              style={[styles.title, {color: AppColors(themeColorData).title}]}>
              {title}
              {/* Bitcoin */}
            </Text>
          </View>
        </View>

        <View
          style={{
            left: getDimen(0.06),
            flexDirection: 'row',
          }}>
          {/* <Icon
            name="chevron-up"
            size={15}
            color="#08D870"
            style={{
              right: moderateScale(14),
              bottom: 0,
            }}
          /> */}
          {isselected == 'Losers' ? (
            <Text
              style={[
                //  styles.headerSectionTitle1,
                // {color: change >= 0 ? '#d0373d' : null},
                {
                  textAlign: 'left',
                  alignSelf: 'center',
                  right: moderateScale(17),
                },
              ]}>
              -
            </Text>
          ):
          (
            change >= 0 ? (
              <Text
                style={[
                  //  styles.headerSectionTitle1,
                  {color: change >= 0 ? '#2ce256' : null},
                  {
                    textAlign: 'left',
                    alignSelf: 'center',
                    right: moderateScale(17),
                  },
                ]}>
                +
              </Text>
            ) : null
          )}


         {isselected == 'Gainers' ? (
          <Text
            style={[
              styles.headerSectionTitle1,
              {color: change >= 0 ? '#2ce256' : '#2ce256'},
              {textAlign: 'left', right: moderateScale(19)},
            ]}>
            {' '}
            {change} %{' '}
          </Text>
         ) :
         isselected == 'Losers' ? (
          <Text
          style={[
            styles.headerSectionTitle1,
            {color: change >= 0 ? '#d0373d' : '#d0373d'},
            {textAlign: 'left', right: moderateScale(19)},
          ]}>
          {' '}
          {/* {change} %{' '} */}
          {/* {change?.substring(0, change.lastIndexOf('-'))} */}
          {change.replace('-', '')} %{' '}
        </Text>
         ):
         (
          <Text
          style={[
            styles.headerSectionTitle1,
            {color: change >= 0 ? '#2ce256' : '#d0373d'},
            {textAlign: 'left', right: moderateScale(19)},
          ]}>
          {' '}
          {change} %{' '}
        </Text>

         )}

          {/* {isselected == 'Gainers' ? (
            <Text
              style={[
                styles.headerSectionTitle1,
                {color: change >= 0 ? '#2ce256' : '#2ce256'},
                {textAlign: 'left', right: moderateScale(19)},
              ]}>
              {' '}
              {change} %{' '}
            </Text>
          ) : isselected == 'Losers' ? (
            <Text
              style={[
                styles.headerSectionTitle1,
                {color: change >= 0 ? '#d0373d' : '#d0373d'},
                {textAlign: 'left', right: moderateScale(19)},
              ]}>
              {' '}
              {change} %{' '}
            </Text>
          ) : (
            <Text
              style={[
                styles.headerSectionTitle1,
                {color: change >= 0 ? '#2ce256' : '#d0373d'},
                {textAlign: 'left', right: moderateScale(19)},
              ]}>
              {' '}
              {change} %{' '}
            </Text>
          )} */}
        </View>

        <View style={{width: '33%', alignSelf: 'center'}}>
          {isselected == '24h Vol' ? (
            <Text
              style={[styles.title, {color: AppColors(themeColorData).title}]}>
              {/* ${volumn.toFixed(6)} */}$
              {kFormatter(parseFloat(volumn).toFixed(2))}
              {/* yes */}
            </Text>
          ) : (
            <Text
              style={[styles.title, {color: AppColors(themeColorData).title}]}>
              {/* ${amount?.slice(0, 11)} */}$
              {kFormatter(parseFloat(amount).toFixed(2))}
              {/* ${amount?.toFixed(6)} */}
              {/* no */}
            </Text>
          )}
        </View>
      </View>
    );
  };
  const pairId = data => {
    dispatch({
      type: PAIR,
      payload: data,
    });
    // const replacenew = data.replace('/', '_');
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={{
          backgroundColor: AppColors(themeColorData).backgroundLight,
          marginVertical: 3,
          borderRadius: 10,
          width: getDimen(0.95),
          alignSelf: 'center',
        }}
        onPress={() => {
          // dispatch({
          //   type: DETAILS_COINS_DATA,
          //   payload: item.pair.replace(/ /g, ''),
          // });
          // dispatch({type: COINS_PAGE_DATA, payload: 'MARKET'});
          // navigation.navigate('BuyBtcScreen');
          // }}>
          // onPress={() => {
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
            // rate={ischecked ? {item.change}: {item.volumn}}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: AppColors(themeColorData).bottomTabColor},
      ]}>
      <View style={{background: AppColors(themeColorData).background, flex: 1}}>
        <FlatList
          data={openOrderData?.slice(0, 12)}
          renderItem={renderItem}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
        />
      </View>
    </View>
  );a
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    top: getDimen(0.03),
  },

  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 0,
    // marginVertical: 20,
    // paddingHorizontal: 15,
    marginVertical: 10,
  },
  title: {
    fontSize: 15,
    // color: '#FFFFFF',
    // width: '30%',
    textAlign: 'center',
    top: 2,
    alignSelf: 'center',
    fontWeight: '700',
    fontFamily: '',
    //numberOfLines: 10,
  },
  listHeaderWrapper: {
    flexDirection: 'row',
    width: '100%',
    height: 38, // initaly was 35
    // backgroundColor: 'black',
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
    fontSize: textSize.h4,
    // numberOfLines: 1,
    textAlign: 'left',
    // width: moderateScale(55),
    fontWeight: '600',
    alignSelf: 'center',
    fontFamily: '',
  },
});
export default MasterFooter;
