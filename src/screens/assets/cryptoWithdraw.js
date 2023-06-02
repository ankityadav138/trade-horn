import { useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import Icons from 'react-native-vector-icons/Ionicons';
import textSize from '../../constants/textSize';
import { getDimen } from '../../dimensions/dimen';
import { AppStyles } from '../../style/AppStyles';
import { FIAT_WITHDRAW, CRYPTO_WITHDRAW } from '../../store/action';
import AppButton from '../../constants/AppButton';
import CryptoDepositAmount from './cryptoDeposit';
import showMessage from '../../components/showMessage';


const DepositAmount = ({ navigation, route }) => {
    // console.log("amount in ", route.params.amount)
    const amount = route.params.amount;
    const { colors } = useTheme();
    const dispatch = useDispatch();
    const accessToken = useSelector(state => state.login.accessToken);
    const [tfaCode, setTFACode] = useState('')
    const [notes, setNotes] = useState('')
    const [withDrwaAddress, setWithdrawAddress] = useState('')
    const [amountCurrency, setAmountCurrency] = useState(null)
    const [cryptoWithDrawAmnt, setCryptoWithDrawAmnt] = useState('')
    const [hideAmount, setHideAmount] = useState(false)
    // const accessToken =
    //     'eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.eyJvcHRpb24iOiJ1c2VyX2xvZ2luIiwiaWQiOiI2MTY3YjZhZGQ1NmQ0ZmFmOTIzN2U1M2EiLCJzdGF0dXMiOnRydWUsImlhdCI6MTY0NDgxMTE1OX0.5mOdRqDoFGhA7OA7nmeWZ3Q4usPwTVL81hHTsCm1SGppDema6htb9Q34SwYAYYmk';

    const cryptoWithdrawData = useSelector(state => state.user.cryptoWithdraw);
    // console.log('cryptoWithdrawData', cryptoWithdrawData);

    const cryptoWithdraw = () => {
        if (!withDrwaAddress) {
            showMessage("Address is required")
        }
        else if (!cryptoWithDrawAmnt) {
            showMessage("Amount is required")
        }
        else if (!amountCurrency) {
            showMessage("Currency is required")
        }
        else if (!notes) {
            showMessage("Notes is required ")
        }
        else if (!tfaCode) {
            showMessage("TFA Code is required")
        }
        else {
            //console.log('cryptoWithdrawData')
            dispatch({
                type: CRYPTO_WITHDRAW,
                payload: {
                    data:
                    {
                        "currency": amountCurrency,
                        "amount": hideAmount === true ? amount : cryptoWithDrawAmnt,
                        "address": withDrwaAddress,
                        "description": notes,
                        "code": tfaCode
                    },
                    token: accessToken
                },
            });
        }
    }
    useEffect(() => {
        if (cryptoWithDrawAmnt > amount) {
            showMessage("Insufficient balance")
        }
    })

    return (
        <ScrollView style={styles.HeaderView}>
            <View style={{ flexDirection: 'row', marginTop: '5%', alignItems: 'center', }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icons
                        style={{
                            color: colors.heading,
                            textAlign: 'left',
                            marginLeft: 22
                        }}
                        name="arrow-back"
                        size={20}
                        color={'white'}
                    />
                </TouchableOpacity>
                <Text style={{ color: colors.heading, fontSize: textSize.h3, marginLeft: 5, flex: 0.95 }}>
                    Withdrawal
                </Text>
                <TouchableOpacity
                    onPress={() => setHideAmount(true)}
                >
                    <Text style={{ color: colors.heading, fontSize: textSize.p, }}>
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
                    colors.transparentGradientColor2,
                    colors.transparentGradientColor1,
                ]}>
                <View style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 10 }}>
                    <Text style={{ color: '#FFFFFF', fontSize: textSize.h6 }}>Withdraw Address</Text>
                    <TextInput
                        style={{
                            backgroundColor: '#32608E',
                            // marginHorizontal: '5%',
                            marginVertical: 6,
                            color: 'black',
                            paddingHorizontal: 5,
                            paddingLeft: 10,
                            borderRadius: 25,
                        }}
                        onChangeText={(withDrwaAddress) => setWithdrawAddress(withDrwaAddress)}
                        placeholder=""
                    />
                </View>
                <View style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 10 }}>
                    <Text style={{ color: '#FFFFFF', fontSize: textSize.h6 }}>Withdraw Amount</Text>
                    <TextInput
                        style={{
                            backgroundColor: '#32608E',
                            // marginHorizontal: '5%',
                            marginVertical: 6,
                            color: 'black',
                            paddingHorizontal: 5,
                            paddingLeft: 10,
                            borderRadius: 25,
                        }}
                        value={
                            hideAmount === true ?
                                amount.toString() :
                                cryptoWithDrawAmnt
                        }
                        // onChangeText={(text) => setCryptoWithDrawAmnt(text)}
                        onChangeText={(withDrwaAmount) => hideAmount === true ? setCryptoWithDrawAmnt(amount) : setCryptoWithDrawAmnt(withDrwaAmount)}

                        placeholder=""

                    />
                </View>
                <View style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 10 }}>
                    <Text style={{ color: '#FFFFFF', fontSize: textSize.h6 }}>Amount of Currency</Text>
                    <TextInput
                        style={{
                            backgroundColor: '#32608E',
                            // marginHorizontal: '5%',
                            marginVertical: 6,
                            color: 'black',
                            paddingHorizontal: 5,
                            paddingLeft: 10,
                            borderRadius: 25,
                        }}
                        onChangeText={(amountCurrency) => setAmountCurrency(amountCurrency)}
                        placeholder=""
                    />
                </View>
                <View style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 10 }}>
                    <Text style={{ color: '#FFFFFF', fontSize: textSize.h6 }}>Notes</Text>
                    <TextInput
                        style={{
                            backgroundColor: '#32608E',
                            // marginHorizontal: '5%',
                            marginVertical: 6,
                            color: 'black',
                            paddingHorizontal: 5,
                            paddingLeft: 10,
                            borderRadius: 25,
                        }}
                        onChangeText={(notes) => setNotes(notes)}
                        placeholder=""
                    />
                </View>
                <View style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 10 }}>
                    <Text style={{ color: '#FFFFFF', fontSize: textSize.h6 }}>TFA Code</Text>
                    <TextInput
                        style={{
                            backgroundColor: '#32608E',
                            // marginHorizontal: '5%',
                            marginVertical: 6,
                            color: 'black',
                            paddingHorizontal: 5,
                            paddingLeft: 10,
                            borderRadius: 25,
                        }}
                        onChangeText={(tfaCode) => setTFACode(tfaCode)}
                        placeholder=""
                    />
                </View>

                <View style={{ paddingLeft: getDimen(0.15), paddingRight: getDimen(0.15), paddingTop: getDimen(0.5) }}>
                    <AppButton
                        text={'CONFIRM WITHDRAWAL'}
                        onPress={
                            () => { cryptoWithdraw() }
                        }
                    />
                </View>


            </LinearGradient>
        </ScrollView>
    )
}

export default DepositAmount;


const styles = StyleSheet.create({
    HeaderView: {
        flex: 1,
        backgroundColor: 'rgba(4, 46, 88, 0.5)'
    },
})