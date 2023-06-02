import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getDimen} from '../../dimensions/dimen';
import {CRYPTO_ADDRESS} from '../../store/action';
import {AppColors} from '../../constants/appColors';
import {moderateScale} from 'react-native-size-matters';

import showMessage from '../../components/showMessage';
import Clipboard from '@react-native-community/clipboard';
import QRCode from 'react-native-qrcode-svg';
import Icons from 'react-native-vector-icons/Ionicons';
import textSize from '../../constants/textSize';

const CryptoDepositAmount = ({navigation, route}) => {
  const dispatch = useDispatch();
  const accessToken = useSelector(state => state.login.accessToken);
  const [copiedText, setCopiedText] = useState('');
  const cryptoAddress = useSelector(state => state.user.cryptoAddressData);
  const [address, setAddress] = useState(
    cryptoAddress && cryptoAddress.data && cryptoAddress.data.address,
  );
  const themeColorData = useSelector(state => state.login.themeValue);

  const copyText = text => {
    Clipboard.setString(text);
    fetchCopiedText();
  };

  const fetchCopiedText = async () => {
    const text = await Clipboard.getString();
    setCopiedText(text);
  };

  useEffect(() => {
    dispatch({
      type: CRYPTO_ADDRESS,
      payload: {
        data: route.params.currency,
        token: accessToken,
      },
    });
  }, []);

  // useEffect(() => {
  //     if (cryptoAddress.code === 200) {
  //         setAddress(cryptoAddress && cryptoAddress.data && cryptoAddress.data.address)
  //     } else {
  //        // showMessage(cryptoAddress.message);
  //     }
  // }, [cryptoAddress])

  return (
    <View style={styles(themeColorData).HeaderView}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View>
          <View style={styles(themeColorData).subview}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icons
                style={styles(themeColorData).back}
                name="arrow-back"
                size={20}
                color={'white'}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles(themeColorData).titlename}>Deposit XRP</Text>
        </View>
        <View>
          <Image
            source={require('../../assets/back.png')}
            style={{height: 100, width: 130, left: moderateScale(25)}}
          />
        </View>
      </View>

      <View style={{bottom: '4%'}}>
        <View style={styles(themeColorData).qrView}>
          <QRCode
            value={
              cryptoAddress && cryptoAddress.data && cryptoAddress.data.address
            }
            size={150}
          />
        </View>
        <View style={styles(themeColorData).despc}>
          <Text style={styles(themeColorData).despcText}>
            Send only XRP to this deposit address. {'\n'} This address does not
            support deposit of non-fungible {'\n'} token, please go to NFT page
            to deposit NFT.
          </Text>
          <Text style={styles(themeColorData).line}>{'    '}</Text>
        </View>
        <View style={{marginVertical: '3%'}}>
          <Text style={styles(themeColorData).xrpText}> XRP address</Text>
          <View style={styles(themeColorData).copYview}>
            <TouchableOpacity
              style={{flexDirection: 'row'}}
              onPress={() => {
                copyText(address);
                showMessage('Copied');
              }}>
              <View style={{marginLeft: 2}}>
                <Text style={styles(themeColorData).address}> {address}</Text>
              </View>
              <Icons
                style={{
                  color: AppColors(themeColorData).inputDark,
                  right: moderateScale(20),
                  marginTop: moderateScale(20),
                }}
                name="copy"
                size={20}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CryptoDepositAmount;

const styles = themeColorData =>
  StyleSheet.create({
    HeaderView: {
      flex: 1,
      margin: 10,
    },
    qrView: {
      paddingLeft: 20,
      height: getDimen(0.8),
      width: getDimen(0.8),
      paddingRight: 20,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
    },
    copYview: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingRight: 15,
    },
    titlename: {
      color: AppColors(themeColorData).title,
      fontSize: textSize.h1,
      marginLeft: 10,
      fontWeight: '900',
      marginTop: 20,
      fontFamily: '',
    },
    back: {
      color: AppColors(themeColorData).title,
      textAlign: 'left',
      marginLeft: getDimen(0.02),
    },
    subview: {
      flexDirection: 'row',
      marginTop: '15%',
      alignItems: 'center',
    },
    despc: {
      // justifyContent: 'center',
      // alignItems: 'center',
    },
    despcText: {
      textAlign: 'center',
      color: AppColors(themeColorData).inputDark,
      fontWeight: '500',
      // fontSize: textSize.h5,
      fontSize: 13,
      height: moderateScale(60),
      bottom: moderateScale(30),
    },
    xrpText: {
      color: AppColors(themeColorData).inputDark,
      fontWeight: '900',
      fontSize: textSize.h4,
      marginLeft: 5,
      top: 7,
    },
    address: {
      color: AppColors(themeColorData).title,
      fontWeight: '900',
      fontSize: textSize.h3,
      marginLeft: 5,
      top: 7,
      marginRight: 50,
    },
    line: {
      borderBottomWidth: 0.5,
      borderBottomColor: AppColors(themeColorData).inputBackgroud,
      bottom: moderateScale(25),
    },
  });
