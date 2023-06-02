import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';
import {getDimen} from '../../../dimensions/dimen';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {moderateScale} from 'react-native-size-matters';
import DropDownPicker from 'react-native-dropdown-picker';
import textSize from '../../../constants/textSize';
import SelectDropdown from 'react-native-select-dropdown';
import {
  CURRENCY_BAL,
  PAIR_DETAIL_API,
  PLACEORDER,
  PLACE_ORDER,
  PLACE_TRADE_ORDER,
  GET_OPEN_ORDER,
  MARKET_TRADE,
} from '../../../store/action';
import {commonAxoisApiUtils} from '../../../utils/commonAxoisApiUtils';
import {AppColors} from '../../../constants/appColors';
import showMessage from '../../../components/showMessage';
import InputSpinner from 'react-native-input-spinner';

const BuyView1 = () => {
  const [ischecked, setChecked] = useState('BUY');
  const [open01, setOpen01] = useState(false);
  const [value01, setValue01] = useState('1');
  const [quantity, setQuantity] = useState(0);
  const [items, setItems] = useState([
    {label: 'Limits', value: '1'},
    {label: 'Market', value: '2'},
    {label: 'Stop Limit', value: '3'},
  ]);
  const [count, setCount] = useState('');
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  //console.log('Navigation', navigation);
  const [isSelected, setSelection] = useState('BUY');
  const [buyOrderData, setBuyOrderData] = useState('');
  const [sellOrderData, setSellOrderData] = useState('');
  const [isSelectedCategory, setSelectionCategory] = useState('Limit');
  const [cat, setCat] = useState('limit');
  const [price, setPrice] = useState(null);
  const [amount, setAmount] = useState(null);
  const [total, setTotal] = useState(0);
  const [currentCoin, setCurrentCoin] = useState('');
  const [firstCoin, setFirstCoin] = useState('');
  const [paiFromApi, setPaiFromApi] = useState('');
  const [stopAmount, setStopAmount] = useState('');
  const [saleBalance, setSaleBalance] = useState('');
  const [value, setValue] = useState('');

  const [btcBalance, setBtcBalance] = useState();
  const currencyBalance = useSelector(state => state.order.currencyBalance);
  const pair = useSelector(state => state.order.pair);
  const pairdetailData = useSelector(state => state.order.pairdetailData);

  const placeOrder = useSelector(state => state.order.placeOrder);
  const placeTradeOrder = useSelector(state => state.order.placeTradeOrder);
  const accessToken = useSelector(state => state.login.accessToken);
  const marketTradeData = useSelector(state => state.order.marketTradeData);
  const themeColorData = useSelector(state => state.login.themeValue);

  const details = useSelector(state => state.common.details);
  const pageName = useSelector(state => state.common.pageName);
  const [finalPrice, setFinalprice] = useState('');
  // const [counter, setCounter] = useState(price);
  // let [num, setNum]= useState(0);

  const incrementCounter = () => {
    let incrementedPrice = (parseFloat(price) + 1).toString();

    setPrice(incrementedPrice);
  };
  const decrementCounter = () => {
    let decrementedPrice = (parseFloat(price) - 1).toString();
    setPrice(decrementedPrice);
  };
  // console.log('priceee new', counter);
  useEffect(() => {
    dispatch({
      type: MARKET_TRADE,
      payload: {token: accessToken},
    });
  }, [isFocused]);

  useEffect(() => {
    if (Object.keys(marketTradeData).length > 0) {
      setBuyOrderData(marketTradeData.data.buy_history);
    }
  }, [marketTradeData]);

  useEffect(() => {
    if (Object.keys(marketTradeData).length > 0) {
      setSellOrderData(marketTradeData.data.sell_history);
      //console.log('SELL ORDER DATA ===>', sellOrderData);
    }
  }, [isFocused]);

  useEffect(() => {
    dispatch({
      type: PAIR_DETAIL_API,
      payload: {
        data: details.replace('/', '_'),
        token: accessToken,
      },
    });
    dispatch({
      type: CURRENCY_BAL,
      payload: {data: details.replace('/', '_'), token: accessToken},
    });
    // setAmount('');
    // setTotal('');
    // console.log('placeTradeOrder', placeTradeOrder);
    // console.log('amount:', amount, 'total:', total, 'price:', price);
    // console.log('--------------------------------------------------');
    // console.log('pairdetailData==', pairdetailData.data.lastprice);
    // _retrieveData();

    //setTotal(price * amount);
    //setAmount(price / amount);
    // dispatch({
    //   type: PLACE_TRADE_ORDER,
    //   payload: {
    //     data: {
    //       amount: amount,
    //       ordertype: cat,
    //       pair: pair,
    //       price: price,
    //       total: '147.996600',
    //       type: 'buy',
    //       // amount: '1',
    //       // ordertype: 'limit',
    //       // pair: 'btc/usdt',
    //       // price: '43753.31000000',
    //       // total: '43753.31000000',
    //       // type: 'buy',
    //     },
    //     token: accessToken,
    //   },
    // });
    // if (amount) {
    //   //const val = parseFloat(((count)/100)* (amount)).toFixed(4)
    //   const val = parseFloat(count * amount).toFixed(4);
    //   //console.log('TOTAL', val);
    //   // setTotal(val);
    // }
  }, [isFocused]);

  useEffect(() => {
    //console.log('pairdetailData ====', pairdetailData);
    setPrice(
      pairdetailData && pairdetailData.data && pairdetailData.data.lastprice,
    );
    setCurrentCoin(
      pairdetailData &&
        pairdetailData.data &&
        pairdetailData.data.secondcurrency,
    );
    setFirstCoin(
      pairdetailData &&
        pairdetailData.data &&
        pairdetailData.data.firstcurrency,
    );
    setPaiFromApi(
      pairdetailData && pairdetailData.data && pairdetailData.data.pair,
    );
  }, [pairdetailData]);

  // useEffect(() => {
  //   if(amount){
  //   let totalAmountchange= Math.floor((amount)*(price))
  //   setTotal(totalAmountchange)
  //   console.log(totalAmountchange)
  //   console.log(total,'total')
  //   }
  // }, [amount]);

  useEffect(() => {
    // console.log('CURRENCUBAL', currencyBalance);
    if (currencyBalance && currencyBalance.data && currencyBalance.data[1]) {
      if (Object.keys(currencyBalance).length > 0) {
        setBtcBalance(currencyBalance.data[1].amount);
        setSaleBalance(currencyBalance.data[0].amount);
        // setBtcBalance(currencyBalance.data[2].usd_balance[0]);
        // console.log(' CURRENCY  DATA ===>', btcBalance);
        // console.log('==== PAIR ====> ', pair);
        //console.log('BALANCE', currencyBalance.data);
      }
    }
  }, [currencyBalance]);

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('Cost');
      if (value !== null) {
        // We have data!!
        //console.log(value);
        setCount(value);
      }
    } catch (error) {
      // Error retrieving data
    }
  };
  const kFormatter = n => {
    if (n < 1e3) return n;
    if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + 'K';
    if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + 'M';
    if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + 'B';
    if (n >= 1e12) return +(n / 1e12).toFixed(1) + 'T';
  };

  amountCalculate = amount => {
    setAmount(amount);
    // setAmount(kFormatter(parseFloat(amount).toFixed(2)));
    // console.log('HEyyyyy', price);
    // console.log('Amount', amount);
    if (amount) {
      // let totalAmountchange= Math.floor((amount)*(price)).toString();
      let totalAmountchange = (
        parseFloat(amount) * parseFloat(price)
      ).toString();
      // console.log('total value', totalAmountchange);
      setTotal(totalAmountchange);
    } else {
      setTotal('');
    }
  };

  totalCalculate = total => {
    setTotal(total);
    if (total) {
      let totalchange = (parseFloat(total) / parseFloat(price)).toString();
      setAmount(totalchange);
      // console.log(totalchange);
      // console.log(amount, 'amount');
    } else {
      setAmount('');
    }
  };

  const placeOrderTrade = () => {
    // console.log('PLACE ORDER DATA ====> ', placeOrder);
    // console.log('isSelectedCategory', isSelectedCategory);
    if (isSelectedCategory == 'Market') {
      setCat('market');
    } else if (isSelectedCategory == 'Stop-Limit') {
      setCat('stop');
    } else {
      setCat('limit');
    }
    //  console.log('CATEGORY', cat);
    //  console.log('price', price);
    //  console.log('amount', amount);
    //  console.log('CATEGORY', cat);
    //  console.log('total', total);
    //  console.log('pairdetail', paiFromApi);
    //  console.log('stopAmount', stopAmount);

    if (amount == '' && amount == null) {
      showMessage('Please Enter amount Address');
    } else if (price == '' && price == null) {
      showMessage('Please Enter price');
    } else if (total == '' && total == null) {
      showMessage('Please Enter Total');
    } else {
      if (isSelected === 'BUY') {
        if (!stopAmount) {
          let params = {
            data: {
              amount: amount,
              ordertype: cat,
              pair: paiFromApi,
              price: price,
              total: total,
              type: 'buy',
            },
            params: {
              method: 'POST',
              url: '/v1/place-order',
              token: accessToken,
            },
          };
          commonAxoisApiUtils.getResponse(params).then(res => {
            //console.log('RESULT API',res.data)
            setAmount('');
            setTotal('');
            if (res.data.code == 200) {
              setTimeout(() => showMessage(res.data.message), 500);
              dispatch({
                type: GET_OPEN_ORDER,
                payload: {token: accessToken},
              });
            } else {
              setTimeout(() => showMessage(res.data.message), 500);
            }
          });
        } else {
          let params = {
            data: {
              amount: amount,
              ordertype: cat,
              pair: paiFromApi,
              price: price,
              stoplimit: stopAmount,
              total: total,
              type: 'buy',
            },
            params: {
              method: 'POST',
              url: '/v1/place-order',
              token: accessToken,
            },
          };
          commonAxoisApiUtils.getResponse(params).then(res => {
            //console.log('RESULT API',res.data)
            setAmount('');
            setTotal('');
            if (res.data.code == 200) {
              setTimeout(() => showMessage(res.data.message), 500);
              dispatch({
                type: GET_OPEN_ORDER,
                payload: {token: accessToken},
              });
            } else {
              setTimeout(() => showMessage(res.data.message), 500);
            }
          });
        }
      } else {
        // dispatch({
        //   type: PLACE_ORDER,
        //   payload: {
        //     data: {
        //       amount: amount,
        //       ordertype: cat,
        //       pair: pair,
        //       price: price,
        //       total: total,
        //       type: 'sell',
        //     },
        //     token: accessToken,
        //   },
        // });
        if (!stopAmount) {
          let params = {
            data: {
              amount: amount,
              ordertype: cat,
              pair: paiFromApi,
              price: price,
              total: total,
              type: 'sell',
            },
            params: {
              method: 'POST',
              url: '/v1/place-order',
              token: accessToken,
            },
          };
          commonAxoisApiUtils.getResponse(params).then(res => {
            //console.log('RESULT API',res.data)
            setAmount('');
            setTotal('');
            if (res.data.code == 200) {
              setTimeout(() => showMessage(res.data.message), 500);
              dispatch({
                type: GET_OPEN_ORDER,
                payload: {token: accessToken},
              });
            } else {
              setTimeout(() => showMessage(res.data.message), 500);
            }
          });
        } else {
          let params = {
            data: {
              amount: amount,
              ordertype: cat,
              pair: paiFromApi,
              price: price,
              total: total,
              stoplimit: stopAmount,
              type: 'sell',
            },
            params: {
              method: 'POST',
              url: '/v1/place-order',
              token: accessToken,
            },
          };

          commonAxoisApiUtils.getResponse(params).then(res => {
            //console.log('RESULT API',res.data)
            setAmount('');
            setTotal('');
            if (res.data.code == 200) {
              setTimeout(() => showMessage(res.data.message), 500);
              dispatch({
                type: GET_OPEN_ORDER,
                payload: {token: accessToken},
              });
            } else {
              setTimeout(() => showMessage(res.data.message), 500);
            }
          });
        }
      }
    }
  };

  const renderItem = ({item}) => {
    return (
      <ScrollView>
        <View style={{flex: 1}}>
          <View style={styles(themeColorData).tableView}>
            <Text
              style={[
                styles(themeColorData).text,
                {color: '#FF0458', left: moderateScale(13)},
              ]}>
              {item.price.slice(0, 8)}
            </Text>
            <Text
              style={[styles(themeColorData).text, {right: moderateScale(10)}]}>
              {' '}
              {item.amount}
            </Text>
            {/* <Text style={styles(themeColorData).text}>{item.total}</Text> */}
          </View>
        </View>
      </ScrollView>
    );
  };

  const renderItem2 = ({item}) => {
    return (
      <View style={{}}>
        <View style={styles(themeColorData).tableView}>
          <Text
            style={[
              styles(themeColorData).text,
              {color: AppColors(themeColorData).green, left: moderateScale(13)},
            ]}>
            {item.price.slice(0, 8)}
          </Text>
          <Text
            style={[styles(themeColorData).text, {right: moderateScale(10)}]}>
            {item.amount}
          </Text>
          {/* <Text style={styles(themeColorData).text}>{item.total}</Text> */}
        </View>
      </View>
    );
  };
  //console.log(' FISRT COIN ', firstCoin);

  return (
    <View style={styles(themeColorData).container}>
      {/* toolbar */}

      <View style={styles(themeColorData).subcontainer1}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'position'}>
          <View style={styles(themeColorData).mainView}>
            {/* left view */}
            <View style={styles(themeColorData).leftPart}>
              <View style={styles(themeColorData).toggleBtnParentView}>
                <TouchableOpacity
                  style={[
                    styles(themeColorData).toggleBtnWrapper,
                    {
                      backgroundColor:
                        ischecked == 'BUY'
                          ? AppColors(themeColorData).green
                          : AppColors(themeColorData).inputBGBuysell,
                    },
                  ]}
                  onPress={() => setChecked('BUY')}>
                  <Text
                    style={[
                      styles(themeColorData).btnTitle,
                      {
                        color:
                          ischecked == 'BUY'
                            ? AppColors(themeColorData).white
                            : AppColors(themeColorData).inputDark,
                      },
                    ]}>
                    BUY
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles(themeColorData).toggleBtnWrapperSell,
                    {
                      backgroundColor:
                        ischecked == 'SELL'
                          ? AppColors(themeColorData).red
                          : AppColors(themeColorData).inputBGBuysell,
                    },
                  ]}
                  onPress={() => setChecked('SELL')}>
                  <Text
                    style={[
                      styles(themeColorData).btnTitle,
                      {
                        color:
                          ischecked == 'SELL'
                            ? AppColors(themeColorData).white
                            : AppColors(themeColorData).inputDark,
                      },
                    ]}>
                    SELL
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: getDimen(0.54),
                }}>
                <DropDownPicker
                  style={[styles(themeColorData).textinfoView, {height: 30}]}
                  zIndex={1000}
                  zIndexInverse={1000}
                  open={open01}
                  value={value}
                  items={items}
                  setOpen={setOpen01}
                  setValue={setValue}
                  // setValue={setValue01}
                  setItems={setItems}
                  placeholder="Market"
                  ArrowDownIconComponent={({style}) => (
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        alignContent: 'center',
                      }}>
                      <Icons
                        name="caret-down"
                        size={15}
                        color={AppColors(themeColorData).title}
                        style={{
                          alignSelf: 'center',
                          right: moderateScale(50),
                        }}
                      />
                    </View>
                  )}
                  iconContainerStyle={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    alignContent: 'center',
                  }}
                  labelStyle={{
                    fontWeight: 'bold',
                    color: AppColors(themeColorData).title,
                    fontSize: textSize.h6,
                    textAlign: 'center',
                  }}
                />
              </View>

              {value === '3' ? (
                <View
                  style={[
                    styles(themeColorData).inputWrapper,
                    {width: moderateScale(198)},
                  ]}>
                  <TextInput
                    style={[styles(themeColorData).input]}
                    onChangeText={stopAmount => setStopAmount(stopAmount)}
                    value={stopAmount}
                    placeholder="Stop"
                    placeholderTextColor={AppColors(themeColorData).title}
                    keyboardType="numeric"
                  />

                  <Text
                    style={[
                      styles(themeColorData).currencyText,
                      {marginRight: '3%'},
                    ]}>
                    {firstCoin && firstCoin.toUpperCase()}
                  </Text>
                </View>
              ) : null}

              <View style={{height: '40%'}}>
                {isSelectedCategory == 'Stop-Limit' && (
                  <View style={styles(themeColorData).inputWrapper}>
                    <TextInput
                      style={[styles(themeColorData).input]}
                      onChangeText={stopAmount => setStopAmount(stopAmount)}
                      value={stopAmount}
                      placeholder="Stop"
                      keyboardType="numeric"
                      placeholderTextColor={AppColors(themeColorData).title}
                    />
                    <Text style={styles(themeColorData).currencyText}>
                      {currentCoin && currentCoin.toUpperCase()}
                    </Text>
                  </View>
                )}
                <View>
                  <View
                    style={[
                      styles(themeColorData).inputWrapper,
                      {
                        width: moderateScale(203),
                        // justifyContent: 'space-between',
                      },
                    ]}>
                    <TextInput
                      style={[styles(themeColorData).input]}
                      onChangeText={price => setPrice(price)}
                      value={price}
                      placeholder="Price"
                      keyboardType="numeric"
                      placeholderTextColor={AppColors(themeColorData).title}
                    />
                    {/* <InputSpinner
                      max={1000000}
                      min={1}
                      step={1}
                      height={35}
                      width={300}
                      style={[styles(themeColorData).inputWrapperID]}
                      inputStyle={[styles(themeColorData).IDinput]}
                      buttonStyle={[styles(themeColorData).inputBtnWrapperID]} */}
                    {/* // buttonPressStyle={[
                      //   styles(themeColorData).inputWrapperID,
                      //   {width: 300},
                      // ]}
                      // buttonTextStyle={[
                      //   styles(themeColorData).input,
                      //   {width: 300},
                      // ]}
                    //   buttonTextColor={AppColors(themeColorData).title}
                    //   textColor={AppColors(themeColorData).title}
                    //   skin="modern"
                    //   rounded={false}
                    //   background="transparent"
                    //   colorMax={AppColors(themeColorData).inputBGBuysell}
                    //   colorMin={AppColors(themeColorData).inputBGBuysell}
                    //   value={price}
                    //   onChange={price => setPrice(price)}
                    // /> */}

                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        marginRight: 10,
                      }}>
                      <TouchableOpacity onPress={() => incrementCounter()}>
                        <View>
                          <Icons
                            name="add"
                            size={20}
                            color={AppColors(themeColorData).title}
                            style={{marginRight: 4}}
                          />
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => decrementCounter()}>
                        <View>
                          <Icons
                            name="remove-outline"
                            size={20}
                            color={AppColors(themeColorData).title}
                          />
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <View
                  style={[
                    styles(themeColorData).inputWrapper,
                    {width: moderateScale(198)},
                  ]}>
                  <TextInput
                    style={[styles(themeColorData).input]}
                    onChangeText={amount => amountCalculate(amount)}
                    // onEndEditing={amountCalculate()}
                    value={amount}
                    placeholder="Amount"
                    placeholderTextColor={AppColors(themeColorData).title}
                    keyboardType="numeric"
                  />
                  {isSelectedCategory == 'Market' && (
                    <Text
                      style={{
                        fontSize: 10,
                        color: '#CCC',
                        fontWeight: 'bold',
                        marginRight: '6%',
                        width: '20%',
                      }}>
                      Amount
                    </Text>
                  )}
                  <Text
                    style={[
                      styles(themeColorData).currencyText,
                      {marginRight: '3%'},
                    ]}>
                    {firstCoin && firstCoin.toUpperCase()}
                  </Text>
                </View>
                <View
                  style={[
                    styles(themeColorData).inputWrapper,
                    {width: moderateScale(198)},
                  ]}>
                  <TextInput
                    style={[styles(themeColorData).input]}
                    onChangeText={total => totalCalculate(total)}
                    value={total}
                    keyboardType="numeric"
                    placeholder="Total"
                    placeholderTextColor={AppColors(themeColorData).title}
                  />
                  <Text style={styles(themeColorData).currencyText}>
                    {currentCoin && currentCoin.toUpperCase()}
                  </Text>
                </View>
                {/* <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginHorizontal: moderateScale(16),
                }}>
                <Text style={styles(themeColorData).infoText}>Fee{'  '}</Text>
                {isSelected == 'BUY' ? (
                  <Text style={styles(themeColorData).infoText}>
                    0({firstCoin && firstCoin.toUpperCase()}){'  '}
                  </Text>
                ) : (
                  <Text style={styles(themeColorData).infoText}>
                    0({currentCoin && currentCoin.toUpperCase()}){'  '}
                  </Text>
                )}
              </View> */}
              </View>
              {accessToken ? (
                <View
                  style={{alignItems: 'center', marginTop: moderateScale(50)}}>
                  {isSelected == 'BUY' ? (
                    <View>
                      {/* {isSelectedCategory == 'Limit' && (
                      <View style={{marginTop: moderateScale(30)}}>
                        <BuysellBtn
                          text={`BUY ${firstCoin && firstCoin.toUpperCase()}`}
                          onPress={() => {
                            placeOrderTrade();
                            //console.log('ON PRESS BUY');
                            //navigation.navigate('BuyReportList')
                          }}
                        />
                      </View>
                    )} */}

                      {/* {isSelectedCategory == 'Stop-Limit' && (
                      <View style={{marginTop: moderateScale(70)}}>
                        <BuysellBtn
                          text={`BUY ${firstCoin && firstCoin.toUpperCase()}`}
                          onPress={() => {
                            placeOrderTrade();
                            //console.log('ON PRESS BUY');
                            //navigation.navigate('BuyReportList')
                          }}
                        />
                      </View>
                    )} */}
                    </View>
                  ) : (
                    <View>
                      {isSelectedCategory == 'Market' && (
                        <View style={{marginTop: moderateScale(30)}}>
                          {/* <BuysellBtn
                          text={`SELL ${firstCoin && firstCoin.toUpperCase()}`}
                          onPress={() => {
                            placeOrderTrade();
                            //console.log('ON PRESS BUY');
                            //navigation.navigate('BuyReportList')
                          }}
                        /> */}
                        </View>
                      )}
                      {isSelectedCategory == 'Limit' && (
                        <View style={{marginTop: moderateScale(30)}}>
                          {/* <BuysellBtn
                          text={`SELL ${firstCoin && firstCoin.toUpperCase()}`}
                          onPress={() => {
                            placeOrderTrade();
                            //console.log('ON PRESS BUY');
                            //navigation.navigate('BuyReportList')
                          }}
                        /> */}
                        </View>
                      )}

                      {isSelectedCategory == 'Stop-Limit' && (
                        <View style={{marginTop: moderateScale(70)}}>
                          {/* <BuysellBtn
                          text={`SELL ${firstCoin && firstCoin.toUpperCase()}`}
                          onPress={() => {
                            placeOrderTrade();
                            //console.log('ON PRESS BUY');
                            //navigation.navigate('BuyReportList')
                          }}
                        /> */}
                        </View>
                      )}
                    </View>
                    // <BuysellBtn
                    //   text={`SELL ${firstCoin && firstCoin.toUpperCase()}`}
                    //   onPress={
                    //     () => placeOrderTrade()
                    //     //navigation.navigate('BuyReportList')
                    //   }
                    //   //  onPress={() => navigation.navigate('BuyReportList')}
                    // />
                  )}
                </View>
              ) : (
                <Text></Text>
              )}
              {accessToken ? (
                <View>
                  {ischecked == 'BUY' ? (
                    <View>
                      {value === '3' ? (
                        <View style={{bottom: moderateScale(60)}}>
                          <View
                            style={{
                              justifyContent: 'space-between',
                              flexDirection: 'row',
                              margin: 5,
                            }}>
                            <Text style={styles(themeColorData).text}>
                              {' '}
                              Available :{' '}
                            </Text>
                            <View>
                              {isSelected == 'BUY' ? (
                                <Text style={[styles(themeColorData).text]}>
                                  {btcBalance
                                    ? parseFloat(btcBalance).toFixed(8)
                                    : '00.000000'}{' '}
                                  {''}{' '}
                                  {currentCoin && currentCoin.toUpperCase()}
                                </Text>
                              ) : (
                                <Text style={[styles(themeColorData).text]}>
                                  {saleBalance
                                    ? parseFloat(saleBalance).toFixed(8)
                                    : '00.000000'}{' '}
                                  {''} {firstCoin && firstCoin.toUpperCase()}
                                </Text>
                              )}
                            </View>
                          </View>

                          <TouchableOpacity onPress={() => placeOrderTrade()}>
                            <View style={styles(themeColorData).btn}>
                              <Text
                                style={[
                                  styles(themeColorData).Btnlabel,
                                  {
                                    fontSize: textSize.h2,
                                    fontWeight: '900',
                                    fontFamily: '',
                                  },
                                ]}>
                                Buy {firstCoin && firstCoin.toUpperCase()}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                      ) : (
                        <TouchableOpacity onPress={() => placeOrderTrade()}>
                          <View
                            style={{
                              justifyContent: 'space-between',
                              flexDirection: 'row',
                              margin: 5,
                            }}>
                            <Text style={styles(themeColorData).text}>
                              {' '}
                              Available :{' '}
                            </Text>
                            <View>
                              {isSelected == 'BUY' ? (
                                <Text style={[styles(themeColorData).text]}>
                                  {btcBalance
                                    ? parseFloat(btcBalance).toFixed(8)
                                    : '00.000000'}{' '}
                                  {''}{' '}
                                  {currentCoin && currentCoin.toUpperCase()}
                                </Text>
                              ) : (
                                <Text style={[styles(themeColorData).text]}>
                                  {saleBalance
                                    ? parseFloat(saleBalance).toFixed(8)
                                    : '00.000000'}{' '}
                                  {''} {firstCoin && firstCoin.toUpperCase()}
                                </Text>
                              )}
                            </View>
                          </View>

                          <View style={styles(themeColorData).btn}>
                            <Text
                              style={[
                                styles(themeColorData).Btnlabel,
                                {
                                  fontSize: textSize.h2,
                                  fontWeight: '900',
                                  fontFamily: '',
                                },
                              ]}>
                              Buy {firstCoin && firstCoin.toUpperCase()}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      )}
                    </View>
                  ) : (
                    <View>
                      {value === '3' ? (
                        <View style={{bottom: moderateScale(60)}}>
                          <TouchableOpacity onPress={() => placeOrderTrade()}>
                            <View
                              style={{
                                justifyContent: 'space-between',
                                flexDirection: 'row',
                                margin: 5,
                              }}>
                              <Text style={styles(themeColorData).text}>
                                {' '}
                                Available :{' '}
                              </Text>
                              <View>
                                {isSelected == 'BUY' ? (
                                  <Text style={[styles(themeColorData).text]}>
                                    {btcBalance
                                      ? parseFloat(btcBalance).toFixed(8)
                                      : '00.000000'}{' '}
                                    {''}{' '}
                                    {currentCoin && currentCoin.toUpperCase()}
                                  </Text>
                                ) : (
                                  <Text style={[styles(themeColorData).text]}>
                                    {saleBalance
                                      ? parseFloat(saleBalance).toFixed(8)
                                      : '00.000000'}{' '}
                                    {''} {firstCoin && firstCoin.toUpperCase()}
                                  </Text>
                                )}
                              </View>
                            </View>
                            <View style={styles(themeColorData).sellbtn}>
                              <Text
                                style={[
                                  styles(themeColorData).label,
                                  {
                                    fontSize: textSize.h2,
                                    fontWeight: '900',
                                    fontFamily: '',
                                  },
                                ]}>
                                Sell {firstCoin && firstCoin.toUpperCase()}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                      ) : (
                        <View>
                          <TouchableOpacity onPress={() => placeOrderTrade()}>
                            <View
                              style={{
                                justifyContent: 'space-between',
                                flexDirection: 'row',
                                margin: 5,
                              }}>
                              <Text style={styles(themeColorData).text}>
                                {' '}
                                Available :{' '}
                              </Text>
                              <View>
                                {isSelected == 'BUY' ? (
                                  <Text style={[styles(themeColorData).text]}>
                                    {btcBalance
                                      ? parseFloat(btcBalance).toFixed(8)
                                      : '00.000000'}{' '}
                                    {''}{' '}
                                    {currentCoin && currentCoin.toUpperCase()}
                                  </Text>
                                ) : (
                                  <Text style={[styles(themeColorData).text]}>
                                    {saleBalance
                                      ? parseFloat(saleBalance).toFixed(8)
                                      : '00.000000'}{' '}
                                    {''} {firstCoin && firstCoin.toUpperCase()}
                                  </Text>
                                )}
                              </View>
                            </View>
                            <View style={styles(themeColorData).sellbtn}>
                              <Text
                                style={[
                                  styles(themeColorData).Btnlabel,
                                  {
                                    fontSize: textSize.h2,
                                    fontWeight: '900',
                                    fontFamily: '',
                                  },
                                ]}>
                                Sell {firstCoin && firstCoin.toUpperCase()}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                      )}
                    </View>
                  )}
                </View>
              ) : (
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <View style={styles(themeColorData).btn}>
                    <Text
                      style={[
                        styles(themeColorData).Btnlabel,
                        {
                          fontSize: textSize.h2,
                          fontWeight: '900',
                          fontFamily: '',
                        },
                      ]}>
                      LOGIN NOW !
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            </View>

            {/* right View */}

            <View style={styles(themeColorData).rightpart}>
              <View style={styles(themeColorData).TitleView}>
                <Text
                  style={[
                    styles(themeColorData).label,
                    {left: moderateScale(13)},
                  ]}>
                  Price
                </Text>
                <Text style={styles(themeColorData).label}>
                  {' '}
                  {'      '}Amount
                </Text>
              </View>
              <View style={{height: getDimen(0.3)}}>
                <FlatList
                  data={sellOrderData}
                  renderItem={renderItem}
                  //ListHeaderComponent={ListHeader}
                  keyExtractor={item => item.id}
                  maxToRenderPerBatch={5}

                  //style={{flex: 1}}
                />
              </View>

              <View style={{alignItems: 'center', marginVertical: 10}}>
                <Text
                  style={[
                    styles(themeColorData).greentext,
                    {fontSize: textSize.h4},
                  ]}>
                  3890.23
                </Text>
                <Text style={styles(themeColorData).subText}>$ 3890.23</Text>
              </View>

              <View style={{height: getDimen(0.3)}}>
                <FlatList
                  data={buyOrderData}
                  renderItem={renderItem2}
                  keyExtractor={item => item.id}
                  maxToRenderPerBatch={5}

                  // style={{flex: 1}}
                />
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
      <View></View>
    </View>
  );
};
console.log('heloo  00000');
export default BuyView1;

