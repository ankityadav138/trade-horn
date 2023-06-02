import React, {useState, useEffect} from 'react';
import {Text, View, Image, StyleSheet, FlatList} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import textSize from '../../../constants/textSize';
import {GET_OPEN_ORDER} from '../../../store/action';
import {useDispatch, useSelector} from 'react-redux';
import {moderateScale} from 'react-native-size-matters';
import {getDimen} from '../../../dimensions/dimen';
import {AppColors} from '../../../constants/appColors';

const ClosedOrder = ({data}) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [openOrderData, setOpenOrderData] = useState('');
  const openOrders = useSelector(state => state.order.openOrders);
  const accessToken = useSelector(state => state.login.accessToken);
  const themeColorData = useSelector(state => state.login.themeValue);

  // console.log('openOrders closed------', openOrders.data);

  useEffect(() => {
    dispatch({
      type: GET_OPEN_ORDER,
      payload: {token: accessToken},
    });
  }, [isFocused]);

  useEffect(() => {
    // console.log('closed DATA =======>');
    if (Object.keys(openOrders).length > 0) {
      if (openOrders.code == 200) {
        setOpenOrderData(openOrders.data.order);
        // console.log('closed DATA =======>', openOrders.data.order.length);
      }
    }
  }, [openOrders]);

  const renderItem = ({item}) => {
    return (
      <View style={styles(themeColorData).tableView}>
        <View>
          <View style={{marginHorizontal: 10, marginRight: moderateScale(60)}}>
            <Text
              style={[styles(themeColorData).text, {right: moderateScale(0)}]}>
              {item.pair.toUpperCase()}
            </Text>
            {/* <Text style={[styles(themeColorData).text, {right: moderateScale(0)}, {type =="sell"}]}>
              {item.side}/{item.type}
            </Text> */}
            {item.type == 'sell' ? (
              <Text
                style={[
                  styles(themeColorData).subtext,
                  {
                    right: moderateScale(0),
                    color: AppColors(themeColorData).red,
                    fontWeight: '900',
                  },
                ]}>
                {item.side}/{item.type}
              </Text>
            ) : (
              <Text
                style={[
                  styles(themeColorData).subtext,
                  {
                    right: moderateScale(0),
                    color: AppColors(themeColorData).green,
                    fontWeight: '900',
                  },
                ]}>
                {item.side}/{item.type}
              </Text>
            )}
            <Text style={styles(themeColorData).subtext}> Amount</Text>
            <Text style={styles(themeColorData).subtext}> Price</Text>
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: textSize.componentsDifferenceHight,
          }}></View>
        <View style={{marginRight: moderateScale(13)}}>
          <View>
            <Text
              style={[styles(themeColorData).subtext, {textAlign: 'center'}]}>
              {item.date.slice(0, 10)} {item.date.slice(11, 19)}
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View>
              <View style={styles(themeColorData).pendingView}>
                <Text style={styles(themeColorData).pending}> Filled</Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  width: getDimen(0.0002),
                  right: moderateScale(10),
                }}>
                <Text style={styles(themeColorData).subTextBold}>79/</Text>
                <Text
                  style={[
                    styles(themeColorData).subText,
                    {
                      width: moderateScale(20),
                      textAlign: 'left',
                    },
                  ]}>
                  79
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  width: getDimen(0.0002),
                  right: moderateScale(29),
                }}>
                <Text style={styles(themeColorData).subTextBold}>0.7625/</Text>
                <Text
                  style={[
                    styles(themeColorData).subText,
                    {
                      // width: moderateScale(20),
                      textAlign: 'left',
                      fontFamily: '',
                    },
                  ]}>
                  0.7625
                </Text>
              </View>

              <Text style={styles(themeColorData).subText}>{''} </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles(themeColorData).container}>
      <FlatList
        data={openOrderData ? openOrderData : openOrders?.data?.order}
        extraData={openOrderData ? openOrderData : openOrders?.data?.order}
        renderItem={item => renderItem(item)}
        keyExtractor={(item, index) => index.toString()}
        initialNumToRender={7}
        maxToRenderPerBatch={10}
      />
    </View>
  );
};

const styles = themeColorData =>
  StyleSheet.create({
    container: {
      // flex: 1,
      flexDirection: 'column',
      margin: 6,
    },

    TitleView: {
      flexDirection: 'row',
      backgroundColor: AppColors(themeColorData).background,
      padding: textSize.componentsDifference,
      height: 2,
    },
    text: {
      color: AppColors(themeColorData).title,
      fontSize: textSize.h3,
      textAlign: 'left',
      width: moderateScale(100),
      marginVertical: 2,
      fontWeight: '600',
    },
    subtext: {
      color: AppColors(themeColorData).inputDark,
      fontSize: textSize.h6,
      textAlign: 'left',
      width: moderateScale(100),
      marginVertical: 2,
    },
    tableView: {
      justifyContent: 'space-between',
      flexDirection: 'row',
      marginVertical: 3,
      backgroundColor: AppColors(themeColorData).backgroundLight,
      height: moderateScale(89),
      borderRadius: 10,
      width: '100%',
      paddingVertical: 5,
    },
    Titletext: {
      color: AppColors(themeColorData).title,
      fontSize: textSize.h5,
      textAlign: 'left',
      width: moderateScale(100),
    },
    item: {
      padding: 0,
      marginVertical: 15,
    },
    pending: {
      color: AppColors(themeColorData).seaGreen,
      fontSize: textSize.h6,
      fontFamily: '',
      borderRadius: 2,
      textAlign: 'center',
      marginVertical: 2,
      fontWeight: '900',
    },
    pendingView: {
      backgroundColor: AppColors(themeColorData).greenInfoBg,
      borderRadius: 2,
      width: getDimen(0.12),
      marginVertical: 2,
      left: moderateScale(60),
    },

    subText: {
      color: AppColors(themeColorData).inputDark,
      fontSize: textSize.h6,
      textAlign: 'right',
      width: moderateScale(100),
      marginVertical: 2,
    },
    subTextBold: {
      color: AppColors(themeColorData).inputDark,
      fontSize: textSize.h6,
      textAlign: 'right',
      width: moderateScale(100),
      marginVertical: 2,
      fontWeight: '900',
      fontWeight: 'bold',
    },
    cancelBtnbG: {
      backgroundColor: AppColors(themeColorData).cancelBtnBg,
      width: moderateScale(20),
      height: moderateScale(20),
      borderRadius: 20,
      marginHorizontal: 13,
      top: moderateScale(20),
    },
  });

export default ClosedOrder;
