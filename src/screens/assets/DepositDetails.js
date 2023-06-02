import {useTheme} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import Icons from 'react-native-vector-icons/Entypo';
import textSize from '../../constants/textSize';
import {getDimen} from '../../dimensions/dimen';
import {AppStyles} from '../../style/AppStyles';
import AppButton from '../../constants/AppButton';
import {AppColors} from '../../constants/appColors';

const DepositAmount = ({navigation}) => {
  const {colors} = useTheme();
  const dispatch = useDispatch();

  const themeColorData = useSelector(state => state.login.themeValue);

  return (
    <View style={styles.HeaderView}>
      <View
        style={{flexDirection: 'row', marginTop: '5%', alignItems: 'center'}}>
        {/* <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icons
            style={{
              color: AppColors(themeColorData).title,
              textAlign: 'left',
              marginLeft: 22,
            }}
            name="arrow-back"
            size={20}
            color={AppColors(themeColorData).title}
          />
        </TouchableOpacity> */}
        <Text
          style={{
            color: AppColors(themeColorData).title,
            fontSize: textSize.h3,
            marginLeft: 5,
            flex: 0.95,
          }}>
          Info
        </Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icons
            name={'cross'}
            size={18}
            color={AppColors(themeColorData).title}
          />
        </TouchableOpacity>
      </View>
      <LinearGradient
        style={{
          width: '100%',
          height: '100%',
          borderRadius: 6,
          // marginHorizontal: '5%',
          padding: textSize.componentsDifferenceLow,
          marginTop: '5%',
        }}
        colors={[
          AppColors(themeColorData).background,
          AppColors(themeColorData).background,
        ]}>
        <View style={{paddingLeft: 20, paddingRight: 20, paddingTop: 10}}>
          <Text
            style={{
              color: AppColors(themeColorData).title,
              fontSize: textSize.h3,
            }}>
            Pay to below bank account
          </Text>
          <Text
            style={{
              color: AppColors(themeColorData).title,
              fontSize: textSize.h5,
              top: getDimen(0.03),
            }}>
            Holder Name : SegNexo Exchangea {'\n'} Bank Name: Punjab National
            Banka {'\n'} Account Number: 123456789123 {'\n'} IFSC code :
            BARB0CHAPHE {'\n'}Account Type: Current Account
          </Text>
          <Text
            style={{
              color: AppColors(themeColorData).title,
              fontSize: textSize.h3,
              top: getDimen(0.05),
            }}>
            Pay to below bank account
          </Text>
          <Text
            style={{
              color: AppColors(themeColorData).title,
              fontSize: textSize.h5,
              top: getDimen(0.08),
            }}>
            Do not deposit from an unregistered bank account. {'\n'}You can use
            your UPI app to transfer money. {'\n'}Transfer using only your
            banking app NEFT or IMPS. {'\n'}Minimum deposit amount: 400 INR
          </Text>
        </View>
        <View
          style={{
            paddingLeft: getDimen(0.15),
            paddingRight: getDimen(0.15),
            top: getDimen(0.2),
          }}>
          <AppButton text={'REMOVE BANK'} IsImage={true} onPress={() => {}} />
        </View>
      </LinearGradient>
    </View>
  );
};

export default DepositAmount;

const styles = themeColorData =>
  StyleSheet.create({
    HeaderView: {
      flex: 1,
      backgroundColor: AppColors(themeColorData).background,
    },
  });
