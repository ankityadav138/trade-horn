import {useTheme} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import textSize from '../../../constants/textSize';
import DropDownPicker from 'react-native-dropdown-picker';
import SelectDropdown from 'react-native-select-dropdown';
import {
  CRYPTO_HISTORY,
  FIAT_HISTORY,
  WALLET_HISTORY,
  CURRENCY,
} from '../../../store/action';
import Toolbar from '../../../constants/toolbar';
import Icons from 'react-native-vector-icons/Ionicons';
import {getDimen} from '../../../dimensions/dimen';
import WalletHistory from './WalletHistory';
import CryptoHistory from './CryptoHistory';
import ExportHistory from './walletHistory/component/ExportHistory';
import Deposite from './walletHistory/component/Deposite';
import Withdraw from './walletHistory/component/Withdraw';
import DatePicker from 'react-native-datepicker';
import {moderateScale} from 'react-native-size-matters';

const ProfileWalletHistory = ({data, navigation}) => {
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const [hide, setHide] = useState(false);
  const [fromDatevalue, setFromDateValue] = useState('');
  const [currencydata, setCurrencyData] = useState(false);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('Crypto');
  // console.log('value   ', value);
  const [items, setItems] = useState([
    {label: 'Fiat', value: 'Fiat'},
    {label: 'crypto', value: 'crypto'},
  ]);

  const [fiatOpen01, setFiatOpen01] = useState(false);
  const [fiatValue01, setFiatValue01] = useState(false);
  // console.log('fiatValue01    ', fiatValue01);
  const fiatData01 = ['all', 'deposite', 'withdraw'];
  // const [fiatItems01, setFiatItems01] = useState([
  //   { label: 'All', value: 'All' },
  //   { label: 'Fiat Deposit', value: 'Deposite' },
  //   { label: 'Fiat Withdraw', value: 'Withdrawe' },
  // ]);

  const [fiatOpen02, setFiatOpen02] = useState(false);
  const [fiatValue02, setFiatValue02] = useState('All');
  const fiatData02 = ['All', 'Pending', 'Completed', 'Cancelled'];
  // const [fiatItems02, setFiatItems02] = useState([
  //   { label: 'All', value: 'All' },
  //   { label: 'Pending', value: 'Pending' },
  //   { label: 'Completed', value: 'Completede' },
  //   { label: 'Camcelled', value: 'Camcellede' },
  // ]);

  const [cryptoOpen01, setCryptoOpen01] = useState(false);
  const [cryptoValue01, setCryptoValue01] = useState(null);
  const [cryptoitems01, setCryptotItems01] = useState([
    {label: 'All', value: 'All'},
    {label: 'Deposit', value: 'Deposite'},
    {label: 'Withdraw', value: 'Withdrawe'},
  ]);
  const cryptoData01 = ['all', 'Deposit', 'Withdraw'];

  const [cryptoOpen02, setCryptoOpen02] = useState(false);
  const [cryptoValue02, setCryptoValue02] = useState(null);
  const cryptopData02 = ['All', 'Pending', 'Completed', 'Cancelled'];
  // const [cryptoitems02, setCryptotItems02] = useState([
  //   { label: 'All', value: 'All' },
  //   { label: 'Pending', value: 'Pending' },
  //   { label: 'Completed', value: 'Completede' },
  //   { label: 'Camcelled', value: 'Camcellede' },
  // ]);
  const [date, setDate] = useState(new Date());
  // const [open, setOpen] = useState(false);

  const [cryptoOpen03, setCryptoOpen03] = useState(false);
  const [cryptoValue03, setCryptoValue03] = useState(null);
  const [cryptoitems03, setCryptotItems03] = useState([
    {label: 'All', value: 'all'},
    {label: 'USDT', value: 'usdt'},
    {label: 'INR', value: 'inr'},
    {label: 'TRX', value: 'trx'},
    {label: 'BTC', value: 'btc'},
    {label: 'BNB', value: 'bnb'},
    {label: 'ETH', value: 'eth'},
    {label: 'LINK', value: 'link'},
    {label: 'SOL', value: 'sol'},
    {label: 'ADA', value: 'ada'},
    {label: 'QWW', value: 'qww'},
    {label: 'ERCTT', value: 'erctt'},
    {label: 'DOGE', value: 'doge'},
    {label: 'SHIB', value: 'shib'},
    {label: 'LTC', value: 'ltc'},
    {label: 'ATOM', value: 'atom'},
    {label: 'THETA', value: 'theta'},
    {label: 'AVAX', value: 'avax'},
    {label: 'USDC', value: 'usdc'},
    {label: 'DOT', value: 'dot'},
    {label: 'UNI', value: 'uni'},
    {label: 'COMP', value: 'comp'},
    {label: 'BORA', value: 'bora'},
    {label: 'RVN', value: 'rvn'},
    {label: 'HAM', value: 'ham'},
    {label: 'GRT', value: 'grt'},
    {label: 'SAND', value: 'sand'},
    {label: 'EFI', value: 'comp'},
    {label: 'XRP', value: 'xrp'},
    {label: 'BCH', value: 'bch'},
    {label: 'XLM', value: 'xlm'},
    {label: 'XTZ', value: 'xtz'},
    {label: 'WRX', value: 'wrx'},
    {label: 'EOS', value: 'eos'},
    {label: 'ZIL', value: 'zil'},
    {label: 'POLY', value: 'poly'},
    {label: 'DENT', value: 'dent'},
    {label: 'BTT', value: 'btt'},
    {label: 'CELR', value: 'celt'},
    {label: 'XMR', value: 'xmr'},
    {label: 'ALGO', value: 'algo'},
    {label: 'ETC', value: 'etc'},
    {label: 'MIOTA', value: 'miota'},
    {label: 'WAVES', value: 'waves'},
    {label: 'FTM', value: 'ftm'},
    {label: 'LSK', value: 'lsk'},
    {label: 'STEEM', value: 'steem'},
    {label: 'NANO', value: 'nao'},
    {label: 'BTG', value: 'btg'},
    {label: 'XEM', value: 'xem'},
    {label: 'ARDR', value: 'ARDR'},
    {label: 'STRAX', value: 'STRAX'},
    {label: 'NAS', value: 'NAS'},
    {label: 'ONE', value: 'ONE'},
    {label: 'HIVE', value: 'HIVE'},
    {label: 'BAND', value: 'BAND'},
    {label: 'JST', value: 'JST'},
    {label: 'DASH', value: 'DASH'},
    {label: 'NCASH', value: 'NCASH'},
    {label: 'MANA', value: 'MANA'},
    {label: 'BAT', value: 'BAT'},
    {label: 'IOST', value: 'IOST'},
    {label: 'HOT', value: 'HOT'},
    {label: 'TUSD', value: 'TUSD'},
    {label: 'QTUM', value: 'QTUM'},
    {label: 'ZEC', value: 'ZEC'},
    {label: 'ENJ', value: 'ENJ'},
    {label: 'CHZ', value: 'CHZ'},
    {label: 'KAVA', value: 'KAVA'},
    {label: 'ANKR', value: 'ANKR'},
    {label: 'FTT', value: 'FTT'},
    {label: 'CTSI', value: 'CTSI'},
    {label: 'CHR', value: 'CHR'},
    {label: 'TOMO', value: 'TOMO'},
    {label: 'STX', value: 'CHR'},
    {label: '1INCH', value: '1INCH'},
    {label: 'AERGO', value: 'AERGO'},
    {label: 'AGIX', value: 'AGIX'},
    {label: 'AION', value: 'AION'},
    {label: 'ALPHA', value: 'ALPHA'},
    {label: 'APPC', value: 'APPC'},
    {label: 'ATA', value: 'ATA'},
    {label: 'ARK', value: 'ARK'},
    {label: 'BADGER', value: 'badger'},
    {label: 'BAKE', value: 'bake'},
    {label: 'BEAM', value: 'beam'},
    {label: 'APPC', value: 'APPC'},
    {label: 'APPC', value: 'APPC'},
    {label: 'APPC', value: 'APPC'},
    {label: 'APPC', value: 'APPC'},
    {label: 'APPC', value: 'APPC'},
    {label: 'APPC', value: 'APPC'},
    {label: 'APPC', value: 'APPC'},
  ]);

  const fiatHistoryData = useSelector(state => state.user.fiatHistory);
  const cryptoHistoryData = useSelector(state => state.user.cryptoHistory);
  const accessToken = useSelector(state => state.login.accessToken);
  const currency = useSelector(state => state.order.currency);
  // const accessToken =
  //   'eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.eyJvcHRpb24iOiJ1c2VyX2xvZ2luIiwiaWQiOiI2MTcxMzY1YmRkYjFlN2M2NzM0Y2NkMWQiLCJzdGF0dXMiOnRydWUsImlhdCI6MTY0NzQyNDY1OH0.fFSE30J7rC3-v0t6fst6V-2saF5Ja3keVaycXFi70xlJYth7PMW-uv-MAy2dM3tv';

  // console.log('fiatHistoryData...', fiatHistoryData);
  // console.log(
  //   'cryptoHistoryData....=================================      ',
  //   cryptoHistoryData,
  // );
  // console.log('acessToken....', accessToken);

  useEffect(() => {
    dispatch({
      type: CRYPTO_HISTORY,
      payload: {
        data: {
          currency: 'All',
          status: 'All',
          type: 'all',
        },
        token: accessToken,
      },
    });
  }, []);

  useEffect(() => {
    dispatch({
      type: FIAT_HISTORY,
      payload: {
        data: {
          status: 'All',
        },
        token: accessToken,
      },
    });
  }, []);

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
        tempArray.push(item.symbol);
      });
      setCurrencyData(tempArray);

      //console.log('tempArray', tempArray);
    } else {
      tempArray.push('BTC', 'INR', 'USDT', 'BNB', 'TRX', 'ETH');
      setCurrencyData(tempArray);
    }
  }, []);

  const getCryptoHistory = () => {
    // console.log('checkinh valu', value);
    if (value === 'crypto') {
      return (
        (
          <View>
            <Text>cryptoHistory</Text>
          </View>
        ),
        dispatch({
          type: CRYPTO_HISTORY,
          payload: {
            data: {
              currency: 'All',
              status: 'All',
              type: 'all',
            },
            token: accessToken,
          },
        })
      );
    } else {
      dispatch({
        type: FIAT_HISTORY,
        payload: {
          data: {
            status: 'All',
          },
          token: accessToken,
        },
      });
    }
  };

  const callComponent = () => {
    // console.log('CALLCOMPO', value);
    if (value === 'crypto') {
      return <CryptoHistory cryptoHistoryData={cryptoHistoryData} />;
    } else {
      return <WalletHistory fiatHistoryData={fiatHistoryData} />;
    }
  };

  // const changeDataHistory = () => {
  //   if (value === 'crypto' && cryptoValue01 === 'Deposite') {
  //     return <Deposite />;
  //   } else if (value === 'crypto' && cryptoValue01 === 'All') {
  //     return <CryptoHistory />;
  //   } else if (value === 'crypto' && cryptoValue01 === 'Withdrawe') {
  //     return <Withdraw />;
  //   }
  //   // else if(value === 'crypto' && cryptoOpen03 === '')
  //   else if (value === 'Fiat' && fiatValue01 === 'All') {
  //     return <WalletHistory />;
  //   } else if (value === 'Fiat' && fiatValue01 === 'Deposite') {
  //     return <WalletHistory />;
  //   } else if (value === 'Fiat' && fiatValue01 === 'Withdrawe') {
  //     return <WalletHistory />;
  //   } else if (value === 'Fiat') {
  //     return <WalletHistory />;
  //   } else if (value === 'crypto') {
  //     return <CryptoHistory />;
  //   }
  // };

  const changeDropdown = () => {
    if (value === 'crypto') {
      setHide(true);
    } else {
      setHide(false);
    }
  };

  // const getCurrencyHistory = (selectedItem) => {
  //   console.log("value", selectedItem)
  //   dispatch({
  //     type: CRYPTO_HISTORY,
  //     payload: {
  //       data: {
  //         "currency": "all",
  //         "status": "All",
  //         "type": "All",
  //       },
  //       // currency: cryptoValue03,
  //       // status: cryptoValue02,
  //       // type: cryptoValue01,
  //       token: accessToken,
  //     },
  //   });
  // };

  const getData = selectedItem => {
    // console.log('value', selectedItem);
    // console.log('filter deposite data', cryptoHistoryData);
    dispatch({
      type: CRYPTO_HISTORY,

      payload: {
        data: {
          currency: cryptoValue03,
          status: cryptoValue02,
          type: cryptoValue01,
        },
        token: accessToken,
      },
    });
  };

  return (
    <View style={styles.HeaderView}>
      <Toolbar navigation={navigation} />

      <View style={{flexDirection: 'row', marginTop: '5%'}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icons
            style={styles.backIcon}
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
          Wallet History
        </Text>
      </View>

      <LinearGradient
        style={styles.linerGradient}
        colors={[
          colors.transparentGradientColor1,
          colors.transparentGradientColor2,
        ]}>
        <View>
          <View
            style={{
              margin: textSize.componentsDifferenceLow,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                color: colors.heading,
                fontSize: textSize.h5,
                marginLeft: moderateScale(10),
                width: getDimen(0.4),
                paddingVertical: moderateScale(15),
              }}>
              Wallet History
            </Text>
            {/* <ExportHistory /> */}
          </View>

          <View style={styles.dropDownSection}>
            <View style={{width: '47%'}}>
              <DropDownPicker
                style={{
                  borderRadius: 0,
                  height: moderateScale(30),
                  backgroundColor: '#BAC7D3',
                  // fontSize: 5,
                }}
                onChangeValue={() => {
                  getCryptoHistory();
                  changeDropdown();
                }}
                // onChangeValue={() => { getCryptoHistory(); changeDropdown() }}
                zIndex={1000}
                zIndexInverse={1000}
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                placeholder="Fiat"
                // placeholderStyle={{fontSize: 5, color: 'red'}}
                // buttonTextStyle={{fontSize: 50}}
                // containerStyle={{ fontSize: textSize.h6,}}
                labelStyle={{
                  fontSize: textSize.h6,
                }}
                textStyle={{
                  fontSize: textSize.h6,
                }}
              />
            </View>

            {hide ? (
              <View style={{width: '47%', backgroundColor: '#BAC7D3'}}>
                <SelectDropdown
                  data={cryptoData01}
                  defaultButtonText="All "
                  buttonTextStyle={{fontSize: textSize.h6, textAlign: 'center'}}
                  buttonStyle={styles.showEntryDropView}
                  onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index);
                  }}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    setCryptoOpen01(selectedItem);
                    setCryptoValue01(selectedItem);
                    getData(selectedItem);
                    return selectedItem;
                  }}
                  rowTextStyle={{fontSize: textSize.h6}}
                />
              </View>
            ) : (
              <View style={{width: '47%', backgroundColor: '#BAC7D3'}}>
                <SelectDropdown
                  data={fiatData01}
                  defaultButtonText="All"
                  buttonTextStyle={{fontSize: textSize.h6, textAlign: 'center'}}
                  // buttonTextStyle={styles(colors).DDtextstyle}
                  buttonStyle={styles.showEntryDropView}
                  onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index);
                  }}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    setFiatOpen01(selectedItem);
                    setFiatValue01(selectedItem);
                    // setFiatItems01(selectedItem);
                    return selectedItem;
                  }}
                  rowTextStyle={{fontSize: textSize.h6}}
                />
              </View>
            )}
          </View>

          {hide ? (
            <View>
              <View style={styles.datePickersWrapper}>
                <DatePicker
                  style={styles.datePickerView}
                  date={fromDatevalue}
                  mode="date"
                  placeholderText="Please select Date"
                  format="YYYY-MM-DD"
                  minDate="1919-05-01"
                  maxDate="2099-06-01"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  showIcon={false}
                  customStyles={{
                    dateIcon: styles.dateIconStyle,
                    dateInput: styles.dateInputStyle,
                    dateText: {
                      fontSize: textSize.h6,
                      color: 'black',
                      fontFamily: '',
                      textAlign: 'left',
                    },
                    placeholderText: {
                      fontSize: textSize.h6,
                      color: 'black',
                      fontFamily: '',
                      textAlign: 'left',
                    },
                  }}
                  onDateChange={date => {
                    setFromDateValue(date);
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginHorizontal: '5%',
                }}>
                {/* <CryptoDropdown2 /> */}
                <View style={{width: '45%'}}>
                  <SelectDropdown
                    data={cryptopData02}
                    defaultButtonText="All"
                    buttonTextStyle={{
                      fontSize: textSize.h6,
                      textAlign: 'center',
                    }}
                    // buttonTextStyle={styles(colors).DDtextstyle}
                    buttonStyle={styles.showEntryDropView}
                    onSelect={(selectedItem, index) => {
                      console.log(selectedItem, index);
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      setCryptoOpen02(selectedItem);
                      setCryptoValue02(selectedItem);
                      // setFiatItems01(selectedItem);
                      return selectedItem;
                    }}
                    rowTextStyle={{fontSize: textSize.h6}}
                  />
                </View>

                {/* <CryptoDropdown3 /> */}
                <View style={{width: '47%'}}>
                  <SelectDropdown
                    data={currencydata}
                    defaultButtonText="All"
                    buttonTextStyle={{
                      fontSize: textSize.h6,
                      textAlign: 'center',
                    }}
                    // buttonTextStyle={styles(colors).DDtextstyle}
                    buttonStyle={styles.showEntryDropView}
                    onSelect={(selectedItem, index) => {
                      console.log(selectedItem, index);
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      setCryptoOpen03(selectedItem);
                      setCryptoValue03(selectedItem);
                      // setFiatItems01(selectedItem);
                      getData(selectedItem);
                      return selectedItem;
                    }}
                    rowTextStyle={{fontSize: textSize.h6}}
                  />
                </View>
              </View>
            </View>
          ) : (
            <View>
              <View style={styles.datePickersWrapper}>
                <DatePicker
                  style={styles.datePickerView}
                  date={fromDatevalue}
                  mode="date"
                  placeholder="Please select Date                                                                         "
                  format="YYYY-MM-DD"
                  minDate="1919-05-01"
                  maxDate="2099-06-01"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  showIcon={false}
                  customStyles={{
                    // dateIcon: styles.dateIconStyle,
                    dateInput: styles.dateInputStyle,
                    dateText: {
                      fontSize: textSize.h6,
                      color: 'black',
                      fontFamily: '',
                      textAlign: 'left',
                    },
                    placeholderText: {
                      fontSize: textSize.h6,
                      color: 'black',
                      fontFamily: '',
                      textAlign: 'left',
                    },
                  }}
                  onDateChange={date => {
                    setFromDateValue(date);
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginHorizontal: '5%',
                }}>
                {/* <FiatDropdown2 /> */}
                <View
                  style={{
                    // width: '45%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      width: getDimen(0.39),
                    }}>
                    <SelectDropdown
                      data={fiatData02}
                      defaultButtonText="All"
                      buttonTextStyle={{
                        fontSize: textSize.h6,
                        textAlign: 'center',
                      }}
                      // buttonTextStyle={styles(colors).DDtextstyle}
                      buttonStyle={styles.showEntryDropView}
                      onSelect={(selectedItem, index) => {
                        console.log(selectedItem, index);
                      }}
                      buttonTextAfterSelection={(selectedItem, index) => {
                        setFiatOpen02(selectedItem);
                        setFiatValue02(selectedItem);
                        // setFiatItems01(selectedItem);
                        return selectedItem;
                      }}
                      rowTextStyle={{fontSize: textSize.h6}}
                      dropdownStyle={{fontSize: textSize.h6}}
                    />
                  </View>

                  <View
                    style={{
                      //width: getDimen(0.4),
                      marginLeft: '11%',
                      marginTop: '2%',
                    }}>
                    <ExportHistory />
                  </View>
                </View>
              </View>
            </View>
          )}

          <View style={{marginVertical: textSize.componentsDifferenceLow}} />

          {callComponent()}
          {/* {changeDataHistory()} */}
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

  textInput: {
    borderRadius: 0,
    height: moderateScale(37),
    backgroundColor: 'white',
    marginHorizontal: '5%',
    marginVertical: moderateScale(6),
    color: 'black',
    paddingHorizontal: moderateScale(5),
    paddingLeft: moderateScale(10),
    // borderRadius: 6,
  },
  linerGradient: {
    width: '90%',
    borderRadius: moderateScale(10),
    marginHorizontal: '5%',
    marginTop: '5%',
    flex: 1,
  },
  backIcon: {
    color: 'white',
    textAlign: 'left',
    marginLeft: moderateScale(22),
  },
  dropDownSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '5%',
  },
  datePickerView: {
    width: '100%',
    backgroundColor: '#BAC7D3',
    height: moderateScale(30),
    alignItems: 'flex-start',
    color: 'black',
    height: moderateScale(30),
    // bottom: moderateScale(10),
  },
  dateIconStyle: {
    height: 0,
    width: 0,
  },
  dateInputStyle: {
    borderRadius: moderateScale(0),
    height: moderateScale(30),
    backgroundColor: '#BAC7D3',
    // width: '100%',
    textAlign: 'left',
    color: 'red',
    alignSelf: 'flex-start',
    fontSize: textSize.h6,
    fontFamily: '',
  },
  datePickersWrapper: {
    marginRight: moderateScale(17),
    marginLeft: moderateScale(17),
    marginTop: '2%',
    marginBottom: '2%',
    textAlign: 'left',
  },
  showEntryDropView: {
    width: '98%',
    height: moderateScale(30),
    backgroundColor: '#BAC7D3',
    textAlign: 'left',
    fontSize: textSize.h6,
  },
});

export default ProfileWalletHistory;
