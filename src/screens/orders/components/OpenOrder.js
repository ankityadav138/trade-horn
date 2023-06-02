import {useTheme} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import textSize from '../../../constants/textSize';
import {
  CANCEL_OPEN_ORDER,
  GET_OPEN_ORDER,
  GET_OPEN_ORDER_HISTORY,
  GET_PAIRDETAIL,
} from '../../../store/action';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {moderateScale} from 'react-native-size-matters';
import {getDimen} from '../../../dimensions/dimen';
import {AppColors} from '../../../constants/appColors';
import showMessage from '../../../components/showMessage';

const OpenOrder = ({data}) => {
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const [openOrderData, setOpenOrderData] = useState('');
  const openOrders = useSelector(state => state.order.openOrders);
  // const pair = useSelector(state => state.order.pair);
  // const pairdetail = useSelector(state => state.order.pairdetail);
  const accessToken = useSelector(state => state.login.accessToken);
  const openOrdersHistoryData = useSelector(
    state => state.order.openOrdersHistoryData,
  );
  const deleteOrder = useSelector(state => state.order.deleData);
  const themeColorData = useSelector(state => state.login.themeValue);

  const dateTime = new Date();

  // useEffect(() => {
  //   //console.log('pair ===>', pair)
  //   dispatch({
  //     type: GET_OPEN_ORDER,
  //     payload: {token: accessToken},
  //   });
  //   //console.log('pair details ========> ', pairdetail);
  // }, [pair, isFocused]);

  useEffect(() => {
    dispatch({
      type: GET_OPEN_ORDER,
      payload: {token: accessToken},
    });
    // dispatch({
    //   type: GET_OPEN_ORDER_HISTORY,
    //   payload: {
    //     token: accessToken,
    //   },
    // });
    // dispatch({
    //   type: GET_PAIRDETAIL,
    //   payload: {token: accessToken},
    // });
  }, [isFocused]);

  // useEffect(() => { dispatch({
  //   type: GET_OPEN_ORDER_HISTORY,
  //   payload: {
  //     token: accessToken,
  //   },
  // });}, [isFocused]);

  useEffect(() => {
    if (Object.keys(openOrders).length > 0) {
      if (openOrders.code == 200) {
        setOpenOrderData(openOrders.data.active);
      }
    }
  }, [openOrders, isFocused]);

  const deleteSingleOrder = item => {
    //console.log('ID DATA',item._id)
    dispatch({
      type: CANCEL_OPEN_ORDER,
      payload: {data: item?._id, token: accessToken},
    });
    dispatch({
      type: GET_OPEN_ORDER_HISTORY,
      payload: {
        token: accessToken,
      },
    });
    if (openOrdersHistoryData && openOrdersHistoryData.data) {
      if (Object.keys(openOrdersHistoryData).length > 0) {
        setOpenOrderData(openOrdersHistoryData.data);
      }
    }
    if (deleteOrder) {
      if (deleteOrder && deleteOrder.code == 200) {
        showMessage(deleteOrder.message);
      }
    }
    console.log(' DELE', deleteOrder);
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles(themeColorData).tableView}>
        <View>
          <View style={{marginHorizontal: 10, marginRight: moderateScale(60)}}>
            <Text style={[styles(themeColorData).text]}>
              {item.pair.toUpperCase()}
            </Text>
            {/* <Text style={[styles(themeColorData).text, {type =="sell"}]}>
              {item.side}/{item.type}
            </Text> */}
            {item.type == 'sell' ? (
              <Text
                style={[
                  styles(themeColorData).subtext,
                  {
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
        <View>
          <View>
            <Text
              style={[
                styles(themeColorData).subtext,
                {textAlign: 'right', left: moderateScale(20)},
              ]}>
              {item.date.slice(0, 10)} {item.date.slice(11, 19)}
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View>
              <View style={styles(themeColorData).pendingView}>
                <Text style={styles(themeColorData).pending}> Pending</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  width: getDimen(0.0002),
                  right: moderateScale(10),
                }}>
                <Text style={styles(themeColorData).subTextBold}>
                  {/* {item.amount}/ */}79/
                </Text>
                <Text
                  style={[
                    styles(themeColorData).subText,
                    {
                      width: moderateScale(20),
                      textAlign: 'left',
                    },
                  ]}>
                  {/* {item.amount} */}79
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

              <Text style={[styles(themeColorData).subText, {bottom: 0}]}>
                {''}{' '}
              </Text>
            </View>
            <TouchableOpacity onPress={() => deleteSingleOrder(item)}>
              <View style={styles(themeColorData).cancelBtnbG}>
                <Icon
                  name="close-outline"
                  size={25}
                  color={AppColors(themeColorData).Icon}
                  style={{
                    right: 2,
                    bottom: 3,
                  }}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles(themeColorData).container}>
      <FlatList
        data={openOrderData ? openOrderData : openOrders?.data?.active}
        extraData={openOrderData ? openOrderData : openOrders?.data?.active}
        renderItem={item => renderItem(item)}
        keyExtractor={(item, index) => index.toString()}
        //ListHeaderComponent={ListHeader}
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
    // HeaderView: {
    //   width: '100%',
    //   borderRadius: 6,
    //   marginHorizontal: '2%',
    //   alignItems: 'center',
    //   marginTop: 5,
    //   marginVertical: 2,
    //   height: 50,
    // },

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
      color: AppColors(themeColorData).pink,
      fontSize: textSize.h6,
      fontFamily: '',
      borderRadius: 2,
      textAlign: 'center',
      marginVertical: 2,
      fontWeight: '900',
    },
    pendingView: {
      backgroundColor: AppColors(themeColorData).redInfoBg, //'#401729',
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

export default OpenOrder;
