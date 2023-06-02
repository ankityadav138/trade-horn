import {useTheme} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import Icons from 'react-native-vector-icons/Ionicons';
import textSize from '../../constants/textSize';
import {getDimen} from '../../dimensions/dimen';
import {AppStyles} from '../../style/AppStyles';
import {
  FIAT_WITHDRAW,
  CRYPTO_WITHDRAW,
  FIAT_WITHDRAW_DATA,
} from '../../store/action';
import AppButton from '../../constants/AppButton';
import showMessage from '../../components/showMessage';
import {AppColors} from '../../constants/appColors';

const DepositAmount = ({navigation, route}) => {
  // console.log("amount in withdraw amountt    ", )
  const amount = route.params.amount;
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const [notes, seNotes] = useState('');
  console.log('note =====s', notes);
  const [tfaCode, setTFACode] = useState('');
  const [withDrwaAmount, setWithdrawAmount] = useState(null);
  const [hideWithDrawAmount, setHideWithDrawAmount] = useState(false);
  // const accessToken =
  //     'eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.eyJvcHRpb24iOiJ1c2VyX2xvZ2luIiwiaWQiOiI2MTY3YjZhZGQ1NmQ0ZmFmOTIzN2U1M2EiLCJzdGF0dXMiOnRydWUsImlhdCI6MTY0NDgxMTE1OX0.5mOdRqDoFGhA7OA7nmeWZ3Q4usPwTVL81hHTsCm1SGppDema6htb9Q34SwYAYYmk';

  const fiatWithdrawData = useSelector(state => state.user.fiatWithdraw);
  const themeColorData = useSelector(state => state.login.themeValue);
  const accessToken = useSelector(state => state.login.accessToken);

  console.log('fiatWithdrawData', fiatWithdrawData);

  const fiatWithdraw = () => {
    console.log('notes', notes);
    if (!withDrwaAmount) {
      showMessage('Amount is required');
    } else if (!notes) {
      showMessage('Notes is required ');
    } else if (!tfaCode) {
      showMessage('TFA Code is required');
    } else {
      // console.log('fiatWithdraw')
      dispatch({
        type: FIAT_WITHDRAW,
        payload: {
          data: {
            amount: hideWithDrawAmount === true ? amount : withDrwaAmount,
            code: tfaCode,
            currency: route.params.currency,
            description: notes,
            fee: route.params.fee,
            transfer_option: '',
          },
          token: accessToken,
        },
      });
    }
  };

  useEffect(() => {
    if (fiatWithdrawData) {
      if (Object.keys(fiatWithdrawData).length > 0) {
        if (fiatWithdrawData.code === 200) {
          showMessage(fiatWithdrawData.message);
          dispatch({
            type: FIAT_WITHDRAW_DATA,
            payload: {},
          });
        } else if (fiatWithdrawData.code === 400) {
          showMessage(fiatWithdrawData.message);
          dispatch({
            type: FIAT_WITHDRAW_DATA,
            payload: {},
          });
        }

        //console.log('PAIR DATA =======>', fiatWithdrawData);
        // dispatch({
        //   type: MARKET_HOME,
        //   payload: {},
        // });
      }
    }
  }, [fiatWithdrawData]);

  useEffect(() => {
    if (withDrwaAmount > amount) {
      showMessage('Insufficient balance');
    }
  });

  return (
    <ScrollView style={styles.HeaderView}>
      <View
        style={{flexDirection: 'row', marginTop: '5%', alignItems: 'center'}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icons
            style={{
              color: colors.heading,
              textAlign: 'left',
              marginLeft: 22,
            }}
            name="arrow-back"
            size={20}
            color={AppColors(themeColorData).title}
          />
        </TouchableOpacity>
        <Text
          style={{
            color: AppColors(themeColorData).title,
            fontSize: textSize.h3,
            marginLeft: 5,
            flex: 0.95,
          }}>
          Withdrawal
        </Text>
        <TouchableOpacity
          onPress={() => {
            // console.log('hide Amount')
            setHideWithDrawAmount(true);
          }}>
          <Text style={{color: colors.heading, fontSize: textSize.p}}>
            Withdraw all
          </Text>
        </TouchableOpacity>
      </View>
      <LinearGradient
        style={{
          width: '100%',
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
              fontSize: textSize.h6,
            }}>
            Withdraw Amount
          </Text>
          <TextInput
            style={{
              backgroundColor: AppColors(themeColorData).backgroundLight,
              // marginHorizontal: '5%',
              marginVertical: 6,
              color: 'black',
              paddingHorizontal: 5,
              paddingLeft: 10,
              borderRadius: 10,
            }}
            keyboardType="numeric"
            placeholder=""
            value={
              hideWithDrawAmount === true ? amount.toString() : withDrwaAmount
            }
            onChangeText={withDrwaAmount =>
              hideWithDrawAmount === true
                ? setWithdrawAmount(amount)
                : setWithdrawAmount(withDrwaAmount)
            }
          />
        </View>
        <View style={{paddingLeft: 20, paddingRight: 20, paddingTop: 10}}>
          <Text
            style={{
              color: AppColors(themeColorData).title,
              fontSize: textSize.h6,
            }}>
            Notes
          </Text>
          <TextInput
            style={{
              backgroundColor: AppColors(themeColorData).backgroundLight,
              // marginHorizontal: '5%',
              marginVertical: 6,
              color: 'black',
              paddingHorizontal: 5,
              paddingLeft: 10,
              borderRadius: 10,
            }}
            placeholder=""
            onChangeText={text => seNotes(text)}
          />
        </View>
        <View style={{paddingLeft: 20, paddingRight: 20, paddingTop: 10}}>
          <Text
            style={{
              color: AppColors(themeColorData).title,
              fontSize: textSize.h6,
            }}>
            TFA Code
          </Text>
          <TextInput
            style={{
              backgroundColor: AppColors(themeColorData).backgroundLight,
              // marginHorizontal: '5%',
              marginVertical: 6,
              color: 'black',
              paddingHorizontal: 5,
              paddingLeft: 10,
              borderRadius: 10,
            }}
            placeholder=""
            value={tfaCode}
            onChangeText={tfaCode => setTFACode(tfaCode)}
          />
        </View>

        <View
          style={{
            paddingLeft: getDimen(0.15),
            paddingRight: getDimen(0.15),
            paddingTop: getDimen(0.5),
          }}>
          <AppButton
            text={'CONFIRM WITHDRAWAL'}
            onPress={() => {
              fiatWithdraw();
            }}
          />
        </View>
      </LinearGradient>
    </ScrollView>
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
