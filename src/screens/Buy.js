import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icons from 'react-native-vector-icons/Ionicons';
import AppButton from '../constants/AppButton';
import showMessage from '../components/showMessage';
import AsyncStorage from '@react-native-community/async-storage';
import textSize from '../constants/textSize';
import Toolbar from '../constants/toolbar';
import {AppColors} from '../constants/appColors';
import {useDispatch, useSelector} from 'react-redux';
import {
  CURRENCY_BAL,
  PAIR_DETAIL_API,
  PLACEORDER,
  PLACE_ORDER,
  PLACE_TRADE_ORDER,
  GET_OPEN_ORDER,
} from '../store/action';
import {getDimen} from '../dimensions/dimen';
import {useIsFocused} from '@react-navigation/native';
import {commonAxoisApiUtils} from '../utils/commonAxoisApiUtils';
import {moderateScale, scale} from 'react-native-size-matters';

const Buy = ({navigation}) => {
  //const count = React.useContext(AuthContext);
  //const {cost} = route.params;
  //const count=AsyncStorage.getItem('Cost')
  //console.log('Param',count)
  const [count, setCount] = useState('');
  const isFocused = useIsFocused();

  // console.log('value', count);
  const dispatch = useDispatch();
  //console.log('Navigation', navigation);
  const [isSelected, setSelection] = useState('BUY');
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

  const [btcBalance, setBtcBalance] = useState();
  const currencyBalance = useSelector(state => state.order.currencyBalance);
  const pair = useSelector(state => state.order.pair);
  const pairdetailData = useSelector(state => state.order.pairdetailData);

  const placeOrder = useSelector(state => state.order.placeOrder);
  const placeTradeOrder = useSelector(state => state.order.placeTradeOrder);
  const accessToken = useSelector(state => state.login.accessToken);

  const details = useSelector(state => state.common.details);
  const pageName = useSelector(state => state.common.pageName);
  useEffect(() => {
    console.log('details', details);
    // console.log('pageName', pageName);
    dispatch({
      type: PAIR_DETAIL_API,
      payload: {data: details.replace('/', '_'), token: accessToken},
    });
    // setAmount('');
    // setTotal('');
    // console.log('placeTradeOrder', placeTradeOrder);
    // console.log('amount:', amount, 'total:', total, 'price:', price);
    // console.log('--------------------------------------------------');
    // console.log('pairdetailData==', pairdetailData.data.lastprice);
    // _retrieveData();
    dispatch({
      type: CURRENCY_BAL,
      payload: {data: details.replace('/', '_'), token: accessToken},
    });

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
  amountCalculate = amount => {
    setAmount(amount);
    // console.log('HEyyyyy', price);
    // console.log('Amount', amount);
    if (amount) {
      // let totalAmountchange= Math.floor((amount)*(price)).toString();
      let totalAmountchange = (
        parseFloat(amount) * parseFloat(price)
      ).toString();
      // console.log('total value', totalAmountchange);
      setTotal(totalAmountchange);
      // console.log(total, 'total');
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
        //  console.log('Inside Buy APi Call')
        //       amount: '1',
        //       ordertype: 'limit',
        //       pair: 'btc/usdt',
        //       price: '43753.31000000',
        //       total: '43753.31000000',
        //       type: 'buy',
        //     },
        //     token: accessToken,
        //   },
        // });
        // console.log('stopAmount',stopAmount)
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
      // if(placeOrder){
      //   if (placeOrder.code === 200) {
      //     showMessage(placeOrder.message);
      //   } else {
      //     showMessage(placeOrder.message);
      //   }
      // }
    }
  };
  return (
    <View style={styles.container}>
      {/* <LinearGradient
        style={{flex: 1}}
        colors={[AppColors().gradientColor1, AppColors().gradientColor3]}>
         */}
      {/* Header view*/}
      <Toolbar navigation={navigation} />
      {/* Header view*/}
      {/* <View
          style={{
            flexDirection: 'row',
            marginTop: textSize.componentsDifferenceLow,
          }}>
          <View
            style={{
              paddingHorizontal: textSize.componentsDifferenceMediam,
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: textSize.h3,
                fontWeight: 'bold',
                width: scale(80),
                textAlign: 'center',
              }}>
              MARKET
            </Text>
            {pageName == 'MARKET' ? (
              <View
                style={{
                  backgroundColor: 'black',
                  height: 2,
                  width: scale(80),
                  marginVertical: 4,
                }}
              />
            ) : null}
          </View>
          <View
            style={{
              paddingHorizontal: textSize.componentsDifferenceMediam,
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: textSize.h3,
                fontWeight: 'bold',
                width: scale(100),
                textAlign: 'center',
              }}>
              EXCHANGE
            </Text>
            {pageName == 'EXCHANGE' ? (
              <View
                style={{
                  backgroundColor: 'black',
                  height: 2,
                  width: scale(100),
                  marginVertical: 4,
                }}
              />
            ) : null}
          </View>
        </View> */}
      <View style={{padding: textSize.componentsDifferenceHight}}>
        <View style={styles.toggleBtnParentView}>
          <TouchableOpacity
            style={[
              styles.toggleBtnWrapper,
              {backgroundColor: isSelected == 'BUY' ? '#FFF' : '#000'},
            ]}
            onPress={() => setSelection('BUY')}>
            <Text
              style={[
                styles.btnTitle,
                {color: isSelected == 'BUY' ? '#000' : '#226FB3'},
              ]}>
              BUY
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.toggleBtnWrapper,
              {backgroundColor: isSelected == 'SELL' ? '#FFF' : '#000'},
            ]}
            onPress={() => setSelection('SELL')}>
            <Text
              style={[
                styles.btnTitle,
                {color: isSelected == 'SELL' ? '#000' : '#226FB3'},
              ]}>
              SELL
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 20,
            marginHorizontal: 6,
          }}>
          <TouchableOpacity
            style={{marginLeft: '5%'}}
            onPress={() => setSelectionCategory('Limit')}>
            <Text
              style={[
                styles.categoryTitleText,
                isSelectedCategory == 'Limit' && {
                  fontFamily: '',
                  borderBottomColor: 'black',
                  borderBottomWidth: 2,
                  fontSize: textSize.h4,
                  textAlign: 'center',
                  fontWeight: 'bold',
                },
              ]}>
              Limit
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{}}
            onPress={() => setSelectionCategory('Market')}>
            <Text
              style={[
                styles.categoryTitleText,
                isSelectedCategory == 'Market' && {
                  fontWeight: 'bold',
                  fontFamily: '',
                  borderBottomColor: 'black',
                  borderBottomWidth: 2,
                  fontSize: textSize.h4,
                  textAlign: 'center',
                },
              ]}>
              Market
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{marginRight: '5%'}}
            onPress={() => setSelectionCategory('Stop-Limit')}>
            <Text
              style={[
                styles.categoryTitleText,
                isSelectedCategory == 'Stop-Limit' && {
                  fontWeight: 'bold',
                  fontFamily: '',
                  borderBottomColor: 'black',
                  borderBottomWidth: 2,
                  fontSize: textSize.h4,
                  textAlign: 'center',
                },
              ]}>
              Stop-Limit
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginVertical: 20,
            alignItems: 'center',
          }}>
          <Icons
            name="wallet-outline"
            size={30}
            color="#FFFFFF"
            style={{marginRight: 10}}
          />
          <View style={{width: '100%'}}>
            {/* {isSelectedCategory == 'Limit' ? (
                <Text style={styles.infoText}>1,000 BTC</Text>
              ) : null} */}
            {isSelected == 'BUY' ? (
              <Text style={[styles.infoText, {width: '100%'}]}>
                {btcBalance ? parseFloat(btcBalance).toFixed(8) : '00.000000'}{' '}
                {''} {currentCoin && currentCoin.toUpperCase()}
              </Text>
            ) : (
              <Text style={[styles.infoText, {width: '100%'}]}>
                {saleBalance ? parseFloat(saleBalance).toFixed(8) : '00.000000'}{' '}
                {''} {firstCoin && firstCoin.toUpperCase()}
              </Text>
            )}
          </View>
        </View>
        <View style={{height: '40%'}}>
          {isSelectedCategory == 'Stop-Limit' && (
            <View style={styles.inputWrapper}>
              <TextInput
                style={[styles.input, {width: '88%'}]}
                onChangeText={stopAmount => setStopAmount(stopAmount)}
                value={stopAmount}
                placeholder="Stop"
                keyboardType="numeric"
                placeholderTextColor={'#000'}
              />
              <Text style={styles.currencyText}>
                {currentCoin && currentCoin.toUpperCase()}
              </Text>
            </View>
          )}
          <View style={styles.inputWrapper}>
            {isSelectedCategory == 'Market' ? (
              <TextInput
                style={[
                  styles.input,
                  {width: isSelectedCategory == 'Market' ? '70%' : '88%'},
                ]}
                onChangeText={price => setPrice(price)}
                // value={price}
                editable={false}
                placeholder="Price"
                keyboardType="numeric"
                placeholderTextColor={'#000'}
              />
            ) : (
              <TextInput
                style={[
                  styles.input,
                  {width: isSelectedCategory == 'Market' ? '70%' : '88%'},
                ]}
                onChangeText={price => setPrice(price)}
                value={price}
                placeholder="Price"
                keyboardType="numeric"
                placeholderTextColor={'#000'}
              />
            )}
            {isSelectedCategory == 'Market' && (
              <Text
                style={{
                  fontSize: 10,
                  color: '#000',
                  fontWeight: 'bold',
                  marginRight: '6%',
                  width: '20%',
                }}>
                Market Price
              </Text>
            )}
            <Text style={styles.currencyText}>
              {currentCoin && currentCoin.toUpperCase()}
            </Text>
          </View>
          <View style={styles.inputWrapper}>
            <TextInput
              style={[
                styles.input,
                {width: isSelectedCategory == 'Market' ? '76%' : '88%'},
              ]}
              onChangeText={amount => amountCalculate(amount)}
              // onEndEditing={amountCalculate()}
              value={amount}
              placeholder="Amount"
              placeholderTextColor={'#000'}
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
            <Text style={styles.currencyText}>
              {firstCoin && firstCoin.toUpperCase()}
            </Text>
          </View>
          <View style={styles.inputWrapper}>
            <TextInput
              style={[styles.input, {width: '88%'}]}
              onChangeText={total => totalCalculate(total)}
              value={total}
              keyboardType="numeric"
              placeholder="Total"
              placeholderTextColor={'#000'}
            />
            <Text style={styles.currencyText}>
              {currentCoin && currentCoin.toUpperCase()}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: moderateScale(16),
            }}>
            <Text style={styles.infoText}>Fee{'  '}</Text>
            {isSelected == 'BUY' ? (
              <Text style={styles.infoText}>
                0({firstCoin && firstCoin.toUpperCase()}){'  '}
              </Text>
            ) : (
              <Text style={styles.infoText}>
                0({currentCoin && currentCoin.toUpperCase()}){'  '}
              </Text>
            )}
          </View>
        </View>
        {accessToken ? (
          <View style={{alignItems: 'center'}}>
            {isSelected == 'BUY' ? (
              <View style={{width: '98%'}}>
                {isSelectedCategory == 'Market' && (
                  <View style={{marginTop: moderateScale(30)}}>
                    <AppButton
                      text={`BUY ${firstCoin && firstCoin.toUpperCase()}`}
                      onPress={() => {
                        placeOrderTrade();
                        //console.log('ON PRESS BUY');
                        //navigation.navigate('BuyReportList')
                      }}
                    />
                  </View>
                )}
                {isSelectedCategory == 'Limit' && (
                  <View style={{marginTop: moderateScale(30)}}>
                    <AppButton
                      text={`BUY ${firstCoin && firstCoin.toUpperCase()}`}
                      onPress={() => {
                        placeOrderTrade();
                        //console.log('ON PRESS BUY');
                        //navigation.navigate('BuyReportList')
                      }}
                    />
                  </View>
                )}

                {isSelectedCategory == 'Stop-Limit' && (
                  <View style={{marginTop: moderateScale(70)}}>
                    <AppButton
                      text={`BUY ${firstCoin && firstCoin.toUpperCase()}`}
                      onPress={() => {
                        placeOrderTrade();
                        //console.log('ON PRESS BUY');
                        //navigation.navigate('BuyReportList')
                      }}
                    />
                  </View>
                )}
                {/* <AppButton
                    text={`BUY ${firstCoin && firstCoin.toUpperCase()}`}
                    onPress={() => {
                      placeOrderTrade();
                      //console.log('ON PRESS BUY');
                      //navigation.navigate('BuyReportList')
                    }}
                  /> */}
              </View>
            ) : (
              <View style={{width: '98%'}}>
                {isSelectedCategory == 'Market' && (
                  <View style={{marginTop: moderateScale(30)}}>
                    <AppButton
                      text={`SELL ${firstCoin && firstCoin.toUpperCase()}`}
                      onPress={() => {
                        placeOrderTrade();
                        //console.log('ON PRESS BUY');
                        //navigation.navigate('BuyReportList')
                      }}
                    />
                  </View>
                )}
                {isSelectedCategory == 'Limit' && (
                  <View style={{marginTop: moderateScale(30)}}>
                    <AppButton
                      text={`SELL ${firstCoin && firstCoin.toUpperCase()}`}
                      onPress={() => {
                        placeOrderTrade();
                        //console.log('ON PRESS BUY');
                        //navigation.navigate('BuyReportList')
                      }}
                    />
                  </View>
                )}

                {isSelectedCategory == 'Stop-Limit' && (
                  <View style={{marginTop: moderateScale(70)}}>
                    <AppButton
                      text={`SELL ${firstCoin && firstCoin.toUpperCase()}`}
                      onPress={() => {
                        placeOrderTrade();
                        //console.log('ON PRESS BUY');
                        //navigation.navigate('BuyReportList')
                      }}
                    />
                  </View>
                )}
              </View>
              // <AppButton
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
          <View style={{marginTop: 80}}>
            <AppButton
              text={'Login/SignUp Now'}
              onPress={() => navigation.navigate('Login')}
            />
          </View>
        )}
      </View>
      {/* </LinearGradient> */}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  toggleBtnParentView: {
    flexDirection: 'row',
    backgroundColor: '#000',
    borderRadius: 20,
    marginBottom: 20,
    height: 40,
  },
  toggleBtnWrapper: {
    height: 40,
    width: '50%',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnTitle: {
    fontSize: textSize.h3,
    fontWeight: 'bold',
  },
  categoryTitleText: {
    fontSize: textSize.h4,
    fontWeight: 'bold',
    color: '#FFF',
    fontFamily: '',
    textAlign: 'center',
  },
  infoText: {
    fontSize: textSize.h6,
    fontWeight: '500',
    color: '#FFF',
  },
  inputWrapper: {
    backgroundColor: '#FFFFFFE0',
    marginVertical: moderateScale(5),
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    borderRadius: moderateScale(25),
    height: moderateScale(45),
  },
  input: {
    paddingLeft: moderateScale(15),
    flex: 1,
    color: 'black',
    fontWeight: '700',
    fontSize: textSize.h6,
  },
  currencyText: {
    //fontSize: textSize.h6,
    fontSize: textSize.h6,
    fontWeight: '900',
    color: '#000',
    right: getDimen(0.1),
    width: moderateScale(50),
    textAlign: 'right',
  },
});
export default Buy;
