// import React, {useEffect, useState} from 'react';
// import {View, Text, StyleSheet, FlatList} from 'react-native';
// import {getDimen} from '../../../dimensions/dimen';
// import textSize from '../../../constants/textSize';
// import Icons from 'react-native-vector-icons/Entypo';
// import {moderateScale} from 'react-native-size-matters';

// const data = [
//   {id: 1, name: '3839.03'},
//   {id: 2, name: '3839.03'},
//   {id: 3, name: '3839.03'},
//   {id: 4, name: '3839.03'},
// ];

// const BuyView2 = () => {
//   const renderItem = ({item}) => {
//     return (
//       <View style={{marginVertical: 5}}>
//         <View
//           style={{
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//           }}>
//           <View style={{flexDirection: 'row'}}>
//             <Text style={styles(themeColorData).bluetext}> Buy</Text>
//             <Text style={[styles(themeColorData).subText, {right: 20}]}>12.02 01/04</Text>
//           </View>
//           <Text style={styles(themeColorData).redText}> Cancel</Text>
//         </View>
//         <View
//           style={{
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//           }}>
//           <Text style={styles(themeColorData).subText}> Price (USDT)</Text>
//           <Text style={styles(themeColorData).subText}> {'     '}Amount (BTC) </Text>
//           <Text style={styles(themeColorData).subText}> Exchange (BTC) </Text>
//         </View>
//         <View
//           style={{
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//           }}>
//           <Text style={styles(themeColorData).text}> 3000.000000</Text>
//           <Text style={styles(themeColorData).text}> 0.8643 </Text>
//           <Text style={styles(themeColorData).text}> 0.541 </Text>
//         </View>
//       </View>
//     );
//     // <Text style={styles(themeColorData).redText}>{item.name}</Text>;
//   };

//   return (
//     <View style={styles(themeColorData).container}>
//       {/* toolbar */}
//       <View style={styles(themeColorData).subcontainer1}>
//         {/* left view */}
//         <View
//           style={{
//             justifyContent: 'space-between',
//             flexDirection: 'row',
//             marginBottom: 10,
//           }}>
//           <Text style={styles(themeColorData).screenName}> Open Orders</Text>
//           <View style={{flexDirection: 'row'}}>
//             <Icons
//               name="text-document-inverted"
//               size={15}
//               color={AppColors(themeColorData).title}
//               style={{margin: 5}}
//             />
//             <Text style={styles(themeColorData).Name}> ALL </Text>
//           </View>
//         </View>
//         <FlatList
//           data={data}
//           renderItem={renderItem}
//           keyExtractor={item => item.id}
//         />
//       </View>
//       <View></View>
//     </View>
//   );
// };

// export default BuyView2;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#000000F0',
//   },
//   subcontainer1: {
//     backgroundColor: AppColors(themeColorData).backgroundLight,
//     padding: 10,
//   },

//   mainView: {
//     justifyContent: 'space-between',
//     flexDirection: 'row',
//   },
//   screenName: {
//     color: AppColors(themeColorData).title,
//     fontSize: textSize.h2,
//     fontFamily: '',
//     fontWeight: '700',
//   },
//   Name: {
//     color: '#838282',
//     fontSize: textSize.h2,
//     fontFamily: '',
//   },

//   redText: {
//     color: '#FF014D',
//     // fontSize: textSize.h5,
//     fontSize: 15,

//     margin: 5,
//     fontFamily: '',
//     textAlign: 'center',
//   },
//   text: {
//     color: AppColors(themeColorData).title,
//     fontSize: textSize.h5,
//     margin: 5,
//     fontFamily: '',
//     textAlign: 'center',
//   },
//   bluetext: {
//     color: '#01BBFF',
//     // fontSize: textSize.h5,
//     fontSize: 15,
//     width: getDimen(0.17),
//     margin: 5,
//   },
//   label: {
//     color: AppColors(themeColorData).title,
//     fontSize: textSize.h5,
//     margin: 5,
//     width: getDimen(0.17),
//   },

//   // 2 sub container styles
//   subText: {
//     color: '#8F8F8F',
//     fontSize: textSize.h5,
//     fontFamily: '',
//     margin: 5,
//     textAlign: 'center',
//   },
// });

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
import Icons from 'react-native-vector-icons/Entypo';
import {AppColors} from '../../../constants/appColors';
import showMessage from '../../../components/showMessage';

