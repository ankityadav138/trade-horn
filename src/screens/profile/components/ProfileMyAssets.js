import {useTheme} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import Icons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import textSize from '../../../constants/textSize';
import {
  ASSETS,
  DROPDOWN_CURRENCY,
  TOTALBALANCE,
  CRYPTO_TABLE,
} from '../../../store/action';
import Toolbar from '../../../constants/toolbar';
import {getDimen} from '../../../dimensions/dimen';
import DropDownPicker from 'react-native-dropdown-picker';
import SelectDropdown from 'react-native-select-dropdown';
import {moderateScale} from 'react-native-size-matters';
import {useIsFocused} from '@react-navigation/native';

const ProfileMyAssets = ({data, navigation}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isSelected, setSelection] = useState('Fiat');
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [open01, setOpen01] = useState(false);
  const [value01, setValue01] = useState('USD');
  // console.log('Value    ', value01);
  const [items, setItems] = useState([
    {label: 'INR', value: 'INR'},
    {label: 'USD', value: 'USD'},
  ]);
  const [isHide, setHide] = useState(false);
  const [InrUsdValue, setInrUsdValue] = useState('');
  const assetsData = useSelector(state => state.user.assets);
  const cryptoAssetsData = useSelector(state => state.user.cryptoTableData);
  const totalBalanceData = useSelector(state => state.user.totalBalance);
  const dropDownData = useSelector(state => state.user.dropdownData);
  const accessToken = useSelector(state => state.login.accessToken);

  useEffect(() => {
    console.log('totalBalanceData : ', totalBalanceData);

    //console.log('Value 01 changed', value01);
    dispatch({
      type: TOTALBALANCE,
      payload: {token: accessToken},
    });
  }, [value01]);

  useEffect(() => {
    if (totalBalanceData.code === 200) {
      setInrUsdValue(
        value01 === 'INR'
          ? totalBalanceData &&
              totalBalanceData.data &&
              totalBalanceData.data.inr_value &&
              (
                parseFloat(totalBalanceData.data.total) *
                parseFloat(totalBalanceData.data.inr_value)
              ).toString()
          : totalBalanceData &&
              totalBalanceData.data &&
              totalBalanceData.data.usd_balance &&
              (
                parseFloat(totalBalanceData.data.total) *
                parseFloat(totalBalanceData.data.usd_balance)
              ).toString(),
      );
    } else {
    }
  }, [totalBalanceData, isFocused]);

  useEffect(() => {
    // console.log('Isselectttt')
    // dispatch({
    //   type: ASSETS,
    //   payload: { token: accessToken },
    // });
    dispatch({
      type: CRYPTO_TABLE,
      payload: {token: accessToken},
    });
  }, [value01]);

  useEffect(() => {
    dispatch({
      type: ASSETS,
      payload: {token: accessToken},
    });
    dispatch({
      type: CRYPTO_TABLE,
      payload: {token: accessToken},
    });
    dispatch({
      type: CRYPTO_TABLE,
      payload: {token: accessToken},
    });
    dispatch({
      type: TOTALBALANCE,
      payload: {token: accessToken},
    });
    dispatch({
      type: DROPDOWN_CURRENCY,
      payload: {
        data: value01,
        token: accessToken,
      },
    });
    dispatch({
      type: DROPDOWN_CURRENCY,
      payload: {
        data: value01,
        token: accessToken,
      },
    });
  }, []);
  // const CheckPoint = ({item}) => {
  //   return (
  //     <View style={{flexDirection: 'row', marginStart: 16, padding: 8}}>
  //       <Icons name="ios-checkmark" size={20} color={'green'} />
  //       <Text style={{color: colors.heading, fontSize: textSize.h5}}>
  //         {item}
  //       </Text>
  //     </View>
  //   );
  // };
  // colors.transparentGradientColor1,
  //       colors.transparentGradientColor2,
  // backgroundColor: index % 2 == 0 ? '#1A6DBF40' : '#0A325C',

  const renderItem = ({item, index}) => (
    <View style={{alignItems: 'center'}}>
      <View
        style={{
          marginStart: 0,
          width: '90%',
          backgroundColor: 'rgba(3,24,47, 0.2)',
          // backgroundColor: 'red',
          borderRadius: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <View
            style={{
              flexDirection: 'column',
              //padding: textSize.componentsDifferenceLow,
              width: '50%',
            }}>
            <View style={[styles.ViewStyleEven, {borderTopLeftRadius: 10}]}>
              <Text style={styles.TextStyleL}>Coin</Text>
            </View>
            <View style={styles.ViewStyleOdd}>
              <Text style={styles.TextStyleL}>Available</Text>
            </View>
            <View style={styles.ViewStyleEven}>
              <Text style={styles.TextStyleL}>On hold</Text>
            </View>
            <View style={styles.ViewStyleOdd}>
              <Text style={styles.TextStyleL}>BTC Valuation</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'flex-end',
              //padding: textSize.componentsDifferenceLow,
              width: '50%',
            }}>
            <View
              style={[styles.ViewValueStyleEven, {borderTopRightRadius: 10}]}>
              <Text
                style={{
                  color: '#8BB3FF',
                  fontSize: textSize.h6,
                  width: getDimen(0.09),
                  top: moderateScale(7),
                  // marginTop: getDimen(0.02),
                  // width: getDimen(0.2),
                }}>
                {item.currency.toUpperCase()} {}
              </Text>
            </View>
            <View style={styles.ViewValueStyleOdd}>
              <Text style={styles.TextStyle}>
                {!isHide ? '******' : item.amount}
              </Text>
            </View>
            <View style={styles.ViewValueStyleEven}>
              <Text style={styles.TextStyle}>
                {!isHide ? '******' : item.hold.toFixed(2)}
              </Text>
            </View>
            <View style={styles.ViewValueStyleOdd}>
              <Text style={styles.TextStyle}>
                {!isHide ? '******' : item.btc_value.toFixed(3)}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.footerBtnParentView}>
          <TouchableOpacity
            style={[
              styles.footerBtn,
              {backgroundColor: isSelected == 'Fiat' ? '#3389E2' : '#3389E2'},
            ]}
            onPress={() =>
              navigation.navigate('DepositAmount', {
                currency: item.currency,
                fee: item.fee,
              })
            }>
            <Text
              style={[
                styles.btnTitle,
                {color: isSelected == 'Fiat' ? '#FFF' : '#FFF'},
                {width: getDimen(0.2)},
              ]}>
              Deposit
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.footerBtn,
              {backgroundColor: isSelected == 'Crypto' ? '#3389E2' : '#3389E2'},
            ]}
            onPress={() =>
              navigation.navigate('Withrawal', {
                amount: item.amount,
                currency: item.currency,
              })
            }>
            <Text
              style={[
                styles.btnTitle,
                {color: isSelected == 'Crypto' ? '#FFF' : '#FFF'},
                {width: getDimen(0.27)},
              ]}>
              Withdraw
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderItem1 = ({item}) => (
    // <LinearGradient
    //   style={{
    //     width: '90%',
    //     borderRadius: moderateScale(6),
    //     marginHorizontal: '5%',
    //     padding: textSize.componentsDifferenceLow,
    //     marginTop: '2%',
    //   }}
    //   colors={[
    //     colors.transparentGradientColor1,
    //     colors.transparentGradientColor2,
    //   ]}>
    //   <View>
    //     <View
    //       style={{
    //         flexDirection: 'row',
    //         width: '100%',
    //       }}>
    //       <View
    //         style={{
    //           flexDirection: 'column',
    //           // justifyContent: 'space-between',
    //           // backgroundColor: 'white',
    //           padding: textSize.componentsDifferenceLow,
    //           width: '50%',
    //         }}>
    //         <Text style={{color: '#FFFFFF', fontSize: textSize.h6}}>Coin</Text>
    //         <Text style={styles.TextStyle}>Available</Text>
    //         <Text style={styles.TextStyle}>On hold</Text>
    //         {value01 === 'INR' ? (
    //           <Text style={styles.TextStyle}>INR Valuation</Text>
    //         ) : (
    //           <Text style={styles.TextStyle}>USD Valuation</Text>
    //         )}
    //       </View>
    //       <View
    //         style={{
    //           flexDirection: 'column',
    //           // justifyContent: 'center',
    //           alignItems: 'flex-end',
    //           padding: textSize.componentsDifferenceLow,
    //           width: '50%',
    //         }}>
    //         <Text
    //           style={{
    //             color: '#8BB3FF',
    //             fontSize: textSize.h6,
    //             width: getDimen(0.09),
    //           }}>
    //           {/* style={styles.TextStyle}> */}
    //           {item.currency.toUpperCase()}
    //         </Text>
    //         <Text style={styles.TextStyle}>
    //           {!isHide ? '******' : item.amount}
    //         </Text>
    //         <Text style={styles.TextStyle}>
    //           {!isHide ? '******' : item.hold.toFixed(5)}
    //         </Text>
    //         <Text style={styles.TextStylevalue}>
    //           {!isHide
    //             ? '******'
    //             : value01 === 'INR'
    //             ? item.inr_balance
    //             : item.usd_balance}
    //         </Text>
    //       </View>
    //     </View>

    //     {/* <Text
    //       style={[
    //         styles.TextStyle,
    //         { marginTop: getDimen(0.0), left: getDimen(0.03) },
    //       ]}>
    //       Operation
    //     </Text> */}
    //     <View style={styles.footerBtnParentView}>
    //       <TouchableOpacity
    //         style={[
    //           styles.footerBtn,
    //           {backgroundColor: isSelected == 'Fiat' ? '#3389E2' : '#3389E2'},
    //         ]}
    //         onPress={() =>
    //           navigation.navigate('CryptoDeposit', {
    //             currency: item.currency,
    //           })
    //         }>
    //         <Text
    //           style={[
    //             styles.btnTitle,
    //             {color: isSelected == 'Fiat' ? '#FFF' : '#FFF'},
    //             {width: getDimen(0.2)},
    //           ]}>
    //           Deposit
    //         </Text>
    //       </TouchableOpacity>
    //       <TouchableOpacity
    //         style={[
    //           styles.footerBtn,
    //           {backgroundColor: isSelected == 'Crypto' ? '#3389E2' : '#3389E2'},
    //         ]}
    //         onPress={() =>
    //           navigation.navigate('CryptoWithrawal', {amount: item.amount})
    //         }>
    //         <Text
    //           style={[
    //             styles.btnTitle,
    //             {color: isSelected == 'Crypto' ? '#FFF' : '#FFF'},
    //             {width: getDimen(0.27)},
    //           ]}>
    //           Withdraw
    //         </Text>
    //       </TouchableOpacity>
    //     </View>
    //   </View>
    // </LinearGradient>

    ///// new code design

    <View style={{alignItems: 'center'}}>
      <View
        style={{
          marginStart: 0,
          width: '90%',
          backgroundColor: 'rgba(3,24,47, 0.2)',
          // backgroundColor: 'red',
          borderRadius: moderateScale(10),
          marginVertical: moderateScale(5),
        }}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <View
            style={{
              flexDirection: 'column',
              //padding: textSize.componentsDifferenceLow,
              width: '50%',
            }}>
            <View style={[styles.ViewStyleEven, {borderTopLeftRadius: 10}]}>
              <Text style={styles.TextStyleL}>Coin</Text>
            </View>
            <View style={styles.ViewStyleOdd}>
              <Text style={styles.TextStyleL}>Available</Text>
            </View>
            <View style={styles.ViewStyleEven}>
              <Text style={styles.TextStyleL}>On hold</Text>
            </View>
            <View style={styles.ViewStyleOdd}>
              {value01 === 'INR' ? (
                <Text style={styles.TextStyleL}>INR Valuation</Text>
              ) : (
                <Text style={styles.TextStyleL}>USD Valuation</Text>
              )}
            </View>
          </View>
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'flex-end',
              //padding: textSize.componentsDifferenceLow,
              width: '50%',
            }}>
            <View
              style={[styles.ViewValueStyleEven, {borderTopRightRadius: 10}]}>
              <Text
                style={{
                  color: '#8BB3FF',
                  fontSize: textSize.h6,
                  width: getDimen(0.22),
                  textAlign: 'right',
                  paddingRight: moderateScale(10),
                  top: moderateScale(7),
                }}>
                {item.currency.toUpperCase()} {}
              </Text>
            </View>
            <View style={styles.ViewValueStyleOdd}>
              <Text style={styles.TextStyle}>
                {!isHide ? '******' : item.amount}
              </Text>
            </View>
            <View style={styles.ViewValueStyleEven}>
              <Text style={styles.TextStyle}>
                {!isHide ? '******' : item.hold.toFixed(5)}
              </Text>
            </View>
            <View style={styles.ViewValueStyleOdd}>
              <Text style={styles.TextStyle}>
                {!isHide
                  ? '******'
                  : value01 === 'INR'
                  ? item.inr_balance
                  : item.usd_balance}
              </Text>
            </View>
          </View>
        </View>

        {/* <Text
          style={[
            styles.TextStyle,
            {marginTop: getDimen(0.0), left: getDimen(0.03)},
          ]}>
          Operation
        </Text> */}

        <View style={styles.footerBtnParentView}>
          <TouchableOpacity
            style={[
              styles.footerBtn,
              {backgroundColor: isSelected == 'Fiat' ? '#3389E2' : '#3389E2'},
            ]}
            onPress={() =>
              navigation.navigate('CryptoDeposit', {
                currency: item.currency,
              })
            }>
            <Text
              style={[
                styles.btnTitle,
                {color: isSelected == 'Fiat' ? '#FFF' : '#FFF'},
                {width: getDimen(0.2)},
              ]}>
              Deposit
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.footerBtn,
              {backgroundColor: isSelected == 'Crypto' ? '#3389E2' : '#3389E2'},
            ]}
            onPress={() =>
              navigation.navigate('CryptoWithrawal', {amount: item.amount})
            }>
            <Text
              style={[
                styles.btnTitle,
                {color: isSelected == 'Crypto' ? '#FFF' : '#FFF'},
                {width: getDimen(0.27)},
              ]}>
              Withdraw
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.HeaderView}>
      <Toolbar navigation={navigation} />
      <View style={{flexDirection: 'row', marginVertical: '5%'}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icons
            style={{
              color: colors.heading,
              textAlign: 'left',
              marginLeft: moderateScale(22),
            }}
            name="arrow-back"
            size={25}
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
          My assets {''}
        </Text>
      </View>
      <View
        style={{
          marginTop: textSize.componentsDifference,
          paddingLeft: getDimen(0.065),
          paddingRight: getDimen(0.02),
        }}>
        <View style={styles.titleEyeIconWrapper}>
          <Text
            style={{color: colors.heading, fontSize: textSize.h3, flex: 0.9}}>
            Total assets&nbsp;
          </Text>

          <View style={{width: '24%', borderRadius: moderateScale(5)}}>
            <DropDownPicker
              style={{height: 30, backgroundColor: '#091326'}}
              zIndex={1000}
              zIndexInverse={1000}
              open={open01}
              value={value01}
              items={items}
              setOpen={setOpen01}
              setValue={setValue01}
              setItems={setItems}
              placeholder="USD"
              ArrowDownIconComponent={({style}) => (
                <Icons name="ios-chevron-down-outline" size={20} color="#fff" />
              )}
              placeholderStyle={
                {
                  // color: 'white',
                }
              }
              labelStyle={{
                fontWeight: 'bold',
                color: 'white',
                fontSize: textSize.p,
              }}
            />
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              color: colors.heading,
              fontSize: textSize.h4,
              width: getDimen(0.6),
            }}>
            {!isHide
              ? '*********'
              : totalBalanceData && totalBalanceData.data.total}{' '}
            BTC {!isHide ? null : '≈  ' + InrUsdValue + ' ' + value01}
          </Text>
          {/* <Icon
            name={!isHide ? 'eye-off' : 'eye'}
            size={20}
            color="#FFFFFF"
            style={{marginLeft: moderateScale(5)}}
            onPress={() => setHide(!isHide)}
          /> */}

          {!isHide ? (
            <Icon
              name="eye-off"
              size={17}
              color="#FFFFFF"
              style={{right: moderateScale(108), top: moderateScale(2)}}
              onPress={() => setHide(!isHide)}
            />
          ) : (
            <Icon
              name="eye"
              size={17}
              color="#FFFFFF"
              style={{top: moderateScale(25), right: moderateScale(20)}}
              onPress={() => setHide(!isHide)}
            />
          )}
        </View>
      </View>
      <View style={styles.toggleBtnParentView}>
        <TouchableOpacity
          style={[
            styles.toggleBtnWrapper,
            {backgroundColor: isSelected == 'Fiat' ? '#091326' : '#fff'},
          ]}
          onPress={() => {
            setSelection('Fiat');
            // console.log('Selection Fiat!!====', isSelected);
          }}>
          <Text
            style={[
              styles.TogglebtnTitle,
              {color: isSelected == 'Fiat' ? '#FFF' : '#091326'},
              {width: getDimen(0.1)},
            ]}>
            Fiat
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.toggleBtnWrapper,
            {backgroundColor: isSelected == 'Crypto' ? '#091326' : '#FFF'},
          ]}
          onPress={() => {
            setSelection('Crypto');
            // console.log('Selection Crypto!!!====', isSelected);
          }}>
          <Text
            style={[
              styles.TogglebtnTitle,
              {color: isSelected == 'Crypto' ? '#FFF' : '#091326'},
              {width: getDimen(0.2)},
            ]}>
            Crypto
          </Text>
        </TouchableOpacity>
      </View>

      {/* <FlatList
      data={isSelected == 'Fiat' ? assetsData && assetsData.data && assetsData.data : cryptoAssetsData && cryptoAssetsData.data && cryptoAssetsData.data}
      renderItem={renderItem}
      extraData={isSelected == 'Fiat' ? assetsData && assetsData.data && assetsData.data : cryptoAssetsData && cryptoAssetsData.data && cryptoAssetsData.data}
      keyExtractor={item => item.id}
    /> */}

      {isSelected == 'Fiat' ? (
        <FlatList
          data={assetsData && assetsData.data && assetsData.data}
          extraData={assetsData && assetsData.data && assetsData.data}
          renderItem={item => renderItem(item)}
          keyExtractor={item => item.id}
        />
      ) : null}

      {isSelected == 'Crypto' ? (
        <FlatList
          data={
            cryptoAssetsData && cryptoAssetsData.data && cryptoAssetsData.data
          }
          extraData={
            cryptoAssetsData && cryptoAssetsData.data && cryptoAssetsData.data
          }
          renderItem={item => renderItem1(item)}
          keyExtractor={item => item.id}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  HeaderView: {
    flex: 1,
    backgroundColor: '#0466C0',
  },
  titleEyeIconWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleBtnParentView: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: moderateScale(20),
    marginBottom: moderateScale(20),
    marginLeft: getDimen(0.05),
    marginRight: getDimen(0.05),
    marginTop: getDimen(0.04),
  },
  toggleBtnWrapper: {
    height: moderateScale(38),
    width: '50%',
    borderRadius: moderateScale(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerBtnParentView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: getDimen(0.02),
    paddingVertical: getDimen(0.07),
    backgroundColor: 'rgba(3,24,47, 0.2)',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  footerBtn: {
    height: moderateScale(36),
    width: '48%',
    borderRadius: moderateScale(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnTitle: {
    fontSize: textSize.h6,
    textAlign: 'center',
  },
  TogglebtnTitle: {
    fontSize: textSize.h5,
    fontWeight: '900',
  },
  TextStyle: {
    color: '#FFFFFF',
    fontSize: textSize.h6,
    marginTop: getDimen(0.02),
    width: getDimen(0.22),
    textAlign: 'right',
    paddingRight: moderateScale(10),
  },
  TextStyleL: {
    color: '#FFFFFF',
    fontSize: textSize.h6,
    marginTop: getDimen(0.02),
    width: getDimen(0.9),
    paddingLeft: moderateScale(15),
  },
  ViewStyleEven: {
    backgroundColor: 'rgba(3,24,47, 0.2)',
    width: getDimen(0.45),
    // width: '100%',
    height: getDimen(0.1),
    paddingHorizontal: 10,
  },
  ViewStyleOdd: {
    backgroundColor: 'rgba(4, 46, 88, 0.5)',
    width: getDimen(0.45),
    // width: '100%',
    height: getDimen(0.1),
    paddingHorizontal: 10,
  },
  ViewValueStyleEven: {
    backgroundColor: 'rgba(3,24,47, 0.2)',
    width: getDimen(0.45),
    // width: '100%',
    height: getDimen(0.1),
    flexDirection: 'column',
    alignItems: 'flex-end',
    paddingHorizontal: 10,
  },
  ViewValueStyleOdd: {
    backgroundColor: 'rgba(4, 46, 88, 0.5)',
    width: getDimen(0.45),
    // width: '100%',
    height: getDimen(0.1),
    flexDirection: 'column',
    alignItems: 'flex-end',
    paddingHorizontal: 10,
  },
  TextStylevalue: {
    color: '#FFFFFF',
    fontSize: textSize.h6,
    marginTop: getDimen(0.02),
  },
  showEntryDropView: {
    backgroundColor: '#091326',
    height: getDimen(0.07),
    width: getDimen(0.2),
    borderRadius: moderateScale(5),
  },
  DDtextstyle: {
    color: '#fff',
    fontSize: textSize.h6,
  },
});

export default ProfileMyAssets;