const styles = themeColorData =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 5,
      marginBottom: moderateScale(40),
    },
    subcontainer1: {
      backgroundColor: AppColors(themeColorData).backgroundLight,
      padding: 10,
      borderRadius: 5,
      height: getDimen(0.97),
    },
    toolbar: {
      flexDirection: 'row',
      margin: 10,
      marginTop: 20,
    },
    mainView: {
      justifyContent: 'space-between',
      flexDirection: 'row',
    },
    screenName: {
      color: AppColors(themeColorData).title,
      fontSize: textSize.h2,
      width: getDimen(0.29),
    },
    screenBalance: {
      color: AppColors(themeColorData).red,
      fontSize: textSize.h4,
      width: getDimen(0.5),
    },
    toggleBtnParentView: {
      flexDirection: 'row',
      backgroundColor: AppColors(themeColorData).backgroundLght,
      borderRadius: 20,
      height: 40,
      alignItems: 'center',
    },
    toggleBtnWrapper: {
      height: moderateScale(35),
      width: moderateScale(99),
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      borderBottomRightRadius: 0,
      borderTopRightRadius: 17,
      marginRight: 2,
    },
    toggleBtnWrapperSell: {
      height: moderateScale(35),
      width: moderateScale(99),
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      borderBottomLeftRadius: 0,
      borderTopLeftRadius: 17,
    },
    btnTitle: {
      fontSize: textSize.h3,
      fontWeight: 'bold',
      color: AppColors(themeColorData).title,
      fontFamily: '',
    },
    redText: {
      color: AppColors(themeColorData).red,
      fontSize: textSize.h5,
    },
    text: {
      color: AppColors(themeColorData).title,
      fontSize: textSize.h5,
      fontFamily: '',
      margin: 3,
    },
    greentext: {
      color: AppColors(themeColorData).green,
      fontSize: textSize.h5,
      width: getDimen(0.17),
    },
    label: {
      color: AppColors(themeColorData).title,
      fontSize: textSize.h4,
      margin: 5,
      // width: getDimen(0.17),
      fontFamily: '',
    },
    Btnlabel: {
      color: AppColors(themeColorData).white,
      fontSize: textSize.h4,
      margin: 5,
      // width: getDimen(0.17),
      fontFamily: '',
    },
    textinfoView: {
      justifyContent: 'space-between',
      flexDirection: 'row',
      backgroundColor: AppColors(themeColorData).inputBGBuysell,
      borderRadius: 20,
      marginVertical: 4,
    },
    infolabel: {
      color: AppColors(themeColorData).title,
      //fontSize: textSize.h5,
      fontSize: textSize.h3,
      margin: 5,
      // width: getDimen(0.16),
      fontWeight: '900',
      fontFamily: '',
    },
    btn: {
      height: moderateScale(37),
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 2,
      backgroundColor: AppColors(themeColorData).green,
    },
    sellbtn: {
      height: moderateScale(37),
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 2,
      backgroundColor: AppColors(themeColorData).red,
    },
    showEntryDropView: {
      width: '98%',
      height: moderateScale(30),
      // backgroundColor: 'red',
    },
    icon: {
      // right: moderateScale(30),
      // marginTop: moderateScale(6),
    },
    DDtextstyle: {
      fontSize: textSize.h5,
      textAlign: 'center',
    },

    // 2 sub container styles
    subText: {
      color: AppColors(themeColorData).inputDark,
      //fontSize: textSize.h5,
      fontSize: 13,
      width: getDimen(0.17),
    },
    inputWrapper: {
      backgroundColor: AppColors(themeColorData).inputBGBuysell,
      marginVertical: moderateScale(5),
      flexDirection: 'row',
      width: '80%',
      alignItems: 'center',
      borderRadius: moderateScale(25),
      height: moderateScale(35),
    },
    inputWrapperID: {
      backgroundColor: AppColors(themeColorData).inputBGBuysell,
      marginVertical: moderateScale(5),
      // width: '100%',
      alignItems: 'center',
      //width: 250,
      borderRadius: moderateScale(25),
      height: moderateScale(35),
      alignSelf: 'center',
      paddingHorizontal: 40,
      marginHorizontal: 30,
    },
    inputBtnWrapperID: {
      width: 100,
    },
    IDinput: {
      backgroundColor: AppColors(themeColorData).inputBGBuysell,
      marginVertical: moderateScale(5),
      alignItems: 'center',
      width: 150,
      borderRadius: moderateScale(25),
      height: moderateScale(35),
    },
    input: {
      paddingLeft: moderateScale(15),
      flex: 1,
      color: AppColors(themeColorData).title,
      fontWeight: '700',
      fontSize: textSize.h3,
      height: moderateScale(45),
      top: 2,
    },
    currencyText: {
      //fontSize: textSize.h6,
      fontSize: textSize.h6,
      fontWeight: '900',
      color: AppColors(themeColorData).title,
      right: getDimen(0.02),
      //width: moderateScale(50),
      textAlign: 'right',
      fontFamily: '',
    },
    tableView: {
      justifyContent: 'space-between',
      // padding: textSize.componentsDifference,
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      // padding: 10,
      // marginVertical: 10,
      //marginBottom: 20,
    },
    TitleView: {
      flexDirection: 'row',
      //backgroundColor: 'black',
      padding: textSize.componentsDifferenceLow,
      justifyContent: 'space-around',
    },
    rightpart: {
      // flex: 1,
      // marginLeft: '15%',
      marginRight: 5,
      marginLeft: 10,
    },
  });