const BuyView2 = ({data}) => {
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [openOrderData, setOpenOrderData] = useState('');
  const openOrders = useSelector(state => state.order.openOrders);
  const pair = useSelector(state => state.order.pair);
  const pairdetail = useSelector(state => state.order.pairdetail);
  const accessToken = useSelector(state => state.login.accessToken);
  const openOrdersHistoryData = useSelector(
    state => state.order.openOrdersHistoryData,
  );
  const deleteOrder = useSelector(state => state.order.deleData);
  const themeColorData = useSelector(state => state.login.themeValue);
  const dateTime = new Date();

  useEffect(() => {
    //console.log('pair ===>', pair);
    //console.log('pair details ========> ', pairdetail);
    console.log('openOrderData', openOrderData);
  }, [pair]);

  useEffect(() => {
    dispatch({
      type: GET_OPEN_ORDER,
      payload: {token: accessToken},
    });
    dispatch({
      type: GET_PAIRDETAIL,
      payload: {token: accessToken},
    });
    setOpenOrderData(openOrdersHistoryData.data);
  }, [isFocused]);

  useEffect(() => {
    dispatch({
      type: GET_OPEN_ORDER_HISTORY,
      payload: {
        token: accessToken,
      },
    });
    setOpenOrderData(openOrdersHistoryData.data);
  }, [isFocused]);

  useEffect(() => {
    if (Object.keys(openOrders).length > 0) {
      if (openOrders.code == 200) {
        setOpenOrderData(openOrders.data.active);
      }
    }
  }, [openOrders]);

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
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles(themeColorData).tableView}>
        <View>
          <View style={{marginHorizontal: 10, marginRight: moderateScale(60)}}>
            <Text style={[styles(themeColorData).text, {}]}>
              {item.pair.toUpperCase()}
            </Text>
            {/* <Text style={[styles(themeColorData).text, {}, {type =="sell"}]}>
              {item.side}/{item.type}
            </Text> */}
            {item.type == 'sell' ? (
              <Text
                style={[styles(themeColorData).subtext, {color: '#FF0458'}]}>
                {item.side}/{item.type}
              </Text>
            ) : (
              <Text
                style={[styles(themeColorData).subtext, {color: '#08D870'}]}>
                {item.side}/{item.type}
              </Text>
            )}
            <Text style={styles(themeColorData).subtext}> Amount</Text>
            <Text style={styles(themeColorData).subtext}> Price</Text>
          </View>
        </View>
        <View style={{paddingHorizontal: textSize.componentsDifference}}></View>
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
            <TouchableOpacity onPress={() => deleteSingleOrder(item)}>
              <View
                style={{
                  backgroundColor: AppColors(themeColorData).cancelBtnBg,
                  width: moderateScale(20),
                  height: moderateScale(20),
                  borderRadius: 20,
                  marginHorizontal: 10,
                  top: 20,
                }}>
                <Icon
                  name="close-outline"
                  size={25}
                  color={AppColors(themeColorData).Icon}
                  style={{
                    //textAlign: 'center',
                    right: 2,
                    bottom: 3,
                  }}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {/* 
       
        <Text style={[styles(themeColorData).text, {left: moderateScale(0)}]}>
         
        </Text>
        <Text style={[styles(themeColorData).text, {left: moderateScale(0)}]}>
          {parseFloat(item.price).toFixed(8).toString()}
        </Text>
        <Text style={[styles(themeColorData).text, {left: moderateScale(10)}]}>
          {parseFloat(item.amount).toFixed(8).toString()}
        </Text>
        <Text style={[styles(themeColorData).text, {left: moderateScale(20)}]}>
          {item.status}
        </Text>

        <Icon
          name="close-outline"
          size={25}
          color="red"
          style={{
            textAlign: 'center',
            width: moderateScale(100),
            right: moderateScale(20),
          }}
        /> */}
      </View>
    );
  };

  const HeaderData = [
    {
      id: '1',
      title: '',
    },
    {
      id: '2',
      title: '',
    },
    {
      id: '3',
      title: ' ',
    },
  ];

  // const ListHeader = () => {
  //   //View to set in Header
  //   return (
  //     <FlatList
  //       numColumns={HeaderData.length}
  //       data={HeaderData}
  //       renderItem={({item, index}) => (
  //         <View style={styles(themeColorData).TitleView}>
  //           <Text style={styles(themeColorData).Titletext}>{item.title}</Text>
  //         </View>
  //       )}
  //       keyExtractor={item => item.id}
  //     />
  //   );
  // };
  return (
    <View style={styles(themeColorData).container}>
      <View style={styles(themeColorData).subcontainer1}>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            marginHorizontal: moderateScale(16),
            borderRadius: 5,
            margin: 5,
          }}>
          <Text style={styles(themeColorData).screenName}> Open Orders</Text>
          <View style={{flexDirection: 'row'}}>
            <Icons
              name="text-document-inverted"
              size={15}
              color={AppColors(themeColorData).title}
              style={{margin: 5}}
            />
            <Text style={styles(themeColorData).Name}> ALL </Text>
          </View>
        </View>
        <View style={{height: '90%'}}>
          <FlatList
            data={openOrderData}
            renderItem={item => renderItem(item)}
            keyExtractor={(item, index) => index.toString()}
            //ListHeaderComponent={ListHeader}
            initialNumToRender={7}
            maxToRenderPerBatch={10}
          />
        </View>
      </View>
    </View>
  );
};

const styles = themeColorData =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
      marginTop: moderateScale(33),
    },
    subcontainer1: {
      backgroundColor: AppColors(themeColorData).backgroundLight,
      padding: 10,
      borderRadius: 5,
    },

    TitleView: {
      flexDirection: 'row',
      backgroundColor: AppColors(themeColorData).background,
      padding: textSize.componentsDifferenceLow,
    },
    text: {
      color: AppColors(themeColorData).title,
      fontSize: textSize.h3,
      textAlign: 'left',
      width: moderateScale(100),
      marginVertical: 2,
      fontWeight: '700',
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
      padding: textSize.componentsDifference,
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      // padding: 10,
      marginVertical: 4,
      backgroundColor: AppColors(themeColorData).backgroundLight,
      height: 69,
      borderRadius: 10,
      width: '100%',
      paddingRight: 10,
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
    },
    pendingView: {
      backgroundColor: AppColors(themeColorData).redInfoBg, //'#401729',
      borderRadius: 2,
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
    mainView: {
      justifyContent: 'space-between',
      flexDirection: 'row',
    },
    screenName: {
      color: AppColors(themeColorData).title,
      fontSize: textSize.h2,
      fontFamily: '',
      fontWeight: '700',
    },
    Name: {
      color: AppColors(themeColorData).inputDark,
      fontSize: textSize.h2,
      fontFamily: '',
    },
    subTextBold: {
      color: AppColors(themeColorData).inputDark,
      fontSize: textSize.h6,
      textAlign: 'right',
      width: moderateScale(100),
      marginVertical: 2,
      fontWeight: '900',
    },
  });

export default BuyView2;
