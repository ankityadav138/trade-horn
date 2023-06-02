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
import Details from 'react-native-vector-icons/Entypo';
import textSize from '../../constants/textSize';
import {getDimen} from '../../dimensions/dimen';
import {AppStyles} from '../../style/AppStyles';
import {FIAT_DEPOSIT, FIAT_DEPOSIT_DATA} from '../../store/action';
import AppButton from '../../constants/AppButton';
import DocumentPicker from 'react-native-document-picker';
import showMessage from '../../components/showMessage';
import DropDownPicker from 'react-native-dropdown-picker';
import {AppColors} from '../../constants/appColors';

const DepositAmount = ({navigation, route}) => {
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'IMPS', value: 'IMPS'},
    {label: 'NEFT', value: 'NEFT'},
    {label: 'RTGS', value: 'RTGS'},
  ]);
  const [filePath, setFilePath] = useState(null);
  const accessToken = useSelector(state => state.login.accessToken);
  const [hideAmount, setHideAmount] = useState(false);
  const [depositAmount, setDepositeAmount] = useState('');
  const [paymentWay, setPaymentWay] = useState('');
  const [refrenceId, setRefrenceId] = useState('');
  const [note, setNote] = useState('');
  const themeColorData = useSelector(state => state.login.themeValue);

  // const accessToken =
  //   'eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.eyJvcHRpb24iOiJ1c2VyX2xvZ2luIiwiaWQiOiI2MTY3YjZhZGQ1NmQ0ZmFmOTIzN2U1M2EiLCJzdGF0dXMiOnRydWUsImlhdCI6MTY0NDgxMTE1OX0.5mOdRqDoFGhA7OA7nmeWZ3Q4usPwTVL81hHTsCm1SGppDema6htb9Q34SwYAYYmk';

  const fiatDepositData = useSelector(state => state.user.fiatDeposite);
  console.log('fiatDepositData', fiatDepositData);

  const fiatDeposite = () => {
    if (!depositAmount) {
      showMessage('Amount is required');
    } else if (!value) {
      showMessage('Please select the payment method ');
    } else if (!refrenceId) {
      showMessage('Refrence id is required');
    } else if (!filePath) {
      showMessage('Need to upload your proof image');
    } else {
      // console.log('fiatDeposite')
      dispatch({
        type: FIAT_DEPOSIT,
        payload: {
          data: {
            amount: depositAmount,
            comment: note,
            currency: route.params.currency,
            method: value,
            proof: filePath,
            transactionid: refrenceId,
          },
          token: accessToken,
        },
      });
    }
  };

  useEffect(() => {
    if (fiatDepositData) {
      if (Object.keys(fiatDepositData).length > 0) {
        if (fiatDepositData.code === 200) {
          showMessage(fiatDepositData.message);
          dispatch({
            type: FIAT_DEPOSIT_DATA,
            payload: {},
          });
        } else if (fiatDepositData.code === 400) {
          showMessage(fiatDepositData.message);
          dispatch({
            type: FIAT_DEPOSIT_DATA,
            payload: {},
          });
        }

        //console.log('PAIR DATA =======>', fiatDepositData);
        // dispatch({
        //   type: MARKET_HOME,
        //   payload: {},
        // });
      }
    }
  }, [fiatDepositData]);

  const selectFileUpload = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      // console.log('res : ' + JSON.stringify(res[0]));
      setFilePath(res[0]);
    } catch (err) {
      setFilePath(null);
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err;
      }
    }
    // console.log('filePathURL++', filePath)

    return;
    if (filePath != null) {
      const fileToUpload = filePath;
      const data = new FormData();
      data.append('name', 'photo');
      data.append('photo', fileToUpload);

      let params = {
        data: data,
        params: {
          method: 'POST',
          url: '/upload-photos',
          token:
            accessToken && accessToken.data && accessToken.data.access_token,
        },
      };
      commonAxoisApiUtils.getResponse(params).then(res => {
        setModalVisible(false);
        if (res.data.code == 404) {
          showMessage(res.data.message);
        }
        if (res.data.code == 200) {
          showMessage(res.data.message);
          dispatch({
            type: USER_PHOTOS,
            payload: {
              token: {
                accessToken: accessToken.data.access_token,
              },
            },
          });
        }
        if (res.data.code == 400) {
          showMessage(res.data.message);
        }
      });
    } else {
      // If no file selected the show alert
      showMessage('Please Select Image first');
    }
  };

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
            color={AppColors(themeColorData).white}
          />
        </TouchableOpacity>
        <Text
          style={{
            color: AppColors(themeColorData).title,
            fontSize: textSize.h3,
            marginLeft: 5,
            flex: 0.95,
          }}>
          Deposit Amount
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('DepositDetails')}>
          <Details
            name={'info-with-circle'}
            size={18}
            color={AppColors(themeColorData).title}
          />
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
            Deposit Amount
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
            value={depositAmount}
            onChangeText={depositAmount => setDepositeAmount(depositAmount)}
            placeholder=""
            keyboardType="numeric"
          />
        </View>
        <View style={{paddingLeft: 20, paddingRight: 20, paddingTop: 10}}>
          <Text
            style={{
              color: AppColors(themeColorData).title,
              fontSize: textSize.h6,
            }}>
            Payment Way
          </Text>
          <DropDownPicker
            style={{
              backgroundColor: AppColors(themeColorData).backgroundLight,
              marginVertical: 6,
              color: 'black',
              paddingHorizontal: 5,
              paddingLeft: 10,
              borderRadius: 10,
            }}
            placeholderStyle={{
              color: AppColors(themeColorData).title,
            }}
            activityIndicatorColor={colors.text}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            placeholder="Select payment method"
          />
        </View>
        <View style={{paddingLeft: 20, paddingRight: 20, paddingTop: 10}}>
          <Text
            style={{
              color: AppColors(themeColorData).title,
              fontSize: textSize.h6,
            }}>
            Reference ID
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
            onChangeText={text => setRefrenceId(text)}
          />
        </View>

        <View
          style={{justifyContent: 'center', alignItems: 'center', padding: 10}}>
          <View
            style={{
              height: getDimen(0.35),
              width: getDimen(0.5),
              backgroundColor: 'white',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderRadius: 8,
            }}>
            {filePath != null ? (
              <Image
                style={{height: 80, width: 80, marginTop: 5}}
                source={{uri: filePath.uri}}
              />
            ) : (
              <Image
                style={{height: 80, width: 80, marginTop: 5}}
                source={require('../../assets/Logo.png')}
              />
            )}

            <TouchableOpacity onPress={() => selectFileUpload()}>
              <Text
                style={{
                  fontSize: textSize.p,
                  backgroundColor: AppColors(themeColorData).backgroundLight,
                  color: AppColors(themeColorData).title,
                  width: getDimen(0.5),
                  height: getDimen(0.1),
                  textAlign: 'center',
                  textAlignVertical: 'center',
                  borderBottomRightRadius: 8,
                  borderBottomLeftRadius: 8,
                }}>
                Upload your screenshort
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{paddingLeft: 20, paddingRight: 20, paddingTop: 0}}>
          <Text
            style={{
              color: AppColors(themeColorData).title,
              fontSize: textSize.h6,
            }}>
            Note
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
            onChangeText={text => setNote(text)}
          />
        </View>
        <View
          style={{
            paddingLeft: getDimen(0.15),
            paddingRight: getDimen(0.15),
            paddingTop: 10,
          }}>
          <AppButton
            text={'CONFIRM DEPOSIT'}
            onPress={() => {
              fiatDeposite();
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
