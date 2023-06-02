import {useTheme} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import textSize from '../../../constants/textSize';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  CURRENCY,
  GET_OPEN_ORDER,
  GET_OPEN_ORDER_HISTORY,
  CANCEL_OPEN_ORDER,
} from '../../../store/action';
import {useDispatch, useSelector} from 'react-redux';
import Icons from 'react-native-vector-icons/Ionicons';
import Toolbar from '../../../constants/toolbar';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/Ionicons';
import showMessage from '../../../components/showMessage';
import {useIsFocused} from '@react-navigation/native';
import {getDimen} from '../../../dimensions/dimen';
import {moderateScale} from 'react-native-size-matters';

const ProfileOpenOrder = ({data, navigation}) => {
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [open, setOpen] = useState(false);
  const [open01, setOpen01] = useState(false);
  const [open02, setOpen02] = useState(false);
  const [open03, setOpen03] = useState(false);
  const [currencydata, setCurrencyData] = useState(false);
  const [openOrderData, setOpenOrderData] = useState('');
  // console.log("currencycyyyyyyyyyyyy================", currencydata)
  const [value, setValue] = useState('all');
  const [value01, setValue01] = useState('All');
  const [value02, setValue02] = useState('all');
  const [value03, setValue03] = useState('all');
  const [coins, setCoins] = useState('all');

  //const Data3 = ['all', 'noc', 'btc', 'eth', 'usdt'];
  const Data3 = ['ALL', 'NOC', 'BTC', 'ETH', 'USDT'];
  const Data2 = ['ALL', 'BUY', 'SELL'];
  const Data4 = ['ALL', 'LIMIT', 'STOP'];

  //const Data2 = ['all', 'buy', 'sell'];
  //const Data4 = ['all', 'limit', 'stop'];

  // const openOrdersData = useSelector(state => state.user.openOrder);
  const currency = useSelector(state => state.order.currency);
  const accessToken = useSelector(state => state.login.accessToken);
  // const accessToken = "eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.eyJvcHRpb24iOiJ1c2VyX2xvZ2luIiwiaWQiOiI2MTY3YjZhZGQ1NmQ0ZmFmOTIzN2U1M2EiLCJzdGF0dXMiOnRydWUsImlhdCI6MTY0NjEzNTE3NX0.rn5v6RFCHG2i4AN6I0TOopo00XXUYZWCpAhSwIFEUKcG5kERod-5O33iwRmqNu50"
  const openOrdersHistoryData = useSelector(
    state => state.order.openOrdersHistoryData,
  );
  // console.log(
  //   'openorders=============================++++++++++++',
  //   openOrderData,
  // );
  const deleteOrder = useSelector(state => state.order.deleData);
  // console.log(
  //   'deleteOrder=============================++++++++++++',
  //   deleteOrder,
  // );

  useEffect(() => {
    dispatch({
      type: GET_OPEN_ORDER_HISTORY,
      payload: {
        // data: {
        //   "firstcurrency": "btc",
        //   "secondcurrency": "All",
        //   "type": "all",
        //   "side": "all",
        // },
        token: accessToken,
      },
    });
  }, [isFocused]);

  useEffect(() => {
    if (openOrdersHistoryData && openOrdersHistoryData.data) {
      if (Object.keys(openOrdersHistoryData).length > 0) {
        setOpenOrderData(openOrdersHistoryData.data);
        // console.log('ACTIVE OPEN DATA ===>', openOrders.data);
      }
    }
  }, [openOrdersHistoryData]);

  const getData = selectedItem => {
    // console.log('selected item=======================', selectedItem);
    dispatch({
      type: GET_OPEN_ORDER_HISTORY,
      payload: {
        data: {
          firstcurrency: value,
          secondcurrency: value01,
          type: value02,
          side: value03,
        },
        token: accessToken,
      },
    });

    if (openOrdersHistoryData && openOrdersHistoryData.data) {
      if (Object.keys(openOrdersHistoryData).length > 0) {
        setOpenOrderData(openOrdersHistoryData.data);
        // console.log('ACTIVE OPEN DATA ===>', openOrders.data);
      }
    }
  };

  // const getData1 = (selectedItem) => {
  //   console.log("selected item=======================", selectedItem)
  //   dispatch({
  //     type: GET_OPEN_ORDER_HISTORY,
  //     payload: {
  //       data: {
  //         "firstcurrency": selectedItem.toString(),
  //         "secondcurrency": selectedItem.toString(),
  //         "type": "all",
  //         "side": "all"
  //       },
  //       token: accessToken
  //     },
  //   });
  //   if (Object.keys(openOrdersHistoryData).length > 0) {
  //     setOpenOrderData(openOrdersHistoryData.data);
  //     // console.log('ACTIVE OPEN DATA ===>', openOrders.data);
  //   }
  // }

  // const getData2 = (selectedItem) => {
  //   console.log("selected item=======================", selectedItem)
  //   dispatch({
  //     type: GET_OPEN_ORDER_HISTORY,
  //     payload: {
  //       data: {
  //         "firstcurrency": selectedItem.toString(),
  //         "secondcurrency": "All",
  //         "type": selectedItem.toString(),
  //         "side": "all"
  //       },
  //       token: accessToken
  //     },
  //   });

  //   if (Object.keys(openOrdersHistoryData).length > 0) {
  //     setOpenOrderData(openOrdersHistoryData.data);
  //     // console.log('ACTIVE OPEN DATA ===>', openOrders.data);
  //   }
  // }

  // const getData3 = (selectedItem) => {
  //   console.log("selected item=======================", selectedItem)
  //   dispatch({
  //     type: GET_OPEN_ORDER_HISTORY,
  //     payload: {
  //       data: {
  //         "firstcurrency": selectedItem.toString(),
  //         "secondcurrency": "All",
  //         "type": "all",
  //         "side": selectedItem.toString(),
  //       },
  //       token: accessToken
  //     },
  //   });

  //   if (Object.keys(openOrdersHistoryData).length > 0) {
  //     setOpenOrderData(openOrdersHistoryData.data);
  //     // console.log('ACTIVE OPEN DATA ===>', openOrders.data);
  //   }
  // }

  useEffect(() => {
    dispatch({
      type: CURRENCY,
      payload: {
        token: accessToken,
      },
    });
    let tempArray = [];
    if (currency && currency.data) {
      currency.currency.map(item => {
        tempArray.push(item.symbol.toUpperCase());
      });
      setCurrencyData(tempArray);

      //console.log('tempArray', tempArray);
    } else {
      tempArray.push('BTC', 'INR', 'USDT', 'BNB', 'TRX', 'ETH');
      setCurrencyData(tempArray);
    }
  }, []);

  const deleteSingleOrder = item => {
    //console.log('ID DATA',item._id)

    dispatch({
      type: CANCEL_OPEN_ORDER,
      payload: {data: item._id, token: accessToken},
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
      <View style={styles.flatListContainer}>
        <Text style={[styles.text]}>{item.date.slice(0, 10)}</Text>
        <Text style={[styles.text]}>{item.pair.toUpperCase()}</Text>
        <Text style={[styles.text]}>
          {item.type}/{item.side}
        </Text>
        <Text style={styles.text}>
          {parseFloat(item.price).toFixed(8).toString()} {''}{' '}
          {item.secondcurrency.toUpperCase()}
        </Text>
        <Text style={styles.text}>
          {parseFloat(item.amount).toFixed(8).toString()} {''}{' '}
          {item.firstcurrency.toUpperCase()}
        </Text>
        <Text style={styles.text}>
          {item.filled} {''} {item.firstcurrency.toUpperCase()}
        </Text>

        <Text style={[styles.text, {left: moderateScale(25)}]}>
          {item.status}
        </Text>
        {/* <Text style={[styles.text, {color: 'green'}]}>
          {item.action == '' ? (
            <Icon name="close-outline" size={20} color="red" />
          ) : (
            <Icon name="close-outline" size={20} color="red" />
          )}
        </Text> */}
        <TouchableOpacity
          onPress={() => deleteSingleOrder(item)}
          style={styles.text}>
          <Icon
            name="close-outline"
            size={25}
            color="red"
            style={{textAlign: 'left'}}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const HeaderData = [
    {
      id: '1',
      title: ' Date',
    },
    {
      id: '2',
      title: 'Pair',
    },
    {
      id: '3',
      title: 'Side/Type',
    },
    {
      id: '4',
      title: 'Price',
    },
    {
      id: '5',
      title: 'Amount',
    },
    {
      id: '6',
      title: 'Filled',
    },
    {
      id: '7',
      title: '        Status',
    },

    {
      id: '8',
      title: 'Action',
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
  return (
    <View style={styles.HeaderView}>
      <Toolbar navigation={navigation} />
      <View style={{flexDirection: 'row', marginTop: '5%'}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icons
            style={{
              color: colors.heading,
              textAlign: 'left',
              marginLeft: moderateScale(22),
            }}
            name="arrow-back"
            size={20}
            color={'white'}
          />
        </TouchableOpacity>
        <Text
          style={{
            color: colors.heading,
            fontSize: textSize.h3,
            marginLeft: moderateScale(5),
            width: getDimen(1),
          }}>
          Open orders
        </Text>
      </View>
      <LinearGradient
        style={{
          width: '90%',
          borderRadius: 6,
          marginHorizontal: '5%',
          marginTop: '5%',
          flex: 1,
        }}
        colors={[
          colors.transparentGradientColor1,
          colors.transparentGradientColor2,
        ]}>
        <View style={{}}>
          <View
            style={{
              flexDirection: 'row',
              padding: moderateScale(5),
              justifyContent: 'space-between',
              paddingVertical: '5%',
            }}>
            <Text
              style={{
                color: colors.heading,
                fontSize: textSize.h5,
                marginLeft: moderateScale(10),
                width: getDimen(0.62),
              }}>
              Open orders
            </Text>
            <Text
              style={{
                color: '#85C1FF',
                fontSize: textSize.p,
                marginLeft: moderateScale(10),
                width: getDimen(1),
                top: '3%',
              }}>
              Cancel all
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: '5%',
            }}>
            <View
              style={{
                width: '47%',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <SelectDropdown
                data={currencydata}
                defaultButtonText="All"
                buttonTextStyle={styles.DDtextstyle}
                buttonStyle={styles.showEntryDropView}
                rowTextStyle={styles.DDtextstyle}
                onSelect={(selectedItem, index) => {
                  console.log(selectedItem, index);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  setOpen(selectedItem);
                  setValue(selectedItem.toLowerCase());
                  getData(selectedItem);

                  return selectedItem;
                }}
              />
              <Icon name="chevron-down-outline" size={18} style={styles.icon} />
            </View>
            {/* <Text
              style={{
                color: '#BAC7D3',
                top: '5%',
              }}>
              /
            </Text> */}
            <View
              style={{
                width: '47%',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <SelectDropdown
                data={Data3}
                defaultButtonText="All"
                buttonTextStyle={styles.DDtextstyle}
                buttonStyle={styles.showEntryDropView}
                rowTextStyle={styles.DDtextstyle}
                onSelect={(selectedItem, index) => {
                  console.log(selectedItem, index);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  setOpen01(selectedItem);
                  setValue01(selectedItem.toLowerCase());
                  getData(selectedItem);
                  return selectedItem;
                }}
              />
              <Icon name="chevron-down-outline" size={18} style={styles.icon} />
            </View>
          </View>
          <View style={{marginVertical: textSize.componentsDifferenceLow}} />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: '5%',
            }}>
            <View
              style={{
                width: '47%',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <SelectDropdown
                data={Data2}
                defaultButtonText="All"
                buttonTextStyle={styles.DDtextstyle}
                buttonStyle={styles.showEntryDropView}
                rowTextStyle={styles.DDtextstyle}
                onSelect={(selectedItem, index) => {
                  console.log(selectedItem, index);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  setOpen02(selectedItem);
                  setValue02(selectedItem.toLowerCase());
                  getData(selectedItem);
                  return selectedItem;
                }}
              />
              <Icon name="chevron-down-outline" size={18} style={styles.icon} />
            </View>
            <View
              style={{
                width: '47%',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <SelectDropdown
                data={Data4}
                defaultButtonText="All"
                buttonTextStyle={styles.DDtextstyle}
                buttonStyle={styles.showEntryDropView}
                onSelect={(selectedItem, index) => {
                  console.log(selectedItem, index);
                }}
                rowTextStyle={styles.DDtextstyle}
                buttonTextAfterSelection={(selectedItem, index) => {
                  setOpen03(selectedItem);
                  setValue03(selectedItem.toLowerCase());
                  getData(selectedItem);
                  return selectedItem;
                }}
              />
              <Icon name="chevron-down-outline" size={18} style={styles.icon} />
            </View>
          </View>

          <View style={{marginVertical: textSize.componentsDifferenceLow}} />

          <View style={{}}>
            <ScrollView horizontal>
              <FlatList
                data={openOrderData}
                renderItem={item => renderItem(item)}
                keyExtractor={(item, index) => index.toString()}
                ListHeaderComponent={ListHeader}
              />
            </ScrollView>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  HeaderView: {
    flex: 1,
    backgroundColor: '#0466C0',
  },
  showEntryDropView: {
    width: '98%',
    height: moderateScale(30),
    backgroundColor: '#BAC7D3',
  },
  icon: {
    right: moderateScale(30),
    marginTop: moderateScale(6),
  },
  // text: {
  //   color: '#FFF',
  //   fontSize: textSize.h6,
  //   textAlign: 'left',
  //   width: moderateScale(100),
  //   marginVertical: moderateScale(6),
  // },
  // text1: {
  //   color: '#FFF',
  //   fontSize: textSize.h6,
  //   textAlign: 'left',
  //   width: moderateScale(100),
  //   marginVertical: moderateScale(3),
  // },
  // TitleView: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   backgroundColor: 'black',
  //   padding: textSize.componentsDifferenceLow,
  //   paddingLeft: moderateScale(25),
  // },
  // tableView: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  // },
  DDtextstyle: {
    fontSize: textSize.h6,
    textAlign: 'center',
  },
  TitleView: {
    flexDirection: 'row',
    backgroundColor: 'black',
    padding: textSize.componentsDifferenceLow,
  },
  text: {
    color: '#FFF',
    fontSize: textSize.h6,
    textAlign: 'left',
    width: moderateScale(100),
  },

  FlatListHeaderView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'black',
    height: getDimen(0.11),
    width: moderateScale(130),
    paddingLeft: moderateScale(22),
    paddingRight: moderateScale(22),
    borderTopWidth: 0.5,
  },
  textStyle: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '500',
    fontSize: textSize.h5,
    width: moderateScale(90),
  },
  textStyle1: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '500',
    fontSize: textSize.h5,
    // width: 120,
  },
  flatListContainer: {
    // flex: 1,
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'space-between',
    justifyContent: 'space-between',
    padding: textSize.componentsDifference,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 10,
  },
  Titletext: {
    color: '#fff',
    fontSize: textSize.h5,
    textAlign: 'left',
    width: moderateScale(100),
  },
});

export default ProfileOpenOrder;
