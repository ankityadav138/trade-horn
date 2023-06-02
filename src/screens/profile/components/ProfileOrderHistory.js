import {useTheme} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import textSize from '../../../constants/textSize';
import DropDownPicker from 'react-native-dropdown-picker';
import {CURRENCY, ORDER_HISTORY} from '../../../store/action';
import Icons from 'react-native-vector-icons/Ionicons';
import Toolbar from '../../../constants/toolbar';
import SelectDropdown from 'react-native-select-dropdown';
import {useIsFocused} from '@react-navigation/native';
import {getDimen} from '../../../dimensions/dimen';
import {moderateScale} from 'react-native-size-matters';

const ProfileOrderHistory = ({data, navigation}) => {
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [orderData, setOrderData] = useState('');
  const [open, setOpen] = useState(false);
  const [open01, setOpen01] = useState(false);
  const [open02, setOpen02] = useState(false);
  const [open03, setOpen03] = useState(false);
  const [open04, setOpen04] = useState(false);

  const [value, setValue] = useState('all');
  const [value01, setValue01] = useState('all');
  const [value02, setValue02] = useState('all');
  const [value03, setValue03] = useState('all');
  const [value04, setValue04] = useState('all');

  const orderHistoryData = useSelector(state => state.user.orderHistory);
  // console.log(
  //   'order history data ========================++++++++',
  //   orderHistoryData,
  // );
  const accessToken = useSelector(state => state.login.accessToken);
  //const accessToken = 'eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.eyJvcHRpb24iOiJ1c2VyX2xvZ2luIiwiaWQiOiI2MTY3YjZhZGQ1NmQ0ZmFmOTIzN2U1M2EiLCJzdGF0dXMiOnRydWUsImlhdCI6MTY0NjEzNTE3NX0.rn5v6RFCHG2i4AN6I0TOopo00XXUYZWCpAhSwIFEUKcG5kERod-5O33iwRmqNu50'
  const [currencydata, setCurrencyData] = useState(false);
  const Days = ['All', ' 7', '30', '60'];
  //const Data3 = ['All', 'noc', 'btc', 'eth', 'usdt'];
  const Data3 = ['All', 'NOC', 'BTC', 'ETH', 'USDT'];
  const Data4 = ['ALL', 'LIMIT', 'STOP'];
  //const Data4 = ['all', 'limit', 'stop'];
  const order = ['ALL', 'BUY', 'SELL'];
  // const order = ['all', 'buy', 'sell'];

  const currency = useSelector(state => state.order.currency);

  useEffect(() => {
    // console.log('orderHistoryData', orderHistoryData);
    dispatch({
      type: ORDER_HISTORY,
      payload: {token: accessToken},
    });
  }, [isFocused]);

  useEffect(() => {
    if (orderHistoryData && orderHistoryData.data) {
      if (Object.keys(orderHistoryData).length > 0) {
        setOrderData(orderHistoryData.data);
        // console.log('ACTIVE OPEN DATA ===>', openOrders.data);
      }
    }
  }, [orderHistoryData]);

  useEffect(() => {
    dispatch({
      type: CURRENCY,
      payload: {token: accessToken},
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

  const getData = selectedItem => {
    // console.log('selected index +++++++++++++++++++++++++++', selectedItem);

    dispatch({
      type: ORDER_HISTORY,
      payload: {
        data: {
          date: parseInt(value),
          firstcurrency: value01,
          secondcurrency: value02,
          side: value03,
          type: value04,
        },
        token: accessToken,
      },
    });
    if (orderHistoryData && orderHistoryData.data) {
      if (Object.keys(orderHistoryData).length > 0) {
        setOrderData(orderHistoryData.data);
        // console.log('ACTIVE OPEN DATA ===>', openOrders.data);
      }
    }
  };

  const HeaderData = [
    {
      id: '1',
      title: 'Date',
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
      title: '    Price',
    },
    {
      id: '5',
      title: '   Amount',
    },
    {
      id: '6',
      title: '       Filled',
    },
    {
      id: '7',
      title: '         Pair Fees',
    },
    {
      id: '8',
      title: '    Action',
    },
    {
      id: '9',
      title: '   Status',
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
  const renderItem = ({item}) => {
    return (
      <View style={styles.tableView}>
        <Text style={[styles.text]}>{item.date.slice(0, 10)}</Text>
        <Text style={[styles.text]}>{item.pair.toUpperCase()}</Text>
        <Text style={[styles.text]}>
          {item.type}/{item.side}
        </Text>
        <Text style={styles.text}>
          {'   '} {item.price}
          {item.secondcurrency.toUpperCase()}
        </Text>
        <Text style={styles.text}>
          {'  '} {item.amount}
          {item.firstcurrency.toUpperCase()}
        </Text>
        <Text style={styles.text}>
          {'       '} {item.usd_balance}
          {item.firstcurrency.toUpperCase()}
        </Text>
        <Text style={[styles.text, {left: moderateScale(27)}]}>
          {item.fee}
          {item.firstcurrency.toUpperCase()}
        </Text>
        <Text style={[styles.text, {left: moderateScale(12)}]}>---------</Text>
        <Text style={[styles.text, {left: moderateScale(10)}]}>
          {item.status}{' '}
        </Text>
      </View>
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
          Order History
        </Text>
      </View>
      <LinearGradient
        style={{
          width: '90%',
          borderRadius: moderateScale(15),
          marginHorizontal: '5%',
          marginTop: '5%',
          // flex: 1,
        }}
        colors={[
          colors.transparentGradientColor1,
          colors.transparentGradientColor2,
        ]}>
        <View>
          <View>
            <View style={{padding: moderateScale(5)}}>
              <Text
                style={{
                  color: colors.heading,
                  fontSize: textSize.h5,
                  marginLeft: 10,
                  paddingVertical: '5%',
                }}>
                Order History
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
                  data={Days}
                  defaultButtonText="All"
                  buttonTextStyle={styles.DDtextstyle}
                  buttonStyle={styles.showEntryDropView}
                  rowTextStyle={styles.DDtextstyle}
                  onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index);
                  }}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    setOpen02(selectedItem);
                    setValue(selectedItem);
                    getData(selectedItem);
                    return selectedItem;
                  }}
                />
                <Icon
                  name="chevron-down-outline"
                  size={20}
                  style={styles.icon}
                />
              </View>
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
                    setOpen02(selectedItem);
                    setValue01(selectedItem.toLowerCase());
                    return selectedItem;
                  }}
                />
                <Icon
                  name="chevron-down-outline"
                  size={18}
                  style={styles.icon}
                />
              </View>
              <Text
                style={{
                  color: '#BAC7D3',
                  bottom: '3%',
                }}>
                {''} {''}/
              </Text>
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
                  data={Data3}
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
                    return selectedItem;
                  }}
                />
                <Icon
                  name="chevron-down-outline"
                  size={18}
                  style={styles.icon}
                />
              </View>
              <View
                style={{
                  width: '47%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <SelectDropdown
                  data={order}
                  defaultButtonText="All"
                  buttonTextStyle={styles.DDtextstyle}
                  buttonStyle={styles.showEntryDropView}
                  rowTextStyle={styles.DDtextstyle}
                  onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index);
                  }}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    setOpen02(selectedItem);
                    setValue03(selectedItem.toLowerCase());
                    return selectedItem;
                  }}
                />
                <Icon
                  name="chevron-down-outline"
                  size={18}
                  style={styles.icon}
                />
              </View>
              <Text
                style={{
                  color: '#BAC7D3',
                  bottom: '1%',
                }}>
                {''} {''}
              </Text>
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
                  data={Data4}
                  defaultButtonText="All"
                  buttonTextStyle={styles.DDtextstyle}
                  buttonStyle={styles.showEntryDropView}
                  rowTextStyle={styles.DDtextstyle}
                  onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index);
                  }}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    setOpen02(selectedItem);
                    setValue04(selectedItem.toLowerCase());
                    return selectedItem;
                  }}
                />
                <Icon
                  name="chevron-down-outline"
                  size={18}
                  style={styles.icon}
                />
              </View>
              <View
                style={{
                  width: '47%',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon name="ios-square-outline" size={18} color="#85C1FF" />
                <Text
                  style={{
                    marginHorizontal: moderateScale(2),
                    color: '#85C1FF',
                    fontSize: textSize.p,
                    width: getDimen(0.3),
                  }}>
                  Hide Cancelled order
                </Text>
              </View>
              <Text
                style={{
                  color: '#BAC7D3',
                  bottom: '1%',
                }}>
                {''}
                {''}
              </Text>
            </View>
            {/* <View style={{marginVertical: textSize.componentsDifferenceLow}} /> */}
          </View>
          <View style={{marginTop: moderateScale(10)}}>
            <ScrollView horizontal>
              <FlatList
                data={orderData}
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
  //new
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
    width: moderateScale(120),
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
  tableView: {
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
    width: moderateScale(120),
  },

  // old
  // HeaderView: {
  //   flex: 1,
  //   backgroundColor: '#0466C0',
  // },
  // text: {
  //   color: '#FFF',
  //   fontSize: textSize.h6,
  //   textAlign: 'left',
  //   width: moderateScale(120),
  //   marginVertical: moderateScale(10),
  // },
  // text1: {
  //   color: '#FFF',
  //   fontSize: textSize.h6,
  //   textAlign: 'left',
  //   width: moderateScale(120),
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
  // showEntryDropView: {
  //   width: '98%',
  //   height: moderateScale(30),
  //   backgroundColor: '#BAC7D3',
  // },
  // icon: {
  //   right: moderateScale(30),
  //   marginTop: moderateScale(10),
  // },
  // DDtextstyle: {
  //   fontSize: textSize.h6,
  //   textAlign: 'center',
  // },
});

export default ProfileOrderHistory;
